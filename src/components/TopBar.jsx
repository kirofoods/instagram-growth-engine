import React from 'react';
import { Bell, Settings, Search } from 'lucide-react';
import './TopBar.css';

const TopBar = ({ onSettingsClick }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">
          <span className="gradient-text">KiroGram</span>
        </h1>
      </div>

      <div className="topbar-center">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search modules, features..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="topbar-right">
        <button className="topbar-btn notification-btn" title="Notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <button
          className="topbar-btn settings-btn"
          onClick={onSettingsClick}
          title="Settings"
        >
          <Settings size={20} />
        </button>

        <div className="user-avatar">
          <div className="avatar-placeholder">U</div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
