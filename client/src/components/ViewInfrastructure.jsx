import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewInfrastructure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, infraToEdit } = location.state || { city: "Selected City", infraToEdit: null };

  const [infraList, setInfraList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedInfra, setSelectedInfra] = useState(infraToEdit);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const storedInfra = JSON.parse(localStorage.getItem("Infrastructure")) || [];
    const cityInfra = storedInfra.filter(i => i.city === city);
    setInfraList(cityInfra);
    setFilteredList(cityInfra);

    if (!infraToEdit && cityInfra.length > 0) setSelectedInfra(cityInfra[0]);
  }, [city, infraToEdit]);

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    if (type === "") setFilteredList(infraList);
    else setFilteredList(infraList.filter(i => i.type.toLowerCase() === type.toLowerCase()));
    setSelectedInfra(null);
  };

  const handleUpdateClick = () => {
    if (selectedInfra) {
      navigate("/Infrastructure", { state: { city, infraToEdit: selectedInfra } });
    }
  };

  const filterOptions = ["Road", "Bridge", "Public Building", "Utility"];

  return (
    <div className="view-infra-page">
      <h1>Infrastructure in {city}</h1>

      <select value={filterType} onChange={handleFilterChange} className="filter-dropdown">
        <option value="">All Types</option>
        {filterOptions.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
      </select>

      {selectedInfra && (
        <button className="update-btn" onClick={handleUpdateClick}>
          Update Selected Entry
        </button>
      )}

      <div className="infra-cards">
        {filteredList.length === 0 && <p>No infrastructure added yet.</p>}
        {filteredList.map((i) => (
          <div
            key={i.id}
            className={`infra-card ${selectedInfra?.id === i.id ? "selected" : ""}`}
            onClick={() => setSelectedInfra(i)}
          >
            {i.image && <img src={i.image} alt={i.name} />}
            <h3>{i.name}</h3>
            <p>Type: {i.type}</p>
            <p>Address: {i.address}</p>
            <p>Status: {i.status}</p>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <style>{`
        .view-infra-page { 
          padding: 80px 20px; 
          text-align: center; 
          min-height: 90vh; 
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);; 
        }

        .view-infra-page h1 { 
          font-size: 3rem; 
          margin-bottom: 20px; 
        }

        .infra-cards { 
          display: flex; 
          flex-wrap: wrap; 
          justify-content: center; 
          gap: 1cm; /* 1 cm gap between cards */
        }

        .infra-card { 
          width: 300px; 
          padding: 15px; 
          border-radius: 12px; 
          background-color: #ffffff; /* pure white */
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3); /* stronger shadow */
          text-align: center; 
          cursor: pointer; 
          transition: transform 0.2s ease, box-shadow 0.2s ease; 
        }

        .infra-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 20px 60px rgba(0,0,0,0.35); /* stronger on hover */
        }

        .infra-card img { 
          width: 100%; 
          height: 180px; 
          object-fit: cover; 
          border-radius: 10px; 
          margin-bottom: 10px; 
        }

        .infra-card h3 { margin: 0 0 10px 0; }
        .infra-card p { margin: 2px 0; }

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

export default ViewInfrastructure;
