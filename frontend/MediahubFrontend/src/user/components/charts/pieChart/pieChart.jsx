import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function PieChart({ valuesArray, labelsArray, title, backgroundColors, onSliceClick, responsive = true }) {
  return (
    <Pie
      data={{
        labels: labelsArray,
        datasets: [
          {
            data: valuesArray,
            backgroundColor: backgroundColors || [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: backgroundColors?.map(c => c.replace('0.6', '1')) || [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#333',
              font: { size: 14, family: 'Arial' },
            },
          },
          title: {
            display: !!title,
            text: title,
            color: '#222',
            font: { size: 18, weight: 'bold' },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0 && onSliceClick) {
            const index = elements[0].index;
            const clickedLabel = labelsArray[index];
            onSliceClick(clickedLabel);
          }
        },
      }}
    />
  );
}