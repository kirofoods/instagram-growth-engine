# KiroGram - PWA

A Progressive Web Application (PWA) for managing and tracking Instagram growth. Built with React, Vite, and Firebase.

## Features

- Real-time analytics dashboard
- Instagram account tracking
- Growth metrics visualization
- Post performance analysis
- Offline support (PWA capabilities)
- Mobile-responsive design
- Installable as a native app on mobile and desktop

## Prerequisites

- Node.js 18+ and npm
- Firebase account with Firestore database
- Instagram Graph API access (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instagram-growth-engine
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Firebase credentials.

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Getting Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings (gear icon in top-left)
4. Scroll to "Your apps" section
5. Click "Add app" and select "Web"
6. Copy the configuration object
7. Fill in the `.env.local` file with the values from the config

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name and follow setup wizard
4. Enable Analytics (optional)

### 2. Create Web App

1. Click the Web icon in the project overview
2. Register your app
3. Copy the Firebase config
4. Update your `.env.local` file

### 3. Set up Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your database location
5. Click "Enable"

### 4. Set up Authentication (Optional)

1. Go to Authentication in Firebase Console
2. Click "Get started"
3. Enable desired sign-in providers (Google, Email/Password, etc.)

### 5. Configure Security Rules

For development, you can temporarily allow all reads/writes. For production, implement proper security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reads/writes for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Project Structure

```
instagram-growth-engine/
├── public/                  # Static assets
│   ├── favicon.svg         # SVG icon
│   ├── pwa-192x192.png     # PWA icon (192x192)
│   ├── pwa-512x512.png     # PWA icon (512x512)
│   ├── robots.txt          # SEO robots file
│   └── 404.html            # GitHub Pages fallback
├── src/
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Firebase and API services
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── scripts/
│   └── generate-pwa-icons.js  # Icon generation script
├── vite.config.js         # Vite configuration
├── package.json           # Project dependencies
├── .env.example          # Example environment variables
└── README.md             # This file
```

## PWA Configuration

The app includes PWA capabilities:

- **Service Worker**: Handled by Vite PWA Plugin
- **Icons**: Located in `public/` directory
  - favicon.svg (small icon)
  - pwa-192x192.png (home screen icon)
  - pwa-512x512.png (splash screen icon)
- **Manifest**: Configured in `vite.config.js`
- **404 Redirect**: `public/404.html` for GitHub Pages SPA support

### Install as App

1. Visit the app in a modern browser
2. Look for "Install" or "Add to home screen" prompt
3. Click to install as a native app

## Linting

Run ESLint to check code quality:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint -- --fix
```

## Deployment

### GitHub Pages Deployment

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select "GitHub Actions" as the deployment source

2. **Configure Repository Settings**
   - Ensure the repository is public (or Pro/Team for private)
   - The `.github/workflows/deploy.yml` will automatically deploy on push to `main`

3. **Update Base URL (if needed)**
   - If deploying to a subdirectory, update `vite.config.js`:
   ```javascript
   export default {
     base: '/instagram-growth-engine/',
     // ... rest of config
   }
   ```

4. **Push to Main Branch**
   ```bash
   git push origin main
   ```

The GitHub Actions workflow will:
- Install dependencies with `--legacy-peer-deps`
- Generate PWA icons
- Build with Vite
- Deploy to GitHub Pages

Access your app at: `https://<your-username>.github.io/instagram-growth-engine/`

### Alternative Deployments

The app can be deployed to:
- **Vercel**: Push to GitHub, Vercel auto-deploys
- **Netlify**: Connect GitHub repo, auto-deploy on push
- **Firebase Hosting**: Use `firebase deploy` command
- **Traditional hosting**: Upload `dist/` folder contents

## Technologies

- **Frontend Framework**: React 19
- **Build Tool**: Vite 8
- **Backend/Database**: Firebase
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router
- **Date Handling**: date-fns
- **PWA**: vite-plugin-pwa

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Firebase Connection Issues
- Check `.env.local` has correct Firebase config
- Verify Firestore database is created
- Check browser console for detailed errors

### Build Issues
- Clear `node_modules` and `package-lock.json`, then reinstall
- Ensure Node.js version is 18+
- Check if all required environment variables are set

### PWA Not Installing
- Check browser console for service worker errors
- Ensure using HTTPS (PWA requires secure context)
- Clear browser cache and try again

### GitHub Pages Not Updating
- Check "Actions" tab in repository for workflow status
- Verify `.github/workflows/deploy.yml` exists
- Check GitHub Pages settings points to "GitHub Actions"

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review Firebase documentation

## Roadmap

- [ ] Instagram Graph API integration
- [ ] Advanced analytics dashboards
- [ ] Post scheduling features
- [ ] Multi-account management
- [ ] Export/reporting functionality
- [ ] Real-time notifications
- [ ] Collaboration features

## Changelog

### Version 1.0.0 (Initial Release)
- Initial PWA setup
- Firebase integration
- Basic dashboard
- Icon generation pipeline
- GitHub Pages deployment

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [PWA Documentation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Recharts Documentation](https://recharts.org/)
