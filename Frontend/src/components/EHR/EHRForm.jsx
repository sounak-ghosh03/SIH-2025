import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFileMedical, FaUser, FaStethoscope, FaPills, FaCalendar, FaUserMd } from 'react-icons/fa';

const EHRForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    condition: '',
    medication: '',
    date: '',
    doctor: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      if (formData.patientName && formData.condition && formData.date && formData.doctor) {
        setSuccess('Health record added successfully!');
        // Reset form
        setFormData({
          patientName: '',
          condition: '',
          medication: '',
          date: '',
          doctor: '',
          notes: ''
        });
        setTimeout(() => {
          navigate('/ehr');
        }, 2000);
      } else {
        setError('Please fill in all required fields');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-primary">
                  <FaFileMedical className="me-2" />
                  {t('ehr.addRecord')}
                </h2>
                <p className="text-muted">Add new electronic health record</p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" />
                    {t('ehr.patientName')} *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    placeholder="Enter patient name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaStethoscope className="me-2" />
                    {t('ehr.condition')} *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    required
                    placeholder="Enter medical condition"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaPills className="me-2" />
                    {t('ehr.medication')}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                    placeholder="Enter prescribed medication"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaCalendar className="me-2" />
                        {t('ehr.date')} *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUserMd className="me-2" />
                        {t('ehr.doctor')} *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        required
                        placeholder="Enter doctor's name"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional notes or observations"
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="flex-grow-1"
                  >
                    {loading ? 'Saving...' : t('ehr.save')}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/ehr')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EHRForm;
