import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactStars from "react-stars";
import { AuthContext } from "../../contexts/AuthContext";
import defaultProfileImage from "../../assets/profile.jpg";
import "./WriteReview.css";

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams(); // to get the review id if updating
  const { user } = useContext(AuthContext);

  const profilePictureUrl =
    user.picture !== ""
      ? `http://localhost:7500/user/picture/${user._id}`
      : defaultProfileImage;

  useEffect(() => {
    console.log("WriteReview component mounted");
    if (id) {
      console.log(`Updating review with id: ${id}`);
      // Fetch the review details to populate the form for updating
      const fetchReview = async () => {
        try {
          const response = await axios.get(`http://localhost:7500/review/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const { rating, message } = response.data;
          setRating(rating);
          setMessage(message);
        } catch (error) {
          console.error('Error fetching review:', error);
          enqueueSnackbar('Failed to load review details.', { variant: 'error' });
        }
      };
      fetchReview();
    }
  }, [id, enqueueSnackbar]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting review:", { rating, message });
    try {
      if (id) {
        // Update existing review
        await axios.put(`http://localhost:7500/review/${id}`, {
          rating,
          message,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        enqueueSnackbar("Review updated successfully!", { variant: 'success' });
      } else {
        // Post new review
        await axios.post("http://localhost:7500/review", {
          rating,
          message,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        enqueueSnackbar("Review submitted successfully!", { variant: 'success' });
      }
      navigate("/dashboard/member");
    } catch (error) {
      console.error('Error submitting review:', error);
      enqueueSnackbar('Failed to submit review, please try again.', { variant: 'error' });
    }
  };

  return (
    <div className="write-review-container">
      <div className="back-to-dashboard">
        <Link to="/dashboard/member" style={{ fontSize: '24px', textDecoration: 'none' }}>{"<"}</Link>
      </div>
      <h2>{id ? "Update Review" : "Write a Review"}</h2>
      <img src={profilePictureUrl} alt="Profile" className="profile-icon" />
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <ReactStars
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={24}
            color2={'#ffd700'}
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <button type="submit">{id ? "Update" : "Submit"} Review</button>
      </form>
    </div>
  );
};

export default WriteReview;
