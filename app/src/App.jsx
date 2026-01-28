import L from "leaflet";

import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const puntos = [
  {
    nombre: "Esquina Histórica de Boedo",
    descripcion:
      "Este cruce de avenidas es uno de los corazones culturales del barrio de Boedo. Acá podés agregar información histórica, artística o relatos del lugar.",
    posicion: [-34.6309, -58.4157] // Av. San Juan & Av. Boedo
  }
];

// Norte: Castro Barros
// Sur: Virrey Liniers
// Oeste: Av. Independencia
// Este: Av. Juan de Garay
const limitesZona = [
  [-34.6225, -58.4205], // NW
  [-34.6395, -58.4055]  // SE
];

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={puntos[0].posicion}
        zoom={16}
        minZoom={15}
        maxBounds={limitesZona}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Zona marcada */}
        <Rectangle bounds={limitesZona} pathOptions={{ color: "red", weight: 1 }} />

        {/* POIs */}
        {puntos.map((p, i) => (
          <Marker key={i} position={p.posicion}>
            <Popup>
              <h3>{p.nombre}</h3>
              <p>{p.descripcion}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
