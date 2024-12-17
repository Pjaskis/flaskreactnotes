import React from "react"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/addcontact.css";



function update_contact() {
   const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    

   
    const id = useParams().id;

    useEffect(() => {
        fetchContact()
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const contact = { first_name, last_name, email, phone };
        const response = await fetch(`http://127.0.0.1:5000/update_contact/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(contact),
        });
        if (response.ok) {
            navigate('/contacts');
        }
    }
    

    const fetchContact = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/get_contact/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json()
        console.log(data)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setPhone(data.phone)
    }


   const handleGoBack = () => {
    navigate('/contacts');
    }
    console.log(id)

    
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
        <button type="submit">Update</button>
        <button onClick={handleGoBack}>Go Back</button>
    </form>
   
    </div>
}

export default update_contact