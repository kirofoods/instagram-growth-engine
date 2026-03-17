import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Users,
  TrendingUp,
  MessageSquare,
  Image,
  CheckCircle2,
  Calendar,
  Lightbulb,
  Clock,
  Flame,
  Target,
} from 'lucide-react';
import './Dashboard.css';

// Mock data for follower growth
const generateGrowthData = (days) => {
  const data = [];
  let followers = 462;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    followers += Math.floor(Math.random() * 15) + 3;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      followers: followers,
    });
  }
  return data;
};

// Mock daily tasks
const mockTasks = [
  { id: 1, title: 'Publish daily story', completed: true },
  { id: 2, title: 'Engage with top 20 accounts', completed: true },
  { id: 3, title: 'Respond to DMs', completed: false },
  { id: 4, title: 'Check analytics', completed: false },
  { id: 5, title: 'Post to main feed', completed: false },
];

// Mock upcoming posts
const mockUpcomingPosts = [
  {
    id: 1,
    type: 'Carousel',
    caption: 'New product launch event happening this Saturday! Stay tuned...',
    date: 'Today, 3:00 PM',
  },
  {
    id: 2,
    type: 'Reel',
    caption: 'Behind the scenes: Our creative process for next month campaigns',
    date: 'Tomorrow, 7:30 PM',
  },
  {
    id: 3,
    type: 'Photo',
    caption: 'Throwback to our favorite moments from last quarter',
    date: 'Mar 19, 6:00 PM',
  },
];

// Mock AI insights
const mockInsights = [
  'Your audience is most active between 6-8 PM on weekdays. Schedule posts at 5:30 PM for maximum reach.',
  'Carousel posts got 34% more engagement than static posts this month. Keep it up!',
  'Your #photography hashtag has the highest reach rate at 12.3%. Use it more often!',
  'Followers from US increased by 45% this week. Target more US-based content creators.',
];

