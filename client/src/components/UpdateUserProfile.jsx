import React, { useState, useEffect } from "react";

const allLanguages = [
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
  "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", 
  "Maithili", "Sanskrit", "Kashmiri", "Nepali", "Sindhi", "Dogri", 
  "Manipuri", "Bodo", "Santhali", "French", "Spanish", "German", 
  "Italian", "Chinese", "Japanese", "Korean", "Russian", "Arabic",
  "Portuguese", "Swahili", "Turkish", "Vietnamese", "Dutch", "Greek"
];

const allOccupations = [
  "Software Engineer", "Doctor", "Teacher", "Student", "Artist", "Lawyer",
  "Engineer", "Nurse", "Farmer", "Scientist", "Business Owner", "Musician",
  "Writer", "Driver", "Chef"
];

const allGenders = ["Male", "Female", "Other"];
const allBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const allMaritalStatus = ["Single", "Married", "Divorced", "Widowed"];

const UpdateUserProfile = ({ onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    profilePic: null,
    username: "",
    name: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodType: "",
    maritalStatus: "",
    languages: [],
    occupation: "",
    placeOfBirth: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setFormData(currentUser);
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === "languages") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          languages: [...prev.languages, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          languages: prev.languages.filter((lang) => lang !== value),
        }));
      }
    } else if (name === "dob") {
      const birthDate = new Date(value);
      const ageDifMs = Date.now() - birthDate.getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      setFormData((prev) => ({ ...prev, dob: value, age }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("currentUser", JSON.stringify(formData));

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedUsers = users.map((u) =>
      u.username === formData.username ? { ...formData } : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
    if (onProfileUpdate) onProfileUpdate(formData);
  };

  return (
    <div className="update-profile-container">
      <h1 className="update-title">Update Your Profile</h1>
      <form className="update-profile-form" onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" name="profilePic" onChange={handleChange} />
        </label>

        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        <label>
          Full Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <div style={{ display: "flex", gap: "15px" }}>
          <label style={{ flex: 1 }}>
            Date of Birth:
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          </label>
          <label style={{ flex: 1 }}>
            Age:
            <input type="number" name="age" value={formData.age} readOnly />
          </label>
        </div>

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            {allGenders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <label>
          Blood Type:
          <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
            <option value="">Select Blood Type</option>
            {allBloodTypes.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label>
          Marital Status:
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select Marital Status</option>
            {allMaritalStatus.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>

        <label>
          Languages Spoken:
          <div className="languages-container">
            {allLanguages.map((lang) => (
              <label key={lang} className="language-checkbox">
                <input
                  type="checkbox"
                  name="languages"
                  value={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={handleChange}
                />
                {lang}
              </label>
            ))}
          </div>
          <p>Selected ({formData.languages.length}): {formData.languages.join(", ")}</p>
        </label>

        <label>
          Occupation:
          <select name="occupation" value={formData.occupation} onChange={handleChange}>
            <option value="">Select Occupation</option>
            {allOccupations.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>

        <label>
          Place of Birth:
          <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
        </label>

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>

      <style>{`
        .update-profile-container {
          max-width: 900px;
          margin: 50px auto;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          color: #4a4a4a;
        }

        .update-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: #000000ff;
        }

        .update-profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 500;
        }

        input, select {
          margin-top: 8px;
          padding: 12px;
          border: 1px solid #dcdcdc;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: #faf0f8;
        }

        input:focus, select:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
          background-color: #fbfbfbff;
        }

        .languages-container {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ccc;
          border-radius: 12px;
          padding: 10px;
          background-color: #fffaf5;
          display: flex;
          flex-direction: column;
        }

        .language-checkbox {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
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
          .update-profile-container {
            padding: 25px;
          }

          .update-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UpdateUserProfile;
