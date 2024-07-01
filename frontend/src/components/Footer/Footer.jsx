import React from 'react';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    event.preventDefault();
    enqueueSnackbar('Successfully subscribed!', { variant: 'success' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>PowerHour</h3>
          <p>PowerHour is a premier fitness program designed to maximize your potential every hour.</p>
          <div className="subscribe-section">
            <h4>Get notified of upcoming Events</h4>
            <form onSubmit={handleClick}>
              <input type="email" placeholder="Enter email address" className="subscribe-input" required />
              <button type="submit" className="subscribe-button">Subscribe</button>
            </form>
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#trainers">Trainers</a></li>
            <li><a href="#offers">Offers</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>Email: info@powerhour.com</p>
          <p>Phone: (123) 456-7890</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
