import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/home" />} />
        <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
