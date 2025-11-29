import React, { useState, useEffect } from "react";

const allLanguages = ["English","Hindi","Bengali","Telugu","Marathi","Tamil","Urdu","Gujarati","Kannada","Odia","Malayalam","Punjabi","Assamese","Maithili","Sanskrit","Kashmiri","Nepali","Sindhi","Dogri","Manipuri","Bodo","Santhali","French","Spanish","German","Italian","Chinese","Japanese","Korean","Russian","Arabic","Portuguese","Swahili","Turkish","Vietnamese","Dutch","Greek"];
const allOccupations = ["Software Engineer","Doctor","Teacher","Student","Artist","Lawyer","Engineer","Nurse","Farmer","Scientist","Business Owner","Musician","Writer","Driver","Chef"];
const allGenders = ["Male", "Female", "Other"];
const allBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const allMaritalStatus = ["Single", "Married", "Divorced", "Widowed"];

const UpdateUserProfile = () => {
  const defaultData = {
    profilePic: "",
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
  };

  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFormData({ ...defaultData, ...currentUser }); // merge with defaults
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else if (name === "languages") {
      if (checked) {
        setFormData((prev) => ({ ...prev, languages: [...prev.languages, value] }));
      } else {
        setFormData((prev) => ({ ...prev, languages: prev.languages.filter(l => l !== value) }));
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
    const updatedUsers = users.map(u => u.username === formData.username ? { ...formData } : u);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Profile updated successfully!");
  };

  return (
    <div className="update-profile-container">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
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

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={formData.age} readOnly />
        </label>

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            {allGenders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </label>

        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>

        <label>
          Blood Type:
          <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
            <option value="">Select Blood Type</option>
            {allBloodTypes.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label>
          Marital Status:
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
            <option value="">Select Marital Status</option>
            {allMaritalStatus.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>

        <label>
          Languages:
          <div style={{ maxHeight: "150px", overflowY: "scroll", border: "1px solid #ccc", padding: "5px" }}>
            {allLanguages.map(lang => (
              <label key={lang} style={{ display: "block" }}>
                <input type="checkbox" name="languages" value={lang} checked={formData.languages.includes(lang)} onChange={handleChange} />
                {lang}
              </label>
            ))}
          </div>
        </label>

        <label>
          Occupation:
          <select name="occupation" value={formData.occupation} onChange={handleChange}>
            <option value="">Select Occupation</option>
            {allOccupations.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>

        <label>
          Place of Birth:
          <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
        </label>

        <button type="submit">Save Changes</button>
      </form>

      <style>{`
        .update-profile-container {
          max-width: 700px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #fce1f3, #e0f7fa);
          text-align: left;
        }

        h1 {
          text-align: center;
          color: #4a148c;
          margin-bottom: 25px;
        }

        form label {
          display: block;
          margin-bottom: 15px;
          font-weight: 500;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        button {
          display: block;
          margin: 20px auto 0;
          padding: 12px 25px;
          background: linear-gradient(135deg, #a78bfa, #d6bcf5);
          border: none;
          border-radius: 12px;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background: linear-gradient(135deg, #7c3aed, #c084fc);
        }
      `}</style>
    </div>
  );
};

export default UpdateUserProfile;
