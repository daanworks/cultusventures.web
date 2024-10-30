"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import content from "@/content";

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {

  const chartData: ChartData<'doughnut'> = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        label: 'Sample Data',
        data: [25, 35, 20, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Soft pink (complementary to blue)
          'rgba(255, 159, 64, 0.6)',  // Soft orange
          'rgba(75, 192, 192, 0.6)',  // Soft teal
          'rgba(153, 102, 255, 0.6)', // Soft purple
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',    // Solid pink
          'rgba(255, 159, 64, 1)',    // Solid orange
          'rgba(75, 192, 192, 1)',    // Solid teal
          'rgba(153, 102, 255, 1)',   // Solid purple
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='lg:text-7xl md:text-6xl text-4xl font-sans pb-24 pt-8'>{content.positions.title}</div>
      <div className='md:text-2xl text-xl w-1/2' dangerouslySetInnerHTML={{ __html: content.positions.description }} />
      <div className='w-1/3 py-24'>
        <Doughnut
          data={chartData}
          options={{
            animation: {
              duration: 0
            },
            plugins:
              { legend: { display: false }, tooltip: { enabled: true } },
            cutout: "40%",
            aspectRatio: 1,
            responsive: true,
          }}
        />
      </div>
    </div>
  )
}

export default Portfolio