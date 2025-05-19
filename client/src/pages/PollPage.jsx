import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';
import { getCurrentPoll } from '../store/actions';

const PollPage = ({ getPoll }) => {
  
  const { id } = useParams();


  useEffect(() => {
    if (id) {
      getPoll(id);
    }
  }, [id, getPoll]);

  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default connect(null, { getPoll: getCurrentPoll })(PollPage);
import ErrorMessage from'../components/ErrorMessage';