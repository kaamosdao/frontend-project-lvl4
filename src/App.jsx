import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Chat from './components/pages/Chat.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Notfound from './components/pages/Notfound.jsx';
import Layout from './components/Layout.jsx';
import About from './components/pages/About.jsx';
import useAuth from './hooks/index.jsx';

function RequireAuth({ children, redirectTo }) {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={(
              <RequireAuth redirectTo="/login">
                <Chat />
              </RequireAuth>
            )}
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
