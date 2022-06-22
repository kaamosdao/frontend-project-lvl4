import React, { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';
import App from './App.jsx';
import store from './slices/index.js';
import { addMessage } from './slices/messageSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelSlice.js';
import AuthContext from './hooks/AuthContext.jsx';
import SocketContext from './hooks/SocketContext.jsx';
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
    <AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>
  );
}

function AppProvider({ socket, children }) {
  const providerData = useMemo(() => ({ socket }), [socket]);
  return (
    <SocketContext.Provider value={providerData}>
      {children}
    </SocketContext.Provider>
  );
}

export default async (socket) => {
  const i18nInstance = i18next.createInstance();

  await i18nInstance
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  filter.add(filter.getDictionary('ru'));

  socket.on('newMessage', (data) => {
    store.dispatch(addMessage(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(addChannel(data));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
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
          <AppProvider socket={socket}>
            <AuthProvider>
              <App />
              <ToastContainer />
            </AuthProvider>
          </AppProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
};
