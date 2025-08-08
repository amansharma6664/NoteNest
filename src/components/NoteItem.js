// NoteItem component receives a single note object and two handler functions: onDelete and onEdit
const NoteItem = ({ note, onDelete, onEdit }) => {
  return (
    <div className="card my-2">
      <div className="card-body">
        {/* Display note title */}
        <h5 className="card-title">{note.title}</h5>

        {/* Display note description */}
        <p className="card-text">{note.description}</p>

        {/* Delete button: calls onDelete function with note's _id */}
        <button
          className="btn btn-sm btn-danger mx-1" 
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>

        {/* Edit button: calls onEdit function with entire note object */}
        <button
          className="btn btn-sm btn-primary mx-1"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
