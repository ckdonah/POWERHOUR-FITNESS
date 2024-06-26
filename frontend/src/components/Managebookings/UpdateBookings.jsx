import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
// import './UpdateBooking.css';

const UpdateBooking = () => {
  const { id } = useParams();
  const [programData, setProgramData] = useState({
    date: '',
    time: ''
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:7500/booking/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProgramData({
          date: response.data.date,
          time: response.data.time
        });
      } catch (error) {
        console.error('Error fetching booking:', error);
        enqueueSnackbar('Error fetching booking', { variant: 'error' });
      }
    };

    fetchBooking();
  }, [id, enqueueSnackbar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgramData({
      ...programData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7500/booking/${id}`, programData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      enqueueSnackbar('Booking updated successfully', { variant: 'success' });
      navigate('/manage-bookings');
    } catch (error) {
      console.error('Error updating booking:', error);
      enqueueSnackbar('Error updating booking', { variant: 'error' });
    }
  };

  return (
    <div className="update-booking-container">
      <h2>Update Booking</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={programData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={programData.time}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Program</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
