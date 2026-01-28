import "leaflet/dist/leaflet.css";
import "./leafletFix"; // 👈 must be BEFORE App import

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
