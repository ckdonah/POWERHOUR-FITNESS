import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../../components/RoleBasedDashboard/Dashboard.css";
import defaultProfileImage from "../../assets/profile.jpg";

const MemberDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    enrolledPrograms: [],
    completedClasses: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7500/user/dashboard/member",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { data } = response;
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setError("Error fetching dashboard data");
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:7500/booking", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { data } = response;
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings", error);
        setError("Error fetching bookings");
      }
    };

    if (user) {
      fetchDashboardData();
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleMenuClick = (route) => {
    navigate(route);
  };

  const profilePictureUrl =
    user.picture !== ""
      ? `http://localhost:7500/user/picture/${user._id}`
      : defaultProfileImage;

  return (
    <div className="dashboard">
     <div className="back-to-dashboard">
        <Link to="/" className="back-link">{"<"}</Link>
      </div>
      <div className="dashboard-header">
        <h2>
          Welcome, <span className="user-firstname">{user.firstName}</span>!
        </h2>
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user.email} ({user.role})
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="profile-icon"
            />
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => handleMenuClick("/manage-bookings")}>
                My Bookings
              </button>
              <button onClick={() => handleMenuClick("/update-profile-pic")}>
                Update Profile Pic
              </button>
              <button onClick={() => handleMenuClick("/update-profile")}>
                Update Profile
              </button>
              <button onClick={() => handleMenuClick("/write-review")}>
                Write a Review
              </button>
              <button onClick={() => handleMenuClick("/delete-account")}>
                Delete Account
              </button>
              <hr />
              <button onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      </div>
      <div className="programs">
        <h3>Programs</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {dashboardData.enrolledPrograms.length > 0 ? (
            dashboardData.enrolledPrograms.map((program, index) => (
              <li key={index}>{program.name}</li> // Ensure you render program properties
            ))
          ) : (
            <p>No enrolled programs</p>
          )}
        </ul>
      </div>
      <div className="bookings">
        <h3>My Bookings</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id}>
                {booking.courseId.name} - {booking.status}
              </li> // Ensure you render booking properties
            ))
          ) : (
            <p>No bookings found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MemberDashboard;
