// client/src/components/Poll.jsx
import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../store/actions/polls';         
import { addChoice } from '../store/actions/scenario';  //to update scenario

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const randomColor = () => '#' + Math.random().toString(16).slice(2, 8);

const Poll = ({ poll, vote, addChoice }) => {
  if (!poll || !poll.options) return null;

  const handleVote = async (selectedOption) => {
    addChoice(selectedOption);

    try {
      await vote(poll._id, { answer: selectedOption });
    } catch (err) {
  
      console.error(err);
    }

  };

  const answers = poll.options.map(opt => (
    <button
      key={opt._id}
      className="button"
      onClick={() => handleVote(opt.option)}
    >
      {opt.option}
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
  { vote, addChoice }
)(Poll);




