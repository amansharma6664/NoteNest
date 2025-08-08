import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext'; // Importing note context to access notes and methods
import NoteItem from './NoteItem'; // Component to display each individual note
import AddNote from './AddNote'; // Component to add a new note
import { useNavigate } from 'react-router-dom'; // Hook to navigate programmatically

const Notes = () => {
  const context = useContext(noteContext); // Accessing note context
  const { notes, getNotes } = context; // Destructuring notes and function to fetch notes

  const navigate = useNavigate();

  // useEffect runs when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check if token exists 
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
    } else {
      // If token is present, fetch notes from backend
      getNotes();
    }
  }, []);

  return (
    <>
      {/* Component to add a new note */}
      <AddNote />

      <div className="row my-3">
        <h2>Your Notes</h2>

        {/* Message if no notes are available */}
        {notes.length === 0 && <div>No notes to display</div>}

        {/* Loop through all notes and display using NoteItem */}
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
