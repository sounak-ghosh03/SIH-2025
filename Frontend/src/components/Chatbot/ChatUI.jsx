import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ChatUI = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your health assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('appointment') || input.includes('book')) {
      return 'I can help you book an appointment! Please visit the appointments section or tell me your preferred date and time.';
    } else if (input.includes('symptom') || input.includes('sick') || input.includes('pain')) {
      return 'I\'m not a doctor, but I can help you find information about common symptoms. Please describe your symptoms and I\'ll provide general guidance. For medical emergencies, please contact emergency services immediately.';
    } else if (input.includes('health') || input.includes('healthy')) {
      return 'Maintaining good health involves regular exercise, balanced diet, adequate sleep, and regular medical check-ups. Would you like specific advice on any health topic?';
    } else if (input.includes('medicine') || input.includes('medication')) {
      return 'Please consult with a healthcare professional before taking any medication. I can help you find general information about common medications, but always follow your doctor\'s advice.';
    } else if (input.includes('emergency') || input.includes('help')) {
      return 'For medical emergencies, please call emergency services immediately (102 for medical emergencies in India). If you need urgent medical attention, go to the nearest hospital.';
    } else if (input.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with regarding your health?';
    } else {
      return 'I understand you\'re asking about: "' + userInput + '". I\'m here to help with general health information and guidance. For specific medical advice, please consult with a healthcare professional.';
    }
  };

  const quickQuestions = [
    'How to book an appointment?',
    'What are common flu symptoms?',
    'How to maintain good health?',
    'When to see a doctor?'
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  if (!isOpen) {
    return (
      <div className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050 }}>
        <Button
          variant="primary"
          size="lg"
          className="rounded-circle shadow"
          onClick={() => setIsOpen(true)}
          style={{ width: '60px', height: '60px' }}
        >
          <FaRobot size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050, width: '350px' }}>
      <Card className="shadow">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <FaRobot className="me-2" />
            Health Assistant
          </div>
          <Button
            variant="link"
            className="text-white p-0"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </Button>
        </Card.Header>

        <Card.Body className="p-0" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-grow-1 p-3" style={{ overflowY: 'auto' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`d-flex mb-3 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div className={`d-flex ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`rounded p-2 ${message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-light border'}`}
                    style={{ maxWidth: '80%' }}
                  >
                    <div className="small text-muted mb-1">
                      {message.type === 'user' ? <FaUser className="me-1" /> : <FaRobot className="me-1" />}
                      {message.timestamp}
                    </div>
                    <div>{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-top">
            <div className="mb-2">
              <small className="text-muted">Quick questions:</small>
            </div>
            <div className="d-flex flex-wrap gap-1 mb-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="small"
                >
                  {question}
                </Button>
              ))}
            </div>

            <Form onSubmit={handleSendMessage}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  <FaPaperPlane />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatUI;
