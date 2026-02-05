# Eventra Client - Modern Event Management UI

A clean, professional, and modern React-based frontend for the Eventra event management platform. Built with React, Tailwind CSS, and Firebase Authentication.

## Features

### 🎨 Design Philosophy
- **Clean & Professional**: Wix-inspired design with subtle shadows and smooth transitions
- **No Harsh Gradients**: Soft, professional color schemes
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessible**: WCAG compliant with proper contrast and keyboard navigation

### 📦 Component Architecture
- **Highly Modular**: Reusable UI components in `/components/ui`
- **Feature Components**: Domain-specific components in `/components/events`, `/components/layout`
- **No Hardcoded Values**: All configurations in constants and environment variables

### 🔐 Authentication & Authorization
- Firebase Authentication integration
- Protected routes with role-based access control
- Secure API communication with JWT tokens

### 📄 Pages

#### Public Pages
- **Home** - Landing page with hero section, features, and CTA
- **Browse Events** - Event listing with search and filters
- **Event Details** - Detailed event information with registration

#### Authentication Pages
- **Login** - User authentication
- **Signup** - New user registration with role selection

#### Protected Pages
- **Dashboard** - User/Organizer dashboard with events and tickets
- **Profile** - User profile management
- **Create Event** - Event creation form (Organizers only)
- **Edit Event** - Event editing interface (Organizers only)
- **Admin Panel** - User management (Admins only)

## Project Structure

```
client/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Select.jsx
│   │   │   └── index.js
│   │   ├── events/                # Event-specific components
│   │   │   ├── EventCard.jsx
│   │   │   ├── TicketCard.jsx
│   │   │   ├── EventFilters.jsx
│   │   │   └── index.js
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── index.js
│   │   └── ProtectedRoute.jsx     # Route guard component
│   ├── pages/                     # Page components
│   │   ├── Home.jsx
│   │   ├── BrowseEvents.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── EditEvent.jsx
│   │   └── AdminPanel.jsx
│   ├── layouts/                   # Page layouts
│   │   ├── appLayout.jsx
│   │   ├── authLayout.jsx
│   │   └── MainLayout.jsx
│   ├── context/                   # React contexts
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── config/                    # Configuration files
│   │   └── firebase.js
│   ├── utils/                     # Utility functions
│   │   ├── apiClient.js
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── services/                  # API services
│   │   └── authServices.js
│   ├── App.jsx                    # Main app component
│   ├── index.js                   # App entry point
│   ├── index.css                  # Global styles
│   └── App.css                    # App-specific styles
├── .env.example                   # Environment variables template
├── .gitignore
├── package.json
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase credentials:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## UI Components

### Button Component
```jsx
import { Button } from './components/ui';

<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `disabled`: boolean

### Input Component
```jsx
import { Input } from './components/ui';

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  fullWidth
/>
```

### Card Component
```jsx
import { Card } from './components/ui';

<Card hover padding>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

### Alert Component
```jsx
import { Alert } from './components/ui';

<Alert
  type="success"
  title="Success!"
  message="Operation completed successfully"
  onClose={() => setAlert(null)}
/>
```

## API Integration

The app uses Axios for API communication with automatic JWT token injection:

```javascript
import apiClient from './utils/apiClient';

// GET request
const response = await apiClient.get('/api/events');

// POST request
const response = await apiClient.post('/api/createEvent', data);

// PATCH request
const response = await apiClient.patch('/api/events/123', updates);

// DELETE request
const response = await apiClient.delete('/api/events/123');
```

## Styling Guidelines

### Color Palette
- **Primary**: Indigo (600) - `#4f46e5`
- **Success**: Green (600) - `#16a34a`
- **Warning**: Yellow (600) - `#ca8a04`
- **Danger**: Red (600) - `#dc2626`
- **Gray Scale**: Tailwind gray palette

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold (700-800)
- **Body**: Regular (400)
- **Labels**: Medium (500)

### Spacing
- Use Tailwind's spacing scale (4px base unit)
- Consistent padding: p-4, p-6, p-8
- Consistent margins: mb-4, mb-6, mb-8

### Shadows
- **Small**: `shadow-sm`
- **Medium**: `shadow-md`
- **Large**: `shadow-lg`

## Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use props for customization
   - Avoid prop drilling - use Context API
   - Extract reusable logic into custom hooks

2. **State Management**
   - Use Context API for global state (auth, theme)
   - Local state for component-specific data
   - Avoid unnecessary re-renders

3. **Performance**
   - Lazy load routes and heavy components
   - Optimize images and assets
   - Use memo and useMemo for expensive computations
   - Implement pagination for large lists

4. **Accessibility**
   - Use semantic HTML
   - Provide alt text for images
   - Ensure keyboard navigation
   - Maintain color contrast ratios

5. **Code Quality**
   - Follow consistent naming conventions
   - Add comments for complex logic
   - Write self-documenting code
   - Keep files under 300 lines

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API Key | Yes |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Yes |
| `REACT_APP_FIREBASE_APP_ID` | Firebase App ID | Yes |
| `REACT_APP_API_URL` | Backend API URL | Yes |

## Troubleshooting

### Common Issues

1. **Firebase Authentication Errors**
   - Verify Firebase configuration in `.env`
   - Check Firebase console for enabled auth methods
   - Ensure correct API keys

2. **API Connection Issues**
   - Verify `REACT_APP_API_URL` is correct
   - Check if backend server is running
   - Verify CORS configuration on backend

3. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear cache: `npm cache clean --force`
   - Check for version conflicts in package.json

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test thoroughly before submitting
4. Update documentation as needed

## License

This project is part of the Eventra event management platform.

## Support

For issues and questions, please create an issue in the repository.
