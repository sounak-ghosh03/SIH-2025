import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaUsers, FaHeartbeat, FaHospital, FaChartLine } from 'react-icons/fa';
import Heatmap from './Heatmap';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMigrants: 0,
    activeCases: 0,
    healthCenters: 0,
    recentActivity: []
  });
  const { t } = useTranslation();

  useEffect(() => {
    // Mock data for demonstration
    setStats({
      totalMigrants: 1250,
      activeCases: 45,
      healthCenters: 12,
      recentActivity: [
        { id: 1, action: 'New migrant registered', time: '2 hours ago', type: 'registration' },
        { id: 2, action: 'Health record updated', time: '4 hours ago', type: 'update' },
        { id: 3, action: 'QR code scanned', time: '6 hours ago', type: 'scan' },
        { id: 4, action: 'Medical checkup completed', time: '8 hours ago', type: 'checkup' }
      ]
    });
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration': return '👤';
      case 'update': return '📝';
      case 'scan': return '📱';
      case 'checkup': return '🏥';
      default: return '📋';
    }
  };

  const getActivityBadge = (type) => {
    switch (type) {
      case 'registration': return <Badge bg="success">New</Badge>;
      case 'update': return <Badge bg="primary">Update</Badge>;
      case 'scan': return <Badge bg="info">Scan</Badge>;
      case 'checkup': return <Badge bg="warning">Checkup</Badge>;
      default: return <Badge bg="secondary">Activity</Badge>;
    }
  };

  return (
    <Container>
      <div className="mb-4">
        <h1 className="text-primary">
          <FaChartLine className="me-3" />
          {t('dashboard.welcome')}
        </h1>
        <p className="text-muted">Overview of Digital Health Passport System</p>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaUsers size={30} className="text-primary mb-2" />
              <h3>{stats.totalMigrants.toLocaleString()}</h3>
              <p className="text-muted mb-0">{t('dashboard.totalMigrants')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaHeartbeat size={30} className="text-danger mb-2" />
              <h3>{stats.activeCases}</h3>
              <p className="text-muted mb-0">{t('dashboard.activeCases')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaHospital size={30} className="text-success mb-2" />
              <h3>{stats.healthCenters}</h3>
              <p className="text-muted mb-0">{t('dashboard.healthCenters')}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <FaChartLine size={30} className="text-info mb-2" />
              <h3>98%</h3>
              <p className="text-muted mb-0">System Uptime</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Heatmap Section */}
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Health Services Distribution</h4>
              <Heatmap />
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-3">{t('dashboard.recentActivity')}</h4>
              <div className="activity-list">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="d-flex align-items-start mb-3">
                    <div className="me-3">
                      <span style={{ fontSize: '1.5em' }}>{getActivityIcon(activity.type)}</span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <p className="mb-1 small">{activity.action}</p>
                        {getActivityBadge(activity.type)}
                      </div>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
