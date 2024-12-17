import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Home from './Home';
import axios from 'axios';
import Contacts from './Contacts';
import AddContact from './AddContact';
import Profile from './Profile';
import DiceGame from './DiceGame';
import Lottery from './lottery';
import Notes from './Notes';
import AddNote from './AddNote';
import UpdateContact from './UpdateContact';
import UpdateNote from './UpdateNote';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setLoggedIn(true);
          setLoading(false);
        })
        .catch(() => {
          setLoggedIn(false);
          setLoading(false);
        });
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={loggedIn ? <Profile /> : <Login setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={loggedIn ? <Home setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={loggedIn ? "/home" : "/login"} />} />
        <Route path="/contacts" element={loggedIn ? <Contacts /> : <Navigate to="/login" />} />
        <Route path="/addcontact" element={loggedIn ? <AddContact /> : <Navigate to="/login" />} />
        <Route path="/dice-game" element={<DiceGame />} />
        <Route path="/lottery" element={<Lottery />} />
        <Route path="/notes" element={loggedIn ? <Notes /> : <Navigate to="/login" />} />
        <Route path="/addnote" element={loggedIn ? <AddNote /> : <Navigate to="/login" />} />
        <Route path="/update_contact/:id" element={loggedIn ? <UpdateContact /> : <Navigate to="/login" />} />
        <Route path="/update_note/:id" element={loggedIn ? <UpdateNote /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
