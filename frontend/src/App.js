
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import Results from "./components/Results";
import About from "./components/About.js"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
     localStorage.getItem("token") !== null
   );
      const handleLoginStatusChange = () => {
        setIsAdminLoggedIn(localStorage.getItem("token") !== null);
      };
  return (
    // <div className="App">
    <div>
      <BrowserRouter>
        <NavigationBar isAdminLoggedIn={isAdminLoggedIn} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/admin-login"
            element={
              <AdminLogin handleLoginStatusChange={handleLoginStatusChange} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <AdminDashboard
                handleLoginStatusChange={handleLoginStatusChange}
              />
            }
          />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
    // </div>
  );
}

export default App;
