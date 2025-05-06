'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
}

interface ActivityChartProps {
  data: {
    labels: string[];
    datasets: Dataset[];
  };
}

export const ActivityChart = ({ data }: ActivityChartProps) => {
  const [hoveredDataset, setHoveredDataset] = useState<string | null>(null);

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        onHover: (e: any, legendItem: any) => {
          setHoveredDataset(legendItem.text);
        },
        onLeave: () => {
          setHoveredDataset(null);
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Activity Over Time',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: hoveredDataset ? false : true,
        },
      },
      x: {
        grid: {
          drawOnChartArea: hoveredDataset ? false : true,
        },
      }
    },
    elements: {
      line: {
        borderWidth: hoveredDataset ? (ctx: any) => 
          ctx.dataset.label === hoveredDataset ? 3 : 1 : 2,
      },
      point: {
        radius: hoveredDataset ? (ctx: any) => 
          ctx.dataset.label === hoveredDataset ? 6 : 3 : 4,
        hoverRadius: 8,
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuad' as const,
    },
    onHover: (event: any, chartElements: any) => {
      if (chartElements.length > 0) {
        const datasetIndex = chartElements[0].datasetIndex;
        setHoveredDataset(data.datasets[datasetIndex].label);
      } else {
        setHoveredDataset(null);
      }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box sx={{ height: 400, width: '100%' }}>
        <Line options={options} data={data} />
      </Box>
    </motion.div>
  );
};