import Booking from "../models/booking.js";
import Course from "../models/course.js";

// Function to create a new booking
const postBooking = async (req, res) => {
  console.log('Request body:', req.body);
  try {
    const { courseId, date, duration } = req.body;
    const userId = req.user.userId;

    if (!courseId || !date || !duration) {
      return res.status(400).json({ error: "courseId, date, and duration are required fields." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (course.capacity <= 0) {
      return res.status(400).json({ error: "This course is fully booked" });
    }

    const newBooking = new Booking({
      courseId,
      userId,
      date,
      duration,
      status: 'Pending'
    });

    const savedBooking = await newBooking.save();

    // Decrement course capacity
    course.capacity -= 1;
    await course.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      error: "An error occurred while saving the booking.",
      details: error.message,
    });
  }
};


// Function to get all bookings for a user
const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookings = await Booking.find({ userId }).populate('courseId');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      error: "An error occurred while fetching the bookings.",
      details: error.message,
    });
  }
};

// Function to get all bookings for a trainer's courses
const getBookingsByTrainer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const courses = await Course.find({ trainerId: userId }).select('_id');
    const courseIds = courses.map(course => course._id);
    
    const bookings = await Booking.find({ courseId: { $in: courseIds } }).populate('courseId userId');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      error: "An error occurred while fetching the bookings.",
      details: error.message,
    });
  }
};

// Function to cancel a booking by ID
const cancelBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.status = 'Cancelled';
    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      error: "An error occurred while cancelling the booking.",
      details: error.message,
    });
  }
};

// Function to approve a booking by ID
const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.status = 'Confirmed';
    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } catch (error) {
    console.error('Error approving booking:', error);
    res.status(500).json({
      error: "An error occurred while approving the booking.",
      details: error.message,
    });
  }
};

export { postBooking, getBookingsByUser, getBookingsByTrainer, cancelBookingById, approveBooking };
