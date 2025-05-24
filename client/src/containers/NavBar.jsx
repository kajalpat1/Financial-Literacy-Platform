import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';

const NavBar = ({ auth, logout }) => (
  <nav className="navbar">
    <div className="navbar-container">
      <NavLink to="/"       className="navbar-item">Home</NavLink>
      {!auth.isAuthenticated && (
        <>
          <NavLink to="/register" className="navbar-item">Register</NavLink>
          <NavLink to="/login"    className="navbar-item">Login</NavLink>
        </>
      )}
      {auth.isAuthenticated && (
        <>
          <NavLink to="/poll/new"   className="navbar-item">Create Poll</NavLink>
          <NavLink to="/scenario" className="navbar-item">Scenarios</NavLink>
          <button onClick={logout}  className="navbar-item">Logout</button>
        </>
      )}
    </div>
    {auth.isAuthenticated && auth.user && (
      <p className="navbar-user">Logged in as {auth.user.username}</p>
    )}
  </nav>
);
 //store => ({ auth: store.auth }),
export default connect(
  store => ({ auth: store.auth }),
  { logout }
)(NavBar);

