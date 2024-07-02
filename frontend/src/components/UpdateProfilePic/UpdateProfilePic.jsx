import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImagePreview);

const UpdateProfilePic = () => {
  const { user, setUser } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (files.length > 0) {
        const fileData = new FormData();
        fileData.append('file', files[0].file);
console.log("ffffffffffff",files[0].file)
        const uploadResponse = await axios.post('http://localhost:7500/user/upload', fileData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        const updatedUser = await axios.put('http://localhost:7500/user/profile', {
          picture: uploadResponse.data.filePath
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        setUser(prevUser => ({
          ...prevUser,
          picture: updatedUser.data.picture
        }));

        enqueueSnackbar('Profile picture updated successfully!', { variant: 'success' });
        navigate('/dashboard/member');
      }
    } catch (error) {
      console.error('Error updating profile', error.response ? error.response.data : error.message);
      enqueueSnackbar('Failed to update profile, please try again.', { variant: 'error' });
    }
  };

  return (
    <div className="update-profile-container">
      <div className="back-to-dashboard">
        <Link to="/dashboard/member" className="back-link">{"<"}</Link>
      </div>
      <h2>Update Profile Picture</h2>
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
            labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
            className="filepond-circle"
          />
        </div>
        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfilePic;
