import React, { useRef, useState } from "react";
import axios from "axios";
import "./Results.css";

const Results = () => {
  const [studentId, setStudentId] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
const resultSectionRef = useRef(null);
  const handleSearch = async () => {
    if (!studentId) {
      setError("Please enter a valid Student ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/results/result/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError(
        "Failed to fetch results. Please check the Student ID and try again."
      );
    } finally {
      setLoading(false);
    }
  };
   const handlePrint = () => {
      const printContent = resultSectionRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); 
   };
    
  return (
    <div className="results-page">
      <div className="results-container">
        <h2>Check Your Results</h2>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {error && <p className="error-message">{error}</p>}

        {results && (
          <div ref={resultSectionRef} className="results-details">
            <h1 className="institute-name">Lucknow Institute of Technology</h1>
            <h3>Results for Student ID: {results.studentId}</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Obt.</th>
                  <th>Max</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Attendance Marks</td>
                  <td>{results.attendanceMarks}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Project Review Marks</td>
                  <td>{results.projectReviewMarks}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Assessment Marks</td>
                  <td>{results.assessmentMarks}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Project Submission Marks</td>
                  <td>{results.projectSubmissionMarks}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>LinkedIn Post Marks</td>
                  <td>{results.linkedinPostMarks}</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Total Marks</td>
                  <td>
                    {results.linkedinPostMarks +
                      results.projectSubmissionMarks +
                      results.assessmentMarks +
                      results.projectReviewMarks +
                      results.attendanceMarks}
                  </td>
                  <td>500</td>
                </tr>
                <tr>
                  <td>Percentage</td>
                  <td>
                    {(
                      (results.linkedinPostMarks +
                        results.projectSubmissionMarks +
                        results.assessmentMarks +
                        results.projectReviewMarks +
                        results.attendanceMarks) /
                      5
                    ).toFixed(2)}
                    %
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="result-actions">
              <button className="btn btn-success" onClick={handlePrint}>
                Print
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setResults(null);
              }}
              class="btn btn-link"
            >
              Check Another result
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;