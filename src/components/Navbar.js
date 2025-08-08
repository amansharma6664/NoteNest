import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Used to programmatically navigate between routes

  // Logout handler: clears the auth token and redirects to login
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      {/* Brand logo/link */}
      <Link className="navbar-brand" to="/">NoteNest</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {/* Home link */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
        </ul>

        {/* Show login/signup if user not logged in, else show logout */}
        {!localStorage.getItem('token') ? (
          <div>
            {/* Login button */}
            <Link className="btn btn-primary mx-1" to="/login">Login</Link>

            {/* Signup button */}
            <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
          </div>
        ) : (
          // Logout button (only visible when token exists)
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
