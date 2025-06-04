import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ConnectedPolls from '../components/Polls';
import ErrorMessage from '../components/ErrorMessage';
import gif from '../pages/homescreen.gif';
import { getPolls, getUserPolls, getCurrentPoll, removeError } from '../store/actions';

const PollsWithNavigate = (props) => {
  const navigate = useNavigate();
  return <ConnectedPolls {...props} navigate={navigate} />;
};

function HomePage({ auth, polls, getPolls, getUserPolls, removeError }) {
  useEffect(() => { removeError(); }, [removeError]);
  useEffect(() => { getPolls();    }, [getPolls]);


  //only show polls when logged in
  return (
    <div className="page page--home">
      <ErrorMessage />

      
      {!auth.isAuthenticated && (
        <div className="welcome">
          <h1>Welcome to BudgetVote</h1>
          <p>
            Vote on real‐life budgeting scenarios—rent vs. save vs. invest—and see
            how your choices play out over five years. Each decision path simulates
            compound growth, debt accumulation, and more, so you can learn smart
            money habits by doing, not just reading.
          </p>
          <img src={gif} alt="BudgetVote demo" className="home-gif" />
        </div>
      )}

      
      {auth.isAuthenticated && (
        <PollsWithNavigate
          auth={auth}
          polls={polls}
          getPolls={getPolls}
          getUserPolls={getUserPolls}
        />
      )}
    </div>
  );
}

export default connect(
  store => ({ auth: store.auth, polls: store.polls }),
  { getPolls, getUserPolls, getCurrentPoll, removeError }
)(HomePage);

