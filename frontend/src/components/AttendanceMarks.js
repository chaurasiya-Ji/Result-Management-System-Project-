import React, { useState } from "react";
import axios from "axios";

const AttendanceMarks = () => {
  const [studentId, setStudentId] = useState("");
  const [attendanceMarks, setAttendanceMarks] = useState("");
  const token = localStorage.getItem("token"); // Get token from local storage

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
          body: JSON.stringify({ attendanceMarks }),
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
      <h2>Update Attendance Marks</h2>
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
        placeholder="Attendance Marks"
        value={attendanceMarks}
        onChange={(e) => setAttendanceMarks(e.target.value)}
      />
      <button className="btn btn-dark" onClick={updateMarks}>Update Marks</button>
    </div>
  );
};

export default AttendanceMarks;
