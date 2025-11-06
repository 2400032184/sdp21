import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import HospitalImage from "../styles/hospital.jpg";
import TouristImage from "../styles/tourist.jpeg";
import InfrastructureImage from "../styles/infra.jpg";
import { FaEdit, FaFileAlt, FaUsers, FaSignOutAlt, FaHome } from "react-icons/fa";

// Import other components for sidebar sections
import ViewFeedback from "./ViewFeedback";
import Reports from "./Reports";
import Users from "./Users";
import AdminDashboardContent from "./AdminServices";
import LogoutImage from "../styles/thank.jpeg"; // logout image

const Amenities = () => {
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("Amenities");
  const [activeSubSection, setActiveSubSection] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [city, setCity] = useState("Selected City");

  const [hospitalsList, setHospitalsList] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalFilterType, setHospitalFilterType] = useState("");

  const [touristsList, setTouristsList] = useState([]);
  const [filteredTourists, setFilteredTourists] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [touristFilterType, setTouristFilterType] = useState("");

  const [infraList, setInfraList] = useState([]);
  const [filteredInfra, setFilteredInfra] = useState([]);
  const [selectedInfra, setSelectedInfra] = useState(null);
  const [infraFilterType, setInfraFilterType] = useState("");

  const [activeAction, setActiveAction] = useState("view");
  const [formType, setFormType] = useState("");
  const [formName, setFormName] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formTimings, setFormTimings] = useState("");
  const [formRating, setFormRating] = useState("");
  const [formStatus, setFormStatus] = useState("Open");
  const [formImage, setFormImage] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (location.state && location.state.city) {
      setCity(location.state.city);
      localStorage.setItem("selectedCity", JSON.stringify(location.state));
      setActiveSection("Amenities");
      setActiveSubSection(null);
    } else {
      const storedCity = JSON.parse(localStorage.getItem("selectedCity"));
      if (storedCity && storedCity.city) {
        setCity(storedCity.city);
        setActiveSection("Amenities");
        setActiveSubSection(null);
      }
    }
  }, [location.state]);

  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const cityHospitals = storedHospitals.filter((h) => h.city === city);
    setHospitalsList(cityHospitals);
    setFilteredHospitals(cityHospitals);
    if (!selectedHospital && cityHospitals.length > 0) setSelectedHospital(cityHospitals[0]);

    const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
    const cityTourists = storedTourists.filter((t) => t.city === city);
    setTouristsList(cityTourists);
    setFilteredTourists(cityTourists);
    if (!selectedTourist && cityTourists.length > 0) setSelectedTourist(cityTourists[0]);

    const storedInfra = JSON.parse(localStorage.getItem("infra")) || [];
    const cityInfra = storedInfra.filter((i) => i.city === city);
    setInfraList(cityInfra);
    setFilteredInfra(cityInfra);
    if (!selectedInfra && cityInfra.length > 0) setSelectedInfra(cityInfra[0]);
  }, [city, activeAction]);

  const resetForm = () => {
    setFormType("");
    setFormName("");
    setFormAddress("");
    setFormContact("");
    setFormTimings("");
    setFormRating("");
    setFormStatus("Open");
    setFormImage(null);
    setSelectedHospital(null);
    setSelectedTourist(null);
    setSelectedInfra(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdate = () => {
    const item = {
      id: selectedHospital?.id || selectedTourist?.id || selectedInfra?.id || Date.now(),
      city,
      type: formType,
      name: formName,
      address: formAddress,
      contact: formContact,
      timings: formTimings,
      rating: formRating,
      status: formStatus,
      image: formImage,
    };

    if (activeSubSection === "Public Services") {
      const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
      const updated = selectedHospital
        ? storedHospitals.map((h) => (h.id === selectedHospital.id ? item : h))
        : [...storedHospitals, item];
      localStorage.setItem("hospitals", JSON.stringify(updated));
      setHospitalsList(updated.filter((h) => h.city === city));
      setFilteredHospitals(updated.filter((h) => h.city === city));
    } else if (activeSubSection === "Tourist Places") {
      const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
      const updated = selectedTourist
        ? storedTourists.map((t) => (t.id === selectedTourist.id ? item : t))
        : [...storedTourists, item];
      localStorage.setItem("tourists", JSON.stringify(updated));
      setTouristsList(updated.filter((t) => t.city === city));
      setFilteredTourists(updated.filter((t) => t.city === city));
    } else if (activeSubSection === "Infrastructure") {
      const storedInfra = JSON.parse(localStorage.getItem("infra")) || [];
      const updated = selectedInfra
        ? storedInfra.map((i) => (i.id === selectedInfra.id ? item : i))
        : [...storedInfra, item];
      localStorage.setItem("infra", JSON.stringify(updated));
      setInfraList(updated.filter((i) => i.city === city));
      setFilteredInfra(updated.filter((i) => i.city === city));
    }

    setActiveAction("view");
    resetForm();
    alert(`${activeSubSection?.slice(0, -1)} ${activeAction === "edit" ? "updated" : "added"} successfully!`);
  };

  const handleEditClick = () => {
    let selected;
    if (activeSubSection === "Public Services") selected = selectedHospital;
    else if (activeSubSection === "Tourist Places") selected = selectedTourist;
    else selected = selectedInfra;

    if (!selected) return alert(`Please select a ${activeSubSection?.slice(0, -1)} to edit.`);
    setFormType(selected.type);
    setFormName(selected.name);
    setFormAddress(selected.address);
    setFormContact(selected.contact);
    setFormTimings(selected.timings);
    setFormRating(selected.rating);
    setFormStatus(selected.status);
    setFormImage(selected.image);
    setActiveAction("edit");
  };

  const handleFilterChange = (type) => {
    if (activeSubSection === "Public Services") {
      setHospitalFilterType(type);
      setFilteredHospitals(type ? hospitalsList.filter((h) => h.type === type) : hospitalsList);
      setSelectedHospital(null);
    } else if (activeSubSection === "Tourist Places") {
      setTouristFilterType(type);
      setFilteredTourists(type ? touristsList.filter((t) => t.type === type) : touristsList);
      setSelectedTourist(null);
    } else if (activeSubSection === "Infrastructure") {
      setInfraFilterType(type);
      setFilteredInfra(type ? infraList.filter((i) => i.type === type) : infraList);
      setSelectedInfra(null);
    }
  };

  const renderSection = () => {
    if (!activeSubSection) {
      return (
        <div className="big-cards-container">
          <div className="big-card" onClick={() => setActiveSubSection("Public Services")}>
            <img src={HospitalImage} alt="Public Services" />
            <h3>Public Services</h3>
          </div>
          <div className="big-card" onClick={() => setActiveSubSection("Tourist Places")}>
            <img src={TouristImage} alt="Tourist Places" />
            <h3>Tourist Places</h3>
          </div>
          <div className="big-card" onClick={() => setActiveSubSection("Infrastructure")}>
            <img src={InfrastructureImage} alt="Infrastructure" />
            <h3>Infrastructure</h3>
          </div>
        </div>
      );
    }

    let list, filteredList, selected, filterType, typesOptions;
    if (activeSubSection === "Public Services") {
      list = hospitalsList;
      filteredList = filteredHospitals;
      selected = selectedHospital;
      filterType = hospitalFilterType;
      typesOptions = ["Healthcare", "Education", "Utilities"];
    } else if (activeSubSection === "Tourist Places") {
      list = touristsList;
      filteredList = filteredTourists;
      selected = selectedTourist;
      filterType = touristFilterType;
      typesOptions = ["Historical", "Recreational", "Natural"];
    } else {
      list = infraList;
      filteredList = filteredInfra;
      selected = selectedInfra;
      filterType = infraFilterType;
      typesOptions = ["Roads", "Buildings", "Utilities"];
    }

    if (activeAction === "view") {
      return (
        <div className="view-hospitals">
          <h2>{activeSubSection} in {city}</h2>
          <select value={filterType} onChange={(e) => handleFilterChange(e.target.value)} className="filter-dropdown">
            <option value="">All Types</option>
            {typesOptions.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
          </select>
          <div className="buttons">
            <button className="edit-btn" onClick={handleEditClick}>Edit Selected</button>
            <button className="edit-btn" onClick={() => { resetForm(); setActiveAction("add"); }}>Add New</button>
          </div>
          <div className="hospital-cards">
            {filteredList.length === 0 && <p>No items found.</p>}
            {filteredList.map((item) => (
              <div key={item.id} className={`hospital-card ${selected?.id === item.id ? "selected" : ""}`}
                onClick={() =>
                  activeSubSection === "Public Services" ? setSelectedHospital(item)
                  : activeSubSection === "Tourist Places" ? setSelectedTourist(item)
                  : setSelectedInfra(item)
                }>
                {item.image && <img src={item.image} alt={item.name} />}
                <div className="hospital-info">
                  <h3>{item.name}</h3>
                  <p>Type: {item.type}</p>
                  <p>Address: {item.address}</p>
                  <p>Contact: {item.contact}</p>
                  <p>Timings: {item.timings}</p>
                  <p>Rating: {item.rating || "N/A"}</p>
                  <p>Status: {item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <form className="hospital-form" onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
        <h2>{activeAction === "edit" ? "Edit" : "Add"} {activeSubSection.slice(0, -1)}</h2>
        <label>
          Type:
          <select value={formType} onChange={(e) => setFormType(e.target.value)} required>
            <option value="" disabled>Select Type</option>
            {typesOptions.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
          </select>
        </label>
        <label>Name:<input value={formName} onChange={(e) => setFormName(e.target.value)} required /></label>
        <label>Address:<input value={formAddress} onChange={(e) => setFormAddress(e.target.value)} required /></label>
        <label>Contact:<input value={formContact} onChange={(e) => setFormContact(e.target.value)} required /></label>
        <label>Timings:<input value={formTimings} onChange={(e) => setFormTimings(e.target.value)} required /></label>
        <label>Rating:<input type="number" min="0" max="5" step="0.1" value={formRating} onChange={(e) => setFormRating(e.target.value)} /></label>
        <label>Status:
          <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </label>
        <label>Image:<input type="file" accept="image/*" onChange={handleImageChange} /></label>
        <button type="submit">{activeAction === "edit" ? "Update" : "Add"} {activeSubSection.slice(0, -1)}</button>
        <button type="button" onClick={() => { resetForm(); setActiveAction("view"); }}>Cancel</button>
      </form>
    );
  };

  const renderContent = () => {
    if (!city || city === "Selected City") {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>No city selected</h2>
          <p>Please go to Admin Services and select a city first.</p>
        </div>
      );
    }

    if (activeSection === "Logout") {
      return (
        <div className="logout-container">
          <div className="logout-card">
            <img src={LogoutImage} alt="Logged Out" className="logout-image" />
            <h1 className="logout-title">Logged Out Successfully!</h1>
            <p className="logout-message">Thank you for your time. See you soon!</p>
            <a href="/" className="logout-link">← Back to Home</a>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "Amenities":
        return (
          <div>
            <h1 className="services-heading">Amenities in {city}</h1>
            <div className="amenities-content-container">{renderSection()}</div>
          </div>
        );
      case "Feedbacks": return <ViewFeedback />;
      case "Reports": return <Reports />;
      case "Users": return <Users />;
      case "Dashboard": return <AdminDashboardContent />;
      default: return <div>Select a section</div>;
    }
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <h2 className="sidebar-title">Admin Dashboard</h2>
          <ul className="sidebar-menu">
            <li className={`sidebar-item ${activeSection === "Dashboard" ? "active" : ""}`} onClick={() => setActiveSection("Dashboard")}><FaHome /> Dashboard</li>
            <li className={`sidebar-item ${activeSection === "Amenities" ? "active" : ""}`} onClick={() => { setActiveSection("Amenities"); setActiveSubSection(null); }}><FaEdit /> Amenities</li>
            <div className="amenities-buttons">
              <button className={`amenity-btn ${activeSubSection === "Public Services" ? "active-btn" : ""}`} onClick={() => setActiveSubSection("Public Services")}>Public Services</button>
              <button className={`amenity-btn ${activeSubSection === "Tourist Places" ? "active-btn" : ""}`} onClick={() => setActiveSubSection("Tourist Places")}>Tourist Places</button>
              <button className={`amenity-btn ${activeSubSection === "Infrastructure" ? "active-btn" : ""}`} onClick={() => setActiveSubSection("Infrastructure")}>Infrastructure</button>
            </div>
            <li className={`sidebar-item ${activeSection === "Feedbacks" ? "active" : ""}`} onClick={() => setActiveSection("Feedbacks")}><FaFileAlt /> View Feedbacks</li>
            <li className={`sidebar-item ${activeSection === "Reports" ? "active" : ""}`} onClick={() => setActiveSection("Reports")}><FaFileAlt /> Reports</li>
            <li className={`sidebar-item ${activeSection === "Users" ? "active" : ""}`} onClick={() => setActiveSection("Users")}><FaUsers /> Number of Users</li>
            <li className="sidebar-item" onClick={() => setActiveSection("Logout")}><FaSignOutAlt /> Logout</li>
          </ul>
        </aside>

        <main className={`dashboard-layout ${isSidebarOpen ? "" : "full-width"}`}>
          <div className="dashboard-grid">{renderContent()}</div>
        </main>
      </div>

      <style>{`
        /* --- Original logout CSS restored --- */
        .logout-container { display:flex; justify-content:center; align-items:center; height:100vh; background-color:#f2f2f2; }
        .logout-card { text-align:center; padding:50px; background:#fff; border-radius:15px; box-shadow:0 8px 20px rgba(0,0,0,0.1); }
        .logout-image { width:150px; height:150px; object-fit:cover; margin-bottom:20px; border-radius:50%; }
        .logout-title { font-size:2rem; color:#4b0368; margin-bottom:10px; }
        .logout-message { font-size:1rem; color:#333; margin-bottom:20px; }
        .logout-link { text-decoration:none; color:#fff; background:#4b0368; padding:10px 20px; border-radius:10px; transition:0.3s; }
        .logout-link:hover { background:#2e014d; }

        /* --- Existing Amenities & other CSS --- */
        .services-heading { font-size: 2.5rem; margin-bottom: 30px; text-align: center; }
        .amenities-content-container { display: flex; justify-content: center; flex-wrap: wrap; gap: 30px; }
        .big-cards-container { display:flex; justify-content:center; flex-wrap:wrap; gap:30px; }
        .big-card { width:300px; padding:20px; border-radius:15px; background:#fff; box-shadow:0 8px 15px rgba(0,0,0,0.1); text-align:center; cursor:pointer; transition:0.3s ease; }
        .big-card img { width:100%; height:200px; object-fit:cover; border-radius:12px; margin-bottom:15px; }
        .big-card h3 { font-size:1.5rem; }
        .big-card:hover { transform:translateY(-10px); }
        .service-card, .hospital-card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 15px;
          width: 300px;
          box-shadow: 0 8px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .service-card:hover, .hospital-card:hover { transform: translateY(-10px); }
        .service-card img, .hospital-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 15px; }
        .service-card h3, .hospital-info h3 { margin-bottom: 10px; }
        .service-card p, .hospital-info p { margin-bottom: 10px; color: #555; text-align: center; }
        .buttons { display: flex; gap: 10px; }
        .view-btn, .edit-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .view-btn { background-color: #007bff; }
        .view-btn:hover { background-color: #0056b3; }
        .edit-btn { background-color: #28a745; }
        .edit-btn:hover { background-color: #1e7e34; }
        .amenities-buttons { display: flex; flex-direction: column; gap: 10px; margin-left: 10px; margin-bottom: 15px; }
        .amenity-btn { padding: 10px 15px; border-radius: 12px; border: none; cursor: pointer; font-weight: bold; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: 0.3s ease; text-align: left; }
        .amenity-btn:hover { background-color: #f0f0f0; }
        .amenity-btn.active-btn { background-color: #4b0368ff; color: #fff; }
        .hospital-cards { display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; }
        .hospital-card { width: 300px; border-radius: 12px; background:#fff; padding:15px; box-shadow:0 8px 15px rgba(0,0,0,0.1); cursor:pointer; transition:0.2s; }
        .hospital-card.selected { border: 2px solid #4b0368; }
        .hospital-card img { width:100%; height:180px; object-fit:cover; border-radius:10px; }
        .hospital-info h3 { margin:0 0 10px 0; } 
        .hospital-info p { margin:2px 0; }
        .hospital-form { display:flex; flex-direction:column; gap:15px; max-width:500px; margin:0 auto; background:#fff; padding:30px; border-radius:15px; box-shadow:0 8px 20px rgba(0,0,0,0.1); }
        .hospital-form label { display:flex; flex-direction:column; font-weight:bold; }
        .hospital-form input, .hospital-form select { padding:10px; margin-top:5px; border-radius:8px; border:1px solid #ccc; }
        .hospital-form button { padding:12px; border:none; border-radius:10px; background-color:#28a745; color:#fff; font-weight:bold; cursor:pointer; }
        .hospital-form button:hover { background-color:#1e7e34; }
      `}</style>
    </>
  );
};

export default Amenities;