export default function Dashboard() {
  const [completedTasks, setCompletedTasks] = useState(
    mockTasks.reduce((acc, task) => {
      acc[task.id] = task.completed;
      return acc;
    }, {})
  );

  const [chartDays, setChartDays] = useState(30);
  const [insightIndex, setInsightIndex] = useState(0);

  const growthData = useMemo(() => generateGrowthData(chartDays), [chartDays]);
  const completedCount = useMemo(() => {
    return mockTasks.filter((t) => completedTasks[t.id]).length;
  }, [completedTasks]);
  const taskCompletionPercentage = useMemo(() => {
    return (completedCount / mockTasks.length) * 100;
  }, [completedCount]);

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleNextInsight = () => {
    setInsightIndex((prev) => (prev + 1) % mockInsights.length);
  };

  const handleInsightDotClick = (idx) => {
    setInsightIndex(idx);
  };

  // Calculate metrics
  const currentFollowers = growthData[growthData.length - 1]?.followers || 733;
  const previousFollowers = growthData[0]?.followers || 462;
  const followerChange = currentFollowers - previousFollowers;
  const engagementRate = 8.4;
  const engagementChange = 0.3;
  const postsThisWeek = 5;
  const postsTarget = 7;
  const growthVelocity = (followerChange / chartDays).toFixed(1);

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="page">
      {/* Hero Welcome Section */}
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Welcome back, Shreyansh</h1>
            <div className="welcome-meta">
              <span className="current-date">{currentDate}</span>
            </div>
          </div>
          <div className="hero-velocity-badge">
            <div className="flex flex-col items-end gap-xs">
              <span className="hero-velocity-label">Growth Velocity</span>
              <span className="hero-velocity-value">+{growthVelocity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Metric Cards - 6 Column Grid with unique accents */}
      <div className="grid-6">
        {/* Followers Card */}
        <div className="card metric-card accent-primary">
          <div className="metric-label">Followers</div>
          <div className="num-lg">{currentFollowers.toLocaleString()}</div>
          <div className="metric-trend positive">
            <TrendingUp size={14} />
            <span>+{followerChange.toLocaleString()}</span>
          </div>
          <div className="metric-icon-circle">
            <Users size={24} />
          </div>
        </div>

        {/* Engagement Card */}
        <div className="card metric-card accent-success">
          <div className="metric-label">Engagement Rate</div>
          <div className="num-lg">{engagementRate}%</div>
          <div className="metric-trend positive">
            <TrendingUp size={14} />
            <span>+{engagementChange}%</span>
          </div>
          <div className="metric-icon-circle">
            <MessageSquare size={24} />
          </div>
        </div>

        {/* Posts This Week Card */}
        <div className="card metric-card accent-warning">
          <div className="metric-label">Posts This Week</div>
          <div className="num-lg">{postsThisWeek}/{postsTarget}</div>
          <div className="metric-trend warning">
            <Image size={14} />
            <span>{postsTarget - postsThisWeek} to goal</span>
          </div>
          <div className="metric-icon-circle">
            <Image size={24} />
          </div>
        </div>

        {/* Best Post Performance Card */}
        <div className="card metric-card accent-info">
          <div className="metric-label">Best Post</div>
          <div className="num-lg">12.4K</div>
          <div className="metric-trend positive">
            <TrendingUp size={14} />
            <span>Impressions</span>
          </div>
          <div className="metric-icon-circle">
            <CheckCircle2 size={24} />
          </div>
        </div>

        {/* Engagement Streak Card */}
        <div className="card metric-card accent-success">
          <div className="metric-label">Engagement Streak</div>
          <div className="num-lg">14</div>
          <div className="metric-trend positive">
            <Flame size={14} />
            <span>Days active</span>
          </div>
          <div className="metric-icon-circle">
            <Flame size={24} />
          </div>
        </div>

        {/* To Next Milestone Card */}
        <div className="card metric-card accent-primary">
          <div className="metric-label">To 1K Milestone</div>
          <div className="num-lg">{(1000 - currentFollowers).toLocaleString()}</div>
          <div className="metric-trend">
            <TrendingUp size={14} />
            <span>followers</span>
          </div>
          <div className="metric-icon-circle">
            <Target size={24} />
          </div>
        </div>
      </div>

      {/* Growth Chart Section */}
      <div className="card growth-chart-card">
        <div className="card-header">
          <h3>Follower Growth</h3>
          <div className="period-selector">
            {[30, 60, 90].map((days) => (
              <button
                key={days}
                className={`period-pill ${chartDays === days ? 'active' : ''}`}
                onClick={() => setChartDays(days)}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(225, 48, 108, 0.3)" />
                  <stop offset="95%" stopColor="rgba(225, 48, 108, 0.02)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
                cursor={{ stroke: 'var(--color-primary)', strokeWidth: 2 }}
                formatter={(value) => [value.toLocaleString(), 'Followers']}
              />
              <Area
                type="monotone"
                dataKey="followers"
                stroke="var(--color-primary)"
                fillOpacity={1}
                fill="url(#colorFollowers)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid-2">
        {/* Today's Tasks */}
        <div className="card">
          <div className="task-section-header">
            <h3>Today's Tasks</h3>
            <span className="badge">{completedCount}/{mockTasks.length}</span>
          </div>

          <div className="task-progress-bar">
            <div className="task-progress-fill" style={{ width: `${taskCompletionPercentage}%` }} />
          </div>
          <p className="task-progress-text">{Math.round(taskCompletionPercentage)}% Complete</p>

          <div className="task-list">
            {mockTasks.map((task) => (
              <label key={task.id} className={`task-item ${completedTasks[task.id] ? 'task-completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={completedTasks[task.id]}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-label">{task.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Upcoming Posts */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Posts</h3>
            <span className="badge">{mockUpcomingPosts.length}</span>
          </div>
          <div className="post-list">
            {mockUpcomingPosts.map((post) => {
              const postType = post.type.toLowerCase();
              return (
                <div key={post.id} className={`post-item type-${postType}`}>
                  <span className="post-type-badge">{post.type}</span>
                  <div className="post-details">
                    <p className="post-caption">{post.caption}</p>
                    <div className="post-meta">
                      <Clock size={12} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insight Card - Most Visually Distinct */}
      <div className="card insight-card">
        <div className="insight-content">
          <div className="insight-header">
            <div className="insight-icon-glow">
              <Lightbulb size={24} />
            </div>
            <h3>Daily AI Insight</h3>
            <button className="insight-nav-btn" onClick={handleNextInsight}>
              Next →
            </button>
          </div>
          <p className="insight-text">{mockInsights[insightIndex]}</p>
          <div className="insight-dots">
            {mockInsights.map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === insightIndex ? 'dot-active' : ''}`}
                onClick={() => handleInsightDotClick(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
