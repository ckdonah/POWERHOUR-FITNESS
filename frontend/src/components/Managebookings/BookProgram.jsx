import React, { useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './BookProgram.css';

const BookProgram = () => {
  const { id } = useParams();
  const location = useLocation();
  const courseData = location.state?.course;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseData) {
      navigate('/');
    }
  }, [courseData, navigate]);

  const handleBooking = async () => {
    try {
      const requestData = {
        courseId: courseData._id,
        date: courseData.date,
        duration: courseData.duration,
      };

      await axios.post('http://localhost:7500/booking', requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      enqueueSnackbar('Booking request sent successfully', { variant: 'success' });
      navigate('/manage-bookings');
    } catch (error) {
      console.error('Error booking course:', error);
      enqueueSnackbar('Error booking course', { variant: 'error' });
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-program-container">
      <h2>Book a Course</h2>
      <div className="course-details">
        <img src={`http://localhost:7500/uploads/${courseData.coursePic}`} alt={courseData.name} />
        <h3>{courseData.name}</h3>
        <p>Date: {new Date(courseData.date).toLocaleDateString()}</p>
        <p>Duration: {courseData.duration} minutes</p>
        <p>Capacity: {courseData.capacity}</p>
        <button onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default BookProgram;
