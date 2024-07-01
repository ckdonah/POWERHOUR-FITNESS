import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './BookProgram.css';

const BookProgram = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:7500/course', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Fetched courses:', response.data); // Log the fetched courses
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        enqueueSnackbar('Error fetching courses', { variant: 'error' });
      }
    };

    fetchCourses();
  }, [enqueueSnackbar]);

  const handleCourseClick = (course) => {
    console.log('Course clicked:', course); // Log course data
    setSelectedCourse(course);
  };

  const handleBooking = async () => {
    try {
      const { _id: courseId, date, duration } = selectedCourse;
      const requestData = { courseId, date, duration };
      console.log('Selected course:', selectedCourse);
      console.log('Request data:', requestData);

      await axios.post('http://localhost:7500/booking', requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      enqueueSnackbar('Booking request sent successfully', { variant: 'success' });
      navigate('/manage-bookings');
    } catch (error) {
      console.error('Error booking course:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      enqueueSnackbar('Error booking course', { variant: 'error' });
    }
  };

  return (
    <div className="book-program-container">
      <h2>Book a Program</h2>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-item" onClick={() => handleCourseClick(course)}>
            {course.name}
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className="course-details">
          <h3>Course Details</h3>
          <p><strong>Name:</strong> {selectedCourse.name}</p>
          <p><strong>Date:</strong> {new Date(selectedCourse.date).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> {selectedCourse.duration} minutes</p>
          <p><strong>Capacity:</strong> {selectedCourse.capacity}</p>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      )}
    </div>
  );
};

export default BookProgram;
