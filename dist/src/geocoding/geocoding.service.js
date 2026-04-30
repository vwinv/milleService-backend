"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GeocodingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodingService = void 0;
const common_1 = require("@nestjs/common");
const GOOGLE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const GOOGLE_AUTOCOMPLETE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const GOOGLE_PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const GOOGLE_ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";
let GeocodingService = class GeocodingService {
    static { GeocodingService_1 = this; }
    geocodeCache = new Map();
    autocompleteCache = new Map();
    placeDetailsCache = new Map();
    routeCache = new Map();
    static GEOCODE_TTL_MS = 30 * 60 * 1000;
    static AUTOCOMPLETE_TTL_MS = 2 * 60 * 1000;
    static PLACE_DETAILS_TTL_MS = 30 * 60 * 1000;
    static ROUTE_TTL_MS = 60 * 1000;
    get apiKey() {
        return (process.env.GOOGLE_MAPS_API_KEY ?? "").trim();
    }
    get hasApiKey() {
        return this.apiKey.length > 0;
    }
    async geocode(address) {
        const trimmed = (address ?? "").trim();
        if (trimmed.length < 3) {
            throw new common_1.BadRequestException("Adresse trop courte (min. 3 caractères)");
        }
        if (!this.hasApiKey)
            return null;
        const cacheKey = trimmed.toLowerCase();
        const cached = this.getCache(this.geocodeCache, cacheKey);
        if (cached !== undefined)
            return cached;
        const params = new URLSearchParams({
            address: trimmed,
            key: this.apiKey,
            language: "fr",
            region: "sn",
        });
        const url = `${GOOGLE_GEOCODING_URL}?${params.toString()}`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) {
            this.setCache(this.geocodeCache, cacheKey, null, GeocodingService_1.GEOCODE_TTL_MS);
            return null;
        }
        const data = (await res.json());
        if (data.status !== "OK") {
            this.setCache(this.geocodeCache, cacheKey, null, GeocodingService_1.GEOCODE_TTL_MS);
            return null;
        }
        const first = data.results?.[0]?.geometry?.location;
        if (!first || typeof first.lat !== "number" || typeof first.lng !== "number") {
            this.setCache(this.geocodeCache, cacheKey, null, GeocodingService_1.GEOCODE_TTL_MS);
            return null;
        }
        const out = { lat: first.lat, lng: first.lng };
        this.setCache(this.geocodeCache, cacheKey, out, GeocodingService_1.GEOCODE_TTL_MS);
        return out;
    }
    async geocodeWithFallbacks(address, suffixes = [", Dakar, Sénégal", ", Sénégal"]) {
        let result = await this.geocode(address);
        if (result)
            return result;
        for (const suffix of suffixes) {
            result = await this.geocode(`${address.trim()}${suffix}`);
            if (result)
                return result;
        }
        return null;
    }
    async autocomplete(query) {
        const trimmed = (query ?? "").trim();
        if (trimmed.length < 2)
            return [];
        if (!this.hasApiKey)
            return [];
        const cacheKey = trimmed.toLowerCase();
        const cached = this.getCache(this.autocompleteCache, cacheKey);
        if (cached !== undefined)
            return cached;
        const params = new URLSearchParams({
            input: trimmed,
            key: this.apiKey,
            language: "fr",
            components: "country:sn",
            types: "address",
        });
        const url = `${GOOGLE_AUTOCOMPLETE_URL}?${params.toString()}`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) {
            this.setCache(this.autocompleteCache, cacheKey, [], GeocodingService_1.AUTOCOMPLETE_TTL_MS);
            return [];
        }
        const data = (await res.json());
        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            this.setCache(this.autocompleteCache, cacheKey, [], GeocodingService_1.AUTOCOMPLETE_TTL_MS);
            return [];
        }
        const predictions = data.predictions ?? [];
        const top = predictions.slice(0, 8);
        const out = top
            .map((p) => {
            const displayName = (p.description ?? "").trim();
            const placeId = (p.place_id ?? "").trim();
            if (!displayName || !placeId)
                return null;
            return { displayName, placeId };
        })
            .filter((x) => x !== null);
        this.setCache(this.autocompleteCache, cacheKey, out, GeocodingService_1.AUTOCOMPLETE_TTL_MS);
        return out;
    }
    async placeDetails(placeId) {
        const id = (placeId ?? "").trim();
        if (!id || !this.hasApiKey)
            return null;
        return this.placeDetailsLatLng(id);
    }
    async computeRoute(fromLat, fromLng, toLat, toLng) {
        if (!this.hasApiKey)
            return null;
        const routeKey = this.routeCacheKey(fromLat, fromLng, toLat, toLng);
        const cached = this.getCache(this.routeCache, routeKey);
        if (cached !== undefined)
            return cached;
        const body = {
            origin: { location: { latLng: { latitude: fromLat, longitude: fromLng } } },
            destination: { location: { latLng: { latitude: toLat, longitude: toLng } } },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_UNAWARE",
            polylineQuality: "OVERVIEW",
        };
        const res = await fetch(GOOGLE_ROUTES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Goog-Api-Key": this.apiKey,
                "X-Goog-FieldMask": "routes.polyline.encodedPolyline",
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            this.setCache(this.routeCache, routeKey, null, GeocodingService_1.ROUTE_TTL_MS);
            return null;
        }
        const data = (await res.json());
        const encoded = data.routes?.[0]?.polyline?.encodedPolyline;
        if (!encoded) {
            this.setCache(this.routeCache, routeKey, null, GeocodingService_1.ROUTE_TTL_MS);
            return null;
        }
        const decoded = this.decodePolyline(encoded);
        const out = decoded.length >= 2 ? decoded : null;
        this.setCache(this.routeCache, routeKey, out, GeocodingService_1.ROUTE_TTL_MS);
        return out;
    }
    async placeDetailsLatLng(placeId) {
        const cached = this.getCache(this.placeDetailsCache, placeId);
        if (cached !== undefined)
            return cached;
        const params = new URLSearchParams({
            place_id: placeId,
            key: this.apiKey,
            fields: "geometry/location",
        });
        const url = `${GOOGLE_PLACE_DETAILS_URL}?${params.toString()}`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) {
            this.setCache(this.placeDetailsCache, placeId, null, GeocodingService_1.PLACE_DETAILS_TTL_MS);
            return null;
        }
        const data = (await res.json());
        if (data.status !== "OK") {
            this.setCache(this.placeDetailsCache, placeId, null, GeocodingService_1.PLACE_DETAILS_TTL_MS);
            return null;
        }
        const loc = data.result?.geometry?.location;
        if (!loc || typeof loc.lat !== "number" || typeof loc.lng !== "number") {
            this.setCache(this.placeDetailsCache, placeId, null, GeocodingService_1.PLACE_DETAILS_TTL_MS);
            return null;
        }
        const out = { lat: loc.lat, lng: loc.lng };
        this.setCache(this.placeDetailsCache, placeId, out, GeocodingService_1.PLACE_DETAILS_TTL_MS);
        return out;
    }
    routeCacheKey(fromLat, fromLng, toLat, toLng) {
        const round = (n) => n.toFixed(4);
        return `${round(fromLat)},${round(fromLng)};${round(toLat)},${round(toLng)}`;
    }
    getCache(cache, key) {
        const hit = cache.get(key);
        if (!hit)
            return undefined;
        if (Date.now() > hit.expiresAt) {
            cache.delete(key);
            return undefined;
        }
        return hit.value;
    }
    setCache(cache, key, value, ttlMs) {
        cache.set(key, { value, expiresAt: Date.now() + ttlMs });
    }
    decodePolyline(encoded) {
        const points = [];
        let index = 0;
        let lat = 0;
        let lng = 0;
        while (index < encoded.length) {
            let result = 0;
            let shift = 0;
            let b = 0;
            do {
                b = (encoded.codePointAt(index++) ?? 63) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20 && index < encoded.length);
            const deltaLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += deltaLat;
            result = 0;
            shift = 0;
            do {
                b = (encoded.codePointAt(index++) ?? 63) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20 && index < encoded.length);
            const deltaLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += deltaLng;
            points.push({ lat: lat / 1e5, lng: lng / 1e5 });
        }
        return points;
    }
};
exports.GeocodingService = GeocodingService;
exports.GeocodingService = GeocodingService = GeocodingService_1 = __decorate([
    (0, common_1.Injectable)()
], GeocodingService);
//# sourceMappingURL=geocoding.service.js.map