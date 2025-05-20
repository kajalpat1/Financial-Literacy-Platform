import React from 'react';
import { Navigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Auth from '../components/Auth';

const AuthPage = ({ authType, isAuthenticated }) => {
  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="page page--register">
      <ErrorMessage />
      <Auth authType={authType} />
    </div>
  );
};

export default AuthPage;
