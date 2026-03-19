import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  TrendingUp,
  BookOpen,
  Zap,
  CheckCircle2,
  Clock,
  MessageSquare,
  Target,
  Flame,
  Trophy,
  Lightbulb,
  Calendar,
  Loader,
} from 'lucide-react';
import { useDocument, useCollection } from '../firebase/useFirestore';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [chartDays, setChartDays] = useState(30);
  const [insightIndex, setInsightIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState({});

  // Firestore data hooks
  const { data: profileData, loading: profileLoading } = useDocument('settings', 'profile');
  const { data: growthDataFirestore, loading: growthLoading } = useCollection('growthData');
  const { data: tasksData, loading: tasksLoading } = useCollection('tasks');
  const { data: postsData, loading: postsLoading } = useCollection('scheduledPosts');
  const { data: insightsData, loading: insightsLoading } = useDocument('settings', 'insights');

  // Process growth data for chart
  const chartData = useMemo(() => {
    if (!growthDataFirestore || growthDataFirestore.length === 0) {
      return [];
    }

    // Sort by date and filter to requested days
    const sorted = [...growthDataFirestore].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    return sorted.slice(-chartDays).map((item) => ({
      date: new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      followers: item.followers || 0,
    }));
  }, [growthDataFirestore, chartDays]);

  // Calculate metrics — profileData is the primary source for followers/ER
  // chartData supplements with growth trends when available
  const metrics = useMemo(() => {
    const currentFollowers = Number(profileData?.followers) || 0;
    const engagementRate = Number(profileData?.engagementRate) || 0;
    const postsCount = Number(profileData?.postsCount) || 0;

    let followerChange = 0;
    let growthVelocity = 0;
    if (chartData && chartData.length > 1) {
      const latest = chartData[chartData.length - 1]?.followers || currentFollowers;
      const earliest = chartData[0]?.followers || currentFollowers;
      followerChange = latest - earliest;
      growthVelocity = (followerChange / chartData.length).toFixed(1);
    }

    return {
      currentFollowers,
      followerChange,
      engagementRate,
      postsThisWeek: Number(profileData?.postsThisWeek) || 0,
      postsTarget: Number(profileData?.postsTarget) || 7,
      postsCount,
      growthVelocity,
    };
  }, [chartData, profileData]);

  // Get upcoming posts (next 3)
  const upcomingPosts = useMemo(() => {
    if (!postsData || postsData.length === 0) {
      return [];
    }

    return postsData
      .filter((post) => post.scheduledTime && new Date(post.scheduledTime) > new Date())
      .sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime))
      .slice(0, 3);
  }, [postsData]);

  // Get today's tasks
  const todaysTasks = useMemo(() => {
    if (!tasksData || tasksData.length === 0) {
      return [];
    }

    const today = new Date().toDateString();
    return tasksData.filter((task) => {
      const taskDate = new Date(task.dueDate).toDateString();
      return taskDate === today;
    });
  }, [tasksData]);

  // Get insights
  const insights = useMemo(() => {
    if (!insightsData || !insightsData.tips) {
      return [];
    }
    return Array.isArray(insightsData.tips) ? insightsData.tips : [];
  }, [insightsData]);

  // Handle task completion
  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  const handleNextInsight = () => {
    setInsightIndex((prev) => (prev + 1) % Math.max(insights.length, 1));
  };

  // Check if data is loading
  const isLoading = profileLoading || growthLoading || tasksLoading || postsLoading || insightsLoading;

  // Empty state check
  const hasProfileData = profileData && profileData.followers !== undefined;
  const hasGrowthData = growthDataFirestore && growthDataFirestore.length > 0;

  return (
    <div className="dashboard">
      <div className="dashboard-max-width">
        {/* Welcome Section */}
        <div className="dashboard-section">
          <h1 className="dashboard-heading">Welcome back! 👋</h1>
          {hasProfileData && hasGrowthData ? (
            <p className="dashboard-subheading">
              Phase 1: 0 → 1K | Growth Velocity: +{metrics.growthVelocity} followers/day
            </p>
          ) : (
            <p className="dashboard-subheading">Connect your Instagram profile to get started</p>
          )}
        </div>

        {/* Empty State - Show when no data exists */}
        {!hasProfileData && !isLoading && (
          <div className="dashboard-empty-state">
            <div className="dashboard-empty-state-icon">📊</div>
            <h3>No data yet</h3>
            <p>Connect your Instagram profile in Settings to see your real metrics here</p>
            <Link to="/settings" className="btn-primary">
              Connect Profile
            </Link>
          </div>
        )}

        {/* Main Dashboard - Only show if data exists or still loading */}
        {(hasProfileData || isLoading) && (
          <>
            {/* Key Metrics Cards - Top Row */}
            {isLoading && !hasGrowthData ? (
              <div className="dashboard-metrics-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="dashboard-skeleton-card dashboard-skeleton"></div>
                ))}
              </div>
            ) : (
              <div className="dashboard-metrics-grid">
                {/* Current Followers Card */}
                <div className="dashboard-metric-card">
                  <div className="dashboard-metric-gradient-border"></div>
                  <div className="dashboard-metric-inner">
                    <div className="dashboard-metric-label">Current Followers</div>
                    <div className="dashboard-metric-value">
                      {metrics.currentFollowers.toLocaleString()}
                    </div>
                    <div className="dashboard-metric-change positive">
                      <TrendingUp size={16} />
                      <span>+{metrics.followerChange} this month</span>
                    </div>
                    <div className="dashboard-icon-container">
                      <Users size={20} />
                    </div>
                  </div>
                </div>

                {/* Engagement Rate Card */}
                <div className="dashboard-metric-card">
                  <div className="dashboard-metric-gradient-border"></div>
                  <div className="dashboard-metric-inner">
                    <div className="dashboard-metric-label">Engagement Rate</div>
                    <div className="dashboard-metric-value">
                      {metrics.engagementRate.toFixed(1)}%
                    </div>
                    <div className="dashboard-metric-change positive">
                      <TrendingUp size={16} />
                      <span>+0.3% vs last week</span>
                    </div>
                    <div className="dashboard-icon-container">
                      <MessageSquare size={20} />
                    </div>
                  </div>
                </div>

                {/* Posts This Week Card */}
                <div className="dashboard-metric-card">
                  <div className="dashboard-metric-gradient-border"></div>
                  <div className="dashboard-metric-inner">
                    <div className="dashboard-metric-label">Posts This Week</div>
                    <div className="dashboard-metric-value">
                      {metrics.postsThisWeek}/{metrics.postsTarget}
                    </div>
                    <div className="dashboard-metric-change neutral">
                      <Target size={16} />
                      <span>{metrics.postsTarget - metrics.postsThisWeek} to goal</span>
                    </div>
                    <div className="dashboard-icon-container">
                      <BookOpen size={20} />
                    </div>
                  </div>
                </div>

                {/* Growth Velocity Card */}
                <div className="dashboard-metric-card">
                  <div className="dashboard-metric-gradient-border"></div>
                  <div className="dashboard-metric-inner">
                    <div className="dashboard-metric-label">Growth Velocity</div>
                    <div className="dashboard-metric-value">+{metrics.growthVelocity}</div>
                    <div className="dashboard-metric-change positive">
                      <Zap size={16} />
                      <span>followers/day avg</span>
                    </div>
                    <div className="dashboard-icon-container">
                      <Zap size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Growth Chart */}
            {hasGrowthData && (
              <div className="dashboard-section dashboard-chart-container">
                <div className="dashboard-toggle-group">
                  {[30, 60, 90].map((days) => (
                    <button
                      key={days}
                      onClick={() => setChartDays(days)}
                      className={`dashboard-toggle-button ${chartDays === days ? 'active' : ''}`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fa7e1e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#d92e7f" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                      <XAxis dataKey="date" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                      <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                        }}
                        cursor={{ stroke: '#fa7e1e', strokeWidth: 1 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="followers"
                        stroke="#fa7e1e"
                        fillOpacity={1}
                        fill="url(#colorFollowers)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="dashboard-empty-state">
                    <p>No growth data available yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Two Column Layout */}
            <div className="dashboard-two-col">
              {/* Today's Action Items */}
              <div className="dashboard-section">
                <h2 className="dashboard-section-title">
                  <CheckCircle2 size={18} />
                  Today's Action Items
                </h2>
                {isLoading && !todaysTasks.length ? (
                  <div className="dashboard-task-list">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="dashboard-skeleton-line"></div>
                    ))}
                  </div>
                ) : todaysTasks.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <div className="dashboard-empty-state-icon">✓</div>
                    <h3>No tasks today</h3>
                    <p>All caught up! Come back tomorrow for new action items.</p>
                  </div>
                ) : (
                  <div className="dashboard-task-list">
                    {todaysTasks.map((task) => (
                      <div key={task.id} className="dashboard-task-item">
                        <input
                          type="checkbox"
                          checked={completedTasks[task.id] || false}
                          onChange={() => toggleTask(task.id)}
                          className="dashboard-task-checkbox"
                        />
                        <span
                          className={`dashboard-task-text ${
                            completedTasks[task.id] ? 'completed' : ''
                          }`}
                        >
                          {task.title}
                        </span>
                        <div className="dashboard-progress-ring">
                          {completedCount}/{todaysTasks.length}
                        </div>
                      </div>
                    ))}
                    <div className="dashboard-task-summary">
                      {completedCount}/{todaysTasks.length} tasks completed (
                      {Math.round((completedCount / todaysTasks.length) * 100)}%)
                    </div>
                  </div>
                )}
              </div>

              {/* Content Pipeline */}
              <div className="dashboard-section">
                <h2 className="dashboard-section-title">
                  <Calendar size={18} />
                  Content Pipeline (Next 3)
                </h2>
                {isLoading && !upcomingPosts.length ? (
                  <div className="dashboard-content-pipeline">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="dashboard-skeleton-card"></div>
                    ))}
                  </div>
                ) : upcomingPosts.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <div className="dashboard-empty-state-icon">📅</div>
                    <h3>No scheduled posts</h3>
                    <p>Schedule your next Instagram post to see it here</p>
                  </div>
                ) : (
                  <div className="dashboard-content-pipeline">
                    {upcomingPosts.map((post) => (
                      <div key={post.id} className="dashboard-content-card">
                        <div className="dashboard-content-thumb">
                          {post.thumbnail || '📸'}
                        </div>
                        <div className="dashboard-content-info">
                          <div className="dashboard-content-caption">{post.caption}</div>
                          <div className="dashboard-content-time">
                            <Clock size={12} />
                            {new Date(post.scheduledTime).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            at{' '}
                            {new Date(post.scheduledTime).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats Grid */}
            {profileData && (
              <div className="dashboard-section">
                <h2 className="dashboard-section-title">
                  <Trophy size={18} />
                  Quick Stats
                </h2>
                <div className="dashboard-stat-grid">
                  <div className="dashboard-stat-box">
                    <div className="dashboard-stat-value">
                      {profileData.bestPostType || '📸'} Carousel
                    </div>
                    <div className="dashboard-stat-label">Best Performing Post</div>
                    <div className="dashboard-stat-detail">
                      +{profileData.bestPostImpressions || 0} impressions
                    </div>
                  </div>
                  <div className="dashboard-stat-box">
                    <div className="dashboard-stat-value">
                      {profileData.topHashtag || '#growth'}
                    </div>
                    <div className="dashboard-stat-label">Top Hashtag Set</div>
                    <div className="dashboard-stat-detail">
                      {profileData.topHashtagReach || 0}K total reach
                    </div>
                  </div>
                  <div className="dashboard-stat-box">
                    <div className="dashboard-stat-value">
                      <Flame size={24} style={{ display: 'inline' }} />
                    </div>
                    <div className="dashboard-stat-label">Engagement Streak</div>
                    <div className="dashboard-stat-detail">
                      {profileData.engagementStreak || 0} days 🔥
                    </div>
                  </div>
                  <div className="dashboard-stat-box">
                    <div className="dashboard-stat-value">
                      {profileData.toNextMilestone || 342}
                    </div>
                    <div className="dashboard-stat-label">To Next Milestone</div>
                    <div className="dashboard-stat-detail">1K followers goal</div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Insight Card */}
            {insights.length > 0 && (
              <div className="dashboard-section">
                <h2 className="dashboard-section-title">
                  <Lightbulb size={18} />
                  Daily AI Insight
                </h2>
                <div className="dashboard-insight-card">
                  <div className="dashboard-insight-header">
                    <Lightbulb size={20} style={{ color: '#fa7e1e', flexShrink: 0 }} />
                    <span className="dashboard-insight-header-title">Tip for Today</span>
                    <button
                      onClick={handleNextInsight}
                      className="dashboard-insight-nav-button"
                    >
                      Next →
                    </button>
                  </div>
                  <p className="dashboard-insight-text">
                    {insights[insightIndex] || 'No insights available yet'}
                  </p>
                  <div className="dashboard-insight-dots">
                    {insights.map((_, idx) => (
                      <div
                        key={idx}
                        className={`dashboard-insight-dot ${
                          idx === insightIndex ? 'active' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Loading Indicator */}
        {isLoading && !hasProfileData && (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <Loader size={40} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading your data...</p>
          </div>
        )}

        {/* Footer Spacing */}
        <div className="dashboard-footer-spacing"></div>
      </div>
    </div>
  );
}
