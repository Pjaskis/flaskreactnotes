import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css'

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://127.0.0.1:5000/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('id', response.data.id);
        setLoggedIn(true);
        navigate('/home');
      })
      .catch(error => {
        setMessage('Invalid credentials');
      });
  };

  return (
    <div className='login-container'>
      <h2>Login to continue</h2>
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
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p>{message}</p>}
      <p>Don't have an account? <Link to="/register">Register here</Link></p> {/* Registration link */}
    </div>
  );
}

export default Login;
