import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
// import './ApproveBookings.css';

const ApproveBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:7500/booking/trainer', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookings(response.data);
        console.log("Fetched bookings:", response.data); // Log fetched bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
        enqueueSnackbar('Error fetching bookings', { variant: 'error' });
      }
    };

    fetchBookings();
  }, [enqueueSnackbar]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:7500/booking/${id}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(bookings.filter(booking => booking._id !== id));
      enqueueSnackbar('Booking approved successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error approving booking:', error);
      enqueueSnackbar('Error approving booking', { variant: 'error' });
    }
  };

  return (
    <div className="approve-bookings">
      <h2>Approve Bookings</h2>
      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.filter(booking => booking.status === 'Pending').map(booking => (
            <div key={booking._id} className="booking-item">
              <p>{booking.courseId.name} - {booking.userId.firstName} {booking.userId.lastName}</p>
              <button onClick={() => handleApprove(booking._id)}>Approve</button>
            </div>
          ))
        ) : (
          <p>No pending bookings found</p>
        )}
      </div>
    </div>
  );
};

export default ApproveBookings;
