import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './UpdateProfile.css';

registerPlugin(FilePondPluginImagePreview);

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    telephone: '',
    address: '',
    picture: ''
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        email: user.email || '',
        password: '',
        telephone: user.telephone || '',
        address: user.address || '',
        picture: user.picture || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (files.length > 0) {
        const fileData = new FormData();
        fileData.append('file', files[0].file);
        const uploadResponse = await axios.post('http://localhost:7500/user/upload', fileData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        formData.picture = uploadResponse.data.filePath;
      }

      const response = await axios.put('http://localhost:7500/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Update user context
      setUser(response.data);

      enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
      navigate('/dashboard/member');
    } catch (error) {
      console.error('Error updating profile', error.response ? error.response.data : error.message);
      enqueueSnackbar('Failed to update profile, please try again.', { variant: 'error' });
    }
  };

  return (
    <div className="update-profile-container">
      <div className="back-to-dashboard">
        <Link to="/dashboard/member">{"<"}</Link>
      </div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label>Profile Picture:</label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            allowImagePreview={true}
            maxFiles={1}
            name="file"
            labelIdle=' <span class="filepond--label-action">Browse</span>'
            className="filepond-circle"
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Telephone:</label>
          <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
