import React from "react";

const Privacy = () => {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "#555", marginBottom: "20px", textAlign: "justify" }}>
        Your privacy is very important to us. This Privacy Policy explains how we
        collect, use, and safeguard your information when you use our Health
        Dashboard application.
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>1. Information We Collect</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        We may collect personal information such as your name, email address,
        phone number, medical history, and appointment details. We also collect
        technical information such as browser type, IP address, and usage data
        to improve our services.
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>2. How We Use Information</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        We use the collected information to:
        <ul>
          <li>Provide and improve healthcare services.</li>
          <li>Maintain secure user authentication.</li>
          <li>Send appointment reminders and notifications.</li>
          <li>Comply with legal and regulatory obligations.</li>
        </ul>
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>3. Data Security</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        We implement industry-standard security measures to protect your data
        from unauthorized access, disclosure, or misuse. However, no online
        platform can be completely secure, and we cannot guarantee absolute
        protection.
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>4. Sharing of Information</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        We do not sell or rent your personal information. We may share your data
        with trusted healthcare providers, government authorities, or legal
        entities when required by law.
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>5. Your Rights</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        You have the right to access, update, or delete your personal
        information. You may also opt out of non-essential communications at any
        time.
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>6. Changes to this Policy</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated date.
      </p>

      <h2 style={{ color: "#2c3e50", marginTop: "20px" }}>7. Contact Us</h2>
      <p style={{ color: "#555", textAlign: "justify" }}>
        If you have any questions about this Privacy Policy, please contact us
        at:  
        <br />
        📧 Email: support@healthdashboard.com  
        📞 Phone: +91 12345 67890
      </p>
    </div>
  );
};

export default Privacy;