import React from "react"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/addcontact.css";



function update_note() {
   const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    

   
    const id = useParams().id;

    useEffect(() => {
        fetchNote()
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const contact = { title, content };
        const response = await fetch(`http://127.0.0.1:5000/update_note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(contact),
        });
        if (response.ok) {
            navigate('/notes');
        }
    }
    

    const fetchNote = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/get_note/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json()
        console.log(data)
        setTitle(data.title)
        setContent(data.content)
    }


   const handleGoBack = () => {
    navigate('/notes');
    }
    console.log(id)

    
   return <div className="create-contact-container">
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="lastName">Content:</label>
            <input
                type="text"
                id="lastName"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
      
        <button type="submit">Update</button>
        <button onClick={handleGoBack}>Go Back</button>
    </form>
   
    </div>
}

export default update_note