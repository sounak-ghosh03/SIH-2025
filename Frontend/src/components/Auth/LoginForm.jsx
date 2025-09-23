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
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUserPlus } from "react-icons/fa";
import CONFIG from "../../config/routes.js"; // Import centralized config

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    // Dynamically load base URL from environment variables
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

        // Validation for password mismatch
        if (formData.password !== formData.confirmPassword) {
            setError(CONFIG.LABELS.PASSWORD_MISMATCH);
            setLoading(false);
            return;
        }

        try {
            // Use fetch with dynamic API endpoint instead of hardcoding
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // Send only the required fields
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                // Handle API errors (e.g., 400/500 responses)
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            // Success handling
            setSuccess(CONFIG.LABELS.REGISTER_SUCCESS);

            // Redirect after a short delay
            setTimeout(() => navigate(CONFIG.ROUTES.LOGIN), 2000);
        } catch (err) {
            // Catch and display any errors
            setError(err.message || CONFIG.LABELS.FILL_ALL_FIELDS);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="text-primary">
                                    <FaUserPlus className="me-2" />
                                    {t("auth.register")}
                                </h2>
                            </div>

                            {/* Display error/success messages */}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && (
                                <Alert variant="success">{success}</Alert>
                            )}

                            {/* Registration Form */}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("migrant.name")}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>{t("auth.email")}</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        {t("auth.password")}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength="6"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        {t("auth.confirmPassword")}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        minLength="6"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? CONFIG.LABELS.LOADING_MESSAGE
                                        : t("auth.registerButton")}
                                </Button>
                            </Form>

                            {/* Navigation link moved to config */}
                            <div className="text-center mt-3">
                                <Link to={CONFIG.ROUTES.LOGIN}>
                                    {t("auth.haveAccount")}{" "}
                                    <strong>{t("auth.login")}</strong>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;
