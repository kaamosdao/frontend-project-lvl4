import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setChannels, setCurrentChannel } from '../slices/channelSlice.js';
import { setMessages } from '../slices/messageSlice.js';
import useAuth from '../hooks/index.jsx';
import localStorageData from '../localStorageData.js';

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.items);
  const dispatch = useDispatch();

  if (auth.loggedIn) {
    const token = localStorageData.getToken();
    useEffect(() => {
      const fetchData = async () => {
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/api/v1/data', options);
        dispatch(setChannels(data.channels));
        dispatch(setMessages(data.messages));
        dispatch(setCurrentChannel(data.currentChannelId));
      };
      fetchData();
    }, []);
    return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">channels</h5>
          {JSON.stringify(channels, null, ' ')}
          <h5 className="card-title">currentChannelId</h5>
          {currentChannelId}
          <h5 className="card-title">messages</h5>
          {JSON.stringify(messages, null, ' ')}

          <button
            type="button"
            onClick={() => {
              auth.logOut();
              navigate('/login', { replace: true });
            }}
            className="btn btn-primary w-50 mb-3 p-3"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default Home;
