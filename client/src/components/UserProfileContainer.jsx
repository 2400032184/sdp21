import React, { useState, useEffect } from "react";

const UserProfileContainer = ({ onClose }) => {
  const [user, setUser] = useState({
    username: "",
    profilePic: null,
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodType: "",
    maritalStatus: "",
    languages: [],
    placeOfBirth: "",
    occupation: "",
  });

  // Load user initially
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  // Listen for changes in localStorage to update automatically
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (updatedUser) setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="profile-container-overlay">
      <div className="profile-container-card">
        <button className="close-btn" onClick={onClose}>×</button>

        <img
          src={user.profilePic || "https://via.placeholder.com/120"}
          alt="Profile"
          style={{
            borderRadius: "50%",
            width: "180px",
            height: "180px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />

        <h2>{user.username}</h2>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Age:</b> {user.age}</p>
        <p><b>Gender:</b> {user.gender}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Address:</b> {user.address}</p>
        <p><b>Blood Type:</b> {user.bloodType}</p>
        <p><b>Marital Status:</b> {user.maritalStatus}</p>
        <div>
          <b>Languages Spoken ({user.languages.length}):</b>
          <ul>
            {user.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>
        <p><b>Place of Birth:</b> {user.placeOfBirth}</p>
        <p><b>Occupation:</b> {user.occupation}</p>
      </div>

      <style>{`
        .profile-container-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .profile-container-card {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          text-align: left;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          font-weight: bold;
          color: #555;
        }

        .close-btn:hover {
          color: #000;
        }

        h2 {
          font-size: 1.6rem;
          margin-bottom: 15px;
          color: #7c3aed;
        }

        p {
          margin: 5px 0;
          font-size: 1rem;
          line-height: 1.4;
        }

        ul {
          padding-left: 20px;
          margin: 5px 0;
        }

        li {
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
};

export default UserProfileContainer;
