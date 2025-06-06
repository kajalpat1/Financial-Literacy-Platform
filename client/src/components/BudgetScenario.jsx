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


const doApplyRate = (value, rate) => {
  return value + value * (rate / 100);
};

const doApplyAmount = (value, amount) => {
  const next = value - amount;
  return next < 0 ? 0 : next;
};

const BudgetScenario = () => {
  const history = useSelector(state => state.scenarioHistory);
  const dispatch = useDispatch();
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    if (!history || history.length === 0) {
      setChartValues([0]);
      return;
    }


    const initialPrincipal = history[0].principal || 0;
    const values = [initialPrincipal];
    let running = initialPrincipal;

    history.forEach(entry => {
      if (entry.rate !== null && entry.rate !== undefined) {
        running = doApplyRate(running, entry.rate);
      } else if (entry.amount !== null && entry.amount !== undefined) {
        running = doApplyAmount(running, entry.amount);
      }
      running = parseFloat(running.toFixed(2));
      values.push(running);
    });

    setChartValues(values);
  }, [history]);

  const chartData = {
    labels: chartValues.map((_, idx) => `Year ${idx}`),
    datasets: [{
      label: 'Total over Time',
      data: chartValues,
      tension: 0.4,
      fill: false,
      borderColor: '#0d47a1',
      backgroundColor: '#0d47a1',
      pointRadius: 3,
      pointHoverRadius: 5
    }]
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
          You clicked {history.length} choice{history.length === 1 ? '' : 's'}.<br />
          Starting principal: ${chartValues[0] || 0}.<br />
          {history.map((entry, idx) => (
            <span key={idx}>
              • Year {idx + 1}: {entry.option}&nbsp;
              {entry.rate != null ? `(@ ${entry.rate}%)` : `(− $${entry.amount})`}<br />
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
