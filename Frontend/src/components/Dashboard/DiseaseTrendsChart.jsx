import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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

const DiseaseTrendsChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Mock data for disease trends
    const mockData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Respiratory Cases',
          data: [65, 59, 80, 81, 56, 72],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Cardiac Cases',
          data: [28, 48, 40, 19, 86, 27],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Diabetes Cases',
          data: [45, 25, 60, 35, 75, 40],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }
      ]
    };
    setChartData(mockData);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Disease Trends Over Time',
      },
    },
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="text-primary mb-4">
          Disease Trends Analysis
        </Card.Title>
        {chartData && (
          <div style={{ height: '400px' }}>
            <Line options={options} data={chartData} />
          </div>
        )}
        <div className="mt-3">
          <Row>
            <Col md={4}>
              <div className="text-center">
                <h5 className="text-danger">Respiratory</h5>
                <p className="mb-0">+12% from last month</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <h5 className="text-info">Cardiac</h5>
                <p className="mb-0">-5% from last month</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <h5 className="text-success">Diabetes</h5>
                <p className="mb-0">+8% from last month</p>
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DiseaseTrendsChart;
