import React from 'react';
import {connect} from 'react-redux';

const ErrorMessage = ({error}) => (
<div>{error && <div>{error.message}</div>}</div> //check if error exists

);

export default connect(store=> ({error:store.error}))(ErrorMessage);

