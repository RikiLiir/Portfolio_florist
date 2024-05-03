import React, { useEffect, useState } from 'react';
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouteObject, RouterProvider, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Pulmad from './pages/Pulmad';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [isAuthenticated])

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" Component={() => <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" Component={() => <Home isAuthenticated={isAuthenticated} />} /> 
        {isAuthenticated ? (
          <Route path="/pulmad" Component={() => <Pulmad />} />
        ) : <></>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
