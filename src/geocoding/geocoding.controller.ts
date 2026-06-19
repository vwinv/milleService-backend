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
    if (result) {
      return {
        lat: result.lat,
        lng: result.lng,
        formattedAddress: result.formattedAddress ?? null,
        found: true,
      };
    }
    return { lat: null, lng: null, formattedAddress: null, found: false };
  }

  @Get("autocomplete")
  async autocomplete(
    @Query("q") q: string | undefined,
    @Query("lat") lat: string | undefined,
    @Query("lng") lng: string | undefined,
  ) {
    const query = (q ?? "").trim();
    if (query.length < 2) return [];
    const biasLat = Number(lat);
    const biasLng = Number(lng);
    const bias =
      Number.isFinite(biasLat) && Number.isFinite(biasLng)
        ? { lat: biasLat, lng: biasLng }
        : undefined;
    return this.geocodingService.autocomplete(query, bias);
  }

  @Get("place-details")
  async placeDetails(@Query("placeId") placeId: string | undefined) {
    const id = (placeId ?? "").trim();
    if (!id) return { lat: null, lng: null, found: false };
    const result = await this.geocodingService.placeDetails(id);
    if (!result) return { lat: null, lng: null, found: false };
    return { ...result, found: true };
  }

  @Get("reverse")
  async reverse(
    @Query("lat") lat: string | undefined,
    @Query("lng") lng: string | undefined,
  ) {
    const aLat = Number(lat);
    const aLng = Number(lng);
    if (!Number.isFinite(aLat) || !Number.isFinite(aLng)) {
      return { formattedAddress: null, found: false };
    }
    const result = await this.geocodingService.reverseGeocode(aLat, aLng);
    if (!result) return { formattedAddress: null, found: false };
    return { formattedAddress: result.formattedAddress, found: true };
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
