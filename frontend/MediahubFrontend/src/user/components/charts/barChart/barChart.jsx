import Bar from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,LinearScale, BarElement,Tooltip, Title, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend);

export function BarChart({ valuesArray, labelsArray, title, indexAxis, borderWidth, responsive, onBarClick}) {
  return (
    <Bar
      data={{
        labels: labelsArray,
        datasets: [
          {
            label: labelsArray,
            data: valuesArray,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: borderWidth || 1,
          },
        ],
      }}
      options={{
        indexAxis: indexAxis || 'x',
        responsive: responsive || true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: !!title,
            text: title,
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const clickedLabel = labelsArray[index];
            onBarClick(clickedLabel);
          }
        }
      }}
    />
  );
}