import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import LogoutButton from './LogoutButton.jsx';
import ButtonChangeLang from './ButtonChangeLang.jsx';
import { clientRoutes } from '../routes.js';
import ModalContainer from './modals/ModalContainer.jsx';

function Layout() {
  const { loggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Navbar bg="dark" variant="dark" className="text-white">
        <Container>
          <Navbar.Brand as={Link} to={clientRoutes.home()} className="px-3 ms-3">Hexlet Chat</Navbar.Brand>
          <Nav>
            {loggedIn ? <LogoutButton /> : ''}
            <Nav.Link as={Link} to={clientRoutes.about()} className="active text-reset me-3">{t('layoutPage.title')}</Nav.Link>
            <ButtonChangeLang className="me-5" />
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
      <ModalContainer />
    </div>
  );
}

export default Layout;
