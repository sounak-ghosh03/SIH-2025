import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#333",
        color: "#fff",
        padding: "20px",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      {/* Footer Text */}
      <div>
        <p>© {new Date().getFullYear()} Health Dashboard. All rights reserved.</p>
      </div>

      {/* Footer Links */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <a href="/about" style={{ color: "#fff", textDecoration: "none" }}>
          About
        </a>
        <a href="/privacy" style={{ color: "#fff", textDecoration: "none" }}>
          Privacy Policy
        </a>
        <a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>
          Contact
        </a>
      </div>

      {/* Social Media Icons */}
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          fontSize: "22px",
        }}
      >
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b5998" }}
        >
          <FaFacebook />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1DA1F2" }}
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#C13584" }}
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0077b5" }}
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;