// client/src/components/BudgetScenario.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

import { clearChoices } from '../store/actions/scenario';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Compute one‐year result if the user “saved” at some rate
const doSave = (currentValue, rate) => {
  return currentValue + currentValue * (rate / 100);
};

// Compute one‐year result if the user “invested” at some rate
const doInvest = (currentValue, rate) => {
  return currentValue + currentValue * (rate / 100);
};

// Compute one‐year result if the user “spent” some amount (floor at zero)
const doSpend = (currentValue, amount) => {
  const next = currentValue - amount;
  return next < 0 ? 0 : next;
};

// Compute one‐year result if the user “paid debt” (we’ll treat same as spending on debt)
const doDebtPayment = (currentValue, amount) => {
  const next = currentValue - amount;
  return next < 0 ? 0 : next;
};

const BudgetScenario = () => {
  // 1) grab the raw history array from Redux; each entry is now an object
  const history = useSelector(state => state.scenarioHistory);
  const dispatch = useDispatch();

  // 2) We’ll maintain an array of running values, year by year:
  const [chartValues, setChartValues] = useState([]);

  // 3) Whenever the “history” changes, re‐compute the entire line:
  useEffect(() => {
    // If no history, just start at zero (Year 0 = 0)
    if (!history || history.length === 0) {
      setChartValues([0]);
      return;
    }

    // We'll start with Year 0 = 0
    const values = [0];
    let running = 0;

    // Go through each object in history:
    history.forEach(entry => {
      const { type } = entry;

      if (type === 'save') {
        // e.g. entry.rate === 5
        running = doSave(running, entry.rate);
      }
      else if (type === 'invest') {
        // e.g. entry.rate === 8
        running = doInvest(running, entry.rate);
      }
      else if (type === 'spend') {
        // e.g. entry.amount === 1000:
        running = doSpend(running, entry.amount);
      }
      else if (type === 'debt') {
        running = doDebtPayment(running, entry.amount);
      }
      else {

        
      }
      running = parseFloat(running.toFixed(2));
      values.push(running);
    });

    setChartValues(values);
  }, [history]);

  // Build ChartJS data
  const chartData = {
    labels: chartValues.map((_, idx) => `Year ${idx}`),
    datasets: [
      {
        label: 'Total over Time',
        data: chartValues,
        tension: 0.4,
        fill: false,
        borderColor: '#0d47a1',
        backgroundColor: '#0d47a1',
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  return (
    <div className="page page--scenario">
      <h2 style={{ marginBottom: '1rem' }}>Scenario Progression</h2>

      <div className="button_center" style={{ marginBottom: '1rem' }}>
        <button onClick={() => dispatch(clearChoices())} className="button">
          Reset History
        </button>
      </div>

      <div className="chart-container" style={{ width: '90%', maxWidth: '700px' }}>
        <Line data={chartData} />
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          You have made {history.length} choice{history.length === 1 ? '' : 's'}. <br />
          Starting at \$0. Each vote corresponds to one “year”:<br />
          {history.map((entry, i) => (
            <span key={i}>
              • Year {i + 1}: {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}&nbsp;
              {entry.type === 'save' || entry.type === 'inest'
                ? `(@ ${entry.rate}%)`
                : `(− $${entry.amount})`}<br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BudgetScenario;


/*

import { useDispatch } from 'react-redux';
import { clearChoices } from '../store/actions/scenario';

// …
const dispatch = useDispatch();

// somewhere in the JSX:
<button onClick={() => dispatch(clearChoices())} className="button">
  Reset History
</button>*/ // add somewhere
