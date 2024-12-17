import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateNote.css";

function AddNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const contact = { title, content };
        const response = await fetch(`http://127.0.0.1:5000/create_note/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(contact),
        });
        if (response.ok) {
            setMessage('Note created successfully');
            navigate('/notes');
        } else {
            setMessage('Failed to create note');
        }
    }

    const handleGoBack = () => {
        navigate('/notes');
    }

    return <div className="create-note-container">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="create-note-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="create-note-content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
                <button onClick={handleGoBack}>Go Back</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>


}

export default AddNote
