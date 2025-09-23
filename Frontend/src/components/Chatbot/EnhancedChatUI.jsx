import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Form, InputGroup, Container, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaMicrophone, FaVolumeUp, FaCog, FaHeart, FaStethoscope, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const EnhancedChatUI = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'chatbot.welcome',
      timestamp: new Date().toLocaleTimeString(),
      language: i18n.language
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [healthScore, setHealthScore] = useState(85);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response system
  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const currentLang = i18n.language;

    // Multi-language keyword detection
    const appointmentKeywords = {
      en: ['appointment', 'book', 'schedule', 'meeting', 'visit'],
      ml: ['അപ്പോയിന്റ്മെന്റ്', 'ബുക്ക്', 'ഷെഡ്യൂൾ', 'സമയം'],
      hi: ['अपॉइंटमेंट', 'बुक', 'शेड्यूल', 'मुलाकात']
    };

    const symptomKeywords = {
      en: ['symptom', 'sick', 'pain', 'fever', 'headache', 'cough'],
      ml: ['ലക്ഷണം', 'രോഗം', 'വേദന', 'പനി', 'തലവേദന', 'ചുമ'],
      hi: ['लक्षण', 'बीमार', 'दर्द', 'बुखार', 'सिरदर्द', 'खांसी']
    };

    const emergencyKeywords = {
      en: ['emergency', 'help', 'urgent', 'critical', 'serious'],
      ml: ['അടിയന്തരം', 'സഹായം', 'അടിയന്തര', 'ഗുരുതരം'],
      hi: ['इमरजेंसी', 'मदद', 'जरूरी', 'गंभीर']
    };

    // Check for appointment-related queries
    const isAppointment = Object.values(appointmentKeywords[currentLang] || appointmentKeywords.en).some(keyword =>
      input.includes(keyword)
    );

    // Check for symptom-related queries
    const isSymptom = Object.values(symptomKeywords[currentLang] || symptomKeywords.en).some(keyword =>
      input.includes(keyword)
    );

    // Check for emergency queries
    const isEmergency = Object.values(emergencyKeywords[currentLang] || emergencyKeywords.en).some(keyword =>
      input.includes(keyword)
    );

    // Generate contextual responses
    if (isAppointment) {
      return 'chatbot.responses.appointment';
    } else if (isSymptom) {
      return 'chatbot.responses.symptoms';
    } else if (isEmergency) {
      return 'chatbot.responses.emergency';
    } else if (input.includes('thank') || input.includes('നന്ദി') || input.includes('धन्यवाद')) {
      return 'chatbot.responses.thanks';
    } else if (input.includes('health') || input.includes('ആരോഗ്യ') || input.includes('स्वास्थ्य')) {
      return 'chatbot.responses.health';
    } else if (input.includes('medicine') || input.includes('മരുന്ന്') || input.includes('दवा')) {
      return 'chatbot.responses.medicine';
    } else {
      return 'chatbot.responses.default';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
      language: i18n.language
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(async () => {
      const botResponse = getAIResponse(userInput);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString(),
        language: i18n.language
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Update health score based on conversation
      if (userInput.toLowerCase().includes('exercise') || userInput.toLowerCase().includes('healthy')) {
        setHealthScore(prev => Math.min(prev + 2, 100));
      }
    }, 1500);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = i18n.language === 'ml' ? 'ml-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice input is not supported in this browser.');
    }
  };

  const quickActions = [
    {
      icon: <FaCalendarAlt />,
      text: 'bookAppointment',
      action: () => setInputMessage('I want to book an appointment')
    },
    {
      icon: <FaStethoscope />,
      text: 'symptoms',
      action: () => setInputMessage('I have some symptoms')
    },
    {
      icon: <FaHeart />,
      text: 'healthTips',
      action: () => setInputMessage('How to stay healthy?')
    },
    {
      icon: <FaExclamationTriangle />,
      text: 'emergency',
      action: () => setInputMessage('What to do in emergency?')
    }
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'ml' ? 'ml-IN' : i18n.language === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) {
    return (
      <div className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050 }}>
        <Button
          variant="primary"
          size="lg"
          className="rounded-circle shadow-lg"
          onClick={() => setIsOpen(true)}
          style={{ width: '70px', height: '70px' }}
        >
          <FaRobot size={28} />
        </Button>
        <div className="position-absolute" style={{ top: '-10px', right: '-10px' }}>
          <Badge bg="success" className="rounded-circle">
            <FaHeart size={12} />
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050, width: '400px' }}>
      <Card className="shadow-lg">
        <Card.Header className="bg-gradient-primary text-white d-flex justify-content-between align-items-center">
          <div>
            <FaRobot className="me-2" />
            <strong>{t('chatbot.title')}</strong>
            <div className="small opacity-75">{t('chatbot.subtitle')}</div>
          </div>
          <div className="d-flex align-items-center">
            <Badge bg="success" className="me-2">
              {t('chatbot.online')}
            </Badge>
            <Button
              variant="link"
              className="text-white p-0 me-2"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </Button>
          </div>
        </Card.Header>

        <Card.Body className="p-0" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
          {/* Health Score Indicator */}
          <div className="p-2 bg-light border-bottom">
            <Row className="align-items-center">
              <Col>
                <small className="text-muted">Health Score</small>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </Col>
              <Col xs="auto">
                <Badge bg={healthScore > 80 ? 'success' : healthScore > 60 ? 'warning' : 'danger'}>
                  {healthScore}%
                </Badge>
              </Col>
            </Row>
          </div>

          {/* Messages Area */}
          <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`d-flex mb-3 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div className={`d-flex ${message.type === 'user' ? 'flex-row-reverse' : ''} align-items-start`}>
                  <div
                    className={`rounded-3 p-3 ${message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white border shadow-sm'}`}
                    style={{ maxWidth: '80%' }}
                  >
                    <div className="small text-muted mb-1 d-flex align-items-center">
                      {message.type === 'user' ? <FaUser className="me-1" /> : <FaRobot className="me-1" />}
                      {message.timestamp}
                      {message.type === 'bot' && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 ms-1 text-muted"
                          onClick={() => speakText(t(message.text))}
                        >
                          <FaVolumeUp size={10} />
                        </Button>
                      )}
                    </div>
                    <div>{t(message.text)}</div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="d-flex justify-content-start mb-3">
                <div className="bg-white border shadow-sm rounded-3 p-3">
                  <div className="small text-muted mb-1">
                    <FaRobot className="me-1" />
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <small className="text-muted">{t('chatbot.typing')}</small>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-2 bg-light border-top">
            <div className="mb-2">
              <small className="text-muted fw-bold">{t('chatbot.quickQuestions')}:</small>
            </div>
            <div className="d-flex flex-wrap gap-1 mb-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  size="sm"
                  onClick={action.action}
                  className="d-flex align-items-center"
                >
                  {action.icon}
                  <span className="ms-1 small">{t(action.text)}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 border-top bg-white">
            <Form onSubmit={handleSendMessage}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={t('chatbot.placeholder')}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isTyping}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleVoiceInput}
                  disabled={isListening || isTyping}
                >
                  <FaMicrophone className={isListening ? 'text-danger' : ''} />
                </Button>
                <Button variant="primary" type="submit" disabled={isTyping || !inputMessage.trim()}>
                  <FaPaperPlane />
                </Button>
              </InputGroup>
            </Form>
          </div>
        </Card.Body>
      </Card>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          gap: 4px;
          margin-bottom: 8px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #6c757d;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .bg-gradient-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        }
      `}</style>
    </div>
  );
};

export default EnhancedChatUI;
