import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Load feedbacks from localStorage
  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];
    setFeedbacks(storedFeedbacks.reverse()); // Most recent first
  }, []);

  return (
    <>
      <div className="feedbacks-page">
        <h1>User Feedbacks</h1>
        <p className="feedback-count">Total Feedbacks: {feedbacks.length}</p>

        {feedbacks.length > 0 ? (
          <div className="feedbacks-grid">
            {feedbacks.map((fb, index) => (
              <div key={index} className="feedback-card">
                <h2 className="user-name">{fb.fullName}</h2>
                <p><strong>Contact:</strong> {fb.contact}</p>
                <p><strong>Date:</strong> {fb.date}</p>
                <p><strong>Location:</strong> {fb.location}</p>
                <p><strong>Group Size:</strong> {fb.groupSize}</p>

                <h3>Ratings:</h3>
                <ul>
                  {Object.entries(fb.ratings).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>

                <p><strong>Comments:</strong> {fb.comments}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-feedbacks">No feedback submitted yet.</p>
        )}
      </div>

      <style>{`
        .feedbacks-page {
          padding: 40px 20px;
          min-height: 100vh;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          text-align: center;
          font-family: Arial, sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          color: #4a148c;
          margin-bottom: 10px;
        }

        .feedback-count {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .feedbacks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          justify-items: center;
        }

        .feedback-card {
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 350px;
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .feedback-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .user-name {
          font-size: 1.6rem;
          font-weight: 700;
          color: #7c3aed;
          margin-bottom: 10px;
        }

        .feedback-card p, .feedback-card ul {
          font-size: 1rem;
          color: #333;
          margin: 5px 0;
        }

        .feedback-card ul {
          padding-left: 20px;
        }

        .no-feedbacks {
          font-size: 1.3rem;
          color: #555;
        }

        @media (max-width: 500px) {
          .feedbacks-page {
            padding: 20px 10px;
          }
        }
      `}</style>
    </>
  );
};

export default ViewFeedback;
