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
  const params = new URLSearchParams(search);
  const [scenario, setScenario] = useState('save');
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    const selected = params.get('type');
    if (selected) {
      setScenario(selected);
    }
  }, [search]);

  useEffect(() => {
    switch (scenario) {
      case 'save':
        setChartValues(simulateCompound(5000, 5));
        break;
      case 'invest':
        setChartValues(simulateCompound(5000, 8));
        break;
      case 'spend':
        setChartValues(simulateSpending(0, 1000));
        break;
      default:
        setChartValues(simulateCompound(5000, 5));
    }
  }, [scenario]);

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
      <h2 style={{ marginBottom: '1rem' }}>Choose a Budgeting Scenario</h2>
      <div className="button_center">
        <button className="button" onClick={() => setScenario('save')}>Save</button>
        <button className="button" onClick={() => setScenario('spend')}>Spend</button>
        <button className="button" onClick={() => setScenario('invest')}>Invest</button>
      </div>
      <div className="chart-container" style={{ width: '90%', maxWidth: '600px', marginTop: '2rem' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BudgetScenario;
