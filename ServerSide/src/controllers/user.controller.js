import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    console.log(accessToken, refreshToken);
    return { accessToken, refreshToken };
    
  } catch (error) {
    throw new ApiError(
      500,
      "somthing went wrong while genreting acces token and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user deatils from frontend
  //validation - not empty
  //check if user already exist : username or email
  //check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - cereat enter in db
  //// remove password and refresh token  feild fromr respons
  // check for user creation
  // return res

  const { fullName, username, email, password } = req.body;
  console.log(req.body);
  

    console.log("fullName= ",fullName, "Email= ", email, password);

  if (
    [fullName, email, username, password].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All feids are rquired");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User email or username already exist");
  }
  


  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Somting went wrong while user created");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body->data
  //username or email
  //find the user
  // pasword check
  //access and refresh token
  // send cookies

  const { username, email, password } = req.body;
  console.log("loged in username -", username);
  

  if (!(username || email)) {
    throw new ApiError(400, "Username or Email required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User dose not exist");
  }

  const isPasswordValid = await user.isPasswordCorret(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password invalid");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  };
  return res
    .setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    .setHeader("Access-Control-Allow-Credentials", "true")
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User logged in successfully",
      user: loggedInUser,
      accessToken, // Ensure this is sent in the response body
      refreshToken, // Optional: Include if needed on client-side
    });
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout Succesfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unautohorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "unautohorized request");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expire");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await generateAccessAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accesToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "Acces Token refresh "
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorret(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(404, "invelid password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password chande succesfully"));
});

const updateAccountdetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!(fullName || email)) {
    throw new ApiError(401, "All felides required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Acount updated succesfull"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched succesfully"));
});


export {
  refreshAccessToken,
  changeCurrentPassword,
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountdetails,

};
