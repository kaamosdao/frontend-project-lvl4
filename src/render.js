// @ts-check
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './index.jsx';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const render = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  const App = await init(socket);
  root.render(App);
};

render();
