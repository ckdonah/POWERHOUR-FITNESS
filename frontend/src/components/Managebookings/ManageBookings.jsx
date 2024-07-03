import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';
import './ManageBookings.css';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  console.log(bookings);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:7500/booking', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        enqueueSnackbar('Error fetching bookings', { variant: 'error' });
      }
    };

    fetchBookings();
  }, [enqueueSnackbar]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7500/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(bookings.filter(booking => booking._id !== id));
      enqueueSnackbar('Booking cancelled successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      enqueueSnackbar('Error cancelling booking', { variant: 'error' });
    }
  };

  const handleBookCourse = () => {
    navigate('/programs'); // Navigate to the programs page
  };

  // const handleBackToDashboard = () => {
  //   navigate('/dashboard/member'); // Navigate back to the member dashboard
  // };

  return (
    <div className="manage-bookings">
     <div className="back-to-dashboard">
        <Link to="/dashboard/member" className="back-link">{"<"}</Link>
      </div>
      <h2>Manage Bookings</h2>
      <button onClick={handleBookCourse} className="book-course-button">
        Book a Course
      </button>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <p>{booking.courseId.name}</p>
            <p>{booking.status}</p>
            <button  onClick={() => handleDelete(booking._id)} className="book-course-red">Cancel</button>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default ManageBookings;
