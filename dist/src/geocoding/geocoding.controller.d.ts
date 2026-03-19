import { GeocodingService } from './geocoding.service.js';
export declare class GeocodingController {
    private readonly geocodingService;
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
}
