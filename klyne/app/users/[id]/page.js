"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUsers } from "../../context/UsersContext";
import "./user-detail.css";

export default function UserDetailPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const { users, loading, updateUser, deleteUser } = useUsers();
  
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [statusMessage, setStatusMessage] = useState("");

  // Find user when context loads or ID changes
  useEffect(() => {
    if (!loading) {
      const foundUser = users.find((u) => u.id === parseInt(id));
      if (foundUser) {
        setUser(foundUser);
        setFormData({ name: foundUser.name, email: foundUser.email });
      } else {
        // If not in context, try to fetch directly (fallback)
        fetchUserDirectly();
      }
    }
  }, [id, users, loading]);

  const fetchUserDirectly = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFormData({ name: data.name, email: data.email });
      } else {
        setStatusMessage("User not found.");
      }
    } catch (error) {
      setStatusMessage("Error fetching user.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage("Updating...");
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: parseInt(id),
          name: formData.name,
          email: formData.email,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (response.ok) {
        // Update local context
        updateUser(id, { name: formData.name, email: formData.email });
        setUser((prev) => ({ ...prev, name: formData.name, email: formData.email }));
        setStatusMessage("User updated successfully!");
        setIsEditing(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setStatusMessage(""), 3000);
      } else {
        setStatusMessage("Failed to update user.");
      }
    } catch (error) {
      setStatusMessage("Error updating user.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        deleteUser(id);
        router.push("/users");
      } else {
        setStatusMessage("Failed to delete user.");
      }
    } catch (error) {
      setStatusMessage("Error deleting user.");
    }
  };

  if (loading || !user) {
    return <div className="loading animate-fade-in">{statusMessage || "Loading user profile..."}</div>;
  }

  return (
    <div className="animate-fade-in">
      <Link href="/users" className="back-link">
        ← Back to Directory
      </Link>

      <div className="detail-card">
        {!isEditing ? (
          <>
            <div className="header-row">
              <div>
                <h1 className="user-name-large">{user.name}</h1>
                <p className="user-email-large">{user.email}</p>
              </div>
              <div className="actions-row">
                <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
            {/* You could display more user details here if needed */}
          </>
        ) : (
          <form className="edit-form" onSubmit={handleUpdate}>
            <div className="header-row" style={{ marginBottom: '16px', paddingBottom: '0', borderBottom: 'none' }}>
              <h1 className="user-name-large" style={{ fontSize: '20px' }}>Edit User Profile</h1>
            </div>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
        
        {statusMessage && (
          <div className={`message ${statusMessage.includes("Error") || statusMessage.includes("Failed") ? "error-message" : ""}`}>
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
