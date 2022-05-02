import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
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
import {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} from './slices/channelSlice.js';
import getModal from './getModal.js';

const rollbarConfig = {
  accessToken: '052b1dddfbaa4161b0315e1f3ec380d5',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

filter.add(filter.getDictionary('ru'));

function setSocketEvents(socket, dispatch, actions) {
  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(actions.addMessage(data));
    });
    socket.on('newChannel', (data) => {
      dispatch(actions.addChannel(data));
      dispatch(actions.setCurrentChannel(data.id));
    });
    socket.on('removeChannel', (data) => {
      dispatch(actions.removeChannel(data));
      dispatch(actions.setCurrentChannel(1));
    });
    socket.on('renameChannel', (data) => {
      dispatch(actions.renameChannel(data));
    });
  }, [socket]);
}

const socket = io();

const actions = {
  addMessage, addChannel, setCurrentChannel, removeChannel, renameChannel,
};

function AppProvider({ children }) {
  const isLogined = localStorageData.hasAuth();
  const [loggedIn, setLoggedIn] = useState(isLogined);
  const dispatch = useDispatch();
  const modalAction = useSelector((state) => state.modal.action);
  setSocketEvents(socket, dispatch, actions);
  const logIn = (username, token) => {
    localStorageData.setAuth(username, token);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorageData.removeAuth();
    setLoggedIn(false);
  };
  const providerData = useMemo(() => ({
    loggedIn, logIn, logOut, socket, filter,
  }), [loggedIn]);
  return (
    <AppContext.Provider value={providerData}>
      {children}
      {modalAction && getModal(modalAction)}
      <ToastContainer />
    </AppContext.Provider>
  );
}

function App() {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default App;
