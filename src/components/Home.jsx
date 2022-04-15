import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

function Home() {
  const auth = useAuth();
  const navigate = useNavigate();
  if (auth.loggedIn) {
    return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">HOME PAGE</h5>
          <p className="card-text">It works!</p>
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
