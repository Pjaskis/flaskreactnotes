import React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Notes.css";


function Notes() {
    const [notes, setNotes] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotes()
    }, []);

    const fetchNotes = async () => {

        const usernametest = localStorage.getItem('username')
        const response = await fetch(`http://127.0.0.1:5000/notes/${usernametest}`)
        const data = await response.json()
        setNotes(data)
        console.log(data)
    }

    const handleAddNote = () => {
        navigate('/addnote');
    }

    const handleGoBack = () => {
        navigate('/home');
    }

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/delete_note/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            fetchNotes();
        }
    }

    const handleUpdate = async (id) => {
        navigate(`/update_note/${id}`);
    }



    return <div className="notes-container">
            <button onClick={handleGoBack}>Go Back</button>
            <h2>My Notes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note) => (
                        <tr key={note.id}>
                            <td>{note.title}</td>
                            <td>{note.content}</td>
                            
                            <td className="actions">
                                <button onClick={() => handleUpdate(note.id)}>Update</button>
                                <button onClick={() => handleDelete(note.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddNote}>Add Note</button>
        </div>
    

}

export default Notes