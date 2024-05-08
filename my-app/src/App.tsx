import React, { useEffect, useState } from 'react';
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouteObject, RouterProvider, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Pulmad from './pages/Page';
import Login from './pages/Login';
import Navigation from './Navigation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [categoryList, setCategoryList] = useState([
    {
      name: 'Pulmatööd',
      url: '/assets/Pulmad.jpg'
    },
    {
      name: 'Leinatööd',
      url: '/assets/Leinatood.jpg'
    },
    {
      name: 'ruumidekoratsioonid',
      url: '/assets/Pulmad.jpg'
    },
    {
      name: 'lillekimbud',
      url: '/assets/Pulmad.jpg'
    },
    {
      name: 'seaded plastvahus',
      url: '/assets/Pulmad.jpg'
    }
  ])
  
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
        <Route path="/" Component={() => <Home list={categoryList} />} /> 
        {categoryList.map((category) => (
          <Route path={`/${category.name}`} Component={() => <Pulmad isAuthenticated={isAuthenticated} heroImage={category.url} typeName={category.name} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
