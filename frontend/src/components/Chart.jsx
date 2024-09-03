import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({data}) => {
  
  const brandWiseData = {
    labels: ['JK Tyres', 'CEAT', 'Apollo', 'Bridgestone', 'Vikrant', 'MRF'],
    datasets: [
      {
        label: 'New Tyres',
        data: data.brandData,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        barThickness: 35,
      },
    ],
  };

  const monthWiseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Purchases',
        data: data.monthData.purchases,
        backgroundColor: '#9C27B0',
        borderRadius: 5,
        barThickness: 25,   // Thickness of individual bars
        barPercentage: 10, // Adjusts the width of the bars
        categoryPercentage: 10, // Adjusts the spacing between groups of bars
      },
      {
        label: 'Retread',
        data: data.monthData.retread,
        backgroundColor: '#00BCD4',
        borderRadius: 5,
        barThickness: 20,
        barPercentage: 10,
        categoryPercentage: 10,
      },
      {
        label: 'Scrap',
        data: data.monthData.scrap,
        backgroundColor: '#8BC34A',
        borderRadius: 5,
        barThickness: 25,
        barPercentage: 10,
        categoryPercentage: 10,
      },
    ],
  };
  
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Tyres: ${tooltipItem.raw}`,
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
      animationDuration: 400,
      onHover: (event, elements) => {
        if (elements.length) {
          const datasetIndex = elements[0].datasetIndex;
          const dataIndex = elements[0].index;
          const dataset = event.chart.data.datasets[datasetIndex];
  
          // Change background color of the hovered bar
          dataset.backgroundColor = dataset.backgroundColor.map((color, index) =>
            index === dataIndex ? '#FF5722' : color
          );
          event.chart.update();
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 100,
        },
      },
    },
  };
  
  


  return (
    <div className="bg-white rounded-2xl font-bold flex flex-col mt-6 p-6">
      <h2 className="text-2xl font-semibold mb-8">Tyre Purchases</h2>
      <div className="flex justify-center space-x-8 w-[100%]">
        <div className="min-w-[46%] p-4 bg-white border rounded-lg ">
          <h3 className="text-lg font-medium mb-2">Brand Wise</h3>
          <Bar data={brandWiseData} options={options} />
        </div>
        <div className="min-w-[46%] p-4 bg-white border rounded-lg">
          <h3 className="text-lg font-medium mb-2">Month Wise</h3>
          <Bar data={monthWiseData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
