import { Injectable, BadRequestException, Logger } from "@nestjs/common";

const GOOGLE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const GOOGLE_AUTOCOMPLETE_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const GOOGLE_PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";
const GOOGLE_ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

export interface AutocompleteSuggestion {
  displayName: string;
  placeId: string;
  lat?: number;
  lng?: number;
}

export interface RoutePoint {
  lat: number;
  lng: number;
}

@Injectable()
export class GeocodingService {
  private readonly logger = new Logger(GeocodingService.name);

  private readonly geocodeCache = new Map<
    string,
    { expiresAt: number; value: { lat: number; lng: number } | null }
  >();
  private readonly autocompleteCache = new Map<
    string,
    { expiresAt: number; value: AutocompleteSuggestion[] }
  >();
  private readonly placeDetailsCache = new Map<
    string,
    { expiresAt: number; value: { lat: number; lng: number } | null }
  >();
  private readonly routeCache = new Map<
    string,
    { expiresAt: number; value: RoutePoint[] | null }
  >();

  private static readonly GEOCODE_TTL_MS = 30 * 60 * 1000;
  private static readonly AUTOCOMPLETE_TTL_MS = 2 * 60 * 1000;
  private static readonly PLACE_DETAILS_TTL_MS = 30 * 60 * 1000;
  private static readonly ROUTE_TTL_MS = 60 * 1000;

  private get apiKey(): string {
    return (process.env.GOOGLE_MAPS_API_KEY ?? "").trim();
  }

  private get hasApiKey(): boolean {
    return this.apiKey.length > 0;
  }

