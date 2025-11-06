import React, { useEffect } from "react"; 
import { useLocation, Link } from "react-router-dom";

const ViewCities = () => {
  const location = useLocation();
  const city = location.state?.city;

  useEffect(() => {
    if (city) {
      // Retrieve previously searched cities
      const storedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

      // Avoid duplicates
      if (!storedCities.some(c => c.city === city.city)) {
        storedCities.push(city);
        localStorage.setItem("searchedCities", JSON.stringify(storedCities));
      }
    }
  }, [city]); // Run effect whenever 'city' changes

  return (
    <div className="viewcities-container">
      {city ? (
        <div className="city-card">
          <h1 className="city-title">{city.city}</h1>
          <p className="city-state">State: {city.state}</p>
          <p className="city-population">Population: {city.population}</p>
          <p className="city-coordinates">
            Coordinates: {city.latitude}, {city.longitude}
          </p>
        </div>
      ) : (
        <h2 className="no-city">No city selected.</h2>
      )}
      <Link to="/Services" className="back-link">
        ← Services available in the city
      </Link>

      <style>{`
        .viewcities-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);
          padding: 20px;
        }

        .city-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 90%;
          text-align: center;
          margin-bottom: 20px;
          transition: transform 0.2s ease;
        }

        .city-card:hover {
          transform: translateY(-5px);
        }

        .city-title {
          font-size: 2rem;
          font-weight: 700;
          color: #4a148c;
          margin-bottom: 15px;
        }

        .city-state,
        .city-population,
        .city-coordinates {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
        }

        .no-city {
          color: #444;
          font-size: 1.5rem;
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
      `}</style>
    </div>
  );
};

export default ViewCities;
