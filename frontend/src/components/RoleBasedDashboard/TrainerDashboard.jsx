import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../../components/RoleBasedDashboard/Dashboard.css";
import defaultProfileImage from "../../assets/profile.jpg";

const TrainerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7500/trainer/courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs", error);
        setError("Error fetching programs");
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7500/booking/trainer",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
        setError("Error fetching bookings");
      }
    };

    if (user) {
      fetchPrograms();
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleMenuClick = (route) => {
    navigate(route);
  };

  const handleDeleteAccount = async () => {
    try {
      const url = `http://localhost:7500/user/${user._id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      logout();
      navigate("/");
    } catch (error) {
      console.error(
        "Error deleting account",
        error.response ? error.response.data : error.message
      );
      setError(
        error.response ? error.response.data.error : "Error deleting account"
      );
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await axios.patch(
        `http://localhost:7500/booking/${bookingId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Confirmed" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error approving booking", error);
      setError("Error approving booking");
    }
  };

  const profilePictureUrl =
    user?.picture && user.picture !== "default.jpg"
      ? `http://localhost:7500/uploads/${user.picture}`
      : defaultProfileImage;

  return (
    <div className="dashboard">
      <div className="back-to-dashboard">
        <Link to="/" className="back-link">{"<"}</Link>
      </div>
      <div className="dashboard-header">
        <h2>
          Welcome, <span className="user-firstname">{user?.firstName}</span>!
        </h2>
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user?.email} ({user?.role})
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="profile-icon"
            />
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuClick("/approve-bookings")}>
                Approve Bookings
              </button>
              <button onClick={() => handleMenuClick("/trainer/programs")}>
                Manage Courses
              </button>
              <button onClick={() => handleMenuClick("/update-profile-pic")}>
                Update Profile Pic
              </button>
              <button onClick={() => handleMenuClick("/update-profile")}>
                Update Profile
              </button>
              <button onClick={handleDeleteAccount}>Delete Account</button>
              <hr />
              <button onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      </div>
      <div className="programs">
        <h3>Courses</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {programs.length > 0 ? (
            programs.map((program, index) => (
              <li key={index}>{program.name}</li>
            ))
          ) : (
            <p>No programs found</p>
          )}
        </ul>
      </div>
      <div className="bookings">
        <h3>Pending Bookings</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {bookings.length > 0 ? (
            bookings
              .filter((booking) => booking.status === "Pending")
              .map((booking) => (
                <li key={booking._id}>
                  {booking.courseId?.name} - {booking.userId?.firstName}{" "}
                  {booking.userId?.lastName}
                  <button onClick={() => handleApproveBooking(booking._id)}>
                    Approve
                  </button>
                </li>
              ))
          ) : (
            <p>No pending bookings found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TrainerDashboard;
