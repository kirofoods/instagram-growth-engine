import { useState, useMemo } from 'react';
import {
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
  MessageSquare,
  Image,
  CheckCircle2,
  Calendar,
  Lightbulb,
  Clock,
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

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleNextInsight = () => {
    setInsightIndex((prev) => (prev + 1) % mockInsights.length);
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

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex justify-between items-center">
          <div>
            <h1>Dashboard</h1>
            <p className="text-secondary text-sm" style={{ marginTop: '0.5rem' }}>
              Growth velocity: +{growthVelocity} followers/day
            </p>
          </div>
          <span className="badge">Phase 1: 0 → 1K</span>
        </div>
      </div>

      {/* Metric Cards - 4 Column Grid */}
      <div className="grid-4">
        {/* Followers Card */}
        <div className="card metric-card">
          <div className="metric-label">Followers</div>
          <div className="num-lg">{currentFollowers.toLocaleString()}</div>
          <div className="flex items-center gap-sm text-positive">
            <TrendingUp size={14} />
            <span>+{followerChange.toLocaleString()}</span>
          </div>
          <div className="metric-icon">
            <Users size={20} />
          </div>
        </div>

        {/* Engagement Card */}
        <div className="card metric-card">
          <div className="metric-label">Engagement</div>
          <div className="num-lg">{engagementRate}%</div>
          <div className="flex items-center gap-sm text-positive">
            <TrendingUp size={14} />
            <span>+{engagementChange}%</span>
          </div>
          <div className="metric-icon">
            <MessageSquare size={20} />
          </div>
        </div>

        {/* Posts This Week Card */}
        <div className="card metric-card">
          <div className="metric-label">Posts This Week</div>
          <div className="num-lg">{postsThisWeek}/{postsTarget}</div>
          <div className="flex items-center gap-sm" style={{ color: 'var(--status-warning)' }}>
            <Image size={14} />
            <span>{postsTarget - postsThisWeek} to goal</span>
          </div>
          <div className="metric-icon">
            <Image size={20} />
          </div>
        </div>

        {/* Growth Velocity Card */}
        <div className="card metric-card">
          <div className="metric-label">Growth Velocity</div>
          <div className="num-lg">+{growthVelocity}</div>
          <div className="flex items-center gap-sm text-positive">
            <TrendingUp size={14} />
            <span>/day avg</span>
          </div>
          <div className="metric-icon">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Growth Chart Section */}
      <div className="card">
        <div className="card-header">
          <h3>Growth Chart</h3>
          <div className="tab-group">
            {[30, 60, 90].map((days) => (
              <button
                key={days}
                className={`tab-btn ${chartDays === days ? 'tab-active' : ''}`}
                onClick={() => setChartDays(days)}
              >
                {days} Days
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
                  <stop offset="95%" stopColor="rgba(225, 48, 108, 0)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="date" stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--text-tertiary)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--text-primary)',
                }}
                cursor={{ stroke: 'var(--color-primary)', strokeWidth: 1 }}
                formatter={(value) => value.toLocaleString()}
              />
              <Area
                type="monotone"
                dataKey="followers"
                stroke="var(--color-primary)"
                fillOpacity={1}
                fill="url(#colorFollowers)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid-2">
        {/* Today's Tasks */}
        <div className="card">
          <div className="card-header">
            <h3>Today's Tasks</h3>
            <span className="badge">{completedCount}/{mockTasks.length} done</span>
          </div>
          <div className="task-list">
            {mockTasks.map((task) => (
              <label key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={completedTasks[task.id]}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className={completedTasks[task.id] ? 'task-completed' : ''}>
                  {task.title}
                </span>
              </label>
            ))}
          </div>
          <div className="task-progress">
            {completedCount}/{mockTasks.length} completed
          </div>
        </div>

        {/* Upcoming Posts */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Posts</h3>
            <span className="badge">{mockUpcomingPosts.length} scheduled</span>
          </div>
          <div className="post-list">
            {mockUpcomingPosts.map((post) => (
              <div key={post.id} className="post-item">
                <span className="post-type-badge">{post.type}</span>
                <div className="post-details">
                  <p className="post-caption">{post.caption}</p>
                  <div className="flex items-center gap-xs text-tertiary">
                    <Clock size={12} />
                    <span className="text-sm">{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats - 4 Column Grid */}
      <div className="grid-4">
        <div className="card">
          <div className="stat-label">Best Post</div>
          <div className="stat-value">Carousel</div>
          <p className="text-positive text-sm">12.4K impressions</p>
        </div>

        <div className="card">
          <div className="stat-label">Top Hashtag</div>
          <div className="stat-value">#growth</div>
          <p className="text-positive text-sm">847K reach</p>
        </div>

        <div className="card">
          <div className="stat-label">Engagement Streak</div>
          <div className="stat-value">14</div>
          <p className="text-positive text-sm">days 🔥</p>
        </div>

        <div className="card">
          <div className="stat-label">To Next Milestone</div>
          <div className="stat-value">{(1000 - currentFollowers).toLocaleString()}</div>
          <p className="text-muted text-sm">followers to 1K</p>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="card insight-card">
        <div className="insight-header">
          <Lightbulb size={20} />
          <span>Daily AI Insight</span>
          <button className="btn btn-ghost btn-sm" onClick={handleNextInsight}>
            Next →
          </button>
        </div>
        <p className="insight-text">{mockInsights[insightIndex]}</p>
        <div className="insight-dots">
          {mockInsights.map((_, idx) => (
            <div
              key={idx}
              className={`dot ${idx === insightIndex ? 'dot-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
