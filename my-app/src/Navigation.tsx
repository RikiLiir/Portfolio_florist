import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Pulmad from './pages/Page';
import Login from './pages/Login';

type Props = {
  children: React.ReactNode
}

function Navigation({children}: Props) {
  const navigation = useNavigate()
  return (
    <div>
      <div>
        <button onClick={() => navigation('/login')}>Login</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Navigation;
