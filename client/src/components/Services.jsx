import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LogoImage from "../styles/logo.jpeg"; // import your logo image
import HospitalImage from "../styles/hospital.jpg";
import TouristImage from "../styles/tourist.jpeg";
import InfrastructureImage from "../styles/infra.jpg";

const Services = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const city = location.state?.city;

  const [hospitals, setHospitals] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);

  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    setHospitals(storedHospitals.filter(h => h.city === city));

    const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
    setTourists(storedTourists.filter(t => t.city === city));

    const storedInfra = JSON.parse(localStorage.getItem("Infrastructure")) || [];
    setInfrastructures(storedInfra.filter(i => i.city === city));
  }, [city]);

  if (!city) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>No city selected</h2>
        <Link to="/SelectCity">← Back to Select City</Link>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={LogoImage}
            alt="Logo"
            className="logo"
            onClick={toggleSidebar} // toggle dashboard sidebar
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

      {/* Services Page */}
      <div className="services-page">
        <h1 className="services-heading">Services in {city}</h1>
        <div className="services-content-container">

          <div className="service-card">
            <img src={HospitalImage} alt="Hospitals" />
            <h3>Public Services</h3>
            <p>Find nearby Hospitals, Educational Institutions and Utilities Easily</p>
            <button
              className="view-btn"
              onClick={() => navigate("/UserHospitalView", { state: { city } })}
            >
              View ({hospitals.length})
            </button>
          </div>

          <div className="service-card">
            <img src={TouristImage} alt="Tourist Places" />
            <h3>Tourist Places</h3>
            <p>Discover must-visit landmarks and hidden gems.</p>
            <button
              className="view-btn"
              onClick={() => navigate("/UserTouristView", { state: { city } })}
            >
              View ({tourists.length})
            </button>
          </div>

          <div className="service-card">
            <img src={InfrastructureImage} alt="Infrastructure" />
            <h3>Infrastructure</h3>
            <p>Learn about the city's infrastructure projects and facilities.</p>
            <button
              className="view-btn"
              onClick={() => navigate("/UserInfrastructureView", { state: { city } })}
            >
              View ({infrastructures.length})
            </button>
          </div>

          <div style={{ width: "100%", marginTop: "30px", textAlign: "center" }}>
            <Link to="/SelectCity" className="link">← Back to Select City</Link>
          </div>

        </div>
      </div>

      {/* CSS */}
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
          transition: background 0.5s ease;
        }
        .navbar-left { display: flex; align-items: center; gap: 10px; }
        .navbar-left .logo { width: 50px; height: 50px; object-fit: cover; cursor: pointer; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); transition: transform 0.2s, box-shadow 0.3s; }
        .navbar-left .logo:hover { transform: scale(1.05); box-shadow: 0 4px 12px rgba(124, 58, 237, 0.6); }
        .navbar-left h2 { color: #f0eaea; font-size: 1.8rem; margin: 0; text-shadow: 1px 1px 3px rgba(0,0,0,0.3); }
        .nav-links { display: flex; gap: 25px; }
        .nav-links li { list-style: none; }
        .nav-links li a { color: #fff; font-size: 1rem; font-weight: 500; transition: 0.3s ease; }
        .nav-links li a:hover { color: #FFAAA6; transform: scale(1.05); text-shadow: 1px 1px 3px rgba(0,0,0,0.3); }

        @media (max-width: 768px) {
          .navbar { flex-direction: column; gap: 10px; }
          .nav-links { flex-direction: column; gap: 15px; }
        }

        /* Services Page */
        .services-page {
          padding: 100px 20px;
          min-height: 90vh;
          text-align: center;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          color: #333;
        }
        .services-heading { font-size: 3rem; margin-bottom: 50px; }
        .services-content-container { display: flex; justify-content: center; flex-wrap: wrap; gap: 1cm; }
        .service-card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 15px;
          width: 300px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .service-card:hover { transform: translateY(-10px); box-shadow: 0 20px 60px rgba(0,0,0,0.35); }
        .service-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 15px; }
        .service-card h3 { margin-bottom: 10px; }
        .service-card p { margin-bottom: 15px; color: #555; }
        .view-btn { padding: 10px 20px; border: none; border-radius: 8px; background-color: #007bff; color: #fff; font-weight: bold; cursor: pointer; transition: 0.3s ease; }
        .view-btn:hover { background-color: #0056b3; }
        .link { text-decoration: none; font-weight: bold; color: #007bff; }
        .link:hover { color: #0056b3; }
      `}</style>
    </>
  );
};

export default Services;
