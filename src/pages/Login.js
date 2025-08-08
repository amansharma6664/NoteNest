import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Login component handles user login functionality
const Login = () => {
  // State to store email and password input
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Hook from react-router to navigate between pages
  const navigate = useNavigate();

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form reload

    // Send POST request to backend login API
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.authToken) {
      // If login successful, store token and redirect to homepage
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      // If login failed, show alert
      alert("Invalid credentials");
    }
  };

  // Handles changes in input fields and updates state
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // UI for login form
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Login to NoteNest</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={onChange}
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={onChange}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">
            Don't have an account? <a href="/signup">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
