import User from "../models/user.js";
import Course from "../models/course.js";
import asyncHandler from "../config/asyncHandler.js";


const getAllTrainers    = asyncHandler(async (req, res) => {
  const trainers = await User.find({ role: "trainer" });
  res.json(trainers);
});




// Function to get all courses for a specific trainer
const getCoursesByTrainer = async (req, res) => {
  try {
    const trainerId = req.user.userId; // Assuming you have middleware that sets req.user
    const courses = await Course.find({ trainerId });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses for trainer:', error);
    res.status(500).json({
      error: "An error occurred while fetching courses.",
      details: error.message,
    });
  }
};




export { getAllTrainers, getCoursesByTrainer };