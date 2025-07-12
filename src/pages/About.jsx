import React from 'react';

function About() {
  const pageStyle = {
    height: '65vh',
    padding: '8vh 10vw',
    background: 'linear-gradient(to right, #fdfbfb, #ebedee)', // soft gradient
    fontFamily: 'Segoe UI, sans-serif',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '36px',
    color: '#264653',
    marginBottom: '20px',
    fontWeight: 700,
  };

  const paragraphStyle = {
    fontSize: '18px',
    color: '#333',
    marginBottom: '18px',
  };

  const highlight = {
    color: '#e76f51',
    fontWeight: 'bold',
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>About <c style={{ color: '#fb4b2cff'}}>Face 2 Face</c></h1>

        <p style={paragraphStyle}>
          <span style={highlight}>Face2Face</span> is a modern video conferencing platform built with 
          <span style={highlight}> React</span> and <span style={highlight}>WebRTC</span>. It offers a seamless, no-hassle experience — just share an Id and start talking.
        </p>

        <p style={paragraphStyle}>
          Designed for simplicity and speed, it's perfect for quick meetings, casual chats, or collaborative sessions. No installs, no logins — just open and connect.
        </p>

        <p style={paragraphStyle}>
          This project is a reflection of my growth as a developer. Through building <span style={highlight}>Face2Face</span>, I explored real-time communication, peer-to-peer architecture, and scalable web UI.
        </p>

        <p style={paragraphStyle}>
          If you enjoy using it or have feedback, I'd love to hear from you. Every line of code here is written with curiosity and passion.
        </p>
      </div>
    </div>
  );
}

export default About;
