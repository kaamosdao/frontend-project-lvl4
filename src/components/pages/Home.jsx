import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { setChannels, setCurrentChannel } from '../../slices/channelSlice.js';
import { setMessages } from '../../slices/messageSlice.js';
import useAuth from '../../hooks/index.jsx';
import localStorageData from '../../localStorageData.js';
import routes from '../../routes.js';
import Channels from '../channels/Channels.jsx';
import Messages from '../messages/Messages.jsx';

function Home() {
  const { loggedIn, logOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (loggedIn) {
    const token = localStorageData.getToken();
    useEffect(() => {
      const fetchData = async () => {
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(routes.dataPath(), options);
          dispatch(setChannels(data.channels));
          dispatch(setMessages(data.messages));
          dispatch(setCurrentChannel(data.currentChannelId));
        } catch (error) {
          logOut();
          navigate('/login');
          throw error;
        }
      };
      fetchData();
    }, []);

    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col md={2} className="col-4 border-end px-2">
            <Channels />
          </Col>
          <Col className="h-100">
            <Messages />
          </Col>
        </Row>
      </Container>
    );
  }
  return <Navigate to="/login" />;
}

export default Home;
