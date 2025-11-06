import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const History = () => {
  const [cities, setCities] = useState([]);

  // Function to load cities from localStorage
  const loadCities = () => {
    const storedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];
    // Reverse to show recent first
    setCities(storedCities.slice().reverse());
  };

  useEffect(() => {
    loadCities();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadCities();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear the history?")) {
      localStorage.removeItem("searchedCities");
      setCities([]);
    }
  };

  return (
    <div className="allcities-container">
      <h1>Searched Cities</h1>

      {cities.length > 0 ? (
        <>
          <div style={{ marginBottom: "20px" }}>
            <button className="clear-btn" onClick={handleClearHistory}>
              🗑️ Clear History
            </button>
          </div>
          <div className="cities-grid">
            {cities.map((city, index) => (
              <div key={index} className="city-card">
                <h2 className="city-title">{city.city}</h2>
                <p className="city-state">State: {city.state}</p>
                <p className="city-population">Population: {city.population}</p>
                <p className="city-coordinates">
                  Coordinates: {city.latitude}, {city.longitude}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="no-cities">You have not searched any cities yet.</p>
      )}

      <Link to="/Services" className="back-link">
        ← Back to Services
      </Link>

      <style>{`
        .allcities-container {
          padding: 30px 20px;
          text-align: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);
          font-family: 'Roboto', sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          color: #4a148c;
          margin-bottom: 30px;
        }

        .cities-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .city-card {
          background: #ffffff;
          padding: 25px 20px;
          border-radius: 20px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          width: 100%;
          text-align: center;
          transition: transform 0.2s ease;
        }

        .city-card:hover {
          transform: translateY(-5px);
        }

        .city-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #7c3aed;
          margin-bottom: 10px;
        }

        .city-state,
        .city-population,
        .city-coordinates {
          font-size: 1rem;
          color: #555;
          line-height: 1.5;
        }

        .no-cities {
          font-size: 1.3rem;
          color: #444;
          margin-bottom: 20px;
        }

        .back-link {
          display: inline-block;
          padding: 12px 20px;
          background-color: #d6bcf5;
          color: #3a1f6e;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .back-link:hover {
          background-color: #c7aef2;
        }

        .clear-btn {
          padding: 10px 16px;
          background-color: #c384dfff;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .clear-btn:hover {
          background-color: #b83beeff;
        }
      `}</style>
    </div>
  );
};

export default History;
