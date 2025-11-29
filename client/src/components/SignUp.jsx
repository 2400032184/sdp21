import React, { useState } from "react";
import Navbar from "./Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ icons

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address (e.g. user@example.com)");
      return;
    }

    //  Password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      alert(
        "Password must be at least 8 characters long and include:\n- one uppercase letter\n- one lowercase letter\n- one number\n- one special character (@$!%*?&)"
      );
      return;
    }

    // ✅ Confirm password check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Terms check
    if (!formData.terms) {
      alert("Please agree to the terms and conditions!");
      return;
    }

    // ✅ Store user
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if username or email already exists
    const userExists = storedUsers.some(
      (user) => user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      alert("User with this username or email already exists!");
      return;
    }

    storedUsers.push({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      profilePic: null,
    });

    localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));
    alert("User registered successfully!");

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">
        <div className="signup-container">
          <h1>Create Your Account</h1>
          <p>Sign up to get started!</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="terms">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            <button type="submit">Sign Up</button>
          </form>
          <p className="signin-link">
            Already have an account? <a href="/Login">Login</a>
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

        .signup-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          padding: 0 20px;
          box-sizing: border-box;
        }

        .signup-container {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 15px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          text-align: center;
          color: #000;
        }

        .signup-container h1 {
          margin-bottom: 10px;
          font-size: 2rem;
        }

        .signup-container p {
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .signup-form label {
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .signup-form input[type="text"],
        .signup-form input[type="email"],
        .signup-form input[type="password"],
        .password-container input {
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          color: #000;
          width: 100%;
          box-sizing: border-box;
        }

        .password-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .toggle-icon {
          position: absolute;
          right: 12px;
          cursor: pointer;
          color: #555;
          font-size: 1.1rem;
        }

        .toggle-icon:hover {
          color: #000;
        }

        .signup-form input[type="checkbox"] {
          margin-right: 10px;
        }

        .terms {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: #000;
        }

        .signup-form button {
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

        .signup-form button:hover {
          background: #218838;
        }

        .signin-link {
          margin-top: 15px;
          font-size: 0.9rem;
        }

        .signin-link a {
          color: #28a745;
          text-decoration: underline;
        }

        @media (max-width: 500px) {
          .signup-container {
            padding: 30px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default SignUp;
