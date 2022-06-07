import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import { clientRoutes } from '../routes.js';

function LogoutButton() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Nav.Link
      as={Button}
      variant="outline-secondary"
      onClick={() => {
        logOut();
        navigate(clientRoutes.login(), { replace: true });
      }}
      className="text-white me-3 py-0"
    >
      {t('layoutPage.logoutButton')}
    </Nav.Link>
  );
}

export default LogoutButton;
