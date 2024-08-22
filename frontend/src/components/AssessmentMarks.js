import React, { useState } from "react";
import axios from "axios";

const AssessmentMarks = () => {
  const [studentId, setStudentId] = useState("");
  const [assessmentMarks, setAssessmentMarks] = useState("");

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
           body: JSON.stringify({ assessmentMarks }),
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
      <h2>Update Assessment Marks</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Assessment Marks"
        value={assessmentMarks}
        min="0"
        max="100"
        onChange={(e) => setAssessmentMarks(e.target.value)}
      />
    
      <button onClick={updateMarks}>Update Marks</button>
    </div>
  );
};

export default AssessmentMarks;
