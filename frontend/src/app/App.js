import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home.js';
import Login from './pages/login.js';
import IndexPage from './pages/index.js';
import '../styles/globals.css';

const App = () => {
  const token = localStorage.getItem('token');
  console.log(localStorage.getItem('token'));
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={token ? <Home /> : <Navigate to="/Login" />} />
        <Route path="/Login" element={!token ? <Login /> : <Navigate to="/Home" />} />
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </Router>
  );
};

export default App;
