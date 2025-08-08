import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Signup component handles user registration functionality
const Signup = () => {
  // useState to track user inputs
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  // useNavigate hook for programmatic routing
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => { 
    e.preventDefault();

    // Make a POST request to the backend signup API
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.authToken) {
      // Save token to local storage on successful signup
      localStorage.setItem("token", json.authToken);
      navigate("/"); // Redirect to homepage
    } else {
      alert("Invalid details");
    }
  };

  // Update state when form fields change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Signup form UI
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={onChange}
              value={credentials.name}
              required
              placeholder="Your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={onChange}
              value={credentials.email}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={onChange}
              value={credentials.password}
              required
              placeholder="Create a password"
              minLength={5}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
