import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Badge, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPlus, FaFileMedical, FaSearch, FaFilter } from 'react-icons/fa';

const EHRList = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const { t } = useTranslation();

  // Mock data for demonstration
  useEffect(() => {
    const mockRecords = [
      {
        id: 1,
        patientName: 'John Doe',
        condition: 'Hypertension',
        medication: 'Amlodipine 5mg',
        date: '2024-01-15',
        doctor: 'Dr. Smith',
        status: 'Active'
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        condition: 'Diabetes',
        medication: 'Metformin 500mg',
        date: '2024-01-10',
        doctor: 'Dr. Johnson',
        status: 'Active'
      },
      {
        id: 3,
        patientName: 'Bob Wilson',
        condition: 'Completed Treatment',
        medication: 'None',
        date: '2024-01-05',
        doctor: 'Dr. Brown',
        status: 'Inactive'
      }
    ];
    setRecords(mockRecords);
    setFilteredRecords(mockRecords);
  }, []);

  useEffect(() => {
    let filtered = records;

    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCondition) {
      filtered = filtered.filter(record =>
        record.condition.toLowerCase().includes(filterCondition.toLowerCase())
      );
    }

    setFilteredRecords(filtered);
  }, [searchTerm, filterCondition, records]);

  const getStatusBadge = (status) => {
    return status === 'Active' ? (
      <Badge bg="success">Active</Badge>
    ) : (
      <Badge bg="secondary">Inactive</Badge>
    );
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary">
              <FaFileMedical className="me-2" />
              {t('ehr.title')}
            </h2>
            <Link to="/ehr/new">
              <Button variant="primary">
                <FaPlus className="me-2" />
                {t('ehr.addRecord')}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <FaSearch className="me-2" />
              Search Records
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by patient name or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              <FaFilter className="me-2" />
              Filter by Condition
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by medical condition..."
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Condition</th>
                <th>Medication</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.patientName}</td>
                  <td>{record.condition}</td>
                  <td>{record.medication}</td>
                  <td>{record.date}</td>
                  <td>{record.doctor}</td>
                  <td>{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredRecords.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">No records found matching your criteria.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EHRList;
