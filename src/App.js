import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoteState from './context/NoteState';
import AuthState from './context/auth/AuthState';

function App() {
  return (
    <AuthState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </AuthState>
  );
}

export default App;
