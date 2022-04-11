import React from 'react';
import { Navigate } from 'react-router-dom';

const isLogined = false;

function Home() {

  if (isLogined) {
    return (
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">HOME PAGE</h5>
          <p className="card-text">It works!</p>
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />
}

export default Home;
