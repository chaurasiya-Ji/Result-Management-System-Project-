import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceMarks from "./AttendanceMarks";
import ProjectReviewMarks from "./ProjectReviewMarks";
import AssessmentMarks from "./AssessmentMarks";
import ProjectSubmissionMarks from "./ProjectSubmissionMarks";
import LinkedInPostMarks from "./LinkedInPostMarks";
import FileUpload from "./FileUpload";
import "../App.css"; 
import LogoutButton from "./LogoutButton";
import './AdminDashboard.css'


const AdminDashboard = ({handleLoginStatusChange}) => {
  const [activeTab, setActiveTab] = useState("attendance");
const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

 
  return (
    <>
      <div className="btn btn-danger logOutBtn">
        <LogoutButton handleLoginStatusChange={handleLoginStatusChange} />
      </div>
      <div className="dashboard-container">
        <h1 className="text-light">Admin Dashboard</h1>

        <div className="tabs  m-3 ">
          <button
            className={activeTab === "attendance" ? "active" : ""}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance Marks
          </button>
          <button
            className={activeTab === "projectReview" ? "active" : ""}
            onClick={() => setActiveTab("projectReview")}
          >
            Project Review Marks
          </button>
          <button
            className={activeTab === "assessment" ? "active" : ""}
            onClick={() => setActiveTab("assessment")}
          >
            Assessment Marks
          </button>
          <button
            className={activeTab === "projectSubmission" ? "active" : ""}
            onClick={() => setActiveTab("projectSubmission")}
          >
            Project Submission Marks
          </button>
          <button
            className={activeTab === "linkedinPost" ? "active" : ""}
            onClick={() => setActiveTab("linkedinPost")}
          >
            LinkedIn Post Marks
          </button>
          <button
            className={activeTab === "upload" ? "active" : ""}
            onClick={() => setActiveTab("upload")}
          >
            Upload Marks
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "attendance" && <AttendanceMarks />}
          {activeTab === "projectReview" && <ProjectReviewMarks />}
          {activeTab === "assessment" && <AssessmentMarks />}
          {activeTab === "projectSubmission" && <ProjectSubmissionMarks />}
          {activeTab === "linkedinPost" && <LinkedInPostMarks />}
          {activeTab === "upload" && <FileUpload />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
