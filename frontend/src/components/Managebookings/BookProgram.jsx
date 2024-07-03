import React, { useEffect, useState } from 'react';
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
  const [courseCapacity, setCourseCapacity] = useState(courseData?.capacity || 0);

  useEffect(() => {
    if (!courseData) {
      navigate('/');
    }
  }, [courseData, navigate]);

  const handleBooking = async () => {
    if (courseCapacity <= 0) {
      enqueueSnackbar('This course is fully booked', { variant: 'error' });
      return;
    }

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

      setCourseCapacity(prevCapacity => prevCapacity - 1);
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
      <div className="back-button" onClick={() => navigate(-1)}>
        &lt; Back
      </div>
      <h2>Book Your Course</h2>
      <div className="course-details">
        <div className="course-image-wrapper">
          <img className="course-image" src={`http://localhost:7500/uploads/${courseData.coursePic}`} alt={courseData.name} />
        </div>
        <h3>{courseData.name}</h3>
        <p>Date: {new Date(courseData.date).toLocaleDateString()}</p>
        <p>Duration: {courseData.duration} minutes</p>
        <p>Capacity: {courseCapacity}</p>
        <button onClick={handleBooking} disabled={courseCapacity <= 0}>
          {courseCapacity <= 0 ? 'Fully Booked' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default BookProgram;
