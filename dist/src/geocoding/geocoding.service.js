"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeocodingService = void 0;
const common_1 = require("@nestjs/common");
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const PHOTON_URL = 'https://photon.komoot.io/api/';
const DAKAR_LAT = 14.716677;
const DAKAR_LON = -17.467686;
let GeocodingService = class GeocodingService {
    async geocode(address) {
        const trimmed = (address ?? '').trim();
        if (trimmed.length < 3) {
            throw new common_1.BadRequestException('Adresse trop courte (min. 3 caractères)');
        }
        const countrycodesList = ['fr,be,ch,sn', ''];
        for (let i = 0; i < countrycodesList.length; i++) {
            if (i > 0)
                await new Promise((r) => setTimeout(r, 1100));
            const countrycodes = countrycodesList[i];
            const params = new URLSearchParams({
                q: trimmed,
                format: 'json',
                limit: '1',
                ...(countrycodes ? { countrycodes } : {}),
            });
            const url = `${NOMINATIM_URL}?${params.toString()}`;
            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'MilleServices/1.0 (contact@milleservices.fr)',
                    Accept: 'application/json',
                },
            });
            if (!res.ok)
                continue;
            const data = (await res.json());
            const first = data?.[0];
            if (!first?.lat || !first?.lon)
                continue;
            const lat = parseFloat(first.lat);
            const lng = parseFloat(first.lon);
            if (Number.isNaN(lat) || Number.isNaN(lng))
                continue;
            return { lat, lng };
        }
        return null;
    }
    async geocodeWithFallbacks(address, suffixes = [', Dakar, Sénégal', ', Sénégal']) {
        let result = await this.geocode(address);
        if (result)
            return result;
        for (const suffix of suffixes) {
            await new Promise((r) => setTimeout(r, 1100));
            result = await this.geocode(`${address.trim()}${suffix}`);
            if (result)
                return result;
        }
        const lower = address.toLowerCase();
        if (lower.includes('sacre') && lower.includes('coeur')) {
            await new Promise((r) => setTimeout(r, 1100));
            result = await this.geocode('Sacré-Cœur, Dakar, Sénégal');
        }
        return result;
    }
    async autocomplete(query) {
        const trimmed = (query ?? '').trim();
        if (trimmed.length < 2)
            return [];
        const params = new URLSearchParams({
            q: trimmed,
            limit: '8',
            lang: 'fr',
            lat: DAKAR_LAT.toString(),
            lon: DAKAR_LON.toString(),
        });
        const url = `${PHOTON_URL}?${params.toString()}`;
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'MilleServices/1.0 (contact@milleservices.fr)',
                Accept: 'application/json',
            },
        });
        if (!res.ok)
            return [];
        const data = (await res.json());
        const features = data?.features ?? [];
        const suggestions = [];
        for (const f of features) {
            const props = f.properties ?? {};
            const coords = f.geometry?.coordinates;
            if (!coords || coords.length < 2)
                continue;
            const parts = [];
            if (props.street)
                parts.push([props.housenumber, props.street].filter(Boolean).join(' '));
            else if (props.name)
                parts.push(props.name);
            if (props.postcode)
                parts.push(props.postcode);
            if (props.city && props.city !== props.name)
                parts.push(props.city);
            if (props.country)
                parts.push(props.country);
            const displayName = parts.length > 0 ? parts.join(', ') : 'Adresse';
            suggestions.push({
                displayName,
                lat: coords[1],
                lng: coords[0],
            });
        }
        return suggestions;
    }
};
exports.GeocodingService = GeocodingService;
exports.GeocodingService = GeocodingService = __decorate([
    (0, common_1.Injectable)()
], GeocodingService);
//# sourceMappingURL=geocoding.service.js.map