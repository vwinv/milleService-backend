import { Controller, Get, Query } from '@nestjs/common';
import { GeocodingService } from './geocoding.service.js';

@Controller('geocoding')
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get()
  async geocode(@Query('address') address: string | undefined) {
    const q = (address ?? '').trim();
    if (q.length < 3) {
      return { lat: null, lng: null, found: false };
    }
    const result = await this.geocodingService.geocode(q);
    if (result) return { ...result, found: true };
    return { lat: null, lng: null, found: false };
  }

  @Get('autocomplete')
  async autocomplete(@Query('q') q: string | undefined) {
    const query = (q ?? '').trim();
    if (query.length < 2) return [];
    return this.geocodingService.autocomplete(query);
  }
}
