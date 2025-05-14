import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import AuthPage from '../pages/AuthPage';
import TestPage from '../pages/TestPage';
import HomePage from '../pages/Homepage';
import { getCurrentPoll } from '../store/actions';
import PollPage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';

const RouteViews = ({auth, getCurrentPoll}) => (
<main> 
    <Routes>
        <Route path="/" element={<HomePage />} />
    
    <Route 
    path="/login" 
    element={<AuthPage 
    authType="login" i
    sAuthenticated={auth.isAuthenticated} />} />
    
    <Route 
    path="/register" 
    element={<AuthPage a
    uthType="register" 
    isAuthenticated={auth.isAuthenticated} />} />

<Route path="/poll/new" element={
    <CreatePollPage isAuthenticated={auth.isAuthenticated} />} />

    <Route path="/poll/:id" element={<PollPage />} />

    <Route path="/test" element={<TestPage />} />
   
    </Routes>


</main>);

//props? for poll page and home page


export default connect(store => ({auth: store.auth}), {getCurrentPoll})(RouteViews);