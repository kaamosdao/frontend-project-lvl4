import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

function Layout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const logoutButton = (
    <Nav.Link
      as={Button}
      variant="outline-secondary"
      onClick={() => {
        auth.logOut();
        navigate('/login', { replace: true });
      }}
      className="text-white me-3 py-0"
    >
      Log Out
    </Nav.Link>
  );
  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="dark" variant="dark" className="text-white">
        <Container>
          <Navbar.Brand as={Link} to="/" className="px-3 ms-3">MESSENGER</Navbar.Brand>
          <Nav>
            {auth.loggedIn ? logoutButton : ''}
            <Nav.Link as={Link} to="/about" className="active text-reset me-3">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Layout;
