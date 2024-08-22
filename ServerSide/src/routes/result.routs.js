import { Router } from "express";

import { getResultsByStudentId } from "../controllers/showResult.controller.js";
const router = Router();


router.route("/result/:studentId").get(getResultsByStudentId);

export default router; 