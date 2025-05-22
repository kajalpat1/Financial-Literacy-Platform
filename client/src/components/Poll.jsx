import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { vote } from '../store/actions';
import { Pie } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const randomColor = () => '#' + Math.random().toString(16).slice(2, 8);

const Poll = ({ poll, vote }) => {
  const navigate = useNavigate();

  if (!poll || !poll.options) return null;

  const handleVote = (option) => {
    vote(poll._id, { answer: option }, navigate); 
  };

  const answers = poll.options.map(option => (
    <button
      className="button"
      key={option._id}
      onClick={() => handleVote(option.option)}
    >
      {option.option}
    </button>
  ));

  const data = {
    labels: poll.options.map(o => o.option),
    datasets: [{
      label: poll.question,
      data: poll.options.map(o => o.votes),
      backgroundColor: poll.options.map(() => randomColor()),
      borderColor: '#323643'
    }]
  };

  return (
    <div className="container">
      <h3 className="poll-title">{poll.question}</h3>
      <div className="button_center">{answers}</div>
      <Pie data={data} />
    </div>
  );
};

export default connect(
  state => ({ poll: state.currentPoll }),
  { vote }
)(Poll);

