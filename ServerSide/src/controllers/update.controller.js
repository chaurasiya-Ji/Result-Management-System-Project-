import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { StudentMarks } from "../models/result.models.js";
import { ApiError } from "../utils/ApiError.js";

export const updateMarksHandler = asyncHandler(async (req, res) => {
  const adminId = req.user?._id;
  const { studentId } = req.params;
  const {
    attendanceMarks,
    projectReviewMarks,
    assessmentMarks,
    projectSubmissionMarks,
    linkedinPostMarks,
  } = req.body;

  // Check if the user is an admin
  const admin = await User.findById(adminId);
  console.log(admin);
  console.log(adminId);
  console.log(studentId);
   
  
  
  if (!admin) {
    throw new ApiError(403, "You do not have permission to update marks.");
  }

  // Find the student by ID and update the marks
  const student = await StudentMarks.findOne({ studentId });
  if (!student) {
    throw new ApiError(404, "Student not found.");
  }

  if (attendanceMarks !== undefined) student.attendanceMarks = attendanceMarks;
  if (projectReviewMarks !== undefined)
    student.projectReviewMarks = projectReviewMarks;
  if (assessmentMarks !== undefined) student.assessmentMarks = assessmentMarks;
  if (projectSubmissionMarks !== undefined)
    student.projectSubmissionMarks = projectSubmissionMarks;
  if (linkedinPostMarks !== undefined)
    student.linkedinPostMarks = linkedinPostMarks;

  await student.save();

  res.status(200).json({ message: "Marks updated successfully!", student });
});
