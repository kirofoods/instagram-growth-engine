import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PinLogin from './components/PinLogin';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import GrowthMilestones from './pages/GrowthMilestones';
import ContentStudio from './pages/ContentStudio';
import ViralLab from './pages/ViralLab';
import Calendar from './pages/Calendar';
import GridPlanner from './pages/GridPlanner';
import SeoSuite from './pages/SeoSuite';
import Hashtags from './pages/Hashtags';
import Analytics from './pages/Analytics';
import DmFunnels from './pages/DmFunnels';
import Engagement from './pages/Engagement';
import AccountHealth from './pages/AccountHealth';
import Ads from './pages/Ads';
import Monetization from './pages/Monetization';
import Strategy from './pages/Strategy';
import DailyActions from './pages/DailyActions';
import KnowledgeBase from './pages/KnowledgeBase';
import Settings from './pages/Settings';
import './App.css';

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user was previously authenticated
    if (sessionStorage.getItem('kirogram_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('kirogram_auth', 'true');
  };

  if (!isAuthenticated) {
    return <PinLogin onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app-container">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="app-main">
        <TopBar />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/growth-milestones" element={<GrowthMilestones />} />
            <Route path="/content-studio" element={<ContentStudio />} />
            <Route path="/viral-lab" element={<ViralLab />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/grid-planner" element={<GridPlanner />} />
            <Route path="/seo-suite" element={<SeoSuite />} />
            <Route path="/hashtags" element={<Hashtags />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/dm-funnels" element={<DmFunnels />} />
            <Route path="/engagement" element={<Engagement />} />
            <Route path="/account-health" element={<AccountHealth />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/monetization" element={<Monetization />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/daily-actions" element={<DailyActions />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
