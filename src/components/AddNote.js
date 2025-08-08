import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
  // Access note context to use addNote function
  const context = useContext(noteContext);
  const { addNote } = context;

  // Local state to manage form inputs for the note
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  // Handle form submission
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addNote(note.title, note.description, note.tag); // Call addNote from context
    setNote({ title: '', description: '', tag: '' }); // Reset form fields
  };

  // Handle input field changes
  const onChange = (e) => {
    // Update specific field using computed property name
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        {/* Title input */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
          />
        </div>

        {/* Description input */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            required
          />
        </div>

        {/* Tag input (optional) */}
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        {/* Submit button - disabled if title or description is too short */}
        <button
          disabled={note.title.length < 3 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
