import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Import your homepage component
import LoginPage from './LoginPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
        {/* Add more routes for other pages */}
    </Routes>
  </Router>,
  document.getElementById('root')
);