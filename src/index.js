import React, { useMemo, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import App from './App.jsx';
import store from './slices/index.js';
import { addMessage } from './slices/messageSlice.js';
import {
  addChannel, setCurrentChannel, removeChannel, renameChannel,
} from './slices/channelSlice.js';
import AuthContext from './hooks/AuthContext.jsx';
import SocketContext from './hooks/SocketContext.jsx';
import FilterContext from './hooks/FilterContext.jsx';
import localStorageData from './localStorageData.js';
import getModal from './getModal.js';

function AuthProvider({ children }) {
  const isLogined = localStorageData.hasAuth();
  const [loggedIn, setLoggedIn] = useState(isLogined);
  const modalAction = useSelector((state) => state.modal.action);
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
      {modalAction && getModal(modalAction)}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

function SocketProvider({ socket, children }) {
  const providerData = useMemo(() => ({ socket }), [socket]);
  return (
    <SocketContext.Provider value={providerData}>
      {children}
    </SocketContext.Provider>
  );
}

function FilterProvider({ profanityFilter, children }) {
  const providerData = useMemo(() => ({ filter: profanityFilter }), [profanityFilter]);
  return (
    <FilterContext.Provider value={providerData}>
      {children}
    </FilterContext.Provider>
  );
}

export default function init(socket) {
  filter.add(filter.getDictionary('ru'));

  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
    store.dispatch(setCurrentChannel(data.id));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
    store.dispatch(setCurrentChannel(1));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });

  const rollbarConfig = {
    accessToken: '052b1dddfbaa4161b0315e1f3ec380d5',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };
  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <SocketProvider socket={socket}>
            <FilterProvider profanityFilter={filter}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </FilterProvider>
          </SocketProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
}
