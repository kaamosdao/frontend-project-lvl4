// @ts-check
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/application.scss';
import './i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const root = ReactDOM.createRoot(document.querySelector('#chat'));

root.render(<App />);
