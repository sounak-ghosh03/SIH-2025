import React, { useState } from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you! Your message has been submitted.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>
        Contact Us
      </h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Have questions or feedback? Fill out the form below or reach us directly.
      </p>

      {/* Contact Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        {/* WhatsApp Link */}
        <a
          href="https://wa.me/911234567890" // ✅ Replace with your WhatsApp number in international format
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#25D366" }}
        >
          <FaWhatsapp style={{ marginRight: "8px" }} />
          WhatsApp
        </a>

        {/* Phone Link */}
        <a
          href="tel:+911234567890" // ✅ Replace with your phone number
          style={{ textDecoration: "none", color: "#2c3e50" }}
        >
          <FaPhone style={{ marginRight: "8px" }} />
          +91 12345 67890
        </a>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          style={{
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#4CAF50",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;