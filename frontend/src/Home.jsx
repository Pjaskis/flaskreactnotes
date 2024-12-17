import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./styles/home.css";
import Navbar from './Navbar';

function Home({ setLoggedIn }) {
  const [username, setUsername] = useState('');
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
      })
      .catch(() => {
        handleLogout();
      });
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
    navigate('/login');
  };

    const handleContacts = () => {
        navigate('/contacts');
    };

    const handleNotes = () => {
        navigate('/notes');
    };


  return (
    <div>
        <Navbar setLoggedIn={setLoggedIn} />
        <div className='home-container'>
        <h2>Welcome, {username}</h2>
        <button onClick={handleContacts}>Contacts</button>
        <button onClick={handleNotes}>Notes</button>
        </div>
    </div>
    
    
  );
}

export default Home;
