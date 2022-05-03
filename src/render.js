// @ts-check
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './index.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/application.scss';
import './i18n.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const render = () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  const App = init(socket);
  root.render(App);
};

render();
