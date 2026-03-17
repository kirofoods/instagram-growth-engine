import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Pencil,
  Zap,
  Calendar,
  Grid3x3,
  Search,
  Hash,
  PieChart,
  Mail,
  Heart,
  ShieldCheck,
  Megaphone,
  Coins,
  Target,
  CheckCircle,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const navGroups = [
    {
      title: 'Core',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
        { path: '/daily-actions', label: 'Daily Actions', icon: CheckCircle },
        { path: '/growth-milestones', label: 'Growth Milestones', icon: TrendingUp },
      ],
    },
    {
      title: 'Create',
      items: [
        { path: '/content-studio', label: 'Content Studio', icon: Pencil },
        { path: '/viral-lab', label: 'Viral Lab', icon: Zap },
        { path: '/calendar', label: 'Calendar', icon: Calendar },
        { path: '/grid-planner', label: 'Grid Planner', icon: Grid3x3 },
      ],
    },
    {
      title: 'Grow',
      items: [
        { path: '/seo-suite', label: 'SEO Suite', icon: Search },
        { path: '/hashtags', label: 'Hashtags', icon: Hash },
        { path: '/analytics', label: 'Analytics', icon: PieChart },
        { path: '/strategy', label: 'Strategy', icon: Target },
      ],
    },
    {
      title: 'Engage',
      items: [
        { path: '/dm-funnels', label: 'DM Funnels', icon: Mail },
        { path: '/engagement', label: 'Engagement', icon: Heart },
        { path: '/account-health', label: 'Account Health', icon: ShieldCheck },
      ],
    },
    {
      title: 'Monetize',
      items: [
        { path: '/ads', label: 'Ads', icon: Megaphone },
        { path: '/monetization', label: 'Monetization', icon: Coins },
      ],
    },
    {
      title: 'Learn',
      items: [
        { path: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          {!isCollapsed && (
            <div className="logo-content">
              <div className="logo-icon">KG</div>
              <span className="logo-text">KiroGram</span>
            </div>
          )}
        </div>
        <button className="toggle-btn" onClick={onToggle}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navGroups.map((group, idx) => (
          <div key={idx} className="nav-group">
            {!isCollapsed && <div className="nav-group-title">{group.title}</div>}
            <div className="nav-items">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${active ? 'active' : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon size={20} className="nav-icon" />
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    {active && <div className="active-indicator" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link
          to="/settings"
          className={`nav-item settings-btn ${isActive('/settings') ? 'active' : ''}`}
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings size={20} className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
