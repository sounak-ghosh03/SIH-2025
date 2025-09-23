import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FaUserMd,
  FaQrcode,
  FaFileMedical,
  FaCalendarAlt,
  FaChartLine,
  FaRobot
} from 'react-icons/fa';

/**
 * Home/Dashboard page component
 * Main landing page with quick access to all features
 */
const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaUserMd size={32} />,
      title: 'Migrant Registration',
      description: 'Register migrants and generate health passports',
      path: '/migrant/register',
      color: 'primary'
    },
    {
      icon: <FaQrcode size={32} />,
      title: 'QR Code Services',
      description: 'Generate and scan QR codes for health verification',
      path: '/migrant/qr',
      color: 'success'
    },
    {
      icon: <FaFileMedical size={32} />,
      title: 'Health Records',
      description: 'Manage electronic health records and medical history',
      path: '/ehr',
      color: 'info'
    },
    {
      icon: <FaCalendarAlt size={32} />,
      title: 'Book Appointments',
      description: 'Schedule appointments with healthcare providers',
      path: '/appointments',
      color: 'warning'
    },
    {
      icon: <FaChartLine size={32} />,
      title: 'Analytics Dashboard',
      description: 'View health trends and statistical analysis',
      path: '/dashboard',
      color: 'danger'
    },
    {
      icon: <FaRobot size={32} />,
      title: 'AI Health Assistant',
      description: 'Get instant health information and guidance',
      path: '/chatbot',
      color: 'secondary'
    }
  ];

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary mb-3">
          {t('dashboard.welcome')}
        </h1>
        <p className="lead text-muted">
          Comprehensive digital health passport system for migrants in Kerala
        </p>
      </div>

      <Row className="g-4">
        {features.map((feature, index) => (
          <Col lg={4} md={6} key={index}>
            <Card className="h-100 shadow-sm hover-card">
              <Card.Body className="text-center p-4">
                <div className={`text-${feature.color} mb-3`}>
                  {feature.icon}
                </div>
                <Card.Title className="mb-3">{feature.title}</Card.Title>
                <Card.Text className="text-muted mb-4">
                  {feature.description}
                </Card.Text>
                <Button
                  as={Link}
                  to={feature.path}
                  variant={`outline-${feature.color}`}
                  className="w-100"
                >
                  Access Service
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5 text-center">
        <Card className="bg-light">
          <Card.Body>
            <h5 className="text-primary mb-3">Quick Statistics</h5>
            <Row>
              <Col md={3}>
                <div className="p-3">
                  <h3 className="text-success mb-1">1,247</h3>
                  <p className="text-muted mb-0">Total Migrants</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="p-3">
                  <h3 className="text-info mb-1">89</h3>
                  <p className="text-muted mb-0">Active Cases</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="p-3">
                  <h3 className="text-warning mb-1">24</h3>
                  <p className="text-muted mb-0">Health Centers</p>
                </div>
              </Col>
              <Col md={3}>
                <div className="p-3">
                  <h3 className="text-primary mb-1">156</h3>
                  <p className="text-muted mb-0">Appointments Today</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default HomePage;
