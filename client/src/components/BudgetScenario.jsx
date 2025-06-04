// client/src/components/BudgetScenario.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

function applySave(currentValue, rate = 5) {
  return currentValue + currentValue * (rate / 100);
}


function applyInvest(currentValue, rate = 8) {
  return currentValue + currentValue * (rate / 100);
}


function applySpend(currentValue, annualSpend = 1000) {
  return currentValue - annualSpend;
}


function applyDebt(currentValue, annualDebtPayment = 600) {
  return currentValue - annualDebtPayment;
}

const BudgetScenario = () => {
  
  const history = useSelector(state => state.scenarioHistory);

  const [chartValues, setChartValues] = useState([]);
  const INITIAL_VALUE = 0;

  useEffect(() => {
    
    if (!history || history.length === 0) {
      setChartValues([INITIAL_VALUE]);
      return;
    }

    const values = [INITIAL_VALUE];
    let running = INITIAL_VALUE;

    history.forEach(choice => {
      switch (choice.toLowerCase()) {
        case 'save':
          running = applySave(running, 5);
          break;
        case 'invest':
          running = applyInvest(running, 8);
          break;
        case 'spend':
          running = applySpend(running, 1000);
          break;
        case 'pay off debt':
        case 'debt':
        case 'loan':
          running = applyDebt(running, 600);
          break;
        default:
          
          break;
      }
      
      values.push(parseFloat(running.toFixed(2)));
    });

    setChartValues(values);
  }, [history]);

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
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  return (
    <div className="page page--scenario">
      <h2 style={{ marginBottom: '1rem' }}>Scenario Progression</h2>
      <div className="chart-container" style={{ width: '90%', maxWidth: '700px', marginTop: '2rem' }}>
        <Line data={chartData} />
      </div>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Each “vote” in your history was treated as a 1‐year decision. <br />
        For example, if you voted ['Save', 'Invest', 'Spend'], <br />
        the chart shows Year 0 → Year 1 after saving, Year 2 after investing, Year 3 after spending, etc.  
      </p>
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
