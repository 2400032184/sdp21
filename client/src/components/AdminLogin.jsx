import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    // you can add validation/auth check here
    navigate("/AdminDashboard"); // go to Dashboard.jsx
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <h1>Welcome Back Admin!</h1>
          <p>Log in to continue!</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
            <button type="submit">Login</button>
          </form>
          <p className="signup-link">
            Are you the User? click here <a href="/Login">User Login</a>
          </p>
        </div>
      </div>

      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          height: 100%;
        }

        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 90vh;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          padding: 0 20px;
          box-sizing: border-box;
        }

        .login-container {
          background: #ffffff;
          padding: 30px 25px;
          border-radius: 15px;
          max-width: 400px;
          width: 100%;
          max-height: 100%;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          text-align: center;
          color: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-container h1 {
          margin-bottom: 10px;
          font-size: 2rem;
        }

        .login-container p {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .login-form label {
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .login-form input[type="email"],
        .login-form input[type="password"] {
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          color: #000;
        }

        .login-form button {
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #28a745;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .login-form button:hover {
          background: #218838;
        }

        .signup-link {
          margin-top: 15px;
          font-size: 0.9rem;
        }

        .signup-link a {
          color: #28a745;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 25px 15px;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