  /**
   * Convertit une adresse en coordonnées (lat, lng) via Google Geocoding API.
   */
  async geocode(address: string): Promise<{ lat: number; lng: number } | null> {
    const trimmed = (address ?? "").trim();
    if (trimmed.length < 3) {
      throw new BadRequestException("Adresse trop courte (min. 3 caractères)");
    }
    if (!this.hasApiKey) return null;
    const cacheKey = trimmed.toLowerCase();
    const cached = this.getCache(this.geocodeCache, cacheKey);
    if (cached !== undefined) return cached;

    const params = new URLSearchParams({
      address: trimmed,
      key: this.apiKey,
      language: "fr",
      region: "sn",
    });
    const url = `${GOOGLE_GEOCODING_URL}?${params.toString()}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      this.setCache(this.geocodeCache, cacheKey, null, GeocodingService.GEOCODE_TTL_MS);
      return null;
    }

    const data = (await res.json()) as {
      status?: string;
      results?: Array<{ geometry?: { location?: { lat?: number; lng?: number } } }>;
    };
    if (data.status !== "OK") {
      this.setCache(this.geocodeCache, cacheKey, null, GeocodingService.GEOCODE_TTL_MS);
      return null;
    }
    const first = data.results?.[0]?.geometry?.location;
    if (!first || typeof first.lat !== "number" || typeof first.lng !== "number") {
      this.setCache(this.geocodeCache, cacheKey, null, GeocodingService.GEOCODE_TTL_MS);
      return null;
    }
    const out = { lat: first.lat, lng: first.lng };
    this.setCache(this.geocodeCache, cacheKey, out, GeocodingService.GEOCODE_TTL_MS);
    return out;
  }

  async geocodeWithFallbacks(
    address: string,
    suffixes: string[] = [", Dakar, Sénégal", ", Sénégal"],
  ): Promise<{ lat: number; lng: number } | null> {
    let result = await this.geocode(address);
    if (result) return result;
    for (const suffix of suffixes) {
      result = await this.geocode(`${address.trim()}${suffix}`);
      if (result) return result;
    }
    return null;
  }

  /**
   * Autocomplétion d'adresse via Google Places Autocomplete.
   * Pour garder la compatibilité front, on renseigne lat/lng via Place Details.
   */
  async autocomplete(query: string): Promise<AutocompleteSuggestion[]> {
    const trimmed = (query ?? "").trim();
    if (trimmed.length < 2) return [];
    if (!this.hasApiKey) return [];
    const cacheKey = trimmed.toLowerCase();
    const cached = this.getCache(this.autocompleteCache, cacheKey);
    if (cached !== undefined) return cached;

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
      this.setCache(
        this.autocompleteCache,
        cacheKey,
        [],
        GeocodingService.AUTOCOMPLETE_TTL_MS,
      );
      return [];
    }

    const data = (await res.json()) as {
      status?: string;
      predictions?: Array<{ description?: string; place_id?: string }>;
    };
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      this.setCache(
        this.autocompleteCache,
        cacheKey,
        [],
        GeocodingService.AUTOCOMPLETE_TTL_MS,
      );
      return [];
    }
    const predictions = data.predictions ?? [];
    const top = predictions.slice(0, 8);
    const out = top
      .map((p): AutocompleteSuggestion | null => {
        const displayName = (p.description ?? "").trim();
        const placeId = (p.place_id ?? "").trim();
        if (!displayName || !placeId) return null;
        return { displayName, placeId };
      })
      .filter((x): x is AutocompleteSuggestion => x !== null);
    this.setCache(
      this.autocompleteCache,
      cacheKey,
      out,
      GeocodingService.AUTOCOMPLETE_TTL_MS,
    );
    return out;
  }

  async placeDetails(placeId: string): Promise<{ lat: number; lng: number } | null> {
    const id = (placeId ?? "").trim();
    if (!id || !this.hasApiKey) return null;
    return this.placeDetailsLatLng(id);
  }

  async computeRoute(
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number,
  ): Promise<RoutePoint[] | null> {
    if (!this.hasApiKey) {
      this.logger.error("computeRoute: GOOGLE_MAPS_API_KEY is missing");
      return null;
    }
    const routeKey = this.routeCacheKey(fromLat, fromLng, toLat, toLng);
    const cached = this.getCache(this.routeCache, routeKey);
    if (cached !== undefined) {
      this.logger.log(
        `computeRoute cache hit key=${routeKey} points=${cached?.length ?? 0}`,
      );
      return cached;
    }
    this.logger.log(
      `computeRoute start key=${routeKey} from=${fromLat},${fromLng} to=${toLat},${toLng}`,
    );
    const body = {
      origin: { location: { latLng: { latitude: fromLat, longitude: fromLng } } },
      destination: { location: { latLng: { latitude: toLat, longitude: toLng } } },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      polylineQuality: "OVERVIEW",
    };

    try {
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

      this.logger.log(`computeRoute Google status=${res.status} key=${routeKey}`);

      if (!res.ok) {
        const errorBody = await res.text();
        this.logger.error(
          `computeRoute Google error status=${res.status} key=${routeKey} body=${errorBody}`,
        );
        this.setCache(this.routeCache, routeKey, null, GeocodingService.ROUTE_TTL_MS);
        return null;
      }

      const data = (await res.json()) as {
        routes?: Array<{ polyline?: { encodedPolyline?: string } }>;
      };
      const encoded = data.routes?.[0]?.polyline?.encodedPolyline;
      if (!encoded) {
        this.logger.warn(`computeRoute missing encoded polyline key=${routeKey}`);
        this.setCache(this.routeCache, routeKey, null, GeocodingService.ROUTE_TTL_MS);
        return null;
      }

      const decoded = this.decodePolyline(encoded);
      const out = decoded.length >= 2 ? decoded : null;
      if (out == null) {
        this.logger.warn(
          `computeRoute decoded route has insufficient points count=${decoded.length} key=${routeKey}`,
        );
      } else {
        this.logger.log(`computeRoute success points=${out.length} key=${routeKey}`);
      }
      this.setCache(this.routeCache, routeKey, out, GeocodingService.ROUTE_TTL_MS);
      return out;
    } catch (error) {
      this.logger.error(
        `computeRoute exception key=${routeKey}: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : undefined,
      );
      this.setCache(this.routeCache, routeKey, null, GeocodingService.ROUTE_TTL_MS);
      return null;
    }
  }

  private async placeDetailsLatLng(
    placeId: string,
  ): Promise<{ lat: number; lng: number } | null> {
    const cached = this.getCache(this.placeDetailsCache, placeId);
    if (cached !== undefined) return cached;
    const params = new URLSearchParams({
      place_id: placeId,
      key: this.apiKey,
      fields: "geometry/location",
    });
    const url = `${GOOGLE_PLACE_DETAILS_URL}?${params.toString()}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      this.setCache(
        this.placeDetailsCache,
        placeId,
        null,
        GeocodingService.PLACE_DETAILS_TTL_MS,
      );
      return null;
    }
    const data = (await res.json()) as {
      status?: string;
      result?: { geometry?: { location?: { lat?: number; lng?: number } } };
    };
    if (data.status !== "OK") {
      this.setCache(
        this.placeDetailsCache,
        placeId,
        null,
        GeocodingService.PLACE_DETAILS_TTL_MS,
      );
      return null;
    }
    const loc = data.result?.geometry?.location;
    if (!loc || typeof loc.lat !== "number" || typeof loc.lng !== "number") {
      this.setCache(
        this.placeDetailsCache,
        placeId,
        null,
        GeocodingService.PLACE_DETAILS_TTL_MS,
      );
      return null;
    }
    const out = { lat: loc.lat, lng: loc.lng };
    this.setCache(
      this.placeDetailsCache,
      placeId,
      out,
      GeocodingService.PLACE_DETAILS_TTL_MS,
    );
    return out;
  }

  private routeCacheKey(fromLat: number, fromLng: number, toLat: number, toLng: number): string {
    const round = (n: number) => n.toFixed(4);
    return `${round(fromLat)},${round(fromLng)};${round(toLat)},${round(toLng)}`;
  }

  private getCache<T>(
    cache: Map<string, { expiresAt: number; value: T }>,
    key: string,
  ): T | undefined {
    const hit = cache.get(key);
    if (!hit) return undefined;
    if (Date.now() > hit.expiresAt) {
      cache.delete(key);
      return undefined;
    }
    return hit.value;
  }

  private setCache<T>(
    cache: Map<string, { expiresAt: number; value: T }>,
    key: string,
    value: T,
    ttlMs: number,
  ): void {
    cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  private decodePolyline(encoded: string): RoutePoint[] {
    const points: RoutePoint[] = [];
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
}
