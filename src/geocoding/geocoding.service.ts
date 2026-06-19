import { Injectable, BadRequestException, Logger } from "@nestjs/common";

const GOOGLE_GEOCODING_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const GOOGLE_AUTOCOMPLETE_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const GOOGLE_PLACE_TEXT_SEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json";
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
    {
      expiresAt: number;
      value: { lat: number; lng: number; formattedAddress?: string } | null;
    }
  >();
  private readonly reverseGeocodeCache = new Map<
    string,
    { expiresAt: number; value: { formattedAddress: string } | null }
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
  async geocode(
    address: string,
  ): Promise<{ lat: number; lng: number; formattedAddress?: string } | null> {
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
      results?: Array<{
        formatted_address?: string;
        geometry?: { location?: { lat?: number; lng?: number } };
      }>;
    };
    if (data.status !== "OK") {
      this.setCache(this.geocodeCache, cacheKey, null, GeocodingService.GEOCODE_TTL_MS);
      return null;
    }
    const firstResult = data.results?.[0];
    const first = firstResult?.geometry?.location;
    if (!first || typeof first.lat !== "number" || typeof first.lng !== "number") {
      this.setCache(this.geocodeCache, cacheKey, null, GeocodingService.GEOCODE_TTL_MS);
      return null;
    }
    const formattedAddress = (firstResult?.formatted_address ?? "").trim();
    const out = {
      lat: first.lat,
      lng: first.lng,
      ...(formattedAddress ? { formattedAddress } : {}),
    };
    this.setCache(this.geocodeCache, cacheKey, out, GeocodingService.GEOCODE_TTL_MS);
    return out;
  }

  /**
   * Convertit des coordonnées en adresse lisible via Google Geocoding API.
   */
  async reverseGeocode(
    lat: number,
    lng: number,
  ): Promise<{ formattedAddress: string } | null> {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (!this.hasApiKey) return null;

    const cacheKey = `rev:${lat.toFixed(5)},${lng.toFixed(5)}`;
    const cached = this.getCache(this.reverseGeocodeCache, cacheKey);
    if (cached !== undefined) return cached;

    const params = new URLSearchParams({
      latlng: `${lat},${lng}`,
      key: this.apiKey,
      language: "fr",
      region: "sn",
    });
    const url = `${GOOGLE_GEOCODING_URL}?${params.toString()}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      this.setCache(
        this.reverseGeocodeCache,
        cacheKey,
        null,
        GeocodingService.GEOCODE_TTL_MS,
      );
      return null;
    }

    const data = (await res.json()) as {
      status?: string;
      results?: Array<{ formatted_address?: string }>;
    };
    if (data.status !== "OK") {
      this.setCache(
        this.reverseGeocodeCache,
        cacheKey,
        null,
        GeocodingService.GEOCODE_TTL_MS,
      );
      return null;
    }

    const formattedAddress = (data.results?.[0]?.formatted_address ?? "").trim();
    if (!formattedAddress) {
      this.setCache(
        this.reverseGeocodeCache,
        cacheKey,
        null,
        GeocodingService.GEOCODE_TTL_MS,
      );
      return null;
    }

    const out = { formattedAddress };
    this.setCache(
      this.reverseGeocodeCache,
      cacheKey,
      out,
      GeocodingService.GEOCODE_TTL_MS,
    );
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

  /** Centre Dakar — biais par défaut si le client n'envoie pas de position. */
  private static readonly DEFAULT_BIAS = { lat: 14.7167, lng: -17.4677 };
  private static readonly BIAS_RADIUS_M = 80_000;

  /**
   * Autocomplétion : Places Autocomplete → Text Search → Geocoding (quartiers / lieux-dits).
   */
  async autocomplete(
    query: string,
    bias?: { lat: number; lng: number },
  ): Promise<AutocompleteSuggestion[]> {
    const trimmed = (query ?? "").trim();
    if (trimmed.length < 2) return [];
    if (!this.hasApiKey) return [];

    const biasLat = bias?.lat ?? GeocodingService.DEFAULT_BIAS.lat;
    const biasLng = bias?.lng ?? GeocodingService.DEFAULT_BIAS.lng;
    const cacheKey = `${trimmed.toLowerCase()}|${biasLat.toFixed(3)},${biasLng.toFixed(3)}`;
    const cached = this.getCache(this.autocompleteCache, cacheKey);
    if (cached !== undefined) return cached;

    let out = await this.placesAutocompletePredictions(
      trimmed,
      biasLat,
      biasLng,
    );
    if (out.length === 0) {
      out = await this.placesTextSearchSuggestions(trimmed);
    }
    if (out.length === 0) {
      out = await this.geocodeSearchSuggestions(trimmed);
    }

    this.setCache(
      this.autocompleteCache,
      cacheKey,
      out,
      GeocodingService.AUTOCOMPLETE_TTL_MS,
    );
    return out;
  }

  private async placesAutocompletePredictions(
    input: string,
    biasLat: number,
    biasLng: number,
  ): Promise<AutocompleteSuggestion[]> {
    const params = new URLSearchParams({
      input,
      key: this.apiKey,
      language: "fr",
      components: "country:sn",
      location: `${biasLat},${biasLng}`,
      radius: String(GeocodingService.BIAS_RADIUS_M),
    });
    const url = `${GOOGLE_AUTOCOMPLETE_URL}?${params.toString()}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      status?: string;
      predictions?: Array<{ description?: string; place_id?: string }>;
    };
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      this.logger.warn(
        `Places autocomplete status=${data.status ?? "unknown"} input="${input.slice(0, 48)}"`,
      );
      return [];
    }

    return (data.predictions ?? [])
      .slice(0, 8)
      .map((p): AutocompleteSuggestion | null => {
        const displayName = (p.description ?? "").trim();
        const placeId = (p.place_id ?? "").trim();
        if (!displayName || !placeId) return null;
        return { displayName, placeId };
      })
      .filter((x): x is AutocompleteSuggestion => x !== null);
  }

  /** Recherche textuelle (meilleure pour quartiers : Liberté, Sacré-Cœur, etc.). */
  private async placesTextSearchSuggestions(
    query: string,
  ): Promise<AutocompleteSuggestion[]> {
    const attempts = [
      `${query}, Dakar, Sénégal`,
      `${query}, Sénégal`,
      query,
    ];
    const seen = new Set<string>();
    const out: AutocompleteSuggestion[] = [];

    for (const attempt of attempts) {
      const params = new URLSearchParams({
        query: attempt,
        key: this.apiKey,
        language: "fr",
        region: "sn",
      });
      const url = `${GOOGLE_PLACE_TEXT_SEARCH_URL}?${params.toString()}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) continue;

      const data = (await res.json()) as {
        status?: string;
        results?: Array<{
          formatted_address?: string;
          name?: string;
          place_id?: string;
          geometry?: { location?: { lat?: number; lng?: number } };
        }>;
      };
      if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
        this.logger.warn(
          `Places text search status=${data.status ?? "unknown"} query="${attempt.slice(0, 48)}"`,
        );
        continue;
      }

      for (const r of data.results ?? []) {
        const placeId = (r.place_id ?? "").trim();
        const name = (r.name ?? "").trim();
        const formatted = (r.formatted_address ?? "").trim();
        const displayName = formatted || name;
        const lat = r.geometry?.location?.lat;
        const lng = r.geometry?.location?.lng;
        if (!displayName || !placeId || seen.has(placeId)) continue;
        seen.add(placeId);
        out.push({
          displayName,
          placeId,
          lat: typeof lat === "number" ? lat : undefined,
          lng: typeof lng === "number" ? lng : undefined,
        });
        if (out.length >= 8) return out;
      }
      if (out.length > 0) return out;
    }
    return out;
  }

  /** Repli Geocoding API (plusieurs variantes avec Dakar / Sénégal). */
  private async geocodeSearchSuggestions(
    query: string,
  ): Promise<AutocompleteSuggestion[]> {
    const attempts = [
      `${query}, Dakar, Sénégal`,
      `${query}, Sénégal`,
      query,
    ];
    const seen = new Set<string>();
    const out: AutocompleteSuggestion[] = [];

    for (const attempt of attempts) {
      const batch = await this.fetchGeocodeApiSuggestions(attempt);
      for (const item of batch) {
        if (seen.has(item.placeId)) continue;
        seen.add(item.placeId);
        out.push(item);
        if (out.length >= 8) return out;
      }
      if (out.length > 0) return out;
    }
    return out;
  }

  private async fetchGeocodeApiSuggestions(
    address: string,
  ): Promise<AutocompleteSuggestion[]> {
    const params = new URLSearchParams({
      address,
      key: this.apiKey,
      language: "fr",
      region: "sn",
      components: "country:sn",
    });
    const url = `${GOOGLE_GEOCODING_URL}?${params.toString()}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];

    const data = (await res.json()) as {
      status?: string;
      results?: Array<{
        formatted_address?: string;
        place_id?: string;
        geometry?: { location?: { lat?: number; lng?: number } };
      }>;
    };
    if (data.status !== "OK") return [];

    return (data.results ?? [])
      .slice(0, 5)
      .map((r): AutocompleteSuggestion | null => {
        const displayName = (r.formatted_address ?? "").trim();
        const placeId = (r.place_id ?? "").trim();
        const lat = r.geometry?.location?.lat;
        const lng = r.geometry?.location?.lng;
        if (!displayName || !placeId) return null;
        return {
          displayName,
          placeId,
          lat: typeof lat === "number" ? lat : undefined,
          lng: typeof lng === "number" ? lng : undefined,
        };
      })
      .filter((x): x is AutocompleteSuggestion => x !== null);
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
