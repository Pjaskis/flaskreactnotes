import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/addcontact.css";

function Create_contact() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const contact = { first_name, last_name, email, phone };
        const response = await fetch(`http://127.0.0.1:5000/create_contact/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(contact),
        });
        if (response.ok) {
            setMessage('Contact created successfully');
            navigate('/contacts');
        } else {
            setMessage('Failed to create contact');
        }
    }

    const handleGoBack = () => {
        navigate('/contacts');
    }

    return <div className="create-contact-container">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
                <button onClick={handleGoBack}>Go Back</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>


}

export default Create_contact
