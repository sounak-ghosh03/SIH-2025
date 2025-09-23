import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Badge, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';

const AlertsList = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Mock alerts data
    const mockAlerts = [
      {
        id: 1,
        type: 'warning',
        title: 'High Respiratory Cases in District 3',
        message: 'Increased respiratory cases detected. Please check health centers.',
        timestamp: '2024-01-15 10:30 AM',
        priority: 'high'
      },
      {
        id: 2,
        type: 'info',
        title: 'New Health Center Added',
        message: 'Health Center XYZ has been added to the network.',
        timestamp: '2024-01-15 09:15 AM',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'success',
        title: 'Vaccination Drive Completed',
        message: 'COVID-19 vaccination drive successfully completed.',
        timestamp: '2024-01-14 04:20 PM',
        priority: 'low'
      },
      {
        id: 4,
        type: 'warning',
        title: 'Low Medicine Stock Alert',
        message: 'Insulin stock running low in multiple centers.',
        timestamp: '2024-01-14 02:45 PM',
        priority: 'high'
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      case 'info':
        return <FaInfoCircle className="text-info" />;
      case 'success':
        return <FaCheckCircle className="text-success" />;
      default:
        return <FaInfoCircle className="text-info" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'success'
    };

    return (
      <Badge bg={variants[priority] || 'secondary'}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title className="text-primary mb-0">
            System Alerts & Notifications
          </Card.Title>
          <Badge bg="primary">{alerts.length}</Badge>
        </div>

        <ListGroup variant="flush">
          {alerts.map((alert) => (
            <ListGroup.Item key={alert.id} className="d-flex align-items-start">
              <div className="me-3 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{alert.title}</h6>
                    <p className="mb-1 text-muted small">{alert.message}</p>
                    <small className="text-muted">{alert.timestamp}</small>
                  </div>
                  <div className="d-flex align-items-center">
                    {getPriorityBadge(alert.priority)}
                    <Button
                      variant="link"
                      size="sm"
                      className="ms-2 p-0 text-muted"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <FaTimes />
                    </Button>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {alerts.length === 0 && (
          <div className="text-center py-4">
            <FaCheckCircle className="text-success mb-2" size={48} />
            <p className="text-muted">No active alerts</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AlertsList;
