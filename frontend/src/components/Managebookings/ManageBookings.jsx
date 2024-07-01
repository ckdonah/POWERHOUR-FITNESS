import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
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
      enqueueSnackbar('Booking deleted successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting booking:', error);
      enqueueSnackbar('Error deleting booking', { variant: 'error' });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-booking/${id}`);
  };

  const handleBookProgram = () => {
    navigate('/book-program');
  };

  return (
    <div className="manage-bookings">
      <h2>Manage Bookings</h2>
      <button onClick={handleBookProgram} className="book-program-button">Book a Program</button>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <p>{booking.courseId.name}</p>
            <p>{booking.status}</p>
            <button onClick={() => handleUpdate(booking._id)}>Update</button>
            <button onClick={() => handleDelete(booking._id)}>Cancel</button>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default ManageBookings;
