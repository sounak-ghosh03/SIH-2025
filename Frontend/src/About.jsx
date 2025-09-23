import React from "react";

const About = () => {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>
        Importance of the website 
      </h1>
      <p style={{ fontSize: "18px", color: "#34495e", textAlign: "justify" }}>
        Good health is essential because it enhances longevity, productivity, and overall quality of life by enabling 
        individuals to achieve their potential, fulfill their daily responsibilities, and build stronger communities. 
        Maintaining physical, mental, and emotional well-being through healthy habits like a balanced diet, regular 
        exercise, and adequate sleep helps prevent diseases, boosts energy levels, improves focus, and provides the 
        resilience needed to face life's challenges.
      </p>
    </div>
  );
};

export default About;