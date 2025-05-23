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

  const handleVote = async (selectedOption) => {
    // derive scenario params
    let type = 'save', rate = 5, value = 5000;
    const lower = selectedOption.toLowerCase();
    if (lower.includes('invest'))      { type = 'invest'; rate = 8;   }
    else if (lower.includes('save'))   { type = 'save';   rate = 5;   }
    else if (lower.includes('spend'))  { type = 'spend';  value = 1000; }
    else if (lower.includes('debt')||lower.includes('loan')) {
      type = 'spend'; value = 600;
    }

    // dispatch vote → updates Redux→currentPoll
    await vote(poll._id, { answer: selectedOption });
    // then navigate into your scenario page
    navigate(`/scenario?type=${type}&rate=${rate}&value=${value}`);
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
  { vote }
)(Poll);



