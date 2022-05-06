import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';
import Chat from '../Chat.jsx';

function Home() {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Chat />;
  }
  return <Navigate to="/login" />;
}

export default Home;
