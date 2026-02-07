import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { computeBoundsAndCenter } from "./utils/map";
import FitAndCenter from "./components/FitAndCenter";
// Font Awesome React setup and component
import "./fontawesome";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DEFAULT_ZOOM, MIN_ZOOM, DEFAULT_HEADER_HEIGHT, DEFAULT_ZOOM_DELTA } from "./config/mapConstants";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// computeBoundsAndCenter moved to `./utils/map`

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [zona, setZona] = useState(null);

  useEffect(() => {
    fetch("/puntos.json")
      .then(res => res.json())
      .then(data => {
        // expect puntos.json to be an array of puntos
        setPuntos(Array.isArray(data) ? data : []);
        setZona(data.zona);
      })
      .catch(err => console.error("Error cargando puntos.json", err));
  }, []);

  // Compute bounds and center from puntos using the helper. We expect puntos to exist.
  const { limitesZona, center } = computeBoundsAndCenter(puntos);

  // FitAndCenter lives in ./components/FitAndCenter.jsx

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {center ? (
        <MapContainer
          center={center}
          zoom={DEFAULT_ZOOM}
          minZoom={MIN_ZOOM}
          maxBounds={limitesZona}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Rectangle bounds={limitesZona} pathOptions={{ color: "red", weight: 1 }} />

          {/* Fit bounds and account for top header overlay (if present) */}
          <FitAndCenter bounds={limitesZona} headerHeight={zona ? DEFAULT_HEADER_HEIGHT : 0} zoomDelta={DEFAULT_ZOOM_DELTA} />

          {puntos.map((p, i) => (
            <Marker
              key={p.id} position={[p.lat, p.lng]}
              icon={markerIcon}
            >
              <Popup>
                <h3>{p.title}</h3>
                <p>{p.address}</p>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0066cc", fontWeight: "bold", display: 'inline-flex', alignItems: 'center' }}
                  >
                    <FontAwesomeIcon icon={["fas", "globe"]} style={{ marginRight: 8 }} />
                    Leer más →
                  </a>
                )}
              </Popup>

            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div style={{ padding: 20 }}>Cargando puntos...</div>
      )}

      {/* Optional header */}
      {zona && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px",
            textAlign: "center",
            zIndex: 1000
          }}
        >
          {zona.nombre} — {zona.descripcion}
        </div>
      )}
    </div>
  );
}
