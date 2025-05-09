import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import AuthPage from '../pages/AuthPage';

const RouteViews = ({auth}) => (<main> 
    <Routes>
        <Route exact path='login' render = {() => (<AuthPage authType ="login" isAuthenticated={auth.isAuthenticated} />)} 
        />
        <Route exact path = 'register' render={()=> (<AuthPage authType="register" isAuthenticated={auth.isAuthenticated}/>)} 
        />
    </Routes>



</main>);


export default connect(store => ({auth: store.auth}))(RouteViews);