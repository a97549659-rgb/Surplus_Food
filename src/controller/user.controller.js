console.log("Controller called");
import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
console.log("registeruser controller reached");

console.log("uploading avater to cloudinary");
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  //check if user already exixst   username,email
  // avatar   images
  // upload them to cloudinary
  // create user object-create entry in DB
  // remove password and refresh field
  // check user creation/ApiError.js
  // return response

  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User wih email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    //return res.status(500).json({ success: false, message: "Avatar upload failed" });
    throw new ApiError(400, "Avatar file is failed");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar: {
      url: avatar.url,
      public_id: avatar.public_id,
    },

    coverImage: {
      url: coverImage?.url || "",
      public_id: coverImage?.public_id || "",
    },
  });
  if (!user) {
    throw new ApiError(400, "something went wrong while registering");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken",
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went Wrong While registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));

  // res.status(200).json({
  //     message: "ök"
  // })
});

export { registerUser };
