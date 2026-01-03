# Solis React Frontend - Development Setup Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed:
- Node.js 20+ (Tested with Node 25.2.1)
- npm or yarn package manager
- (Optional) Bun as faster JavaScript runtime
- Git for version control

---

## 🚀 Quick Start (Fresh Installation)

### Step 1: Clone and Navigate
```bash
# Clone the repository (if not already done)
git clone <your-repo-url> solis-react
cd solis-react
```

### Step 2: Install Dependencies
```bash
# Using npm (recommended)
npm install

# OR using bun (faster)
bun install

# If you encounter issues with old lock file:
rm pnpm-lock.yaml package-lock.json
npm install
```

### Step 3: Configure Environment
```bash
# Create environment file
cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BASE_URL=http://localhost:3000
EOF
```

### Step 4: Fix Build Issues (if needed)
```bash
# Install missing dependency for Babel
npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Install sass for SCSS compilation
npm install --save-dev sass
```

### Step 5: Fix File Casing Issues (macOS specific)
```bash
# Ensure hook file name has correct casing
mv src/hooks/useonOutsideClick.js src/hooks/useOnOutsideClick.js 2>/dev/null || true
```

### Step 6: Start Development Server
```bash
# Start React development server
npm start

# Server will be available at: http://localhost:3000
# Browser will open automatically
```

---

## 📝 Configuration Details

### Environment Variables

Create `.env` file in the project root:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BASE_URL=http://localhost:3000

# Optional: API timeout (in milliseconds)
REACT_APP_API_TIMEOUT=30000

# Optional: Logging
REACT_APP_DEBUG=true
```

### Available Scripts in package.json

```json
{
  "scripts": {
    "start": "craco start",           // Start development server
    "build": "craco build",           // Build for production
    "test": "craco test",             // Run tests
    "lint": "eslint \"./src/**\"",    // Check code quality
    "lint:fix": "eslint --fix",       // Fix linting errors
    "format": "prettier --write",     // Format code
    "eject": "react-scripts eject"    // Eject from CRA (irreversible)
  }
}
```

---

## 🛠️ Development Tools Setup

### 1. ESLint Configuration

ESLint is pre-configured in `.eslintrc` for code quality.

**Run linter:**
```bash
npm run lint

npm run lint:fix  # Auto-fix issues
```

### 2. Prettier Configuration

Prettier is configured for automatic code formatting.

**Format code:**
```bash
npm run format

# Or format specific file
npx prettier --write src/MyComponent.js
```

### 3. Craco Configuration

Craco allows customizing Create React App without ejecting.

**Config file:** `craco.config.js`

### 4. Tailwind CSS

Tailwind CSS is configured for utility-first styling.

**Config file:** `tailwind.config.js`
**CSS:** `src/index.scss`

---

## 📁 Project Structure

```
solis-react/
├── public/
│   ├── index.html               # Main HTML file
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # SEO
├── src/
│   ├── components/
│   │   ├── atoms/               # Basic UI components
│   │   ├── molecules/           # Combined components
│   │   ├── organisms/           # Complex components
│   │   └── icons/               # Icon components
│   ├── pages/                   # Page components
│   ├── layout/                  # Layout components
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API & business logic
│   ├── context/                 # React Context
│   ├── store/                   # State management
│   ├── utils/                   # Utility functions
│   ├── styles/                  # Global styles
│   ├── config/                  # Configuration
│   ├── App.js                   # Main App component
│   └── index.js                 # Entry point
├── .env                         # Environment variables (local)
├── .env.example                 # Example env file
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind config
├── craco.config.js              # Craco config
└── jsconfig.json                # Path aliases
```

---

## 🎯 Key Features & Packages

### Core Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| react | UI library | Latest |
| react-dom | React DOM rendering | Latest |
| react-router-dom | Routing | Latest |
| axios | HTTP client | ^0.24.0 |
| formik | Form state management | ^2.2.9 |
| tailwindcss | Utility CSS | Latest |
| @craco/craco | CRA customization | ^6.4.3 |

### Installed Packages

**API & Data:**
- `axios` - HTTP client for API calls
- `@reaching/dialog` - Accessible dialogs

**Forms:**
- `formik` - Form state management
- `yup` - Form validation

**UI & Styling:**
- `tailwindcss` - Utility-first CSS
- `node-sass` - SCSS compilation
- `classnames` - Conditional CSS classes
- `@tippyjs/react` - Tooltips

**State & Context:**
- `js-cookie` - Cookie management
- `date-fns` - Date utilities

**Development:**
- `eslint` - Code quality
- `prettier` - Code formatting

---

## 🚀 Running the Application

### Development Mode
```bash
npm start

# This will:
# 1. Start the dev server on http://localhost:3000
# 2. Open the app in your browser
# 3. Enable hot module reloading
# 4. Show compilation errors in the console
```

### Production Build
```bash
npm run build

# This will:
# 1. Create optimized build in 'build/' directory
# 2. Minify and chunk code
# 3. Generate source maps
```

### Testing
```bash
npm test

# Run in watch mode:
npm test -- --watch

