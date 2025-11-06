import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LogoImage from "../styles/logo.jpeg";

const UserTouristView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || { city: "Selected City" };

  const [touristsList, setTouristsList] = useState([]);
  const [filterType, setFilterType] = useState("");

  const filterOptions = ["Historical", "Recreational", "Natural", "Entertainment"];

  useEffect(() => {
    const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
    let cityTourists = storedTourists.filter((t) => t.city === city);

    if (filterType) {
      cityTourists = cityTourists.filter((t) => t.type === filterType);
    }

    setTouristsList(cityTourists);
  }, [city, filterType]);

  const handleLogoClick = () => {
    navigate("/Dashboard");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={LogoImage}
            alt="Logo"
            className="logo"
            onClick={handleLogoClick}
          />
          <h2>Smart City App</h2>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>
          <li><Link to="/SignUp">Sign Up</Link></li>
        </ul>
      </nav>

      <div className="view-tourists-page">
        <h1>Tourist Spots in {city}</h1>

        <div style={{ margin: "20px 0" }}>
          <label>Filter by Type: </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="tourist-cards">
          {touristsList.length === 0 && <p>No tourist spots found.</p>}
          {touristsList.map((t) => (
            <div className="tourist-card" key={t.id}>
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

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <style>{`
        /* Navbar */
        .navbar {
          width: 100%;
          background: linear-gradient(90deg, #1a0033, #5d158d, #7c3aed, #3a0579);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 50px;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 6px rgba(11, 11, 11, 0.943);
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .navbar-left .logo {
          width: 50px;
          height: 50px;
          object-fit: cover;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s, box-shadow 0.3s;
        }
        .navbar-left .logo:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.6);
        }
        .navbar-left h2 {
          color: #f0eaea;
          font-size: 1.8rem;
          margin: 0;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }
        .nav-links {
          display: flex;
          gap: 25px;
        }
        .nav-links li {
          list-style: none;
        }
        .nav-links li a {
          color: #fff;
          font-size: 1rem;
          font-weight: 500;
          transition: 0.3s ease;
        }
        .nav-links li a:hover {
          color: #FFAAA6;
          transform: scale(1.05);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 10px;
          }
          .nav-links {
            flex-direction: column;
            gap: 15px;
          }
        }

        /* Page Layout */
        .view-tourists-page {
          padding: 100px 20px;
          text-align: center;
          min-height: 90vh;
          background: linear-gradient(135deg, #fdfcfb, #e2d1f9);
        }
        .view-tourists-page h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .tourist-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1cm;
        }

        .tourist-card {
          width: 300px;
          border-radius: 12px;
          background-color: #ffffff;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
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
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .tourist-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
        }

        .tourist-info h3 {
          margin: 0 0 10px 0;
        }
        .tourist-info p {
          margin: 2px 0;
        }

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
    </>
  );
};

export default UserTouristView;
