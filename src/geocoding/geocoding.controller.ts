import { Controller, Get, Logger, Query } from "@nestjs/common";
import { GeocodingService } from "./geocoding.service.js";

@Controller("geocoding")
export class GeocodingController {
  private readonly logger = new Logger(GeocodingController.name);

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
    this.logger.log(
      `GET /geocoding/route fromLat=${fromLat} fromLng=${fromLng} toLat=${toLat} toLng=${toLng}`,
    );
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
      this.logger.warn("Invalid route coordinates received, returning empty route");
      return [];
    }
    const points = await this.geocodingService.computeRoute(aLat, aLng, bLat, bLng);
    this.logger.log(
      `Route response points=${points?.length ?? 0} for ${aLat},${aLng} -> ${bLat},${bLng}`,
    );
    return points ?? [];
  }
}
