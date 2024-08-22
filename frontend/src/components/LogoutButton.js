import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LogoutButton.css";
const LogoutButton = ({handleLoginStatusChange}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await axios.post("http://localhost:8000/api/v1/users/logout", null, {
        withCredentials: true, // If using cookies for auth
      });

      // Clear the token from localStorage
      localStorage.removeItem("token");
      handleLoginStatusChange();
      navigate("/admin-login");
    } catch (error) {
      console.error("Error logging out:", error);
     
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    isLoggedIn && (
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    )
  );
};

export default LogoutButton;
