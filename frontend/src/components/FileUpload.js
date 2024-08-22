import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const FileUpload = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      const response = await axios.post(
        "http://localhost:8000/api/v1/upload/marks-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h2>Upload Marks File</h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here, or click to select one</p>
      </div>
    </div>
  );
};

export default FileUpload;
