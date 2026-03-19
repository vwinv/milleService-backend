import { Injectable, BadRequestException } from '@nestjs/common';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const PHOTON_URL = 'https://photon.komoot.io/api/';

// Centre de Dakar pour « biaiser » les résultats Photon autour de cette zone.
const DAKAR_LAT = 14.716677;
const DAKAR_LON = -17.467686;

export interface AutocompleteSuggestion {
  displayName: string;
  lat: number;
  lng: number;
}

@Injectable()
export class GeocodingService {
  /**
   * Convertit une adresse en coordonnées (lat, lng) via Nominatim (OpenStreetMap).
   * API gratuite, sans clé requise.
   * Respecter : max 1 requête/seconde (policy Nominatim).
   */
  async geocode(address: string): Promise<{ lat: number; lng: number } | null> {
    const trimmed = (address ?? '').trim();
    if (trimmed.length < 3) {
      throw new BadRequestException('Adresse trop courte (min. 3 caractères)');
    }

    const countrycodesList = ['fr,be,ch,sn', '']; // D'abord pays cibles, puis sans restriction
    for (let i = 0; i < countrycodesList.length; i++) {
      if (i > 0) await new Promise((r) => setTimeout(r, 1100)); // Nominatim: max 1 req/s
      const countrycodes = countrycodesList[i];
      const params = new URLSearchParams({
        q: trimmed,
        format: 'json',
        limit: '1',
        ...(countrycodes ? { countrycodes } : {}),
      });

      const url = `${NOMINATIM_URL}?${params.toString()}`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'MilleServices/1.0 (contact@milleservices.fr)',
          Accept: 'application/json',
        },
      });

      if (!res.ok) continue;

      const data = (await res.json()) as Array<{ lat?: string; lon?: string }>;
      const first = data?.[0];
      if (!first?.lat || !first?.lon) continue;

      const lat = parseFloat(first.lat);
      const lng = parseFloat(first.lon);
      if (Number.isNaN(lat) || Number.isNaN(lng)) continue;

      return { lat, lng };
    }
    return null;
  }

  /**
   * Géocode une adresse en essayant plusieurs variantes (ex: adresse + ", Dakar, Sénégal").
   * Utile pour des adresses partielles comme "Sacre coeur 2, OBV".
   */
  async geocodeWithFallbacks(
    address: string,
    suffixes: string[] = [', Dakar, Sénégal', ', Sénégal'],
  ): Promise<{ lat: number; lng: number } | null> {
    let result = await this.geocode(address);
    if (result) return result;
    for (const suffix of suffixes) {
      await new Promise((r) => setTimeout(r, 1100)); // Nominatim: max 1 req/s
      result = await this.geocode(`${address.trim()}${suffix}`);
      if (result) return result;
    }
    // Fallback spécifique pour quartiers Dakar : "Sacre coeur 2, OBV" → "Sacré-Cœur, Dakar, Sénégal"
    const lower = address.toLowerCase();
    if (lower.includes('sacre') && lower.includes('coeur')) {
      await new Promise((r) => setTimeout(r, 1100));
      result = await this.geocode('Sacré-Cœur, Dakar, Sénégal');
    }
    return result;
  }

  /**
   * Autocomplétion d'adresse via Photon (Komoot) - gratuit, sans clé.
   */
  async autocomplete(query: string): Promise<AutocompleteSuggestion[]> {
    const trimmed = (query ?? '').trim();
    if (trimmed.length < 2) return [];

    const params = new URLSearchParams({
      q: trimmed,
      limit: '8',
      lang: 'fr',
      // On biaise systématiquement autour de Dakar pour obtenir
      // des rues et lieux locaux plus pertinents.
      lat: DAKAR_LAT.toString(),
      lon: DAKAR_LON.toString(),
    });

    const url = `${PHOTON_URL}?${params.toString()}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'MilleServices/1.0 (contact@milleservices.fr)',
        Accept: 'application/json',
      },
    });

    if (!res.ok) return [];

    const data = (await res.json()) as {
      features?: Array<{
        properties?: {
          name?: string;
          street?: string;
          housenumber?: string;
          postcode?: string;
          city?: string;
          country?: string;
        };
        geometry?: { coordinates?: [number, number] };
      }>;
    };

    const features = data?.features ?? [];
    const suggestions: AutocompleteSuggestion[] = [];

    for (const f of features) {
      const props = f.properties ?? {};
      const coords = f.geometry?.coordinates;
      if (!coords || coords.length < 2) continue;

      const parts: string[] = [];
      if (props.street) parts.push([props.housenumber, props.street].filter(Boolean).join(' '));
      else if (props.name) parts.push(props.name);
      if (props.postcode) parts.push(props.postcode);
      if (props.city && props.city !== props.name) parts.push(props.city);
      if (props.country) parts.push(props.country);
      const displayName = parts.length > 0 ? parts.join(', ') : 'Adresse';

      suggestions.push({
        displayName,
        lat: coords[1],
        lng: coords[0],
      });
    }

    return suggestions;
  }
}
