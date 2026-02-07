import { describe, it, expect } from 'vitest';
import { computeBoundsAndCenter } from './map';

describe('computeBoundsAndCenter', () => {
  it('returns fallback when puntos is empty', () => {
    const { limitesZona, center } = computeBoundsAndCenter([]);
    expect(limitesZona).toBeNull();
    expect(center).toBeNull();
  });

  it('computes bounds for a single point with padding', () => {
    const puntos = [{ lat: -34.6282, lng: -58.4177 }];
  const { limitesZona, center } = computeBoundsAndCenter(puntos, { padFactor: 0.2, minPad: 0.001 });
    const [sw, ne] = limitesZona;
    expect(sw[0]).toBeLessThanOrEqual(center[0]);
    expect(ne[0]).toBeGreaterThanOrEqual(center[0]);
    expect(sw[1]).toBeLessThanOrEqual(center[1]);
    expect(ne[1]).toBeGreaterThanOrEqual(center[1]);
    // The point should be inside the bounds
    expect(puntos[0].lat).toBeGreaterThanOrEqual(sw[0]);
    expect(puntos[0].lat).toBeLessThanOrEqual(ne[0]);
    expect(puntos[0].lng).toBeGreaterThanOrEqual(sw[1]);
    expect(puntos[0].lng).toBeLessThanOrEqual(ne[1]);
  });

  it('computes bounds for multiple points', () => {
    const puntos = [
      { lat: -34.6282, lng: -58.4177 },
      { lat: -34.6308, lng: -58.4256 }
    ];
  const { limitesZona, center } = computeBoundsAndCenter(puntos, { padFactor: 0.1, minPad: 0.0005 });
    const [sw, ne] = limitesZona;
    // center should be midpoint
    expect(center[0]).toBeGreaterThanOrEqual(sw[0]);
    expect(center[0]).toBeLessThanOrEqual(ne[0]);
    expect(center[1]).toBeGreaterThanOrEqual(sw[1]);
    expect(center[1]).toBeLessThanOrEqual(ne[1]);
    // both points inside
    puntos.forEach(p => {
      expect(p.lat).toBeGreaterThanOrEqual(sw[0]);
      expect(p.lat).toBeLessThanOrEqual(ne[0]);
      expect(p.lng).toBeGreaterThanOrEqual(sw[1]);
      expect(p.lng).toBeLessThanOrEqual(ne[1]);
    });
  });
});
