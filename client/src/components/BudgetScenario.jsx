import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const simulateCompound = (initial, rate, years = 5) => {
  const arr = [];
  let v = initial;
  for (let i = 0; i <= years; i++) {
    arr.push(Number(v.toFixed(2)));
    v *= 1 + rate / 100;
  }
  return arr;
};

const simulateSpending = (initial, monthlyCost, years = 5) => {
  const arr = [];
  for (let i = 0; i <= years; i++) {
    arr.push(Number((initial + monthlyCost * 12 * i).toFixed(2)));
  }
  return arr;
};

export default function BudgetScenario() {
  const { search }     = useLocation();
  const params         = new URLSearchParams(search);
  const type           = params.get('type')  || 'save';
  const rate           = Number(params.get('rate')  || 5);
  const value          = Number(params.get('value') || 5000);

  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (type === 'spend') {
      setDataPoints(simulateSpending(0, value));
    } else {
      setDataPoints(simulateCompound(value, rate));
    }
  }, [type, rate, value]);

  const chartData = {
    labels: Array.from({ length: 6 }, (_, i) => `${i} yr`),
    datasets: [{
      label: type.charAt(0).toUpperCase() + type.slice(1),
      data: dataPoints,
      borderColor: '#0d47a1',
      fill: false,
      tension: 0.2
    }]
  };

  return (
    <div className="page page--scenario">
      <h2>Poll Visualization</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
}




