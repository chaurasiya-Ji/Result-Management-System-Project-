import React, { useState } from "react";


const LinkedInPostMarks = () => {
  const [studentId, setStudentId] = useState("");
  const [linkedinPostMarks, setLinkedinPostMarks] = useState("");

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
          body: JSON.stringify({ linkedinPostMarks }),
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
      <h2>Update LinkedIn Post Marks</h2>
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
        placeholder="LinkedIn Post Marks"
        value={linkedinPostMarks}
        onChange={(e) => setLinkedinPostMarks(e.target.value)}
      />
      <button onClick={updateMarks}>Update Marks</button>
    </div>
  );
};

export default LinkedInPostMarks;
