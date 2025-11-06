
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import citiesData from "./cities.json"; // JSON: { city, state, latitude, longitude }

const MapZoom = ({ coords, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, zoom);
  }, [coords, zoom, map]);
  return null;
};

const AdminServices = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [zoomCoords, setZoomCoords] = useState([20.5937, 78.9629]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapType, setMapType] = useState("satellite");
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  // Load uploaded image for a city from localStorage
  useEffect(() => {
    if (selectedCity) {
      const storedImages = JSON.parse(localStorage.getItem("cityImages")) || {};
      if (storedImages[selectedCity.city]) {
        setUploadedImage(storedImages[selectedCity.city]);
      } else {
        setUploadedImage(null);
      }
    }
  }, [selectedCity]);

  // Filter cities when state changes
  useEffect(() => {
    if (selectedState) {
      const citiesInState = citiesData.filter((c) => c.state === selectedState);
      setCityOptions(citiesInState);
      setSelectedCity(null);
    } else {
      setCityOptions([]);
      setSelectedCity(null);
    }
  }, [selectedState]);

  // Zoom to selected city
  useEffect(() => {
    if (selectedCity) {
      setZoomCoords([selectedCity.latitude, selectedCity.longitude]);
      setZoomLevel(10);
    }
  }, [selectedCity]);

  const states = [...new Set(citiesData.map((c) => c.state))].sort();

  const handleSubmit = () => {
    if (!selectedCity) {
      alert("Please select both state and city!");
      return;
    }
    // Save selected city in localStorage for user module
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));

    navigate("/amenities", {
      state: { city: selectedCity.city, state: selectedCity.state },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && selectedCity) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result;
        setUploadedImage(imgData);

        // Save image in localStorage keyed by city
        const storedImages = JSON.parse(localStorage.getItem("cityImages")) || {};
        storedImages[selectedCity.city] = imgData;
        localStorage.setItem("cityImages", JSON.stringify(storedImages));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "#4a148c" }}>Admin Services — Select State / City</h1>

      <div style={{ marginBottom: "20px" }}>
        {/* State & City dropdowns */}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="">Select State / UT</option>
          {states.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>

        <select
          value={selectedCity?.city || ""}
          onChange={(e) =>
            setSelectedCity(cityOptions.find((c) => c.city === e.target.value))
          }
          disabled={!selectedState}
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="">{selectedState ? "Select City" : "Select State first"}</option>
          {cityOptions.map((c) => (
            <option key={c.city} value={c.city}>{c.city}</option>
          ))}
        </select>

        {/* Upload Image */}
        {selectedCity && (
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginRight: "10px" }} />
        )}

        <button
          onClick={handleSubmit}
          style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#7c3aed", color: "white", fontWeight: 600, cursor: "pointer" }}
        >
          Go
        </button>
      </div>

      {/* Map */}
      <div style={{ position: "relative" }} className="map-wrapper">
        <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1000, display: "flex", gap: "8px" }}>
          <button onClick={() => setMapType("satellite")} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid gray", backgroundColor: mapType === "satellite" ? "#7c3aed" : "white", color: mapType === "satellite" ? "white" : "black", cursor: "pointer" }}>🛰️ Satellite</button>
          <button onClick={() => setMapType("normal")} style={{ padding: "6px 12px", borderRadius: "4px", border: "1px solid gray", backgroundColor: mapType === "normal" ? "#7c3aed" : "white", color: mapType === "normal" ? "white" : "black", cursor: "pointer" }}>🗺️ Normal</button>
        </div>

        <MapContainer center={zoomCoords} zoom={zoomLevel} style={{ height: "500px", width: "100%" }}>
          {mapType === "normal" ? (
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          ) : (
            <>
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>' />
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" attribution='Labels &copy; <a href="https://www.esri.com/">Esri</a>' />
            </>
          )}
          <MapZoom coords={zoomCoords} zoom={zoomLevel} />
          {selectedCity && <Marker position={[selectedCity.latitude, selectedCity.longitude]}><Popup>{selectedCity.city}</Popup></Marker>}
        </MapContainer>
      </div>

      {/* City Info + Uploaded Image */}
      {selectedCity && (
        <div className="city-card">
          <div className="city-info-container">
            {uploadedImage && <img src={uploadedImage} alt={selectedCity.city} className="city-image" />}
            <div className="city-details">
              <h2 className="city-title">{selectedCity.city}</h2>
              <p className="city-state">State: {selectedCity.state}</p>
              <p className="city-coordinates">Coordinates: {selectedCity.latitude}, {selectedCity.longitude}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .map-wrapper {
          max-width: 1000px;
          margin: 20px auto;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          border: 2px solid #7c3aed;
          background: #fff;
        }
        .city-card {
          margin-top: 30px;
          display: flex;
          justify-content: center;
        }
        .city-info-container {
          display: flex;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
          background: #eedef4ff;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .city-image {
          width: 600px;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .city-details {
          text-align: left;
          max-width: 1000px;
        }
        .city-title {
          font-size: 1.8rem;
          color: #4a148c;
          margin-bottom: 10px;
        }
        .city-state, .city-coordinates {
          font-size: 1.1rem;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default AdminServices;