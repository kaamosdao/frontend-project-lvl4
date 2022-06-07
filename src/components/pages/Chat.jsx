import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { setChannels, setCurrentChannel } from '../../slices/channelSlice.js';
import { setMessages } from '../../slices/messageSlice.js';
import useAuth from '../../hooks/index.jsx';
import localStorageData from '../../localStorageData.js';
import serverRoutes, { clientRoutes } from '../../routes.js';
import Channels from '../channels/Channels.jsx';
import Messages from '../messages/Messages.jsx';

const fetchData = async (token, dispatch, logOut, navigate) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(serverRoutes.dataPath(), options);
    dispatch(setChannels(data.channels));
    dispatch(setMessages(data.messages));
    dispatch(setCurrentChannel(data.currentChannelId));
  } catch (error) {
    logOut();
    navigate(clientRoutes.login());
    throw error;
  }
};

function Chat() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorageData.getToken();
    fetchData(token, dispatch, logOut, navigate);
  }, [dispatch, logOut, navigate]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col md={2} className="col-4 bg-light border-end px-2">
          <Channels />
        </Col>
        <Col className="p-0 h-100">
          <Messages />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
