import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {  marksUploadHandler } from "../controllers/upload.controller.js";
import { updateMarksHandler } from "../controllers/update.controller.js";

const router = Router();

router.route("/marks-upload").post(verifyJWT, marksUploadHandler);

router.route("/marks-update/:studentId").put(verifyJWT, updateMarksHandler);

export default router; 