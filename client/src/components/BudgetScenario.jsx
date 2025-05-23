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


  const [scenario, setScenario] = useState('save');
  const [chartValues, setChartValues] = useState([]);

  // Whenever the URL changes, update scenario & chart
  useEffect(() => {
    const selected = params.get('type');
    const rate = parseFloat(params.get('rate')) || 5;
    const value = parseFloat(params.get('value')) || 5000;

  setScenario(selected);

  if (selected === 'spend') {
    switch (selected) {
      case 'save':
      case 'invest':
        setChartValues(simulateCompound(value, rate));
        break;
      case 'spend':
        setChartValues(simulateSpending(0, value));
        break;
      default:
        setChartValues(simulateCompound(5000, 5));
    }
  }
}, [search]);


  const chartData = {
    labels: Array.from({ length: 6 }, (_, i) => `${i} yr`),
    datasets: [
      {
        label: (scenario || 'Default').charAt(0).toUpperCase() + (scenario || 'Default').slice(1),
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


