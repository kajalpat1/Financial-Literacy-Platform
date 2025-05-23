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
    result.push(parseFloat(current.toFixed(2)));
    current += current * (rate / 100);
  }
  return result;
};

const simulateSpending = (monthlyCost, initial = 0, years = 5) => {
  const result = [];
  for (let i = 0; i <= years; i++) {
    result.push(parseFloat((initial + monthlyCost * 12 * i).toFixed(2)));
  }
  return result;
};

const BudgetScenario = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const selectedType = params.get('type') || 'save';
  const rate         = parseFloat(params.get('rate'))  || 5;
  const value        = parseFloat(params.get('value')) || 5000;

  const [scenario, setScenario]     = useState(selectedType);
  const [chartValues, setChartValues] = useState([]);

  useEffect(() => {
    setScenario(selectedType);
    if (selectedType === 'spend') {
      setChartValues(simulateSpending(value));
    } else {
      setChartValues(simulateCompound(value, rate));
    }
  }, [selectedType, rate, value]);

  const chartData = {
    labels: Array.from({ length: 6 }, (_, i) => `${i} yr`),
    datasets: [{
      label: scenario.charAt(0).toUpperCase() + scenario.slice(1),
      data: chartValues,
      tension: 0.4,
      fill: false,
      borderColor: '#0d47a1'
    }]
  };

  return (
    <div className="page page--scenario">
      <h2 style={{ marginBottom: '1rem' }}>Poll Visualization</h2>
      <div
        className="chart-container"
        style={{ width: '90%', maxWidth: '600px', marginTop: '2rem' }}
      >
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default BudgetScenario;




