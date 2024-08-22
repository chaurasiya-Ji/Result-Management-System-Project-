import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  {StudentMarks}  from "../models/result.models.js";

// Controller to fetch results by studentId
export const getResultsByStudentId = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    throw new ApiError(400, "Student ID is required");
  }

  // Find the result by studentId
  const result = await StudentMarks.findOne({ studentId });

  if (!StudentMarks) {
    throw new ApiError(404, "No results found for this student ID");
  }

  // Return the result
  return res.status(200).json(result);
});
