import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import Login from './components/pages/Login.jsx';
import Signup from './components/pages/Signup.jsx';
import Notfound from './components/pages/Notfound.jsx';
import Layout from './components/Layout.jsx';
import About from './components/pages/About.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
