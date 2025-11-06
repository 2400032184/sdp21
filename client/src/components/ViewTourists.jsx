import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewTourists = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, touristToEdit } = location.state || { city: "Selected City", touristToEdit: null };

  const [touristsList, setTouristsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(touristToEdit);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
    const cityTourists = storedTourists.filter(t => t.city === city);
    setTouristsList(cityTourists);
    setFilteredList(cityTourists);

    if (!touristToEdit && cityTourists.length > 0) setSelectedTourist(cityTourists[0]);
  }, [city, touristToEdit]);

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    if (type === "") setFilteredList(touristsList);
    else setFilteredList(touristsList.filter(t => t.type === type));
    setSelectedTourist(null);
  };

  const handleUpdateClick = () => {
    if (selectedTourist) {
      navigate("/tourists", { state: { city, touristToEdit: selectedTourist } });
    }
  };

  const types = [...new Set(touristsList.map(t => t.type))];

  return (
    <div className="view-tourists-page">
      <h1>Tourist Spots in {city}</h1>

      <select value={filterType} onChange={handleFilterChange} className="filter-dropdown">
        <option value="">All Types</option>
        {types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
      </select>

      {selectedTourist && (
        <button className="update-btn" onClick={handleUpdateClick}>
          Update Selected Entry
        </button>
      )}

      <div className="tourist-cards">
        {filteredList.length === 0 && <p>No tourist spots found.</p>}
        {filteredList.map((t) => (
          <div
            key={t.id}
            className={`tourist-card ${selectedTourist?.id === t.id ? "selected" : ""}`}
            onClick={() => setSelectedTourist(t)}
          >
            {t.image && <img src={t.image} alt={t.name} />}
            <div className="tourist-info">
              <h3>{t.name}</h3>
              <p>Type: {t.type}</p>
              <p>Address: {t.address}</p>
              <p>Contact: {t.contact}</p>
              <p>Timings: {t.timings}</p>
              <p>Rating: {t.rating || "N/A"}</p>
              <p>Status: {t.status}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <style>{`
        .view-tourists-page { 
          padding: 80px 20px; 
          text-align: center; 
          min-height: 90vh; 
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);; 
        }
        .view-tourists-page h1 { font-size: 3rem; margin-bottom: 20px; }

        .tourist-cards { 
          display: flex; 
          flex-wrap: wrap; 
          justify-content: center; 
          gap: 1cm; /* 1 cm gap between cards */
        }

        .tourist-card { 
          width: 300px; 
          border-radius: 12px; 
          background-color: #ffffff; /* pure white */
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); /* stronger shadow */
          padding: 15px; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          text-align: left; 
          gap: 10px; 
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease; 
        }

        .tourist-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 20px 60px rgba(0,0,0,0.35); /* stronger on hover */
        }

        .tourist-card img { 
          width: 100%; 
          height: 180px; 
          object-fit: cover; 
          border-radius: 10px; 
        }

        .tourist-info h3 { margin: 0 0 10px 0; }
        .tourist-info p { margin: 2px 0; }

        .back-btn { 
          margin-top: 30px; 
          padding: 10px 20px; 
          border: none; 
          border-radius: 8px; 
          background-color: #007bff; 
          color: #fff; 
          font-weight: bold; 
          cursor: pointer; 
        }

        .back-btn:hover { 
          background-color: #0056b3; 
        }
      `}</style>
    </div>
  );
};

export default ViewTourists;
