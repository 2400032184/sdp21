import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Hospitals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, hospitalToEdit } = location.state || { city: "Selected City" };

  // Form state
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [timings, setTimings] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("Open");
  const [image, setImage] = useState(null);
  const [hospitalsList, setHospitalsList] = useState([]);

  // Load hospitals from localStorage and prefill form if editing
  useEffect(() => {
    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const cityHospitals = storedHospitals.filter(h => h.city === city);
    setHospitalsList(cityHospitals);

    if (hospitalToEdit) {
      setType(hospitalToEdit.type || "");
      setName(hospitalToEdit.name || "");
      setAddress(hospitalToEdit.address || "");
      setContact(hospitalToEdit.contact || "");
      setTimings(hospitalToEdit.timings || "");
      setRating(hospitalToEdit.rating || "");
      setStatus(hospitalToEdit.status || "Open");
      setImage(hospitalToEdit.image || null);
    }
  }, [city, hospitalToEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHospital = {
      id: hospitalToEdit ? hospitalToEdit.id : Date.now(),
      city,
      type,
      name,
      address,
      contact,
      timings,
      rating,
      status,
      image,
    };

    const storedHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const updatedHospitals = hospitalToEdit
      ? storedHospitals.map((h) => (h.id === hospitalToEdit.id ? newHospital : h))
      : [...storedHospitals, newHospital];

    localStorage.setItem("hospitals", JSON.stringify(updatedHospitals));
    setHospitalsList(updatedHospitals.filter(h => h.city === city));

    // Reset form
    setType("");
    setName("");
    setAddress("");
    setContact("");
    setTimings("");
    setRating("");
    setStatus("Open");
    setImage(null);

    alert(`Service ${hospitalToEdit ? "updated" : "added"} successfully!`);
  };

  const handleViewAll = () => {
    navigate("/ViewHospitals", { state: { city } });
  };

  return (
    <div className="hospitals-page">
      <h1 className="page-heading">{hospitalToEdit ? "Edit" : "Add"} Service in {city}</h1>

      <form className="hospital-form" onSubmit={handleSubmit}>
        <label>
          Type of Service:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="" disabled>Select Type</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Utilities">Utilities</option>
          </select>
        </label>

        <label>
          Name of Service:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          Contact (phone/email):
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>

        <label>
          Timings:
          <input
            type="text"
            value={timings}
            onChange={(e) => setTimings(e.target.value)}
            placeholder="e.g., 9:00 AM - 5:00 PM"
            required
          />
        </label>

        <label>
          Rating (optional):
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
            placeholder="0 - 5"
          />
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </label>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit">{hospitalToEdit ? "Update" : "Add"} Service</button>
      </form>

      <button className="view-btn" onClick={handleViewAll}>
        View All Services
      </button>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <style>{`
        .hospitals-page {
          padding: 80px 20px;
          min-height: 90vh;
          text-align: center;
          background: linear-gradient(135deg, #f0f7ff, #e0f7fa);
        }
        .page-heading {
          font-size: 2.5rem;
          margin-bottom: 40px;
        }
        .hospital-form {
          display: flex;
          flex-direction: column;
          max-width: 500px;
          margin: 0 auto 20px;
          gap: 20px;
          background: #fff;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .hospital-form label {
          display: flex;
          flex-direction: column;
          text-align: left;
          font-weight: bold;
          color: #333;
        }
        .hospital-form input, .hospital-form select {
          padding: 10px;
          margin-top: 5px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
        .hospital-form button {
          padding: 12px;
          border: none;
          border-radius: 10px;
          background-color: #28a745;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .hospital-form button:hover {
          background-color: #1e7e34;
        }
        .view-btn {
          margin: 10px auto 30px;
          display: block;
          padding: 12px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
        }
        .view-btn:hover {
          background-color: #0056b3;
        }
        .back-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
        }
        .back-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Hospitals;
