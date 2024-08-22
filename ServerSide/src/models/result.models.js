import mongoose, { Schema } from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    attendanceMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    projectReviewMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    assessmentMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    projectSubmissionMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    linkedinPostMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export const StudentMarks= mongoose.model("StudentMarks", resultSchema);