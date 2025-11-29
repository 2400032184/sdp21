import React, { useState, useEffect } from "react";
import UserProfileContainer from "./UserProfileContainer";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2>No user logged in.</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      <button onClick={() => setShowPopup(true)} className="view-btn">
        View Full Details
      </button>

      {showPopup && (
        <UserProfileContainer user={user} onClose={() => setShowPopup(false)} />
      )}

      <div className="profile-card">
        <img
          src={user.profilePic || "https://via.placeholder.com/150?text=Profile+Pic"}
          alt="Profile"
          className="profile-pic"
        />

        <h2>{user.username}</h2>

        <p><b>Email:</b> {user.email}</p>
        <p><b>Phone:</b> {user.phone}</p>
        <p><b>Gender:</b> {user.gender}</p>
        <p><b>Age:</b> {user.age}</p>
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
          margin: 20px auto 0;
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

        .view-btn {
          margin-bottom: 20px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #a78bfa, #d6bcf5);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #7c3aed, #c084fc);
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
