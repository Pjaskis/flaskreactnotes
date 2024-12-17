import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/contacts.css";


function Contacts() {
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchContacts()
    }, []);

    const fetchContacts = async () => {

        const usernametest = localStorage.getItem('username')
        const response = await fetch(`http://127.0.0.1:5000/contacts/${usernametest}`)
        const data = await response.json()
        setContacts(data)
        console.log(data)
    }

    const handleAddContact = () => {
        navigate('/AddContact');
    }

    const handleGoBack = () => {
        navigate('/home');
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            fetchContacts();
        }
    }

    const handleUpdate = async (id) => {
        navigate(`/update_contact/${id}`);
    }


    return <div className="contacts-container">
            <button onClick={handleGoBack}>Go Back</button>
            <h2>My Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td className="actions">
                                <button onClick={() => handleUpdate(contact.id)}>Update</button>
                                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddContact}>Add Contact</button>
        </div>
    

}

export default Contacts