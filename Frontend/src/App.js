import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import MigrantRegistrationForm from './components/Migrant/RegistrationForm';
import QRModal from './components/Migrant/QRModal';
import QRScanner from './components/Migrant/QRScanner';
import EHRList from './components/EHR/EHRList';
import EHRForm from './components/EHR/EHRForm';
import Dashboard from './components/Dashboard/Dashboard';
import Heatmap from './components/Dashboard/Heatmap';
import DiseaseTrendsChart from './components/Dashboard/DiseaseTrendsChart';
import AlertsList from './components/Dashboard/AlertsList';
import BookingCalendar from './components/Appointments/BookingCalendar';
// import EnhancedChatUI from './components/Chatbot/EnhancedChatUI';
import HomePage from './pages/index';
import Login from './components/Dashboard/login';
import Register from './components/Dashboard/register';
import MigrantProfile from './components/Dashboard/migrants/[id]';
import Audit from './components/Dashboard/admin/audit';
import './App.css';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
import PrivacyPolicy from './Privacy';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Container className="mt-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/migrant/register" element={<MigrantRegistrationForm />} />
              <Route path="/migrant/qr" element={<QRModal />} />
              <Route path="/migrant/scan" element={<QRScanner />} />
              <Route path="/migrants/:id" element={<MigrantProfile />} />
              <Route path="/ehr" element={<EHRList />} />
              <Route path="/ehr/new" element={<EHRForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/heatmap" element={<Heatmap />} />
              <Route path="/trends" element={<DiseaseTrendsChart />} />
              <Route path="/alerts" element={<AlertsList />} />
              <Route path="/appointments" element={<BookingCalendar />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/admin/audit" element={<Audit />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </Container>
          {/* <EnhancedChatUI /> */}
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
    
  );

}

export default App;
