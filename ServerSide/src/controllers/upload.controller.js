import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

import { uplodeCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { StudentMarks } from "../models/result.models.js";
import XLSX from "xlsx";

import { upload } from "../middlewares/multer.middleware.js";
 
const marksUpload = asyncHandler(async (req, res) => {
  try {
    const admin = await User.findById(req.user?._id);
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Read the Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Process the data and save to MongoDB
    const students = worksheet.map((row) => ({
      studentId: row["Student Id"],
      attendanceMarks: row["Attendance Marks"],
      projectReviewMarks: row["Project Review Marks"],
      assessmentMarks: row["Assessment Marks"],
      projectSubmissionMarks: row["Project Submission Marks"],
      linkedinPostMarks: row["LinkedIn Post Marks"],
    }));
    // console.log(students);

    await StudentMarks.insertMany(students);

    res.send("Marks uploaded successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading marks");
  }
}); 

export const marksUploadHandler = [
  upload.single("file"), // Multer middleware to handle the file upload
  marksUpload,
];