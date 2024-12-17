// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css';


function Navbar({ setLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
          
          <li className='linkki'>
          <Link to="/dice-game">Play Dice Game</Link> {/* New link to Dice Game */}
          </li>
          <li className='linkki'>
          <Link to="/lottery">Play Lottery</Link> {/* New link to Lottery */}
          </li>
          
        <li className='logout-button'>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
