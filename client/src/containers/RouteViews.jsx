import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';


import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/Homepage';
import CreatePollPage from '../pages/CreatePollPage';
import PollPage from '../pages/PollPage';
import TestPage from '../pages/TestPage';
import { getCurrentPoll } from '../store/actions';

const RouteViews = ({ auth, getCurrentPoll }) => (
  <main>
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/login"
        element={
          <AuthPage
            authType="login"
            isAuthenticated={auth.isAuthenticated}
          />
        }
      />

      <Route
        path="/register"
        element={
          <AuthPage
            authType="register"
            isAuthenticated={auth.isAuthenticated}
          />
        }
      />

      <Route
        path="/poll/new"
        element={<CreatePollPage isAuthenticated={auth.isAuthenticated} />}
      />

      <Route
        path="/poll/:id"
        element={<PollPage getPoll={(id) => getCurrentPoll(id)} />}
      />

      <Route path="/test" element={<TestPage />} />
    </Routes>
  </main>
);

export default connect(
  (store) => ({ auth: store.auth }),
  { getCurrentPoll }
)(RouteViews);