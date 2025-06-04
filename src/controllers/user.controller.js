import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { User } from '../models/user.model.js';
import { UploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';
import { UploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';



const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username } = req.body
    console.log("fullName :", fullName);
    console.log("email :", email);

    if (
        [fullName, email, password, username].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }


    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })


    if (existedUser) {
        throw new ApiError(400, "Username or email already exists");
    }

    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalpath){
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await UploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(500, "Failed to upload avatar");
    }


    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.tolowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Failed to create user");
    }

    return response.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")   
    )

})

export { registerUser };