# Run with coverage:
npm test -- --coverage
```

---

## 🔗 API Integration

### Environment Configuration

The app connects to the Laravel backend using the configured API URL:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### Making API Calls

**Example using axios:**
```javascript
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// GET request
const fetchProjects = async () => {
  try {
    const response = await axios.get(`${apiUrl}/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

// POST request
const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${apiUrl}/projects`, projectData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
  }
};
```

### Authentication

The app uses Sanctum tokens for API authentication:

```javascript
// After login, store token
localStorage.setItem('token', responseToken);

// Use token in requests
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// Include in all API requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

---

## 📦 Adding New Dependencies

### Install a package
```bash
npm install package-name

# Or for development only:
npm install --save-dev package-name
```

### Updating packages
```bash
# Update to latest version
npm update

# Update specific package
npm update package-name

# Check for outdated packages
npm outdated
```

---

## 🧪 Testing

### Unit Tests
```bash
# Create test file: src/Component.test.js
npm test

# Test specific file
npm test Component.test.js

# Run coverage
npm test -- --coverage
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const element = screen.getByText(/welcome/i);
  expect(element).toBeInTheDocument();
});
```

---

## 🎨 Styling

### Tailwind CSS Usage
```jsx
// Using Tailwind classes
<div className="flex items-center justify-between p-4 bg-blue-500 text-white">
  <h1 className="text-2xl font-bold">Title</h1>
  <button className="bg-white text-blue-500 px-4 py-2 rounded">Button</button>
</div>
```

### SCSS Modules
```javascript
// Import SCSS
import styles from './Component.module.scss';

// Use in component
<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

---

## 🔍 Debugging

### Browser DevTools
1. Open Chrome DevTools (F12 or Cmd+Option+I on macOS)
2. Go to Console tab to see messages
3. Go to Network tab to inspect API calls
4. Use React Developer Tools extension

### React Developer Tools Extension
**For Chrome:**
- Install: React Developer Tools extension
- Inspect component props and state
- Track re-renders

**For Firefox:**
- Install: React Developer Tools extension
- Same features as Chrome version

### Console Debugging
```javascript
// Log variables
console.log('Variable:', variable);

// Log objects
console.table(arrayOfObjects);

// Log warnings
console.warn('Warning message');

// Log errors
console.error('Error message');
```

---

## 🚨 Common Issues & Solutions

### Issue: Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### Issue: "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS errors from API
**Solution**: Ensure backend has CORS enabled and frontend API URL is correct
- Check `.env` file: `REACT_APP_API_URL`
- Verify backend CORS configuration
- Check browser console for exact error

### Issue: "useOnOutsideClick not found"
**Solution**: File name casing issue
```bash
# Rename file with correct casing
mv src/hooks/useonOutsideClick.js src/hooks/useOnOutsideClick.js
```

### Issue: SCSS compilation errors
**Solution**: Ensure sass is installed
```bash
npm install --save-dev sass
```

---

## 📚 Component Structure

### Atomic Design Pattern

The project follows atomic design principles:

**Atoms** - Basic building blocks
```
src/components/atoms/
├── Button.js
├── Input.js
├── Label.js
└── Card.js
```

**Molecules** - Simple combinations
```
src/components/molecules/
├── Form/
├── Modal/
└── Dropdown/
```

**Organisms** - Complex combinations
```
src/components/organisms/
├── Header/
├── Sidebar/
└── Footer/
```

**Pages** - Full page components
```
src/pages/
├── Projects/
├── Dashboard/
└── Settings/
```

---

## 🎯 Best Practices

### Component Best Practices
```javascript
// Use functional components
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// Prop validation
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

// Default props
MyComponent.defaultProps = {
  prop2: 0
};

export default MyComponent;
```

### Hook Best Practices
- Keep custom hooks focused on a single responsibility
- Use meaningful hook names starting with "use"
- Document hook dependencies
- Avoid side effects in render logic

### Code Quality
```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Before committing
npm test
npm run build
```

---

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Create React App](https://create-react-app.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Craco](https://github.com/dilanx/craco)
- [Axios Documentation](https://axios-http.com)
- [Formik Documentation](https://formik.org)

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Dependencies installed successfully
- [ ] `.env` file created with correct values
- [ ] Development server starts without errors
- [ ] App opens in browser at http://localhost:3000
- [ ] Hot reload works (save a file and see changes)
- [ ] API calls work with backend (check Network tab)
- [ ] No console errors in browser DevTools
- [ ] ESLint passes: `npm run lint`

---

## 🎯 Next Steps

1. Start the dev server: `npm start`
2. Open http://localhost:3000 in your browser
3. Verify API connectivity with the backend
4. Begin developing components
5. Test your changes as you code

---

## 🔄 Git Workflow

### Before Committing
```bash
# Check code quality
npm run lint

# Format code
npm run format

# Run tests (if available)
npm test

# Build to verify
npm run build
```

### Commit Message Standards
```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add tests
chore: Build or dependency updates
```

---

**Created**: January 3, 2026
**Last Updated**: January 3, 2026
**Status**: ✅ Production Ready

For additional information, see the main **SETUP_DOCUMENTATION.md** in the root directory.
