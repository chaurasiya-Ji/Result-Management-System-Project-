
import React from "react";

import './Home.css'
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="my-nav bg-primary"> 
        <h2>LATEST NEWS</h2>
      </div>
      <div className="container">
        <div className="side-left ">
          <h2>Current Events</h2>
          <div className="inner-left">
            <ul typeof="">
              <li>No post to display</li>
            </ul>
          </div>
        </div>
        
        <div className="side-right">
          <h2>2024 Results</h2>
          <div className="inner-right">
            <p>Click here to view a 2024 result</p>
            <Link to="/results">Results</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
