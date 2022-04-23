import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import store from './slices/index.js';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Notfound from './components/Notfound.jsx';
import Layout from './components/Layout.jsx';
import About from './components/About.jsx';
import AppContext from './Context.jsx';
import localStorageData from './localStorageData.js';
import { addMessage } from './slices/messageSlice.js';

function setSocketEvents(socket, dispatch, actions) {
  useEffect(() => {
    socket.on('newMessage', ({
      username, message, id, channelId,
    }) => {
      dispatch(actions.addMessage({
        username, message, id, channelId,
      }));
    });
  }, [socket]);
}

const socket = io();

function AppProvider({ children }) {
  const isLogined = localStorageData.hasAuth();
  const [loggedIn, setLoggedIn] = useState(isLogined);
  const dispatch = useDispatch();
  setSocketEvents(socket, dispatch, { addMessage });
  const logIn = (username, token) => {
    localStorageData.setAuth(username, token);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorageData.removeAuth();
    setLoggedIn(false);
  };
  const providerData = useMemo(() => ({
    loggedIn, logIn, logOut, socket,
  }), [loggedIn]);
  return (
    <AppContext.Provider value={providerData}>
      {children}
    </AppContext.Provider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
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
      </AppProvider>
    </Provider>
  );
}

export default App;
