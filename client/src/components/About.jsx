import React from "react";
import Navbar from "./Navbar";
import AboutImage from "../styles/Homeimage.jpeg";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="about-content-container">
          <div className="about-image-container">
            <img src={AboutImage} alt="Smart City" className="about-image" />
          </div>
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              This smart city application is designed to simplify urban living by providing seamless access to city-related information and services. The platform allows citizens to explore public amenities, report issues, and access vital infrastructure details efficiently, while enabling city administrators to manage and update urban data effectively. By bridging the gap between city services and residents, it enhances transparency, responsiveness, and convenience, making cities more organized, connected, and user-friendly for everyone.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-page {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          min-height: 90vh;
          padding: 20px;
        }

        .about-content-container {
          display: flex;
          max-width: 1200px;
          width: 100%;
          height: 100%;
          background-color: #ffffff;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          align-items: center;
        }

        .about-image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px; /* space around the image */
          height: 100%;
        }

        .about-image {
          max-width: 100%;
          max-height: 80%;
          object-fit: cover;
          border-radius: 12px;
        }

        .about-text {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #333;
        }

        .about-text h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .about-content-container {
            flex-direction: column;
            height: auto;
          }

          .about-image-container {
            height: 250px;
            padding: 10px; /* smaller padding for mobile */
          }

          .about-text {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default About;
