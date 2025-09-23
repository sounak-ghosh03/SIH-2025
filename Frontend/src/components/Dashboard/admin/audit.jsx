import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaShieldAlt,
  FaUserCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

const Audit = () => {
  const { t } = useTranslation();
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Mock audit data - replace with API call
    const mockAuditLogs = [
      {
        id: 1,
        timestamp: '2024-01-15 14:30:22',
        user: 'admin@kerala.gov.in',
        action: 'LOGIN',
        resource: 'System',
        details: 'Successful login from IP 192.168.1.100',
        status: 'SUCCESS',
        ip: '192.168.1.100'
      },
      {
        id: 2,
        timestamp: '2024-01-15 14:25:15',
        user: 'doctor@kerala.gov.in',
        action: 'VIEW_EHR',
        resource: 'Patient ID: MIG-001',
        details: 'Accessed electronic health record',
        status: 'SUCCESS',
        ip: '192.168.1.101'
      },
      {
        id: 3,
        timestamp: '2024-01-15 14:20:33',
        user: 'staff@kerala.gov.in',
        action: 'CREATE_MIGRANT',
        resource: 'New Migrant Registration',
        details: 'Created new migrant profile: Rajesh Kumar',
        status: 'SUCCESS',
        ip: '192.168.1.102'
      },
      {
        id: 4,
        timestamp: '2024-01-15 14:15:45',
        user: 'unknown',
        action: 'LOGIN_ATTEMPT',
        resource: 'System',
        details: 'Failed login attempt - invalid credentials',
        status: 'FAILED',
        ip: '10.0.0.50'
      },
      {
        id: 5,
        timestamp: '2024-01-15 14:10:12',
        user: 'admin@kerala.gov.in',
        action: 'QR_SCAN',
        resource: 'Migrant ID: MIG-002',
        details: 'QR code scanned for health verification',
        status: 'SUCCESS',
        ip: '192.168.1.100'
      }
    ];

    setAuditLogs(mockAuditLogs);
    setFilteredLogs(mockAuditLogs);
  }, []);

  useEffect(() => {
    let filtered = auditLogs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(log => log.status.toLowerCase() === filterType);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, filterType, auditLogs]);

  const getStatusBadge = (status) => {
    const variants = {
      SUCCESS: 'success',
      FAILED: 'danger',
      WARNING: 'warning'
    };

    return (
      <Badge bg={variants[status] || 'secondary'}>
        {status}
      </Badge>
    );
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'LOGIN':
      case 'LOGIN_ATTEMPT':
        return <FaUserCheck className="text-success" />;
      case 'VIEW_EHR':
      case 'CREATE_MIGRANT':
      case 'QR_SCAN':
        return <FaEye className="text-info" />;
      default:
        return <FaShieldAlt className="text-primary" />;
    }
  };

  const exportAuditLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Resource', 'Details', 'Status', 'IP Address'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.action,
        log.resource,
        log.details,
        log.status,
        log.ip
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">
          <FaShieldAlt className="me-2" />
          System Audit Logs
        </h2>
        <Button variant="outline-primary" onClick={exportAuditLogs}>
          <FaDownload className="me-2" />
          Export CSV
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <div className="d-flex justify-content-between text-center">
            <div>
              <div className="h5 text-success mb-0">{auditLogs.filter(l => l.status === 'SUCCESS').length}</div>
              <small className="text-muted">Success</small>
            </div>
            <div>
              <div className="h5 text-danger mb-0">{auditLogs.filter(l => l.status === 'FAILED').length}</div>
              <small className="text-muted">Failed</small>
            </div>
            <div>
              <div className="h5 text-warning mb-0">{auditLogs.filter(l => l.status === 'WARNING').length}</div>
              <small className="text-muted">Warning</small>
            </div>
          </div>
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Details</th>
                <th>Status</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <small>{log.timestamp}</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      {getActionIcon(log.action)}
                      <span className="ms-2">{log.user}</span>
                    </div>
                  </td>
                  <td>
                    <Badge bg="outline-primary">{log.action}</Badge>
                  </td>
                  <td>{log.resource}</td>
                  <td>
                    <small className="text-muted">{log.details}</small>
                  </td>
                  <td>{getStatusBadge(log.status)}</td>
                  <td>
                    <small className="text-muted">{log.ip}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {filteredLogs.length === 0 && (
        <div className="text-center py-5">
          <FaExclamationTriangle size={48} className="text-muted mb-3" />
          <h5 className="text-muted">No audit logs found</h5>
          <p className="text-muted">Try adjusting your search criteria</p>
        </div>
      )}
    </Container>
  );
};

export default Audit;
