import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserProfileContainer from "./UserProfileContainer";
import LogoImage from "../styles/logo.jpeg"; // your logo image

const Navbar = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);

  // Get current user from localStorage whenever needed
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };

  const currentUser = getCurrentUser();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={LogoImage} alt="Logo" className="logo" onClick={toggleSidebar} />
          <h2>Smart City App</h2>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/ContactUs">Contact Us</Link></li>
          {!currentUser && <li><Link to="/SignUp">Sign Up</Link></li>}
          {currentUser && (
            <li>
              <img
                src={currentUser.profilePic || "https://via.placeholder.com/40"}
                alt="Profile"
                className="nav-profile-pic"
                onClick={() => setShowProfile(true)}
              />
            </li>
          )}
        </ul>
      </nav>

      {showProfile && (
        <UserProfileContainer
          user={getCurrentUser()} // pass latest user
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
};

export default Navbar;
