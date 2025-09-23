import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaPassport,
  FaCalendarAlt,
  FaFileMedical,
  FaQrcode
} from 'react-icons/fa';

const MigrantProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [migrant, setMigrant] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockMigrant = {
      id: id,
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      address: 'District 3, Kerala',
      aadhar: '1234 5678 9012',
      passport: 'P123456789',
      emergencyContact: '+91 9876543211',
      registrationDate: '2024-01-15',
      status: 'Active',
      qrCode: `MIGRANT-${id}`
    };

    const mockHealthRecords = [
      {
        id: 1,
        date: '2024-01-10',
        condition: 'Routine Checkup',
        doctor: 'Dr. Sarah Johnson',
        status: 'Completed',
        notes: 'Patient in good health'
      },
      {
        id: 2,
        date: '2023-12-15',
        condition: 'Blood Test',
        doctor: 'Dr. Michael Chen',
        status: 'Completed',
        notes: 'Normal results'
      }
    ];

    setMigrant(mockMigrant);
    setHealthRecords(mockHealthRecords);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!migrant) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h3 className="text-danger">Migrant not found</h3>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FaUser className="me-2" />
          Migrant Profile
        </h2>
        <Button variant="outline-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>

      <Row>
        <Col lg={4}>
          <Card className="shadow mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <FaQrcode size={64} className="text-primary" />
              </div>
              <h4>{migrant.name}</h4>
              <Badge bg={migrant.status === 'Active' ? 'success' : 'secondary'}>
                {migrant.status}
              </Badge>
              <div className="mt-3">
                <small className="text-muted">QR Code: {migrant.qrCode}</small>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow">
            <Card.Body>
              <h5 className="text-primary mb-3">Personal Information</h5>
              <div className="mb-3">
                <FaPhone className="me-2 text-muted" />
                <span>{migrant.phone}</span>
              </div>
              <div className="mb-3">
                <FaMapMarkerAlt className="me-2 text-muted" />
                <span>{migrant.address}</span>
              </div>
              <div className="mb-3">
                <FaIdCard className="me-2 text-muted" />
                <span>Aadhar: {migrant.aadhar}</span>
              </div>
              <div className="mb-3">
                <FaPassport className="me-2 text-muted" />
                <span>Passport: {migrant.passport}</span>
              </div>
              <div className="mb-3">
                <FaPhone className="me-2 text-muted" />
                <span>Emergency: {migrant.emergencyContact}</span>
              </div>
              <div className="mb-3">
                <FaCalendarAlt className="me-2 text-muted" />
                <span>Registered: {migrant.registrationDate}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="shadow">
            <Card.Body>
              <Tabs defaultActiveKey="records" className="mb-3">
                <Tab eventKey="records" title="Health Records">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-primary mb-0">
                      <FaFileMedical className="me-2" />
                      Medical History
                    </h5>
                    <Button variant="primary" size="sm">
                      Add Record
                    </Button>
                  </div>

                  {healthRecords.map((record) => (
                    <Card key={record.id} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{record.condition}</h6>
                            <p className="text-muted mb-1">
                              Dr. {record.doctor} • {record.date}
                            </p>
                            <p className="mb-0">{record.notes}</p>
                          </div>
                          <Badge bg={record.status === 'Completed' ? 'success' : 'warning'}>
                            {record.status}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Tab>

                <Tab eventKey="appointments" title="Appointments">
                  <div className="text-center py-4">
                    <FaCalendarAlt size={48} className="text-muted mb-3" />
                    <h6>No upcoming appointments</h6>
                    <Button variant="primary" size="sm">
                      Schedule Appointment
                    </Button>
                  </div>
                </Tab>

                <Tab eventKey="documents" title="Documents">
                  <div className="text-center py-4">
                    <FaFileMedical size={48} className="text-muted mb-3" />
                    <h6>Medical Documents</h6>
                    <p className="text-muted">No documents uploaded</p>
                    <Button variant="outline-primary" size="sm">
                      Upload Documents
                    </Button>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MigrantProfile;
