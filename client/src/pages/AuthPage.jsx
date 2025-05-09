import React from 'react';
import {Navigate} from 'react-router-dom';
//import { useSelector } from 'react-redux';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = ({authType, isAuthenticated}) => {
    //const isAuthenticated = useSelector(state => state.auth?.isAuthenticated); // adjust path as needed

    if (isAuthenticated) return <Navigate to="/" />;
  


    return (
        <div>
            <ErrorMessage />
            <Auth authType = {authType} />


        </div>
    )
}

export default AuthPage;