import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
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

const simulateCompound = (value, rate, years = 5) => {
  const result = [];
  let current = value;
  for (let i = 0; i <= years; i++) {
    result.push(current.toFixed(2));
    current += current * (rate / 100);
  }
  return result;
};

const simulateSpending = (value, monthlyCost, years = 5) => {
  const result = [];
  for (let i = 0; i <= years; i++) {
    result.push((value + monthlyCost * 12 * i).toFixed(2));
  }
  return result;
};

const BudgetScenario = () => {
  const { search } = useLocation();

  const [scenario, setScenario] = useState('save');
  const [chartValues, setChartValues] = useState([]);

  // Whenever the URL changes, update scenario & chart
  useEffect(() => {
  const selected = new URLSearchParams(search).get('type');
  const rate = parseFloat(new URLSearchParams(search).get('rate')) || 5;
  const value = parseFloat(new URLSearchParams(search).get('value')) || 5000;

  setScenario(selected);

  if (selected === 'spend') {
    setChartValues(simulateSpending(0, value));
  } else {
    setChartValues(simulateCompound(value, rate));
  }
}, [search]); 

  const chartData = {
    labels: Array.from({ length: 6 }, (_, i) => `${i} yr`),
    datasets: [
      {
        label: scenario.charAt(0).toUpperCase() + scenario.slice(1),
        data: chartValues,
        fill: false,
        borderColor: '#0d47a1'
      }
    ]
  };

  return (
    <div className="page page--scenario">
      <h2 style={{ marginBottom: '1rem' }}>Poll Visualization</h2>
      <div className="chart-container" style={{ width: '90%', maxWidth: '600px', marginTop: '2rem' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BudgetScenario;


