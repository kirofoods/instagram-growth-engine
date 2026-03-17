import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Settings, Search } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const isSidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

  return (
    <div className="topbar">
      <div className="topbar-left">
        {isSidebarCollapsed && (
          <h1 className="topbar-title">
            <span className="gradient-text">KiroGram</span>
          </h1>
        )}
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
          <Bell size={18} />
          <span className="notification-badge"></span>
        </button>

        <button
          className="topbar-btn settings-btn"
          title="Settings"
        >
          <Settings size={18} />
        </button>

        <div className="user-avatar">
          <div className="avatar-placeholder">S</div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
