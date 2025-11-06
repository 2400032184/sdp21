import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import citiesData from "./cities.json"; // { city, state, latitude, longitude }
import "leaflet/dist/leaflet.css";

const MapZoom = ({ coords, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, zoom);
  }, [coords, zoom, map]);
  return null;
};

const SelectCity = () => {
  const navigate = useNavigate();
  const cityCardRef = useRef(null);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [zoomCoords, setZoomCoords] = useState([20.5937, 78.9629]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapType, setMapType] = useState("satellite");
  const [cityImage, setCityImage] = useState(null);

  // Update cityOptions when state changes
  useEffect(() => {
    if (selectedState) {
      const citiesInState = citiesData.filter(c => c.state === selectedState);
      setCityOptions(citiesInState);
      setSelectedCity(null);
    } else {
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedState]);

  // When a city is selected
  useEffect(() => {
    if (selectedCity) {
      setZoomCoords([selectedCity.latitude, selectedCity.longitude]);
      setZoomLevel(10);

      // Load city image from localStorage
      const storedImages = JSON.parse(localStorage.getItem("cityImages")) || {};
      setCityImage(storedImages[selectedCity.city] || null);

      // Save searched city to localStorage for history
      const searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
      // Avoid duplicates
      const exists = searchedCities.some(c => c.city === selectedCity.city && c.state === selectedCity.state);
      if (!exists) {
        searchedCities.push(selectedCity);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
      }

      // Scroll to the bottom of the city card
      setTimeout(() => {
        if (cityCardRef.current) {
          const cardBottom = cityCardRef.current.getBoundingClientRect().bottom + window.scrollY;
          window.scrollTo({ top: cardBottom, behavior: "smooth" });
        }
      }, 100);
    }
  }, [selectedCity]);

  const states = [...new Set(citiesData.map(c => c.state))].sort();

  const goToServices = () => {
    if (!selectedCity) {
      alert("Please select a city!");
      return;
    }
    navigate("/Services", { state: { city: selectedCity.city } });
  };

  const goBackToDashboard = () => {
    navigate("/Dashboard");
  };

  return (
    <div className="select-city-container">
      <h1>Select a City</h1>

      {/* Dropdowns */}
      <div className="dropdowns">
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {states.map(st => <option key={st} value={st}>{st}</option>)}
        </select>

        <select
          value={selectedCity?.city || ""}
          onChange={e => setSelectedCity(cityOptions.find(c => c.city === e.target.value))}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cityOptions.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
        </select>
      </div>

      {/* Map */}
      <div className="map-wrapper">
        <div className="map-buttons">
          <button onClick={() => setMapType("satellite")} className={mapType === "satellite" ? "active" : ""}>🛰️ Satellite</button>
          <button onClick={() => setMapType("normal")} className={mapType === "normal" ? "active" : ""}>🗺️ Normal</button>
        </div>

        <MapContainer center={zoomCoords} zoom={zoomLevel} style={{ height: "500px", width: "100%" }}>
          {mapType === "normal" ? (
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          ) : (
            <>
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='Tiles &copy; Esri' />
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" attribution='Labels &copy; Esri' />
            </>
          )}
          <MapZoom coords={zoomCoords} zoom={zoomLevel} />
          {selectedCity && <Marker position={[selectedCity.latitude, selectedCity.longitude]}><Popup>{selectedCity.city}</Popup></Marker>}
        </MapContainer>
      </div>

      {/* City Card */}
      {selectedCity && (
        <div ref={cityCardRef} className="city-card">
          {cityImage && <img src={cityImage} alt={selectedCity.city} className="city-image" />}
          <div className="city-details">
            <h2>{selectedCity.city}</h2>
            <p>State: {selectedCity.state}</p>
            <p>Population: {selectedCity.population || "N/A"}</p>
            <p>Coordinates: {selectedCity.latitude}, {selectedCity.longitude}</p>
            <button onClick={goToServices} className="services-btn">Services available in this city</button>
          </div>
        </div>
      )}

      {/* Back to Dashboard */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={goBackToDashboard} className="back-btn">← Back to Dashboard</button>
      </div>

      {/* Styles */}
      <style>{`
        .select-city-container {
          padding: 30px 20px;
          text-align: center;
          min-height: 100vh;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);
        }
        .dropdowns select {
          padding: 8px 12px;
          margin: 0 10px;
          border-radius: 6px;
        }
        .map-wrapper {
          max-width: 1000px;
          margin: 20px auto;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          border: 2px solid #7c3aed;
          background: #fff;
          position: relative;
        }
        .map-buttons {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 8px;
          z-index: 1000;
        }
        .map-buttons button {
          padding: 6px 12px;
          border-radius: 4px;
          border: 1px solid gray;
          cursor: pointer;
          background: white;
        }
        .map-buttons .active {
          background-color: #7c3aed;
          color: white;
        }
        .city-card {
          background: #ffffff;
          margin: 20px auto;
          padding: 20px;
          border-radius: 20px;
          max-width: 900px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .city-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 15px;
        }
        .city-details h2 {
          font-size: 2rem;
          color: #7c3aed;
          margin-bottom: 10px;
        }
        .city-details p {
          font-size: 1rem;
          color: #555;
          margin: 4px 0;
        }
        .services-btn {
          margin-top: 15px;
          padding: 8px 16px;
          border-radius: 6px;
          background-color: #7c3aed;
          color: white;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }
        .back-btn {
          padding: 10px 18px;
          border-radius: 10px;
          background-color: #d6bcf5;
          border: none;
          color: #3a1f6e;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SelectCity;
