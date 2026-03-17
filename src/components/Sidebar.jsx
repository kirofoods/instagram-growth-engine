import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckCircle2,
  TrendingUp,
  PenTool,
  Zap,
  CalendarDays,
  Grid3x3,
  Search,
  Hash,
  BarChart3,
  Target,
  MessageSquare,
  Heart,
  ShieldCheck,
  Megaphone,
  Rocket,
  DollarSign,
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
      title: 'CORE',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/daily-actions', label: 'Daily Actions', icon: CheckCircle2 },
        { path: '/growth-milestones', label: 'Growth Milestones', icon: TrendingUp },
      ],
    },
    {
      title: 'CREATE',
      items: [
        { path: '/content-studio', label: 'Content Studio', icon: PenTool },
        { path: '/viral-lab', label: 'Viral Lab', icon: Zap },
        { path: '/calendar', label: 'Calendar', icon: CalendarDays },
        { path: '/grid-planner', label: 'Grid Planner', icon: Grid3x3 },
      ],
    },
    {
      title: 'GROW',
      items: [
        { path: '/seo-suite', label: 'SEO Suite', icon: Search },
        { path: '/hashtags', label: 'Hashtags', icon: Hash },
        { path: '/analytics', label: 'Analytics', icon: BarChart3 },
        { path: '/strategy', label: 'Strategy', icon: Target },
      ],
    },
    {
      title: 'ENGAGE',
      items: [
        { path: '/dm-funnels', label: 'DM Funnels', icon: MessageSquare },
        { path: '/engagement', label: 'Engagement', icon: Heart },
        { path: '/account-health', label: 'Account Health', icon: ShieldCheck },
      ],
    },
    {
      title: 'MONETIZE',
      items: [
        { path: '/ads', label: 'Ads', icon: Megaphone },
        { path: '/auto-ads', label: 'Auto Ads Engine', icon: Rocket },
        { path: '/monetization', label: 'Monetization', icon: DollarSign },
      ],
    },
    {
      title: 'LEARN',
      items: [
        { path: '/guide', label: 'Guide', icon: BookOpen },
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
                    <Icon className="nav-icon" />
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
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
