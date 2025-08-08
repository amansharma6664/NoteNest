// Import required hooks and context
import { useState } from "react";
import noteContext from "./noteContext";

// NoteState component provides all note-related logic and data to its children
const NoteState = (props) => {
  // Use environment variable for backend base URL (set this in your .env file)
  const host = process.env.REACT_APP_API_BASE_URL;

  // Initial state is an empty array of notes
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // ✅ Function to add a new note
  const addNote = async (title, description) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description })
      });

      const newNote = await response.json();
      setNotes(notes.concat(newNote));
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // ✅ Function to fetch all notes from the backend
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // ✅ Function to delete a note by ID
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });

      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // ✅ Function to edit/update a note by ID
  const editNote = async (id, title, description) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description })
      });

      const updatedNote = await response.json();

      const newNotes = notes.map(note =>
        note._id === id ? updatedNote : note
      );
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };

  return (
    <noteContext.Provider value={{ notes, addNote, getNotes, deleteNote, editNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
