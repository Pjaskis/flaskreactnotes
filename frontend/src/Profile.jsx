// Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        console.log(response.data);
      });
    }
  }, []);

  const handleChangePassword = () => {
    const token = localStorage.getItem('token');
    axios.post(
      'http://127.0.0.1:5000/change_password',
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(response => {
      setMessage('Password changed successfully');
    })
    .catch(() => {
      setMessage('Failed to change password');
    });
  };

    const handleGoBack = () => {
        navigate('/home');
    };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Profile;
