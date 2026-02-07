import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {
  FIT_PADDING,
  FIT_TIMEOUT,
  HEADER_PAN_FACTOR,
  DEFAULT_ZOOM_DELTA
} from "../config/mapConstants";

export default function FitAndCenter({ bounds, headerHeight = 0, zoomDelta = DEFAULT_ZOOM_DELTA }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !bounds) return;
    // small timeout to ensure map has rendered and size is correct
    const id = setTimeout(() => {
      try {
        // fit bounds with general padding
        map.fitBounds(bounds, { padding: FIT_PADDING });
        if (headerHeight) {
          // pan the map up by a fraction of the header height so the bounds appear visually centered
          map.panBy([0, -headerHeight * HEADER_PAN_FACTOR]);
        }
        // optionally zoom in/out after fitting bounds
        if (typeof zoomDelta === 'number' && zoomDelta !== 0) {
          try {
            const newZoom = map.getZoom() + zoomDelta;
            map.setZoom(newZoom);
          } catch (e) {
            // ignore zoom errors
          }
        }
      } catch (e) {
        // swallow map errors during initial render
        console.warn("FitAndCenter error", e);
      }
    }, FIT_TIMEOUT);
    return () => clearTimeout(id);
  }, [map, bounds, headerHeight, zoomDelta]);
  return null;
}
