import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewHospitals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, hospitalToEdit } = location.state || { city: "Selected City", hospitalToEdit: null };

  const [hospitalsList, setHospitalsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(hospitalToEdit);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const cityHospitals = storedHospitals.filter(h => h.city === city);
    setHospitalsList(cityHospitals);
    setFilteredList(cityHospitals);

    if (!hospitalToEdit && cityHospitals.length > 0) {
      setSelectedHospital(cityHospitals[0]);
    }
  }, [city, hospitalToEdit]);

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    if (type === "") setFilteredList(hospitalsList);
    else setFilteredList(hospitalsList.filter(h => h.type === type));
    setSelectedHospital(null);
  };

  const handleUpdateClick = () => {
    if (selectedHospital) {
      navigate("/hospitals", { state: { city, hospitalToEdit: selectedHospital } });
    }
  };

  const types = [...new Set(hospitalsList.map(h => h.type))];

  return (
    <div className="view-hospitals-page">
      <h1>Public Services in {city}</h1>

      <select value={filterType} onChange={handleFilterChange} className="filter-dropdown">
        <option value="">All Types</option>
        {types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
      </select>

      {selectedHospital && (
        <button className="update-btn" onClick={handleUpdateClick}>
          Update Selected Entry
        </button>
      )}

      <div className="hospital-cards">
        {filteredList.length === 0 && <p>No hospitals found.</p>}
        {filteredList.map((h) => (
          <div
            key={h.id}
            className={`hospital-card ${selectedHospital?.id === h.id ? "selected" : ""}`}
            onClick={() => setSelectedHospital(h)}
          >
            {h.image && <img src={h.image} alt={h.name} />}
            <div className="hospital-info">
              <h3>{h.name}</h3>
              <p>Type: {h.type}</p>
              <p>Address: {h.address}</p>
              <p>Contact: {h.contact}</p>
              <p>Timings: {h.timings}</p>
              <p>Rating: {h.rating || "N/A"}</p>
              <p>Status: {h.status}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <style>{`
        .view-hospitals-page { 
          padding: 80px 20px; 
          text-align: center; 
          min-height: 90vh; 
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);; 
        }
        .view-hospitals-page h1 { font-size: 3rem; margin-bottom: 20px; }

        .hospital-cards { 
          display: flex; 
          flex-wrap: wrap; 
          justify-content: center; 
          gap: 1cm; /* 1 cm gap between cards */
        }

        .hospital-card { 
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
          transition: transform 0.2s ease; 
        }

        .hospital-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 20px 60px rgba(0,0,0,0.35); /* even stronger on hover */
        }

        .hospital-card img { 
          width: 100%; 
          height: 180px; 
          object-fit: cover; 
          border-radius: 10px; 
        }

        .hospital-info h3 { margin: 0 0 10px 0; }
        .hospital-info p { margin: 2px 0; }

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

export default ViewHospitals;
