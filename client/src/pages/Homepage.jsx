import React, { useEffect } from 'react';

import Polls from '../components/Polls';
import ErrorMessage from'../components/ErrorMessage';
import { connect } from 'react-redux';
import { getPolls, getUserPolls, getCurrentPoll } from '../store/actions';


function HomePage({ auth, polls, getPolls, getUserPolls }) {
    useEffect(() => { getPolls() }, [getPolls]);
  
    return (
      <div>
        <ErrorMessage />
        <div className="welcome">
            <h1>Welcome to BudgetVote</h1>
        <p>
            Vote on real‐life budgeting scenarios—rent vs. save vs. invest—and see
            how your choices play out over five years.  Each decision path simulates
            compound growth, debt accumulation, and more, so you can learn smart
            money habits by doing, not just reading.
        </p>
        </div>
        <Polls auth={auth} polls={polls} getPolls={getPolls} getUserPolls={getUserPolls}/>
      </div>
    );
  }


export default connect(
    store => ({
      auth: store.auth,
      polls: store.polls,
    }),
    { getPolls, getUserPolls, getCurrentPoll }
  )(HomePage);