import { Controller, Get, Query } from "@nestjs/common";
import { GeocodingService } from "./geocoding.service.js";

@Controller("geocoding")
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get()
  async geocode(@Query("address") address: string | undefined) {
    const q = (address ?? "").trim();
    if (q.length < 3) {
      return { lat: null, lng: null, found: false };
    }
    const result = await this.geocodingService.geocode(q);
    if (result) return { ...result, found: true };
    return { lat: null, lng: null, found: false };
  }

  @Get("autocomplete")
  async autocomplete(@Query("q") q: string | undefined) {
    const query = (q ?? "").trim();
    if (query.length < 2) return [];
    return this.geocodingService.autocomplete(query);
  }

  @Get("place-details")
  async placeDetails(@Query("placeId") placeId: string | undefined) {
    const id = (placeId ?? "").trim();
    if (!id) return { lat: null, lng: null, found: false };
    const result = await this.geocodingService.placeDetails(id);
    if (!result) return { lat: null, lng: null, found: false };
    return { ...result, found: true };
  }

  @Get("route")
  async route(
    @Query("fromLat") fromLat: string | undefined,
    @Query("fromLng") fromLng: string | undefined,
    @Query("toLat") toLat: string | undefined,
    @Query("toLng") toLng: string | undefined,
  ) {
    const aLat = Number(fromLat);
    const aLng = Number(fromLng);
    const bLat = Number(toLat);
    const bLng = Number(toLng);
    if (
      !Number.isFinite(aLat) ||
      !Number.isFinite(aLng) ||
      !Number.isFinite(bLat) ||
      !Number.isFinite(bLng)
    ) {
      return [];
    }
    const points = await this.geocodingService.computeRoute(aLat, aLng, bLat, bLng);
    return points ?? [];
  }
}
