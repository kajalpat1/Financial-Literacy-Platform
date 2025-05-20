
import React, { useState } from 'react';
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


const compoundInterest = (initial, rate, years) => {
  const values = [];
  for (let i = 0; i <= years; i++) {
    values.push(initial * Math.pow(1 + rate, i));
  }
  return values;
};

const costAccumulation = (initial, monthlyCost, years) => {
  const values = [];
  for (let i = 0; i <= years; i++) {
    values.push(initial + monthlyCost * 12 * i);
  }
  return values;
};

const BudgetScenario = () => {
  const [scenario, setScenario] = useState('save');

  const dataMap = {
    save: compoundInterest(5000, 0.05, 5),
    spend: costAccumulation(0, 1000, 5),
    invest: compoundInterest(5000, 0.08, 5)
  };

  const chartData = {
    labels: Array.from({ length: 6 }, (_, i) => `${i} yr`),
    datasets: [
      {
        label: scenario.charAt(0).toUpperCase() + scenario.slice(1),
        data: dataMap[scenario],
        fill: false,
        borderColor: '#0d47a1'
      }
    ]
  };

  return (
    <div className="page">
      <h2>Choose a Budgeting Scenario</h2>
      <div className="button_center">
        <button className="button" onClick={() => setScenario('save')}>Save</button>
        <button className="button" onClick={() => setScenario('spend')}>Spend</button>
        <button className="button" onClick={() => setScenario('invest')}>Invest</button>
      </div>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BudgetScenario;
