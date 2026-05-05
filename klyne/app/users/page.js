"use client";

import React from "react";
import Link from "next/link";
import { useUsers } from "../context/UsersContext";
import "./users.css";

export default function UsersPage() {
  const { users, loading } = useUsers();

  if (loading) {
    return <div className="loading animate-fade-in">Loading users...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="header">
        <h1 className="title">Directory</h1>
      </div>

      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-email">{user.email}</p>
            <div className="card-actions">
              <Link href={`/users/${user.id}`}>
                <button className="btn-secondary">View Profile</button>
              </Link>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="loading" style={{ gridColumn: "1 / -1" }}>
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
