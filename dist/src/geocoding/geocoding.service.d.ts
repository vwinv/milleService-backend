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
export declare class GeocodingService {
    private readonly geocodeCache;
    private readonly autocompleteCache;
    private readonly placeDetailsCache;
    private readonly routeCache;
    private static readonly GEOCODE_TTL_MS;
    private static readonly AUTOCOMPLETE_TTL_MS;
    private static readonly PLACE_DETAILS_TTL_MS;
    private static readonly ROUTE_TTL_MS;
    private get apiKey();
    private get hasApiKey();
    geocode(address: string): Promise<{
        lat: number;
        lng: number;
    } | null>;
    geocodeWithFallbacks(address: string, suffixes?: string[]): Promise<{
        lat: number;
        lng: number;
    } | null>;
    autocomplete(query: string): Promise<AutocompleteSuggestion[]>;
    placeDetails(placeId: string): Promise<{
        lat: number;
        lng: number;
    } | null>;
    computeRoute(fromLat: number, fromLng: number, toLat: number, toLng: number): Promise<RoutePoint[] | null>;
    private placeDetailsLatLng;
    private routeCacheKey;
    private getCache;
    private setCache;
    private decodePolyline;
}
