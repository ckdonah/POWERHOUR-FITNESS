import User from "../models/user.js";
import asyncHandler from "../config/asyncHandler.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import VerificationToken from "../models/verificationToken.js";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const { JWT_SECRET, PORT, RESEND_API_KEY } = process.env;


const signup = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
      picture: "default.jpg",

    });

    await newUser.save();

  res.status(201).json({ message: "Signup successful. Please check your email for verification." });


    // Create a verification token
    const token = crypto.randomUUID();
    const verificationToken = await VerificationToken.create({
      userId: newUser._id,
      token,
    });

    // Send a verification email
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "powerhour2024@outlook.com", // Make the email dynamic
      subject: "Please verify your account",
      html: `<h1>Hello ${firstName}</h1>
      <p>Click on the following link to verify your account: 
      <a href="http://localhost:${PORT}/user/verify/${token}">http://localhost:${PORT}/user/verify/${token}</a>
      </p>`,
    });
   
    // Send the response
    res.status(200).json({
      message: "Signup successful. Please check your email for verification.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    // Find the verification token in the database
    const verificationToken = await VerificationToken.findOne({ token });
    if (!verificationToken) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Mark the user as verified
    await User.findByIdAndUpdate(verificationToken.userId, {
      $set: { verified: true },
    });

    // Delete the verification token from the database
    await VerificationToken.findByIdAndDelete(verificationToken._id);

    // Send the response
    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});







const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.deleted) {
    return res.status(401).json({ message: "User has been deleted" });
  }

  if (!user.verified) {
    return res.status(401).json({
      message: "Please verify your email before logging in.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log('Generated Access Token:', accessToken);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    let dashboardUrl;
    switch (user.role) {
      case "admin":
        dashboardUrl = "/dashboard/admin";
        break;
      case "trainer":
        dashboardUrl = "/dashboard/trainer";
        break;
      case "member":
        dashboardUrl = "/dashboard/member";
        break;
      default:
        dashboardUrl = "/login";
    }

    res.status(200).json({ message: "Login successful.", accessToken, user, dashboardUrl });

  } else {
    res.status(401).json({ message: "Login failed due to invalid credentials" });
  }
});








const getProtected = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  // search for a user with the userId

  const user = await User.findById(userId);
  res.status(200).json({ data: user });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
});


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users", details: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user", details: error.message });
  }
};

const uploadPictureById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = req.file ? req.file.filename : null;

    if (!filePath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      picture: filePath,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ filePath });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile picture", details: error.message });
  }
});



const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      telephone,
      address,
      picture
    } = req.body;

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password: hashedPassword || undefined,
        telephone,
        address,
        picture
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user", details: error.message });
  }
});

// Handle file upload
const uploadProfilePicture = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    res.status(200).json({ filePath });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file", details: error.message });
  }
});




const getPictureById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findOne({ _id: id });
    console.log(user);
    const picturePath = path.join(__dirname, `../uploads/${user.picture}`);

    // console.log(picturePath)
    // console.log(user.picture);
    res.sendFile(picturePath);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.deleted = true;
    await user.save();

    res.json({ message: 'User marked as deleted', user });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user", details: error.message });
  }
};





// Example of admin dashboard data endpoint
const getAdminDashboardData = asyncHandler(async (req, res) => {
  // Fetch relevant data for admin dashboard
  const membersCount = await User.countDocuments({ role: 'member' });
  const trainersCount = await User.countDocuments({ role: 'trainer' });
  const classesCount = 50; // Example data, replace with actual data fetching

  res.status(200).json({
    membersCount,
    trainersCount,
    classesCount,
  });
});

// Example of trainer dashboard data endpoint
const getTrainerDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  // Fetch relevant data for trainer dashboard
  const assignedMembers = await User.find({ assignedTrainer: userId });
  const classesToday = 5; // Example data, replace with actual data fetching

  res.status(200).json({
    assignedMembers,
    classesToday,
  });
});

// Example of member dashboard data endpoint
const getMemberDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  // Fetch relevant data for member dashboard
  const enrolledPrograms = []; // Example data, replace with actual data fetching
  const completedClasses = 15; // Example data, replace with actual data fetching

  res.status(200).json({
    enrolledPrograms,
    completedClasses,
  });
});

export {
  signup,
  verifyToken,
  getPictureById,
  login,
  getProtected,
  getAdminDashboardData,
  getTrainerDashboardData,
  getMemberDashboardData,
  uploadPictureById,
  getAllUsers,
  getUserById,
  updateUserProfile,
  uploadProfilePicture,
  deleteUserById,
};
