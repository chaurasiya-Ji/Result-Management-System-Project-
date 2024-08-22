// src/components/NavigationBar.js
import React from "react";
import { Link,  } from "react-router-dom";
import "./NavigationBar.css"
const NavigationBar = ({ isAdminLoggedIn }) => {
  

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAdminLoggedIn && (
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
        )}
        {isAdminLoggedIn && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        <li>
          <Link to="/results">Results</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
