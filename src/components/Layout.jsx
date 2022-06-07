import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import LogoutButton from './LogoutButton.jsx';
import ButtonChangeLang from './ButtonChangeLang.jsx';
import getModal from '../getModal.jsx';

function Layout() {
  const { loggedIn } = useAuth();
  const { t } = useTranslation();
  const modalAction = useSelector((state) => state.modal.action);

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="dark" variant="dark" className="text-white">
        <Container>
          <Navbar.Brand as={Link} to="/" className="px-3 ms-3">Hexlet Chat</Navbar.Brand>
          <Nav>
            {loggedIn ? <LogoutButton /> : ''}
            <Nav.Link as={Link} to="/about" className="active text-reset me-3">{t('layoutPage.title')}</Nav.Link>
            <ButtonChangeLang className="me-5" />
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      {modalAction && getModal(modalAction)}
    </div>
  );
}

export default Layout;
