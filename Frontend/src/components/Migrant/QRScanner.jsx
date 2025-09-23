import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import QrScanner from 'qr-scanner';
import { FaQrcode, FaCamera } from 'react-icons/fa';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [scanning, setScanning] = useState(false);
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, []);

  const handleScan = (result) => {
    if (result && result.data) {
      setScanResult(result.data);
      setScanning(false);
      if (scannerRef.current) {
        scannerRef.current.stop();
      }
    }
  };

  const handleError = (err) => {
    setError('Error accessing camera or scanning QR code');
    console.error(err);
  };

  const startScanning = async () => {
    setScanning(true);
    setScanResult('');
    setError('');

    try {
      if (!videoRef.current) return;

      scannerRef.current = new QrScanner(
        videoRef.current,
        handleScan,
        {
          onDecodeError: handleError,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await scannerRef.current.start();
    } catch (err) {
      handleError(err);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setScanning(false);
    if (scannerRef.current) {
      scannerRef.current.stop();
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-primary">
                  <FaQrcode className="me-2" />
                  {t('migrant.scanQR')}
                </h2>
                <p className="text-muted">Scan QR codes for health passport verification</p>
              </div>

              {!scanning ? (
                <div className="text-center">
                  <Button variant="primary" onClick={startScanning} size="lg">
                    <FaCamera className="me-2" />
                    Start Camera
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Button variant="danger" onClick={stopScanning} className="mb-3">
                    Stop Scanning
                  </Button>
                  <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                    <video
                      ref={videoRef}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        border: '2px solid #007bff',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}

              {scanResult && (
                <Alert variant="success" className="mt-3">
                  <strong>Scanned Data:</strong>
                  <pre style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
                    {scanResult}
                  </pre>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QRScanner;
