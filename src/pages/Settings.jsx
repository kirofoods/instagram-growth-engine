import React, { useState } from 'react';
import {
  User,
  Settings as SettingsIcon,
  Bell,
  Database,
  Moon,
  Sun,
  Save,
  Copy,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import '../styles/Settings.css';

export default function Settings() {
  const [profile, setProfile] = useState({
    handle: '@fashionista_sarah',
    niche: 'Fashion & Lifestyle',
    followers: 152000,
    accountType: 'Creator',
  });

  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: 'AIzaSyDpK8rM...',
    authDomain: 'instagram-growth.firebaseapp.com',
    projectId: 'instagram-growth-12345',
    storageBucket: 'instagram-growth.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:abc123def456',
    databaseURL: 'https://instagram-growth.firebaseio.com',
  });

  const [apiKeys, setApiKeys] = useState({
    claudeApiKey: 'sk-ant-d7G1F...',
    instagramAccessToken: 'IGQVJfb...',
  });

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    milestoneAlerts: true,
    weeklyReports: true,
    adPerformanceNotifications: true,
    dealNotifications: true,
  });

  const [theme, setTheme] = useState('dark');
  const [showApiKeys, setShowApiKeys] = useState({
    claude: false,
    instagram: false,
  });

  const [savedMessage, setSavedMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleProfileUpdate = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleFirebaseUpdate = (field, value) => {
    setFirebaseConfig({ ...firebaseConfig, [field]: value });
  };

  const handleApiKeyUpdate = (field, value) => {
    setApiKeys({ ...apiKeys, [field]: value });
  };

  const handleNotificationToggle = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const saveFirebaseConfig = () => {
    setSavedMessage('Firebase configuration saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const saveApiKeys = () => {
    setSavedMessage('API keys saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSavedMessage('Copied to clipboard!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  const exportData = () => {
    const data = {
      profile,
      firebaseConfig,
      notifications,
    };
    const json = JSON.stringify(data, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', 'instagram-growth-data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearAllData = () => {
    setProfile({
      handle: '',
      niche: '',
      followers: 0,
      accountType: '',
    });
    setNotifications({
      dailyReminders: false,
      milestoneAlerts: false,
      weeklyReports: false,
      adPerformanceNotifications: false,
      dealNotifications: false,
    });
    setSavedMessage('All data cleared!');
    setShowDeleteConfirm(false);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account, API keys, and preferences</p>
      </div>

      {/* Saved Message */}
      {savedMessage && (
        <div className="alert alert-success section">
          <CheckCircle size={20} />
          <p>{savedMessage}</p>
        </div>
      )}

      {/* Profile Section */}
      <section className="card section">
        <div className="section-header">
          <User size={24} style={{ color: 'var(--color-primary)' }} />
          <h2 className="section-title">Profile</h2>
        </div>

        <div className="grid grid-2 settings-form">
          {[
            { key: 'handle', label: 'Instagram Handle', placeholder: '@username' },
            { key: 'niche', label: 'Niche', placeholder: 'e.g., Fashion & Lifestyle' },
            { key: 'followers', label: 'Current Followers', placeholder: '100000', type: 'number' },
            { key: 'accountType', label: 'Account Type', placeholder: 'Creator/Business/Personal', type: 'text' },
          ].map((field) => (
            <div key={field.key}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || 'text'}
                value={profile[field.key]}
                onChange={(e) => handleProfileUpdate(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="form-input"
              />
            </div>
          ))}
        </div>

        <button className="btn btn-primary">
          <Save size={18} />
          Save Profile
        </button>
      </section>

      {/* Firebase Configuration */}
      <section className="card section">
        <div className="section-header">
          <SettingsIcon size={24} style={{ color: 'var(--color-secondary)' }} />
          <h2 className="section-title">Firebase Configuration</h2>
        </div>

        <div className="alert alert-info">
          <Info size={20} />
          <div>
            <p className="font-semibold text-sm">Get your Firebase config</p>
            <p className="text-xs mt-1">Visit your Firebase console → Project Settings to get these values</p>
          </div>
        </div>

        <div className="settings-form">
          {Object.entries(firebaseConfig).map(([key, value]) => (
            <div key={key}>
              <label className="form-label capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <div className="form-input-group">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleFirebaseUpdate(key, e.target.value)}
                  className="form-input"
                />
                <button
                  onClick={() => copyToClipboard(value)}
                  className="btn btn-secondary"
                  style={{ padding: '0.625rem' }}
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={saveFirebaseConfig}
          className="btn btn-primary"
        >
          <Save size={18} />
          Save Firebase Config
        </button>
      </section>

      {/* API Keys */}
      <section className="card section">
        <div className="section-header">
          <SettingsIcon size={24} style={{ color: 'var(--status-error)' }} />
          <h2 className="section-title">API Keys</h2>
        </div>

        <div className="alert alert-danger">
          <AlertCircle size={20} />
          <div>
            <p className="font-semibold text-sm">Keep these secure</p>
            <p className="text-xs mt-1">Never share your API keys. They give access to your accounts.</p>
          </div>
        </div>

        <div className="settings-form">
          {[
            { key: 'claudeApiKey', label: 'Claude API Key', hint: 'Get from https://console.anthropic.com' },
            { key: 'instagramAccessToken', label: 'Instagram Access Token', hint: 'Generate from Facebook Developer Console' },
          ].map((field) => (
            <div key={field.key}>
              <div className="flex-between items-center mb-2">
                <label className="form-label">{field.label}</label>
                <button
                  onClick={() => setShowApiKeys({ ...showApiKeys, [field.key]: !showApiKeys[field.key] })}
                  className="btn-ghost"
                >
                  {showApiKeys[field.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="form-input-group">
                <input
                  type={showApiKeys[field.key] ? 'text' : 'password'}
                  value={apiKeys[field.key]}
                  onChange={(e) => handleApiKeyUpdate(field.key, e.target.value)}
                  className="form-input"
                />
                <button
                  onClick={() => copyToClipboard(apiKeys[field.key])}
                  className="btn btn-secondary"
                  style={{ padding: '0.625rem' }}
                >
                  <Copy size={18} />
                </button>
              </div>
              <p className="form-hint">{field.hint}</p>
            </div>
          ))}
        </div>

        <button
          onClick={saveApiKeys}
          className="btn btn-primary"
        >
          <Save size={18} />
          Save API Keys
        </button>
      </section>

      {/* Notification Preferences */}
      <section className="card section">
        <div className="section-header">
          <Bell size={24} style={{ color: 'var(--status-error)' }} />
          <h2 className="section-title">Notifications</h2>
        </div>

        <div className="notifications-list">
          {[
            { key: 'dailyReminders', label: 'Daily Reminders', description: 'Get daily reminders to post or engage' },
            { key: 'milestoneAlerts', label: 'Milestone Alerts', description: 'Celebrate follower milestones' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get a summary every Sunday' },
            { key: 'adPerformanceNotifications', label: 'Ad Performance Alerts', description: 'Alerts when ads underperform' },
            { key: 'dealNotifications', label: 'Brand Deal Notifications', description: 'New opportunities matching your niche' },
          ].map((notification) => (
            <div
              key={notification.key}
              className="notification-item"
            >
              <div>
                <p className="text-primary font-semibold">{notification.label}</p>
                <p className="text-secondary text-sm">{notification.description}</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications[notification.key]}
                  onChange={() => handleNotificationToggle(notification.key)}
                />
                <span className="toggle-slider" style={{
                  backgroundColor: notifications[notification.key] ? 'var(--color-primary)' : 'var(--border-secondary)',
                }}></span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="card section">
        <div className="section-header">
          {theme === 'dark' ? <Moon size={24} style={{ color: 'var(--color-secondary)' }} /> : <Sun size={24} style={{ color: 'var(--status-warning)' }} />}
          <h2 className="section-title">Theme</h2>
        </div>

        <div className="flex gap-3 mb-4">
          {['dark', 'light'].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`btn ${theme === t ? 'btn-primary' : 'btn-secondary'}`}
            >
              {t === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
          ))}
        </div>
        <p className="text-secondary text-sm">Dark mode is recommended for reduced eye strain</p>
      </section>

      {/* Data Management */}
      <section className="card section">
        <div className="section-header">
          <Database size={24} style={{ color: 'var(--status-success)' }} />
          <h2 className="section-title">Data Management</h2>
        </div>

        <div className="data-management-buttons">
          <button className="data-action-button">
            <span className="flex items-center gap-3">
              <Download size={20} />
              Export Data
            </span>
            <span className="text-secondary text-sm">Download JSON</span>
          </button>

          <button
            onClick={exportData}
            className="data-action-button"
          >
            <span className="flex items-center gap-3">
              <Upload size={20} />
              Export All Data
            </span>
            <span className="text-secondary text-sm">Save backup</span>
          </button>

          <button className="data-action-button">
            <span className="flex items-center gap-3">
              <Upload size={20} />
              Import Data
            </span>
            <span className="text-secondary text-sm">Restore backup</span>
          </button>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="data-action-button delete-action"
            >
              <span className="flex items-center gap-3">
                <Trash2 size={20} />
                Clear All Data
              </span>
              <span className="text-sm">Permanent</span>
            </button>
          ) : (
            <div className="alert alert-danger">
              <p className="font-semibold mb-3">Are you sure? This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={clearAllData}
                  className="btn btn-danger flex-1"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="card section">
        <h2 className="section-title">About</h2>
        <div className="about-content">
          <div className="about-item">
            <p className="text-secondary">App Version</p>
            <p className="text-primary font-semibold">1.0.0</p>
          </div>
          <div className="about-item">
            <p className="text-secondary">Last Updated</p>
            <p className="text-primary font-semibold">March 17, 2026</p>
          </div>
          <div className="about-item">
            <p className="text-secondary">Built with</p>
            <p className="text-primary font-semibold">React • Firebase • Claude API</p>
          </div>
        </div>
        <div className="about-description">
          <p className="text-secondary text-sm">
            KiroGram helps creators optimize their strategy, manage ads, track monetization, and grow their audience with AI-powered insights.
          </p>
        </div>
      </section>
    </div>
  );
}
