import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutImage from "../styles/thank.jpeg"; // Import your local image

const Logout = () => {
  useEffect(() => {
    // Remove the current user on logout
    localStorage.removeItem("currentUser");
  }, []);

  return (
    <div className="logout-container">
      <div className="logout-card">
        {/* Image */}
        <img
          src={LogoutImage}
          alt="Logged Out Successfully"
          className="logout-image"
        />

        {/* Message */}
        <h1 className="logout-title">Logged Out Successfully!</h1>
        <p className="logout-message">
          We truly appreciate your valuable time spent with us. Hope to see you again soon!
        </p>

        {/* Back to Home Link */}
        <Link to="/" className="logout-link">
          ← Back to Home
        </Link>
      </div>

      {/* Inline CSS */}
      <style>{`
        .logout-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90vh;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          font-family: 'Roboto', sans-serif;
        }

        .logout-card {
          background: #ffffff;
          padding: 30px 25px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          text-align: center;
          max-width: 500px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logout-image {
          width: 120px;
          margin-bottom: 20px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .logout-title {
          font-size: 2rem;
          color: #6b46c1;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .logout-message {
          font-size: 1rem;
          color: #4a4a4a;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .logout-link {
          display: inline-block;
          padding: 12px 20px;
          background: linear-gradient(135deg, #a78bfa, #d6bcf5);
          color: #ffffff;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: transform 0.2s, background 0.3s;
        }

        .logout-link:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #7c3aed, #c084fc);
        }

        @media (max-width: 768px) {
          .logout-card {
            padding: 20px 15px;
          }

          .logout-title {
            font-size: 1.6rem;
          }

          .logout-message {
            font-size: 0.95rem;
          }

          .logout-image {
            width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Logout;
