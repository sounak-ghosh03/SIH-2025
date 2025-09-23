import React, { useState } from "react";
import {
    Form,
    Button,
    Card,
    Alert,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaIdCard,
    FaPassport,
    FaPhoneSquare,
} from "react-icons/fa";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        aadhar: "",
        passport: "",
        emergencyContact: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // Simulate API call
        setTimeout(() => {
            if (formData.name && formData.phone && formData.aadhar) {
                setSuccess("Migrant registration successful!");
                // Reset form
                setFormData({
                    name: "",
                    phone: "",
                    address: "",
                    aadhar: "",
                    passport: "",
                    emergencyContact: "",
                });
            } else {
                setError("Please fill in all required fields");
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
                                    <FaUser className="me-2" />
                                    {t("migrant.registration")}
                                </h2>
                                <p className="text-muted">
                                    Register migrant information for health
                                    passport
                                </p>
                            </div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && (
                                <Alert variant="success">{success}</Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaUser className="me-2" />
                                                {t("migrant.name")} *
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter full name"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaPhone className="me-2" />
                                                {t("migrant.phone")} *
                                            </Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter phone number"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaMapMarkerAlt className="me-2" />
                                        {t("migrant.address")}
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter full address"
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaIdCard className="me-2" />
                                                {t("migrant.aadhar")} *
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="aadhar"
                                                value={formData.aadhar}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Aadhar number"
                                                maxLength="12"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaPassport className="me-2" />
                                                {t("migrant.passport")}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="passport"
                                                value={formData.passport}
                                                onChange={handleChange}
                                                placeholder="Enter passport number"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaPhoneSquare className="me-2" />
                                        {t("migrant.emergency")}
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        placeholder="Enter emergency contact number"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Registering..."
                                        : t("migrant.register")}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;
