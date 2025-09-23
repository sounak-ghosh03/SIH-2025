import React, { useState, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Container,
    Badge,
    Spinner,
    Alert,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaUsers, FaHeartbeat, FaHospital, FaChartLine } from "react-icons/fa";
import Heatmap from "./Heatmap";
import CONFIG from "../../config/routes.js"; // Import centralized config

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalMigrants: 0,
        activeCases: 0,
        healthCenters: 0,
        uptime: null,
        recentActivity: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setStats({
                    totalMigrants: 1250,
                    activeCases: 45,
                    healthCenters: 12,
                    recentActivity: [
                        {
                            id: 1,
                            action: "New migrant registered",
                            time: "2 hours ago",
                            type: "registration",
                        },
                        {
                            id: 2,
                            action: "Health record updated",
                            time: "4 hours ago",
                            type: "update",
                        },
                        {
                            id: 3,
                            action: "QR code scanned",
                            time: "6 hours ago",
                            type: "scan",
                        },
                        {
                            id: 4,
                            action: "Medical checkup completed",
                            time: "8 hours ago",
                            type: "checkup",
                        },
                    ],
                });
            } catch (err) {
                setError(err.message || "Error loading stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const getActivityIcon = (type) => {
        const icons = {
            registration: "👤",
            update: "📝",
            scan: "📱",
            checkup: "🏥",
        };
        return icons[type] || "📋";
    };

    const getActivityBadge = (type) => {
        const badges = {
            registration: { variant: "success", label: "New" },
            update: { variant: "primary", label: "Update" },
            scan: { variant: "info", label: "Scan" },
            checkup: { variant: "warning", label: "Checkup" },
        };
        const badge = badges[type] || {
            variant: "secondary",
            label: "Activity",
        };
        return <Badge bg={badge.variant}>{badge.label}</Badge>;
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>{t("loading")}</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <div className="mb-4">
                <h1 className="text-primary">
                    <FaChartLine className="me-3" />
                    {t("dashboard.welcome")}
                </h1>
                <p className="text-muted">{t("dashboard.overview")}</p>
            </div>

            {/* Stats Cards */}
            <Row className="mb-4">
                <Col md={3}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <FaUsers size={30} className="text-primary mb-2" />
                            <h3>{stats.totalMigrants.toLocaleString()}</h3>
                            <p className="text-muted mb-0">
                                {t("dashboard.totalMigrants")}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <FaHeartbeat
                                size={30}
                                className="text-danger mb-2"
                            />
                            <h3>{stats.activeCases}</h3>
                            <p className="text-muted mb-0">
                                {t("dashboard.activeCases")}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <FaHospital
                                size={30}
                                className="text-success mb-2"
                            />
                            <h3>{stats.healthCenters}</h3>
                            <p className="text-muted mb-0">
                                {t("dashboard.healthCenters")}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                {CONFIG.FEATURES.SHOW_SYSTEM_UPTIME && (
                    <Col md={3}>
                        <Card className="text-center shadow-sm">
                            <Card.Body>
                                <FaChartLine
                                    size={30}
                                    className="text-info mb-2"
                                />
                                <h3>{stats.uptime || "N/A"}%</h3>
                                <p className="text-muted mb-0">
                                    {CONFIG.LABELS.SYSTEM_UPTIME}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>

            <Row>
                {/* Heatmap Section */}
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3">
                                {CONFIG.LABELS.SERVICES_DISTRIBUTION}
                            </h4>
                            <Heatmap />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Recent Activity */}
                <Col md={4}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3">
                                {t("dashboard.recentActivity")}
                            </h4>
                            <div className="activity-list">
                                {stats.recentActivity.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="d-flex align-items-start mb-3"
                                    >
                                        <div
                                            className="me-3"
                                            style={{ fontSize: "1.5em" }}
                                        >
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <p className="mb-1 small">
                                                    {activity.action}
                                                </p>
                                                {getActivityBadge(
                                                    activity.type
                                                )}
                                            </div>
                                            <small className="text-muted">
                                                {activity.time}
                                            </small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
