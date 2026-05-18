import { GeocodingService } from "./geocoding.service.js";
export declare class GeocodingController {
    private readonly geocodingService;
    private readonly logger;
    constructor(geocodingService: GeocodingService);
    geocode(address: string | undefined): Promise<{
        lat: null;
        lng: null;
        found: boolean;
    } | {
        found: boolean;
        lat: number;
        lng: number;
    }>;
    autocomplete(q: string | undefined): Promise<import("./geocoding.service.js").AutocompleteSuggestion[]>;
    placeDetails(placeId: string | undefined): Promise<{
        lat: null;
        lng: null;
        found: boolean;
    } | {
        found: boolean;
        lat: number;
        lng: number;
    }>;
    route(fromLat: string | undefined, fromLng: string | undefined, toLat: string | undefined, toLng: string | undefined): Promise<import("./geocoding.service.js").RoutePoint[]>;
}
