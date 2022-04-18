import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Notfound from './components/Notfound.jsx';
import Layout from './components/Layout.jsx';
import About from './components/About.jsx';
import AuthContext from './Context.jsx';
import localStorageData from './localStorageData.js';

function AuthProvider({ children }) {
  const isLogined = localStorageData.hasAuth();
  const [loggedIn, setLoggedIn] = useState(isLogined);
  const logIn = (username, token) => {
    localStorageData.setAuth(username, token);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorageData.removeAuth();
    setLoggedIn(false);
  };
  const providerData = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);
  return (
    <AuthContext.Provider value={providerData}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
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
      </AuthProvider>
    </Provider>
  );
}

export default App;
