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
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account, API keys, and preferences</p>
        </div>

        {/* Saved Message */}
        {savedMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700 flex items-center gap-2">
            <CheckCircle size={20} className="text-green-300" />
            <p className="text-green-300">{savedMessage}</p>
          </div>
        )}

        {/* Profile Section */}
        <section className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center gap-3 mb-6">
            <User size={24} style={{ color: '#E1306C' }} />
            <h2 className="text-2xl font-bold text-white">Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { key: 'handle', label: 'Instagram Handle', placeholder: '@username' },
              { key: 'niche', label: 'Niche', placeholder: 'e.g., Fashion & Lifestyle' },
              { key: 'followers', label: 'Current Followers', placeholder: '100000', type: 'number' },
              { key: 'accountType', label: 'Account Type', placeholder: 'Creator/Business/Personal', type: 'text' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  value={profile[field.key]}
                  onChange={(e) => handleProfileUpdate(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#E1306C] transition-colors"
                />
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow">
            <Save size={18} />
            Save Profile
          </button>
        </section>

        {/* Firebase Configuration */}
        <section className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon size={24} style={{ color: '#833AB4' }} />
            <h2 className="text-2xl font-bold text-white">Firebase Configuration</h2>
          </div>

          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6 flex gap-3">
            <Info size={20} className="text-blue-300 flex-shrink-0" />
            <div>
              <p className="text-blue-300 text-sm font-semibold">Get your Firebase config</p>
              <p className="text-blue-200 text-xs mt-1">Visit your Firebase console → Project Settings to get these values</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {Object.entries(firebaseConfig).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleFirebaseUpdate(key, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-[#E1306C]"
                  />
                  <button
                    onClick={() => copyToClipboard(value)}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={saveFirebaseConfig}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow"
          >
            <Save size={18} />
            Save Firebase Config
          </button>
        </section>

        {/* API Keys */}
        <section className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon size={24} style={{ color: '#FD1D1D' }} />
            <h2 className="text-2xl font-bold text-white">API Keys</h2>
          </div>

          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle size={20} className="text-red-300 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-semibold">Keep these secure</p>
              <p className="text-red-200 text-xs mt-1">Never share your API keys. They give access to your accounts.</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {[
              { key: 'claudeApiKey', label: 'Claude API Key', hint: 'Get from https://console.anthropic.com' },
              { key: 'instagramAccessToken', label: 'Instagram Access Token', hint: 'Generate from Facebook Developer Console' },
            ].map((field) => (
              <div key={field.key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-300">{field.label}</label>
                  <button
                    onClick={() => setShowApiKeys({ ...showApiKeys, [field.key]: !showApiKeys[field.key] })}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showApiKeys[field.key] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type={showApiKeys[field.key] ? 'text' : 'password'}
                    value={apiKeys[field.key]}
                    onChange={(e) => handleApiKeyUpdate(field.key, e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white font-mono text-sm focus:outline-none focus:border-[#E1306C]"
                  />
                  <button
                    onClick={() => copyToClipboard(apiKeys[field.key])}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    <Copy size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">{field.hint}</p>
              </div>
            ))}
          </div>

          <button
            onClick={saveApiKeys}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow"
          >
            <Save size={18} />
            Save API Keys
          </button>
        </section>

        {/* Notification Preferences */}
        <section className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} style={{ color: '#FD1D1D' }} />
            <h2 className="text-2xl font-bold text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { key: 'dailyReminders', label: 'Daily Reminders', description: 'Get daily reminders to post or engage' },
              { key: 'milestoneAlerts', label: 'Milestone Alerts', description: 'Celebrate follower milestones' },
              { key: 'weeklyReports', label: 'Weekly Reports', description: 'Get a summary every Sunday' },
              { key: 'adPerformanceNotifications', label: 'Ad Performance Alerts', description: 'Alerts when ads underperform' },
              { key: 'dealNotifications', label: 'Brand Deal Notifications', description: 'New opportunities matching your niche' },
            ].map((notification) => (
              <div
                key={notification.key}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-900"
              >
                <div>
                  <p className="text-white font-semibold">{notification.label}</p>
                  <p className="text-gray-400 text-sm">{notification.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[notification.key]}
                    onChange={() => handleNotificationToggle(notification.key)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer"
                    style={{
                      backgroundColor: notifications[notification.key] ? '#E1306C' : '#374151',
                    }}
                  />
                  <span className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform"
                    style={{
                      transform: notifications[notification.key] ? 'translateX(20px)' : 'translateX(0)',
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Theme Toggle */}
        <section className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center gap-3 mb-6">
            {theme === 'dark' ? <Moon size={24} style={{ color: '#833AB4' }} /> : <Sun size={24} style={{ color: '#F77737' }} />}
            <h2 className="text-2xl font-bold text-white">Theme</h2>
          </div>

          <div className="flex gap-4">
            {['dark', 'light'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  theme === t
                    ? 'bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {t === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">Dark mode is recommended for reduced eye strain</p>
        </section>

        {/* Data Management */}
        <section className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center gap-3 mb-6">
            <Database size={24} style={{ color: '#20c997' }} />
            <h2 className="text-2xl font-bold text-white">Data Management</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors border border-gray-700">
              <span className="flex items-center gap-3 text-white font-semibold">
                <Download size={20} />
                Export Data
              </span>
              <span className="text-gray-400 text-sm">Download JSON</span>
            </button>

            <button
              onClick={exportData}
              className="w-full flex items-center justify-between px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors border border-gray-700"
            >
              <span className="flex items-center gap-3 text-white font-semibold">
                <Upload size={20} />
                Export All Data
              </span>
              <span className="text-gray-400 text-sm">Save backup</span>
            </button>

            <button className="w-full flex items-center justify-between px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors border border-gray-700">
              <span className="flex items-center gap-3 text-white font-semibold">
                <Upload size={20} />
                Import Data
              </span>
              <span className="text-gray-400 text-sm">Restore backup</span>
            </button>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-between px-6 py-3 rounded-lg bg-red-900/20 hover:bg-red-900/30 transition-colors border border-red-700"
              >
                <span className="flex items-center gap-3 text-red-300 font-semibold">
                  <Trash2 size={20} />
                  Clear All Data
                </span>
                <span className="text-red-400 text-sm">Permanent</span>
              </button>
            ) : (
              <div className="p-4 rounded-lg bg-red-900/30 border border-red-700">
                <p className="text-red-300 font-semibold mb-3">Are you sure? This cannot be undone.</p>
                <div className="flex gap-3">
                  <button
                    onClick={clearAllData}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-gray-400">App Version</p>
              <p className="text-white font-semibold">1.0.0</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Last Updated</p>
              <p className="text-white font-semibold">March 17, 2026</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Built with</p>
              <p className="text-white font-semibold">React • Firebase • Claude API</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              KiroGram helps creators optimize their strategy, manage ads, track monetization, and grow their audience with AI-powered insights.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
