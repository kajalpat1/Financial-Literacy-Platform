import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../store/actions/polls';
import { Navigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const CreatePollPage = ({ isAuthenticated, createPoll }) => {
  const [question, setQuestion] = useState('');
  const [principal, setPrincipal] = useState(5000);
  const [saveRate, setSaveRate] = useState(5);
  const [investRate, setInvestRate] = useState(8);
  const [spendAmount, setSpendAmount] = useState(1000);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleSubmit = e => {
    e.preventDefault();

    const options = [
      {
        option: 'Save in high-yield account',
        votes: 0,
        rate: parseFloat(saveRate),
        amount: null,
        principal: parseFloat(principal)
      },
      {
        option: 'Invest in index fund',
        votes: 0,
        rate: parseFloat(investRate),
        amount: null,
        principal: parseFloat(principal)
      },
      {
        option: 'Spend on vacation',
        votes: 0,
        rate: null,
        amount: parseFloat(spendAmount),
        principal: parseFloat(principal)
      }
    ];

    createPoll({ question, options });
  };

  return (
    <div className="page page--create">
      <ErrorMessage />
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create a New Poll</h2>

        <label className="form-label" htmlFor="question">
          Question
        </label>
        <input
          className="form-input"
          id="question"
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />

        <label className="form-label" htmlFor="principal">
          Starting Principal
        </label>
        <input
          className="form-input"
          id="principal"
          type="number"
          value={principal}
          onChange={e => setPrincipal(e.target.value)}
        />

        <h3>Option 1: Save</h3>
        <label className="form-label" htmlFor="saveRate">
          Save Rate (%)
        </label>
        <input
          className="form-input"
          id="saveRate"
          type="number"
          value={saveRate}
          onChange={e => setSaveRate(e.target.value)}
        />

        <h3>Option 2: Invest</h3>
        <label className="form-label" htmlFor="investRate">
          Invest Rate (%)
        </label>
        <input
          className="form-input"
          id="investRate"
          type="number"
          value={investRate}
          onChange={e => setInvestRate(e.target.value)}
        />

        <h3>Option 3: Spend</h3>
        <label className="form-label" htmlFor="spendAmount">
          Spend Amount (annual)
        </label>
        <input
          className="form-input"
          id="spendAmount"
          type="number"
          value={spendAmount}
          onChange={e => setSpendAmount(e.target.value)}
        />

        <div className="button_center">
          <button className="button" type="submit">
            Submit Poll
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(
  store => ({ isAuthenticated: store.auth.isAuthenticated }),
  { createPoll }
)(CreatePollPage);

