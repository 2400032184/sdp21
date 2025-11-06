import React from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect feedback from form fields
    const feedback = {
      fullName: e.target[0].value,
      contact: e.target[1].value,
      date: e.target[2].value,
      location: e.target[3].value,
      groupSize: e.target[4].value,
      ratings: {
        Infrastructure: e.target[5].value,
        Facilities: e.target[6].value,
        Cleanliness: e.target[7].value,
        Safety: e.target[8].value,
        Accessibility: e.target[9].value,
      },
      comments: e.target[10].value,
    };

    // Get existing feedbacks from localStorage
    const storedFeedbacks = JSON.parse(localStorage.getItem("userFeedbacks")) || [];

    // Add new feedback
    storedFeedbacks.push(feedback);

    // Save updated feedback list
    localStorage.setItem("userFeedbacks", JSON.stringify(storedFeedbacks));

    // Redirect to thank you page
    navigate("/Thank");
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Your Feedback Matters</h1>
      <p className="feedback-subtitle">
        Help us improve the <b>Smart City experience</b> by sharing your valuable feedback.
      </p>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" placeholder="Enter your full name" required />
        </label>

        <label>
          Email address and/or Phone number:
          <input type="text" placeholder="Enter email or phone" required />
        </label>

        <label>
          Date of Feedback:
          <input type="date" required />
        </label>

        <label>
          Location/Area Visited:
          <input type="text" placeholder="e.g., Smart Park, Downtown Hub" required />
        </label>

        <label>
          Number of People in Your Group:
          <input type="number" placeholder="e.g., 2" min="1" required />
        </label>

        <h2 className="rating-heading">Please rate the following:</h2>
        <div className="ratings-grid">
          {["Infrastructure", "Facilities", "Cleanliness", "Safety", "Accessibility"].map(
            (item) => (
              <label key={item}>
                {item}
                <select required>
                  <option value="">Select</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Poor</option>
                </select>
              </label>
            )
          )}
        </div>

        <label>
          Your Comments or Suggestions:
          <textarea placeholder="Share your thoughts..." required></textarea>
        </label>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>

      {/* Inline CSS */}
      <style>{`
        .feedback-container {
          max-width: 800px;
          margin: 50px auto;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          color: #4a4a4a;
        }

        .feedback-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #000000ff;
        }

        .feedback-subtitle {
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 30px;
          color: #000000ff;
        }

        .feedback-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
        }

        input, select, textarea {
          margin-top: 8px;
          padding: 12px;
          border: 1px solid #dcdcdc;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: #faf0f8;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
          background-color: #fbfbfbff;
        }

        .rating-heading {
          margin-top: 20px;
          font-size: 1.3rem;
          font-weight: 600;
          color: #5e548e;
        }

        .ratings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-btn {
          padding: 14px 22px;
          background: linear-gradient(135deg, #a78bfa, #d6bcf5);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #7c3aed, #c084fc);
        }

        @media (max-width: 768px) {
          .feedback-container {
            padding: 25px;
          }

          .feedback-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Feedback;
