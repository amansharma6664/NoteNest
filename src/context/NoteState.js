// Import required hooks and context
import { createContext, useState } from "react";
import noteContext from "./noteContext";

// NoteState component provides all note-related logic and data to its children
const NoteState = (props) => {
  // Backend base URL
  const host = "http://localhost:5000";

  // Initial state is an empty array of notes
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // ✅ Function to add a new note
  const addNote = async (title, description) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token") // Sending token for authentication
      },
      body: JSON.stringify({ title, description }) // Sending title and description in request body
    });

    const newNote = await response.json(); // Parse the response
    setNotes(notes.concat(newNote)); // Add new note to existing state
  };

  // ✅ Function to fetch all notes from the backend
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token") // Auth header
      }
    });

    const json = await response.json(); // Parse the response
    setNotes(json); // Update state with fetched notes
  };

  // ✅ Function to delete a note by ID
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token") // Auth header
      }
    });

    // Remove the deleted note from local state
    setNotes(notes.filter(note => note._id !== id));
  };

  // ✅ Function to edit/update a note by ID
  const editNote = async (id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token") // Auth header
      },
      body: JSON.stringify({ title, description }) // Updated note data
    });

    const updatedNote = await response.json(); // Parse the updated note from response

    // Update the note in the local state
    const newNotes = notes.map(note =>
      note._id === id ? updatedNote : note
    );
    setNotes(newNotes);
  };

  // Provide all note operations to child components via context
  return (
    <noteContext.Provider value={{ notes, addNote, getNotes, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
