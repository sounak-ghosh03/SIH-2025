import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import '../i18n/config';
import '../index.css';
import App from '../App';

/**
 * App wrapper component that provides global context and routing
 * Similar to Next.js _app.jsx pattern
 */
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

export default MyApp;
