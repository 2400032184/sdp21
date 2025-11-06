import React from "react";
import Navbar from "./Navbar";
import ContactImage from "../styles/contact.jpg";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-wrapper">
          <h1 className="contact-heading">Contact Us</h1>
          <div className="contact-container">
            <div className="contact-image-container">
              <img src={ContactImage} alt="Contact Us" className="contact-image" />
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page {
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          min-height: 100vh;
          width: 100%;
          text-align: center;
        }

        .contact-wrapper {
          width: 90%;
          max-width: 1000px;
        }

        .contact-heading {
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: #333;
        }

        .contact-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 0 15px 2px rgba(0,0,0,0.8);
          background-color: #fff;
          width: 100%;
          flex-wrap: wrap;
        }

        .contact-image-container {
          flex: 1;
          min-width: 250px;
        }

        .contact-image {
          width: 100%;
          height: auto;
          max-height: 350px;
          border-radius: 12px;
          object-fit: cover;
        }

        .contact-form {
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left;
        }

        .contact-form input, .contact-form textarea {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .contact-form textarea {
          min-height: 150px;
        }

        .contact-form button {
          padding: 12px;
          border-radius: 6px;
          border: none;
          background: #28a745;
          color: white;
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s ease;
        }

        .contact-form button:hover {
          background: #218838;
        }

        @media (max-width: 768px) {
          .contact-container {
            flex-direction: column;
          }

          .contact-form {
            text-align: center;
          }

          .contact-image {
            max-height: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default ContactUs;
