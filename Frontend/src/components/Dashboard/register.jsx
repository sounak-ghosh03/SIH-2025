import React, { useState, useEffect } from "react";
import {
    Card,
    Form,
    Button,
    Container,
    Row,
    Col,
    Alert,
    Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";

const Register = () => {
    const { t } = useTranslation();
    const { register, user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && user) {
            navigate("/dashboard", { replace: true });
        }
    }, [authLoading, user, navigate]);

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError(t("auth.nameRequired"));
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError(t("auth.invalidEmail"));
            return false;
        }
        if (formData.password.length < 6) {
            setError(t("auth.passwordTooShort"));
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError(t("auth.passwordMismatch"));
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);
        try {
            const result = await register(formData);
            if (result.success) {
                navigate("/dashboard");
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(t("auth.registerError"));
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner animation="border" role="status" className="me-2" />
                <span>{t("auth.loading")}</span>
            </div>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <FaUserPlus
                                    size={48}
                                    className="text-success mb-3"
                                />
                                <h2 className="text-success">
                                    {t("auth.register")}
                                </h2>
                                <p className="text-muted">
                                    {t("auth.createAccountPrompt")}
                                </p>
                            </div>

                            {error && (
                                <Alert variant="danger" className="mb-3">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaUser className="me-2" />
                                        {t("auth.fullName")}
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={t(
                                            "auth.fullNamePlaceholder"
                                        )}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaEnvelope className="me-2" />
                                        {t("auth.email")}
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={t("auth.emailPlaceholder")}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        {t("auth.password")}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={t(
                                            "auth.passwordPlaceholder"
                                        )}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        {t("auth.confirmPassword")}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder={t(
                                            "auth.confirmPasswordPlaceholder"
                                        )}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    type="submit"
                                    className="w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                            />
                                            {t("auth.creatingAccount")}
                                        </>
                                    ) : (
                                        t("auth.registerButton")
                                    )}
                                </Button>
                            </Form>

                            <div className="text-center">
                                <p className="mb-0">
                                    {t("auth.haveAccount")}{" "}
                                    <Link to="/login" className="text-success">
                                        {t("auth.login")}
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
