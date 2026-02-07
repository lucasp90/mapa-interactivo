// Centralized constants for map behavior to avoid magic numbers
export const DEFAULT_ZOOM = 17; // slightly zoomed out by default
export const MIN_ZOOM = 15;

// Fit behavior
export const FIT_PADDING = [40, 40]; // pixels padding used when calling fitBounds
export const FIT_TIMEOUT = 150; // ms delay before fitting bounds to allow the map to render
export const HEADER_PAN_FACTOR = 0.5; // fraction of header height to pan after fit

// Bounds calculation defaults
export const DEFAULT_PAD_FACTOR = 0.2; // 20% padding on lat/lng span
export const DEFAULT_MIN_PAD = 0.003; // minimum degrees padding (~300m)

// Visual tuning
export const DEFAULT_HEADER_HEIGHT = 56; // px default header height used by the app
export const DEFAULT_ZOOM_DELTA = 0; // no extra zoom after fitting bounds
