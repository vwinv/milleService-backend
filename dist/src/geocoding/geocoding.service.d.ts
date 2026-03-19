export interface AutocompleteSuggestion {
    displayName: string;
    lat: number;
    lng: number;
}
export declare class GeocodingService {
    geocode(address: string): Promise<{
        lat: number;
        lng: number;
    } | null>;
    geocodeWithFallbacks(address: string, suffixes?: string[]): Promise<{
        lat: number;
        lng: number;
    } | null>;
    autocomplete(query: string): Promise<AutocompleteSuggestion[]>;
}
