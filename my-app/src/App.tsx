import React, { useEffect, useState } from 'react';
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouteObject, RouterProvider, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Page from './pages/Page';
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
      name: 'Ruumidekoratsioonid',
      url: '/assets/Dekoratsioonid.jpg'
    },
    {
      name: 'Lillekimbud',
      url: '/assets/Kimbud.jpg'
    },
    {
      name: 'Seaded plastvahus',
      url: '/assets/Plast.jpg'
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
          <Route path={`/${category.name}`} Component={() => <Page isAuthenticated={isAuthenticated} heroImage={category.url} typeName={category.name} />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
