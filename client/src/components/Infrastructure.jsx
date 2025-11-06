import React, { useState, useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";

const Infrastructure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, infraToEdit } = location.state || { city: "Selected City" };

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Operational");
  const [image, setImage] = useState(null);
  const [infraList, setInfraList] = useState([]);

  useEffect(() => {
    const storedInfra = JSON.parse(localStorage.getItem("Infrastructure")) || [];
    const cityInfra = storedInfra.filter(i => i.city === city);
    setInfraList(cityInfra);

    if (infraToEdit) {
      setType(infraToEdit.type || "");
      setName(infraToEdit.name || "");
      setAddress(infraToEdit.address || "");
      setStatus(infraToEdit.status || "Operational");
      setImage(infraToEdit.image || null);
    }
  }, [city, infraToEdit]);

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
    const newInfra = {
      id: infraToEdit ? infraToEdit.id : Date.now(),
      city,
      type,
      name,
      address,
      status,
      image,
    };

    const storedInfra = JSON.parse(localStorage.getItem("Infrastructure")) || [];
    const updatedInfra = infraToEdit
      ? storedInfra.map((i) => (i.id === infraToEdit.id ? newInfra : i))
      : [...storedInfra, newInfra];

    localStorage.setItem("Infrastructure", JSON.stringify(updatedInfra));
    setInfraList(updatedInfra.filter(i => i.city === city));

    // Reset form
    setType("");
    setName("");
    setAddress("");
    setStatus("Operational");
    setImage(null);

    alert(`Infrastructure ${infraToEdit ? "updated" : "added"} successfully!`);
  };

  const handleViewAll = () => {
    navigate("/ViewInfrastructure", { state: { city } });
  };

  return (
    <div className="infra-page">
      <h1 className="page-heading">{infraToEdit ? "Edit" : "Add"} Infrastructure in {city}</h1>

      <form className="infra-form" onSubmit={handleSubmit}>
        <label>
          Type of Infrastructure:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="" disabled>Select Type</option>
            <option value="Road">Road</option>
            <option value="Bridge">Bridge</option>
            <option value="Public Building">Public Building</option>
            <option value="Utility">Utility</option>
          </select>
        </label>

        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Operational">Operational</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit">{infraToEdit ? "Update" : "Add"} Infrastructure</button>
      </form>

      <button className="view-btn" onClick={handleViewAll}>View All Infrastructure</button>
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <style>{`
        .infra-page { padding: 80px 20px; min-height: 90vh; text-align: center; background: linear-gradient(135deg, #f9f0ff, #e0f7fa); }
        .page-heading { font-size: 2.5rem; margin-bottom: 40px; }
        .infra-form { display: flex; flex-direction: column; max-width: 500px; margin: 0 auto 20px; gap: 20px; background: #fff; padding: 30px; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .infra-form label { display: flex; flex-direction: column; text-align: left; font-weight: bold; color: #333; }
        .infra-form input, .infra-form select { padding: 10px; margin-top: 5px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; }
        .infra-form button { padding: 12px; border: none; border-radius: 10px; background-color: #28a745; color: #fff; font-weight: bold; cursor: pointer; transition: 0.3s ease; }
        .infra-form button:hover { background-color: #1e7e34; }
        .view-btn { margin: 10px auto 30px; display: block; padding: 12px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; }
        .view-btn:hover { background-color: #0056b3; }
        .back-btn { padding: 10px 20px; border: none; border-radius: 8px; background-color: #007bff; color: #fff; font-weight: bold; cursor: pointer; }
        .back-btn:hover { background-color: #0056b3; }
      `}</style>
    </div>
  );
};

export default Infrastructure;
