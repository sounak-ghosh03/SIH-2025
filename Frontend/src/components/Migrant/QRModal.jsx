import React, { useState } from 'react';
import { Modal, Button, Form, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';
import { FaQrcode, FaDownload } from 'react-icons/fa';

const QRModal = () => {
  const [show, setShow] = useState(false);
  const [qrData, setQrData] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { t } = useTranslation();

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setQrData('');
    setQrCodeUrl('');
    setError('');
    setSuccess('');
  };

  const generateQR = async () => {
    if (!qrData.trim()) {
      setError('Please enter data to generate QR code');
      return;
    }

    try {
      const url = await QRCode.toDataURL(qrData);
      setQrCodeUrl(url);
      setSuccess(t('migrant.qrGenerated'));
      setError('');
    } catch (err) {
      setError('Error generating QR code');
      console.error(err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'health-passport-qr.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button variant="primary" onClick={handleShow} className="mb-4">
            <FaQrcode className="me-2" />
            {t('migrant.generateQR')}
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaQrcode className="me-2" />
            Generate QR Code
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Data for QR Code</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  placeholder="Enter migrant information, health data, or any text to encode in QR code"
                />
              </Form.Group>
              <Button variant="primary" onClick={generateQR} className="w-100">
                Generate QR Code
              </Button>
            </Col>
            <Col md={6}>
              {qrCodeUrl && (
                <Card className="text-center p-3">
                  <Card.Body>
                    <img
                      src={qrCodeUrl}
                      alt="Generated QR Code"
                      style={{ width: '100%', maxWidth: '200px' }}
                    />
                    <Button
                      variant="outline-primary"
                      onClick={downloadQR}
                      className="mt-3"
                    >
                      <FaDownload className="me-2" />
                      Download QR Code
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default QRModal;
