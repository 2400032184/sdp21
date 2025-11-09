import React, { useState } from "react";
import Navbar from "./Navbar";
import Feedback from "./Feedback";
import Services from "./Services";
import Logout from "./Logout";
import SelectCity from "./SelectCity";
import ViewCities from "./ViewCities";
import History from "./History";
import UserProfile from "./UserProfile";
import UpdateUserProfile from "./UpdateUserProfile"; // <-- Import UpdateUserProfile
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import FeedIcon from "@mui/icons-material/Feed";
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person'; // <-- UserProfile icon
import EditIcon from '@mui/icons-material/Edit'; // <-- UpdateUserProfile icon
import "./Dashboard.css";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Select City");
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    "Select City",
    "History",
    "Amenities",
    "Provide Feedback",
    "User Profile",        // <-- Show UserProfile
    "Update Profile",      // <-- Show UpdateUserProfile
    "Logout",
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Map menu items to icons
  const menuIcons = {
    "Select City": (
      <LocationOnIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "View Cities": (
      <LocationCityIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "History": (
      <HistoryIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "Amenities": (
      <ElectricCarIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "Provide Feedback": (
      <FeedIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "User Profile": (
      <PersonIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "Update Profile": (
      <EditIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
    "Logout": (
      <LogoutIcon style={{ marginRight: "8px", verticalAlign: "middle" }} />
    ),
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-container">
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <h2 className="sidebar-title">Dashboard</h2>
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li
                key={item}
                className={`sidebar-item ${activeItem === item ? "active" : ""}`}
                onClick={() => setActiveItem(item)}
              >
                {menuIcons[item]}
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <main className={`dashboard-layout ${isSidebarOpen ? "" : "full-width"}`}>
          {activeItem === "Select City" && (
            <SelectCity
              setSelectedCity={setSelectedCity} 
              setActiveItem={setActiveItem} 
            />
          )}

          {activeItem === "View Cities" && selectedCity && (
            <ViewCities city={selectedCity} />
          )}

          {activeItem === "History" && <History />}

          {activeItem === "Amenities" && <Services />}

          {activeItem === "Provide Feedback" && <Feedback />}

          {activeItem === "User Profile" && <UserProfile />} {/* <-- UserProfile */}

          {activeItem === "Update Profile" && <UpdateUserProfile />} {/* <-- UpdateUserProfile */}

          {activeItem === "Logout" && <Logout />}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
