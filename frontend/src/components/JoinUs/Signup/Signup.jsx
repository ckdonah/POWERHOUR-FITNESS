import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Logo from "../../../assets/logo.png";
import "./Signup.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false
  });

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    upper: false,
    special: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

    if (name === "password") {
      setShowPasswordRequirements(true);
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidations({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      special: /[\W_]/.test(password)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7500/user/signup", formData);
      enqueueSnackbar(response.data.message, { variant: "success" });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        terms: false
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-page">
      <div className="header">
        <Link to="/" className="logo-link">
          <div className="logo-box">
            <img className="logo" src={Logo} alt="weight lifting logo" />
            <span className="logo-text">PowerHour</span>
          </div>
        </Link>
      </div>
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Firstname:
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>
            <label>
              Lastname:
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
          </div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Password:
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setShowPasswordRequirements(true)}
                onBlur={() => setShowPasswordRequirements(formData.password.length > 0)}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="password-toggle-icon"
              />
            </div>
          </label>
          {showPasswordRequirements && formData.password && (
            <div className="password-requirements">
              <ul>
                <li className={passwordValidations.length ? "valid" : "invalid"}>
                  <FontAwesomeIcon icon={passwordValidations.length ? faCheck : faTimes} /> At least 8 characters
                </li>
                <li className={passwordValidations.upper ? "valid" : "invalid"}>
                  <FontAwesomeIcon icon={passwordValidations.upper ? faCheck : faTimes} /> At least one uppercase letter
                </li>
                <li className={passwordValidations.special ? "valid" : "invalid"}>
                  <FontAwesomeIcon icon={passwordValidations.special ? faCheck : faTimes} /> At least one special character
                </li>
              </ul>
            </div>
          )}
          <label className="terms">
            <input type="checkbox" required name="terms" checked={formData.terms} onChange={handleChange} />
            By using it, you agree to our Privacy Policy as well as our Terms and Conditions
          </label>
          <button type="submit" className="signup-button">
            Create account
          </button>
        </form>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
