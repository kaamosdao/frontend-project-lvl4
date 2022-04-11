import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="d-flex flex-column h-100">
      <nav className="navbar navbar-dark bg-dark text-white">
        <Link to="/" className="navbar-brand px-3 ms-3">MESSENGER</Link>
        <Link to="/about" className="nav-link active text-reset me-3">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
