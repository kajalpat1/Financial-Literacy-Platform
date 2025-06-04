// client/src/components/Poll.jsx
import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../store/actions/polls';
import { addChoice } from '../store/actions/scenario';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const Poll = ({ poll, vote, addChoice }) => {
  if (!poll || !poll.options) return null;

  const handleVote = async (selectedOption) => {

    const lower = selectedOption.toLowerCase();
    let choiceObject = null;

    if (lower.includes('save')) {
      choiceObject = {
        type: 'save',
        principal: 5000, 
        rate: 5
      };
    }
    else if (lower.includes('invest')) {
      choiceObject = {
        type: 'invest',
        principal: 5000,  
        rate: 8
      };
    }
    else if (lower.includes('spend')) {
      choiceObject = {
        type: 'spend',
        principal: 5000, 
        amount: 1000     
      };
    }
    else if (lower.includes('debt') || lower.includes('loan')) {
      choiceObject = {
        type: 'debt',
        principal: 5000,
        amount: 600     
      };
    }


    addChoice(choiceObject);

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
      backgroundColor: poll.options.map(() => '#' + Math.random().toString(16).slice(2, 8)),
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





