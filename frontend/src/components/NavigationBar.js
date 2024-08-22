// src/components/NavigationBar.js
import React from "react";
import { Link,  } from "react-router-dom";
import "./NavigationBar.css"
const NavigationBar = ({ isAdminLoggedIn }) => {
  

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary
       bg-dark border-bottom border-body "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              {!isAdminLoggedIn && (
                <li className="nav-item">
                  <Link to="/admin-login" className="nav-link">
                    Admin Login
                  </Link>
                </li>
              )}
              {isAdminLoggedIn && (
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/results" className="nav-link">
                  Results
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
