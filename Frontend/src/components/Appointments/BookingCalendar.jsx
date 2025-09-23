import React, { useState } from 'react';
import { Card, Button, Modal, Form, Container, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaClock, FaUserMd } from 'react-icons/fa';

const BookingCalendar = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Medicine' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Cardiology' },
    { id: 3, name: 'Dr. Priya Sharma', specialty: 'Dermatology' },
    { id: 4, name: 'Dr. Ahmed Khan', specialty: 'Orthopedics' }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      alert(`Appointment booked successfully!\nDate: ${selectedDate}\nTime: ${selectedTime}\nDoctor: ${selectedDoctor}`);
      setShowModal(false);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedDoctor('');
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-primary">
                  <FaCalendarAlt className="me-2" />
                  Book Appointment
                </h2>
                <p className="text-muted">Schedule your health consultation</p>
              </div>

              <Row className="mb-4">
                <Col md={6}>
                  <Card className="h-100">
                    <Card.Body className="text-center">
                      <FaUserMd size={48} className="text-primary mb-3" />
                      <h5>Select Doctor</h5>
                      <p className="text-muted">Choose your preferred healthcare provider</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="h-100">
                    <Card.Body className="text-center">
                      <FaClock size={48} className="text-success mb-3" />
                      <h5>Available Time Slots</h5>
                      <p className="text-muted">Pick a convenient time for your appointment</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowModal(true)}
                >
                  <FaCalendarAlt className="me-2" />
                  Book New Appointment
                </Button>
              </div>

              <div className="mt-4">
                <h6 className="mb-3">Available Doctors</h6>
                <Row>
                  {doctors.map((doctor) => (
                    <Col md={6} key={doctor.id} className="mb-3">
                      <Card className="h-100">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{doctor.name}</h6>
                              <Badge bg="info">{doctor.specialty}</Badge>
                            </div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => {
                                setSelectedDoctor(doctor.name);
                                setShowModal(true);
                              }}
                            >
                              Book
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={getTodayDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Doctor</Form.Label>
                  <Form.Select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                  >
                    <option value="">Choose Doctor...</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Available Time Slots</Form.Label>
              <Row>
                {timeSlots.map((time) => (
                  <Col md={4} key={time} className="mb-2">
                    <Button
                      variant={selectedTime === time ? "primary" : "outline-secondary"}
                      className="w-100"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || !selectedDoctor}
          >
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookingCalendar;
