import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setUsers(storedUsers.reverse());
  }, []);

  // Toggle selection of a user
  const toggleSelectUser = (index) => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== index));
    } else {
      setSelectedUsers([...selectedUsers, index]);
    }
  };

  // Delete selected users
  const deleteSelectedUsers = () => {
    const updatedUsers = users.filter((_, index) => !selectedUsers.includes(index));
    setUsers(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers.reverse()));
    setSelectedUsers([]);
    setEditMode(false);
  };

  return (
    <>
      <div className="users-page">
        <h1>Registered Users</h1>
        <p className="user-count">Total Users: {users.length}</p>

        <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel" : "Edit Users"}
        </button>

        {editMode && selectedUsers.length > 0 && (
          <button className="delete-btn" onClick={deleteSelectedUsers}>
            Delete Selected Users
          </button>
        )}

        {users.length > 0 ? (
          <div className="users-grid">
            {users.map((user, index) => (
              <div
                key={index}
                className={`user-card ${editMode && selectedUsers.includes(index) ? "selected" : ""}`}
                onClick={() => editMode && toggleSelectUser(index)}
              >
                <h2 className="user-name">{user.username}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {"•".repeat(user.password.length)}</p>
                <p><strong>Agreed to Terms:</strong> {user.terms ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-users">No registered users found.</p>
        )}
      </div>

      <style>{`
        .users-page {
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

        .user-count {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .edit-btn, .delete-btn {
          padding: 10px 15px;
          margin: 10px 5px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        .edit-btn {
          background-color: #7c3aed;
          color: white;
        }

        .edit-btn:hover {
          background-color: #5a1fae;
        }

        .delete-btn {
          background-color: #e53935;
          color: white;
        }

        .delete-btn:hover {
          background-color: #ab000d;
        }

        .users-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          justify-items: center;
        }

        .user-card {
          background: #fff;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 300px;
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
          cursor: ${editMode ? "pointer" : "default"};
          border: 2px solid transparent;
        }

        .user-card.selected {
          border: 2px solid #e53935;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .user-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .user-name {
          font-size: 1.6rem;
          font-weight: 700;
          color: #7c3aed;
          margin-bottom: 10px;
        }

        .user-card p {
          font-size: 1rem;
          color: #333;
          margin: 5px 0;
        }

        .no-users {
          font-size: 1.3rem;
          color: #555;
        }

        @media (max-width: 500px) {
          .users-page {
            padding: 20px 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Users;
