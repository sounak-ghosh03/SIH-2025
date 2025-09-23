import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUser, FaSignOutAlt, FaGlobe } from "react-icons/fa";

const Navigation = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <FaGlobe className="me-2" />
                    Digital Health Passport
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            {t("nav.home")}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">
                            {t("nav.dashboard")}
                        </Nav.Link>
                        <NavDropdown
                            title={t("nav.migrant")}
                            id="migrant-dropdown"
                        >
                            <NavDropdown.Item as={Link} to="/migrant/register">
                                {t("migrant.registration")}
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/migrant/qr">
                                {t("migrant.generateQR")}
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/migrant/scan">
                                {t("migrant.scanQR")}
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={t("nav.ehr")} id="ehr-dropdown">
                            <NavDropdown.Item as={Link} to="/ehr">
                                {t("ehr.records")}
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ehr/new">
                                {t("ehr.addRecord")}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Language" id="language-dropdown">
                            <NavDropdown.Item
                                onClick={() => changeLanguage("en")}
                            >
                                English
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => changeLanguage("ml")}
                            >
                                മലയാളം
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={() => changeLanguage("hi")}
                            >
                                हिन्दी
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/register">
                            <FaUser className="me-1" />
                            {t("nav.register")}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
