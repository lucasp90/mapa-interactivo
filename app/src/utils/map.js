// Helper utilities for map bounds and center calculation

/**
 * Compute bounding box and center from puntos.
 * Returns { limitesZona: [[swLat, swLng], [neLat, neLng]], center: [lat, lng] }
 * If puntos is empty or invalid returns { limitesZona: null, center: null }.
 */
import { DEFAULT_PAD_FACTOR, DEFAULT_MIN_PAD } from "../config/mapConstants";

export function computeBoundsAndCenter(puntos, options = {}) {
  const padFactor = options.padFactor ?? DEFAULT_PAD_FACTOR; // 20% padding
  const minPad = options.minPad ?? DEFAULT_MIN_PAD; // minimum padding in degrees (~300m)

  if (!puntos || puntos.length === 0) {
    return { limitesZona: null, center: null };
  }

  const lats = puntos.map(p => parseFloat(p.lat)).filter(n => !Number.isNaN(n));
  const lngs = puntos.map(p => parseFloat(p.lng)).filter(n => !Number.isNaN(n));
  if (!lats.length || !lngs.length) return { limitesZona: null, center: null };

  const maxLat = Math.max(...lats);
  const minLat = Math.min(...lats);
  const maxLng = Math.max(...lngs);
  const minLng = Math.min(...lngs);

  const spanLat = Math.max(0.0001, maxLat - minLat);
  const spanLng = Math.max(0.0001, maxLng - minLng);
  const padLat = Math.max(minPad, spanLat * padFactor);
  const padLng = Math.max(minPad, spanLng * padFactor);

  const sw = [minLat - padLat, minLng - padLng];
  const ne = [maxLat + padLat, maxLng + padLng];
  const centerLat = (sw[0] + ne[0]) / 2;
  const centerLng = (sw[1] + ne[1]) / 2;

  return { limitesZona: [sw, ne], center: [centerLat, centerLng] };
}

export default computeBoundsAndCenter;
