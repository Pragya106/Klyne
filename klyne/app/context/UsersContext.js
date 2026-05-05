"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UsersContext = createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const updateUser = (id, updatedData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === parseInt(id) ? { ...user, ...updatedData } : user))
    );
  };

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== parseInt(id)));
  };

  return (
    <UsersContext.Provider value={{ users, loading, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};
