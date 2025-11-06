import React, { useState, useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";

const Tourists = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, touristToEdit } = location.state || { city: "Selected City" };

  // Form state
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [timings, setTimings] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("Open");
  const [image, setImage] = useState(null);
  const [touristsList, setTouristsList] = useState([]);

  // Load tourist spots from localStorage and prefill form if editing
  useEffect(() => {
    const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
    const cityTourists = storedTourists.filter(t => t.city === city);
    setTouristsList(cityTourists);

    if (touristToEdit) {
      setType(touristToEdit.type || "");
      setName(touristToEdit.name || "");
      setAddress(touristToEdit.address || "");
      setContact(touristToEdit.contact || "");
      setTimings(touristToEdit.timings || "");
      setRating(touristToEdit.rating || "");
      setStatus(touristToEdit.status || "Open");
      setImage(touristToEdit.image || null);
    }
  }, [city, touristToEdit]);

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
    const newTourist = {
      id: touristToEdit ? touristToEdit.id : Date.now(),
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

    const storedTourists = JSON.parse(localStorage.getItem("tourists")) || [];
    const updatedTourists = touristToEdit
      ? storedTourists.map((t) => (t.id === touristToEdit.id ? newTourist : t))
      : [...storedTourists, newTourist];

    localStorage.setItem("tourists", JSON.stringify(updatedTourists));
    setTouristsList(updatedTourists.filter(t => t.city === city));

    // Reset form
    setType("");
    setName("");
    setAddress("");
    setContact("");
    setTimings("");
    setRating("");
    setStatus("Open");
    setImage(null);

    alert(`Tourist spot ${touristToEdit ? "updated" : "added"} successfully!`);
  };

  const handleViewAll = () => {
    navigate("/ViewTourists", { state: { city } });
  };

  return (
    <div className="tourists-page">
      <h1 className="page-heading">{touristToEdit ? "Edit" : "Add"} Tourist Spot in {city}</h1>

      <form className="tourist-form" onSubmit={handleSubmit}>
        <label>
          Type of Spot:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="" disabled>Select Type</option>
            <option value="Historical">Historical</option>
            <option value="Recreational">Recreational</option>
            <option value="Natural">Natural</option>
          </select>
        </label>

        <label>
          Name of Spot:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>

        <label>
          Contact (phone/email):
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </label>

        <label>
          Timings:
          <input type="text" value={timings} onChange={(e) => setTimings(e.target.value)} placeholder="e.g., 9:00 AM - 6:00 PM" required />
        </label>

        <label>
          Rating (optional):
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="0" max="5" step="0.1" placeholder="0 - 5" />
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

        <button type="submit">{touristToEdit ? "Update" : "Add"} Spot</button>
      </form>

      <button className="view-btn" onClick={handleViewAll}>View All Tourist Spots</button>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <style>{`
        .tourists-page { padding: 80px 20px; min-height: 90vh; text-align: center; background: linear-gradient(135deg, #f0f7ff, #e0f7fa); }
        .page-heading { font-size: 2.5rem; margin-bottom: 40px; }
        .tourist-form { display: flex; flex-direction: column; max-width: 500px; margin: 0 auto 20px; gap: 20px; background: #fff; padding: 30px; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .tourist-form label { display: flex; flex-direction: column; text-align: left; font-weight: bold; color: #333; }
        .tourist-form input, .tourist-form select { padding: 10px; margin-top: 5px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; }
        .tourist-form button { padding: 12px; border: none; border-radius: 10px; background-color: #28a745; color: #fff; font-weight: bold; cursor: pointer; transition: 0.3s ease; }
        .tourist-form button:hover { background-color: #1e7e34; }
        .view-btn { margin: 10px auto 30px; display: block; padding: 12px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; }
        .view-btn:hover { background-color: #0056b3; }
        .back-btn { padding: 10px 20px; border: none; border-radius: 8px; background-color: #007bff; color: #fff; font-weight: bold; cursor: pointer; }
        .back-btn:hover { background-color: #0056b3; }
      `}</style>
    </div>
  );
};

export default Tourists;
