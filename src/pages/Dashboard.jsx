import { useState, useMemo } from 'react';
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
  Circle,
  Clock,
  MessageSquare,
  Target,
  Flame,
  Trophy,
  Lightbulb,
  Calendar,
  Image,
} from 'lucide-react';

// Mock data for follower growth
const generateGrowthData = (days) => {
  const data = [];
  let followers = 450;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    followers += Math.floor(Math.random() * 15) + 3;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      followers: followers,
      day: i,
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
    caption: 'New product launch event happening this Saturday! Stay tuned...',
    scheduledTime: '3:00 PM',
    scheduledDate: 'Today',
    image: '📸',
  },
  {
    id: 2,
    caption: 'Behind the scenes: Our creative process for next month campaigns',
    scheduledTime: '7:30 PM',
    scheduledDate: 'Tomorrow',
    image: '🎬',
  },
  {
    id: 3,
    caption: 'Throwback to our favorite moments from last quarter',
    scheduledTime: '6:00 PM',
    scheduledDate: 'Mar 19',
    image: '📷',
  },
];

// Mock AI insights
const mockInsights = [
  'Your audience is most active between 6-8 PM on weekdays. Consider scheduling posts at 5:30 PM for maximum reach!',
  'Carousel posts got 34% more engagement than static posts this month. Keep it up!',
  'Your #photography hashtag has the highest reach rate at 12.3%. Use it more often!',
  'Followers from US increased by 45% this week. Target more US-based content creators for collaborations.',
];

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  maxWidth: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #fa7e1e 0%, #d92e7f 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subheading: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '32px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  metricCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #2a2a4e',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      borderColor: '#fa7e1e',
      transform: 'translateY(-2px)',
    },
  },
  metricCardInner: {
    position: 'relative',
    zIndex: 2,
  },
  metricGradientBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #fa7e1e 0%, #d92e7f 100%)',
  },
  metricLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  metricChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
  },
  positiveChange: {
    color: '#10b981',
  },
  negativeChange: {
    color: '#ef4444',
  },
  iconContainer: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '40px',
    height: '40px',
    backgroundColor: '#2a2a4e',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '0.6',
  },
  chartContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #2a2a4e',
  },
  toggleGroup: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '6px 12px',
    backgroundColor: '#2a2a4e',
    border: 'none',
    borderRadius: '6px',
    color: '#888',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  toggleButtonActive: {
    backgroundColor: '#fa7e1e',
    color: '#fff',
  },
  taskList: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #2a2a4e',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #2a2a4e',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  taskItemLast: {
    borderBottom: 'none',
  },
  taskCheckbox: {
    width: '20px',
    height: '20px',
    minWidth: '20px',
    cursor: 'pointer',
  },
  taskText: {
    flex: 1,
  },
  taskCompleted: {
    color: '#666',
    textDecoration: 'line-through',
  },
  progressRing: {
    width: '32px',
    height: '32px',
    minWidth: '32px',
    borderRadius: '50%',
    background: 'conic-gradient(#fa7e1e 0deg 216deg, #2a2a4e 216deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '600',
  },
  contentCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #2a2a4e',
    marginBottom: '12px',
    transition: 'all 0.2s',
  },
  contentCardThumb: {
    width: '60px',
    height: '60px',
    backgroundColor: '#2a2a4e',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginRight: '12px',
    flexShrink: 0,
  },
  contentCardInfo: {
    flex: 1,
  },
  contentCaption: {
    fontSize: '13px',
    color: '#ccc',
    lineHeight: '1.4',
    marginBottom: '8px',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  contentTime: {
    fontSize: '12px',
    color: '#666',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  statBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #2a2a4e',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#fa7e1e',
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  insightCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #2a2a4e',
    borderLeft: '4px solid #d92e7f',
  },
  insightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  },
  insightText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#ccc',
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  contentPipeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contentRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
};

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

  // Calculate metrics from mock data
  const currentFollowers = growthData[growthData.length - 1]?.followers || 1254;
  const previousFollowers = growthData[0]?.followers || 450;
  const followerChange = currentFollowers - previousFollowers;
  const engagementRate = (8.4).toFixed(1);
  const postsThisWeek = 5;
  const postsTarget = 7;
  const growthVelocity = (followerChange / chartDays).toFixed(1);

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Welcome Section */}
        <div style={styles.section}>
          <h1 style={styles.heading}>Welcome back! 👋</h1>
          <p style={styles.subheading}>Phase 1: 0 → 1K | Growth Velocity: +{growthVelocity} followers/day</p>
        </div>

        {/* Key Metrics Cards - Top Row */}
        <div style={{ ...styles.section, ...styles.gridContainer }}>
          {/* Current Followers Card */}
          <div style={styles.metricCard}>
            <div style={styles.metricGradientBorder}></div>
            <div style={styles.metricCardInner}>
              <div style={styles.metricLabel}>Current Followers</div>
              <div style={styles.metricValue}>{currentFollowers.toLocaleString()}</div>
              <div style={{ ...styles.metricChange, ...styles.positiveChange }}>
                <TrendingUp size={16} />
                <span>+{followerChange} this month</span>
              </div>
              <div style={styles.iconContainer}>
                <Users size={20} />
              </div>
            </div>
          </div>

          {/* Engagement Rate Card */}
          <div style={styles.metricCard}>
            <div style={styles.metricGradientBorder}></div>
            <div style={styles.metricCardInner}>
              <div style={styles.metricLabel}>Engagement Rate</div>
              <div style={styles.metricValue}>{engagementRate}%</div>
              <div style={{ ...styles.metricChange, ...styles.positiveChange }}>
                <TrendingUp size={16} />
                <span>+0.3% vs last week</span>
              </div>
              <div style={styles.iconContainer}>
                <MessageSquare size={20} />
              </div>
            </div>
          </div>

          {/* Posts This Week Card */}
          <div style={styles.metricCard}>
            <div style={styles.metricGradientBorder}></div>
            <div style={styles.metricCardInner}>
              <div style={styles.metricLabel}>Posts This Week</div>
              <div style={styles.metricValue}>
                {postsThisWeek}/{postsTarget}
              </div>
              <div style={{ ...styles.metricChange, color: '#f59e0b' }}>
                <Target size={16} />
                <span>{postsTarget - postsThisWeek} to goal</span>
              </div>
              <div style={styles.iconContainer}>
                <BookOpen size={20} />
              </div>
            </div>
          </div>

          {/* Growth Velocity Card */}
          <div style={styles.metricCard}>
            <div style={styles.metricGradientBorder}></div>
            <div style={styles.metricCardInner}>
              <div style={styles.metricLabel}>Growth Velocity</div>
              <div style={styles.metricValue}>+{growthVelocity}</div>
              <div style={{ ...styles.metricChange, ...styles.positiveChange }}>
                <Zap size={16} />
                <span>followers/day avg</span>
              </div>
              <div style={styles.iconContainer}>
                <Zap size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div style={{ ...styles.section, ...styles.chartContainer }}>
          <div style={styles.toggleGroup}>
            {[30, 60, 90].map((days) => (
              <button
                key={days}
                onClick={() => setChartDays(days)}
                style={{
                  ...styles.toggleButton,
                  ...(chartDays === days && styles.toggleButtonActive),
                }}
              >
                {days} Days
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fa7e1e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d92e7f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4e" />
              <XAxis dataKey="date" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #2a2a4e',
                  borderRadius: '8px',
                  color: '#fff',
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
        </div>

        {/* Two Column Layout */}
        <div style={styles.twoColumnGrid}>
          {/* Today's Action Items */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <CheckCircle2 size={18} />
              Today's Action Items
            </h2>
            <div style={styles.taskList}>
              {mockTasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{
                    ...styles.taskItem,
                    ...(index === mockTasks.length - 1 && styles.taskItemLast),
                  }}
                  onClick={() => toggleTask(task.id)}
                >
                  <input
                    type="checkbox"
                    checked={completedTasks[task.id]}
                    onChange={() => toggleTask(task.id)}
                    style={styles.taskCheckbox}
                  />
                  <span
                    style={{
                      ...styles.taskText,
                      ...(completedTasks[task.id] && styles.taskCompleted),
                    }}
                  >
                    {task.title}
                  </span>
                  <div style={styles.progressRing}>
                    {completedCount}/{mockTasks.length}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#2a2a4e',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#ccc',
                textAlign: 'center',
              }}
            >
              {completedCount}/{mockTasks.length} tasks completed ({Math.round((completedCount / mockTasks.length) * 100)}%)
            </div>
          </div>

          {/* Content Pipeline */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <Calendar size={18} />
              Content Pipeline (Next 3)
            </h2>
            <div style={styles.contentPipeline}>
              {mockUpcomingPosts.map((post) => (
                <div key={post.id} style={styles.contentCard}>
                  <div style={styles.contentRow}>
                    <div style={styles.contentCardThumb}>{post.image}</div>
                    <div style={styles.contentCardInfo}>
                      <div style={styles.contentCaption}>{post.caption}</div>
                      <div style={styles.contentTime}>
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {post.scheduledDate} at {post.scheduledTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Trophy size={18} />
            Quick Stats
          </h2>
          <div style={styles.statGrid}>
            <div style={styles.statBox}>
              <div style={styles.statValue}>📸 Carousel</div>
              <div style={styles.statLabel}>Best Performing Post</div>
              <div style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
                +12.4K impressions
              </div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>#growth</div>
              <div style={styles.statLabel}>Top Hashtag Set</div>
              <div style={{ fontSize: '12px', color: '#10b981', marginTop: '8px' }}>
                847K total reach
              </div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>
                <Flame size={24} style={{ display: 'inline' }} />
              </div>
              <div style={styles.statLabel}>Engagement Streak</div>
              <div style={{ fontSize: '12px', color: '#f59e0b', marginTop: '8px' }}>
                14 days 🔥
              </div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>342</div>
              <div style={styles.statLabel}>To Next Milestone</div>
              <div style={{ fontSize: '12px', color: '#fa7e1e', marginTop: '8px' }}>
                1K followers goal
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Lightbulb size={18} />
            Daily AI Insight
          </h2>
          <div style={styles.insightCard}>
            <div style={styles.insightHeader}>
              <Lightbulb size={20} style={{ color: '#fa7e1e', flexShrink: 0 }} />
              <span style={{ fontWeight: '600', flex: 1 }}>Tip for Today</span>
              <button
                onClick={handleNextInsight}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fa7e1e',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '0',
                }}
              >
                Next →
              </button>
            </div>
            <p style={styles.insightText}>{mockInsights[insightIndex]}</p>
            <div
              style={{
                marginTop: '12px',
                fontSize: '11px',
                color: '#666',
                display: 'flex',
                gap: '4px',
              }}
            >
              {mockInsights.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: idx === insightIndex ? '#fa7e1e' : '#2a2a4e',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Spacing */}
        <div style={{ height: '40px' }} />
      </div>
    </div>
  );
}
