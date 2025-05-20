import { Line } from 'react-chartjs-2';

const SimulationChart = ({ dataPoints, label }) => {
  const data = {
    labels: ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
    datasets: [{
      label,
      data: dataPoints,
      fill: false,
      borderColor: 'blue',
      tension: 0.1
    }]
  };

  return <Line data={data} />;
};
