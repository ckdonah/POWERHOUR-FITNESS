import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../../contexts/AuthContext";
import Logo from "../../assets/logo.png";
import defaultProfileImage from "../../assets/profile.jpg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    if (user) {
      const dashboardUrlMap = {
        admin: '/dashboard/admin',
        trainer: '/dashboard/trainer',
        member: '/dashboard/member',
      };
      const dashboardUrl = dashboardUrlMap[user.role] || '/dashboard';
      navigate(dashboardUrl); // Navigate to the user's dashboard based on their role
    }
  };

  // Conditionally set the profile picture URL based on the user role
  const profilePictureUrl = user ? user.picture !== ""? `http://localhost:7500/user/picture/${user._id}`:defaultProfileImage:null;
    
    
console.log("headeruser",user)
  return (
    <header className="header">
      <a href="#hero" className="logo-link">
        <div className={`logo-box ${isMenuOpen ? "open" : ""}`}>
          <img
            className={`logo ${isMenuOpen ? "open" : ""}`}
            src={Logo}
            alt="weight lifting logo"
          />
          <span className={`logo-text ${isMenuOpen ? "open" : ""}`}>
            PowerHour
          </span>
        </div>
      </a>
      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <a href="#programs" onClick={() => setIsMenuOpen(false)}>
          Programs
        </a>
        <a href="#trainers" onClick={() => setIsMenuOpen(false)}>
          Trainers
        </a>
        <a href="#offers" onClick={() => setIsMenuOpen(false)}>
          Offers
        </a>
        <a href="#testimonials" onClick={() => setIsMenuOpen(false)}>
          Testimonials
        </a>
        <a href="#about" onClick={() => setIsMenuOpen(false)}>
          About
        </a>
      </nav>
      {user ? (
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="profile-icon"
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }} // Make it clear that the profile icon is clickable
        />
      ) : (
        <Link
          to="/signup"
          className="join-us"
          onClick={() => setIsMenuOpen(false)}
        >
          Join Us
        </Link>
      )}
      <button className="burger-menu" onClick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}

export default Header;
