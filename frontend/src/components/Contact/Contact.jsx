import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    message: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.telephone || !formData.message) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'error' });
      return;
    }

    try {
      const response = await fetch("http://localhost:7500/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear the form fields after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          telephone: "",
          message: "",
        });
        // Show a success notification
        enqueueSnackbar('Your message was sent successfully.', { variant: 'success' });
      } else {
        enqueueSnackbar('Error sending message.', { variant: 'error' });
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar('Error sending message.', { variant: 'error' });
    }
  };

  return (
    <section className="contact page-section"  id="about">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-details">
          <h3>Contact Us</h3>
          <p>Email, call, or complete the form to learn how Powerhour can solve your messaging problem</p>
          <p>Email: info@powerhour.com</p>
          <p>Phone: 123-456-7890</p>
          <h4>Customer Support</h4>
          <p>Our support team is available around the clock to address any concerns or queries you may have.</p>
          <h4>Feedback and suggestions</h4>
          <p>We value your feedback and are continuously working to improve Powerhour. Your input is crucial in shaping the future of Powerhour.</p>
        </div>
        <div className="contact-form-container">
          <h3>Get in Touch</h3>
          <p>You can reach us anytime</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                aria-label="First Name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                aria-label="Last Name"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
            />
            <input
              type="text"
              name="telephone"
              placeholder="Phone"
              value={formData.telephone}
              onChange={handleChange}
              aria-label="Phone"
            />
            <textarea
              name="message"
              placeholder="How can we help?"
              value={formData.message}
              onChange={handleChange}
              aria-label="Message"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
