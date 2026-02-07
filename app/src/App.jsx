import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Zona fija (no editable por usuarios)
const limitesZona = [
  [-34.6225, -58.4205], // NW
  [-34.6395, -58.4055]  // SE
];

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [zona, setZona] = useState(null);

  useEffect(() => {
    fetch("/puntos.json")
      .then(res => res.json())
      .then(data => {
        setPuntos(data.puntos || []);
        setZona(data.zona || null);
      })
      .catch(err => console.error("Error cargando puntos.json", err));
  }, []);

  const centro = puntos.length
    ? [puntos[0].lat, puntos[0].lng]
    : [-34.6309, -58.4157];

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={centro}
        zoom={16}
        minZoom={15}
        maxBounds={limitesZona}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Rectangle bounds={limitesZona} pathOptions={{ color: "red", weight: 1 }} />

        {puntos.map((p, i) => (
          <Marker
            key={p.id} position={[p.lat, p.lng]}
            icon={markerIcon}
          >
<Popup>
  <h3>{p.nombre}</h3>
  <p>{p.descripcion}</p>

  {p.pagina && (
    <a
      href={p.pagina}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#0066cc", fontWeight: "bold" }}
    >
      Leer más →
    </a>
  )}
</Popup>

          </Marker>
        ))}
      </MapContainer>

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
