import React, { useState } from "react";
import { FaEdit, FaFileAlt, FaUsers, FaSignOutAlt } from "react-icons/fa";
import "./AdminDashboard.css";
import Navbar from "./Navbar";
import Users from "./Users";
import Logout from "./Logout";
import ViewFeedback from "./ViewFeedback";
import Reports from "./Reports"; // <-- Import Reports component
import AdminServices from "./AdminServices";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Edit Services");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Edit Services":
        return<AdminServices />; // Render AdminServices.jsx here
      case "Feedbacks":
        return <ViewFeedback />; // Show feedbacks
      case "Reports":
        return <Reports />; // Render Reports.jsx here
      case "Number of Users":
        return <Users />;
      case "Logout":
        return <Logout />;
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <h2 className="sidebar-title">Admin Dashboard</h2>
          <ul className="sidebar-menu">
            <li
              className={`sidebar-item ${activeSection === "Edit Services" ? "active" : ""}`}
              onClick={() => setActiveSection("Edit Services")}
            >
              <FaEdit style={{ marginRight: "8px" }} /> Edit Services
            </li>
            <li
              className={`sidebar-item ${activeSection === "Feedbacks" ? "active" : ""}`}
              onClick={() => setActiveSection("Feedbacks")}
            >
              <FaFileAlt style={{ marginRight: "8px" }} /> View Feedbacks
            </li>
            <li
              className={`sidebar-item ${activeSection === "Reports" ? "active" : ""}`}
              onClick={() => setActiveSection("Reports")}
            >
              <FaFileAlt style={{ marginRight: "8px" }} /> Reports
            </li>
            <li
              className={`sidebar-item ${activeSection === "Number of Users" ? "active" : ""}`}
              onClick={() => setActiveSection("Number of Users")}
            >
              <FaUsers style={{ marginRight: "8px" }} /> Number of Users
            </li>
            <li
              className={`sidebar-item ${activeSection === "Logout" ? "active" : ""}`}
              onClick={() => setActiveSection("Logout")}
            >
              <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
            </li>
          </ul>
        </aside>

        <main className={`dashboard-layout ${isSidebarOpen ? "" : "full-width"}`}>
         
          <div className="dashboard-grid">{renderContent()}</div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;