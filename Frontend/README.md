# Digital Health Passport for Migrants in Kerala

A comprehensive web application designed to provide digital health services for migrants in Kerala, featuring multi-language support, QR code functionality, electronic health records, and an AI-powered health assistant.

## Features

### Core Functionality
- **Multi-language Support**: English, Malayalam, and Hindi
- **User Authentication**: Login and registration system
- **Migrant Registration**: Complete registration with QR code generation
- **QR Code System**: Generate and scan QR codes for migrant identification
- **Electronic Health Records (EHR)**: Manage health records digitally
- **Dashboard**: Comprehensive dashboard with analytics and visualizations
- **AI Health Assistant**: Advanced chatbot with health guidance

### Technical Features
- **Responsive Design**: Works on all devices
- **Modern UI**: Bootstrap-based interface
- **Real-time Updates**: Live data synchronization
- **Data Visualization**: Charts and heatmaps for health data
- **Voice Support**: Speech-to-text and text-to-speech
- **Offline Support**: Progressive Web App capabilities

## Project Structure

```
frontend/
├── public/
│   ├── icons/                 # Application icons and logos
│   └── translations/          # Multi-language JSON files
├── src/
│   ├── components/
│   │   ├── Auth/              # Authentication components
│   │   ├── Migrant/           # Migrant-related components
│   │   ├── EHR/               # Health records components
│   │   ├── Dashboard/         # Dashboard components
│   │   └── Chatbot/           # AI assistant components
│   ├── i18n/                  # Internationalization setup
│   ├── context/               # React context providers
│   ├── hooks/                 # Custom React hooks
│   └── utils/                 # Utility functions
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-health-passport
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3001`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Language Support

The application supports three languages:

- **English** (en) - Default language
- **Malayalam** (ml) - Regional language of Kerala
- **Hindi** (hi) - National language

Language can be switched using the language selector in the navigation bar.

## Components Overview

### Authentication Components
- **LoginForm**: User login interface
- **RegisterForm**: User registration interface

### Migrant Components
- **RegistrationForm**: Migrant registration with personal details
- **QRModal**: QR code generation and display
- **QRScanner**: QR code scanning functionality

### Health Records Components
- **EHRList**: Display list of health records
- **EHRForm**: Add/edit health records

### Dashboard Components
- **Dashboard**: Main dashboard with statistics
- **Heatmap**: Geographic health data visualization
- **DiseaseTrendsChart**: Disease trend analysis
- **AlertsList**: Health alerts and notifications

### AI Assistant Components
- **EnhancedChatUI**: Advanced AI health assistant
- **ChatUI**: Basic chatbot interface

## API Integration

The application integrates with various APIs for:
- User authentication
- Health record management
- QR code generation and scanning
- Real-time notifications
- Geographic data visualization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for the migrants of Kerala**
