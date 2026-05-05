"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UsersContext = createContext();

// Create a custom hook to use the context easily
export const useUsers = () => {
  return useContext(UsersContext);
};

// Provider component that wraps our app
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial users from JSONPlaceholder on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Update user in local state
  const updateUser = (id, updatedData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === parseInt(id) ? { ...user, ...updatedData } : user))
    );
  };

  // Delete user from local state
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== parseInt(id)));
  };

  return (
    <UsersContext.Provider value={{ users, loading, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};
