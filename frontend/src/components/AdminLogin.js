import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = ({ handleLoginStatusChange }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });
      

      const data = await response.json();
      

      if (response.ok) {
       
        localStorage.setItem("token", data.accessToken); 
        handleLoginStatusChange()
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
const handleform=(event)=>{
  event.preventDefault();
}
  return (
    <>
      <div className="container text-light">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-12 my-con">
            <h2 className="text-center mt-4 text-primary">Admin Login</h2>
            <form onSubmit={handleform}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                />
               
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button
                className="btn btn-primary btn-lg w-100 mb-3 mt-3"
                onClick={handleLogin}
              >
                LogIn
              </button>
              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </div>
      </div>


    </>
  );
};

export default AdminLogin;
