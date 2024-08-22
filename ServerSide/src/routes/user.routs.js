import { Router } from "express";
import {
  logoutUser,
  registerUser,
  loginUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountdetails,
} from "../controllers/user.controller.js";

// import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//secured rotut
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current_user").get(verifyJWT, getCurrentUser);
router.route("/update-acount").patch(verifyJWT, updateAccountdetails);


export default router;
