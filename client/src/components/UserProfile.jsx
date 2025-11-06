import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    profilePic: null,
    username: "",
    name: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodType: "",
    maritalStatus: "",
    languages: [],
    occupation: "",
    placeOfBirth: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <img
          src={user.profilePic || "https://via.placeholder.com/150?text=Profile+Pic"}
          alt="Profile"
          className="profile-pic"
        />
        <h2>{user.username}</h2>
        <p><b>Full Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Date of Birth:</b> {user.dob}</p>
        <p><b>Age:</b> {user.age}</p>
        <p><b>Gender:</b> {user.gender}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Address:</b> {user.address}</p>
        <p><b>Blood Type:</b> {user.bloodType}</p>
        <p><b>Marital Status:</b> {user.maritalStatus}</p>
        <p><b>Occupation:</b> {user.occupation}</p>
        <p><b>Place of Birth:</b> {user.placeOfBirth}</p>
        <div>
          <b>Languages Spoken ({user.languages.length}):</b>
          <ul className="languages-list">
            {user.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .profile-container {
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

        .profile-card {
          background: #ffffff;
          padding: 25px 20px;
          border-radius: 20px;
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
          text-align: left;
        }

        .profile-pic {
          display: block;
          margin: 0 auto 15px;
          border-radius: 50%;
          width: 150px;
          height: 150px;
          object-fit: cover;
        }

        h2 {
          text-align: center;
          font-size: 1.8rem;
          color: #7c3aed;
          margin-bottom: 20px;
        }

        p {
          font-size: 1rem;
          color: #555;
          margin: 5px 0;
        }

        .languages-list {
          margin-top: 5px;
          padding-left: 20px;
        }

        .languages-list li {
          list-style-type: disc;
          margin-bottom: 3px;
        }

        @media (max-width: 768px) {
          .profile-card {
            padding: 20px;
          }

          h1 {
            font-size: 1.8rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .profile-pic {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
