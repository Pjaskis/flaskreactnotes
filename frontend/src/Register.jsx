import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./styles/register.css";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios.post('http://127.0.0.1:5000/register', { username, email, password })
      .then(response => {
        setMessage(response.data.message);
        navigate("/login");
      })
      .catch(error => {
        setMessage('Error registering user');
      });
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
      {message && <p className='message'>{message}</p>}
      <p>Already have an account? <Link to="/login">Login here</Link></p> {/* Login link */}
    </div>
  );
}

export default Register;
