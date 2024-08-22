import React, { useState } from "react";
import axios from "axios";

const ProjectReviewMarks = () => {
  const [studentId, setStudentId] = useState("");
  const [projectReviewMarks, setProjectReviewMarks] = useState("");

   const updateMarks = async () => {
     try {
       const token = localStorage.getItem("token");
       const response = await fetch(
         `http://localhost:8000/api/v1/upload/marks-update/${studentId}`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`, // Use the token from localStorage
           },
           body: JSON.stringify({ projectReviewMarks }),
           credentials: "include", // Include cookies
         }
       );

       if (response.ok) {
         alert("Marks updated successfully!");
       } else {
         throw new Error("Failed to update marks");
       }
     } catch (error) {
       console.error("Error updating marks:", error);
     }
   };

  return (
    <div>
      <h2>Update Project Review Marks</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="number"
        min="0"
        max="100"
        placeholder="Project Review Marks"
        value={projectReviewMarks}
        onChange={(e) => setProjectReviewMarks(e.target.value)}
      />
      <button onClick={updateMarks}>Update Marks</button>
    </div>
  );
};

export default ProjectReviewMarks;
