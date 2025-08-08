import { useEffect, useContext, useState } from "react";
import noteContext from "../context/noteContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Access note context
  const context = useContext(noteContext);
  const { notes, getNotes, addNote, deleteNote, editNote } = context;

  const navigate = useNavigate();

  // Local state to manage input fields
  const [note, setNote] = useState({ title: "", description: "" });

  // Edit state to toggle between adding and editing
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // ID of note being edited

  // On component mount, redirect if not logged in, else fetch notes
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); // Redirect to login if no auth token
    } else {
      getNotes(); // Fetch notes from backend
    }
  }, []);

  // Handle form submission for adding or editing a note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.description) return;

    if (isEditing) {
      editNote(editId, note.title, note.description);
      setIsEditing(false);
      setEditId(null);
    } else {
      addNote(note.title, note.description);
    }

    // Reset form
    setNote({ title: "", description: "" });
  };

  // Delete a note by its ID
  const handleDelete = (id) => {
    deleteNote(id);
  };

  // Prepare form for editing a selected note
  const handleEdit = (note) => {
    setNote({ title: note.title, description: note.description });
    setIsEditing(true);
    setEditId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top of page
  };

  // Handle input changes for both fields
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      {/* Add/Edit Note Form */}
      <div className="card shadow-sm p-4 mb-5">
        <h2 className="mb-4">{isEditing ? "Edit Note" : "Add a Note"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              value={note.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              value={note.description}
              onChange={onChange}
              rows={4}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">
            {isEditing ? "Update Note" : "Add Note"}
          </button>
          {/* Show cancel button only in edit mode */}
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setNote({ title: "", description: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Display Notes */}
      <h2 className="mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <div className="alert alert-info">No notes to display</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {notes.map((note) => (
            <div className="col" key={note._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
