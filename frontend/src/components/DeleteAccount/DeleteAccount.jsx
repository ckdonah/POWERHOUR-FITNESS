import React, { useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useSnackbar } from 'notistack';
import "./DeleteAccount.css";

const DeleteAccount = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteAccount = async () => {
    try {
      const url = `http://localhost:7500/user/${user._id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar("Account deleted successfully", { variant: 'success' });
      logout(); // Log out the user
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Error deleting account", error);
      enqueueSnackbar(
        error.response ? error.response.data.error : "Error deleting account",
        { variant: 'error' }
      );
    }
  };

  return (
    <div className="delete-account-container">
        <div className="back-to-dashboard">
        <Link to="/dashboard/member" className="back-link">{"<"}</Link>
      </div>
      <h2>Delete Account</h2>
      <div className="gym-policy">
        <h3>Pourhour Policy</h3>
        <p>1. Membership cancellations must be submitted in writing.</p>
        <p>2. All fees paid are non-refundable.</p>
        <p>3. You are responsible for cancelling any direct debit orders with your bank.</p>
        <p>4. The gym reserves the right to change the rules and regulations at any time.</p>
        <p>5. Please contact customer support for any questions or concerns regarding the cancellation policy.</p>
      </div>
      <button className="delete-button" onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default DeleteAccount;
