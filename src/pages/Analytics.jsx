import { useState } from 'react';
import {
  TrendingUp,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Activity,
  Zap,
  Target,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDocument } from '../firebase/useFirestore';
import '../styles/Analytics.css';

const Analytics = () => {
  const [sortBy, setSortBy] = useState('reach');
  const [sortOrder, setSortOrder] = useState('desc');
  const { data: profileData } = useDocument('appData', 'settings');

  // Overview metrics - Use Firestore data if available
  const getMetrics = () => {
    if (profileData?.profile) {
      return [
        {
          label: 'Total Followers',
          value: profileData.profile.followers || 0,
          trend: 12.5,
          icon: Eye,
          color: 'var(--color-primary)',
        },
        {
          label: 'Engagement Rate',
          value: profileData.profile.engagementRate || 0,
          trend: 8.3,
          icon: Activity,
          color: 'var(--color-secondary)',
          isSuffix: '%',
        },
        {
          label: 'Posts Count',
          value: profileData.profile.postsCount || 0,
          trend: -2.1,
          icon: Target,
          color: 'var(--color-primary-start)',
        },
        {
          label: 'Following',
          value: profileData.profile.following || 0,
          trend: 18.7,
          icon: Share2,
          color: 'var(--status-warning)',
        },
      ];
    }
    // Fallback to mock data
    return [
      {
        label: 'Total Reach',
        value: 125400,
        trend: 12.5,
        icon: Eye,
        color: 'var(--color-primary)',
      },
      {
        label: 'Impressions',
        value: 342800,
        trend: 8.3,
        icon: Activity,
        color: 'var(--color-secondary)',
      },
      {
        label: 'Profile Visits',
        value: 8942,
        trend: -2.1,
        icon: Target,
        color: 'var(--color-primary-start)',
      },
      {
        label: 'Website Clicks',
        value: 412,
        trend: 18.7,
        icon: Share2,
        color: 'var(--status-warning)',
      },
    ];
  };

  const metrics = getMetrics();

  // Post performance data
  const posts = [
    {
      id: 1,
      type: 'Reel',
      caption: 'Golden hour photography tips and tricks',
      date: '2024-03-15',
      likes: 2451,
      comments: 328,
      saves: 892,
      reach: 45200,
    },
    {
      id: 2,
      type: 'Carousel',
      caption: 'Top 10 camera settings for beginners',
      date: '2024-03-12',
      likes: 1823,
      comments: 267,
      saves: 621,
      reach: 38500,
    },
    {
      id: 3,
      type: 'Single',
      caption: 'Sunset over the mountains - 📸',
      date: '2024-03-10',
      likes: 1456,
      comments: 189,
      saves: 445,
      reach: 32100,
    },
    {
      id: 4,
      type: 'Reel',
      caption: 'Edit video like a pro in 60 seconds',
      date: '2024-03-08',
      likes: 3124,
      comments: 421,
      saves: 1023,
      reach: 62300,
    },
    {
      id: 5,
      type: 'Single',
      caption: 'Behind the scenes of a photo shoot',
      date: '2024-03-05',
      likes: 892,
      comments: 156,
      saves: 234,
      reach: 18900,
    },
    {
      id: 6,
      type: 'Carousel',
      caption: 'Complete guide to composition',
      date: '2024-03-02',
      likes: 2145,
      comments: 312,
      saves: 789,
      reach: 41200,
    },
    {
      id: 7,
      type: 'Story',
      caption: 'Live Q&A session recap',
      date: '2024-02-28',
      likes: 567,
      comments: 89,
      saves: 0,
      reach: 12400,
    },
    {
      id: 8,
      type: 'Reel',
      caption: 'Trending audio + photography',
      date: '2024-02-25',
      likes: 3456,
      comments: 534,
      saves: 1267,
      reach: 71800,
    },
  ];

  // Content type comparison data
  const contentComparison = [
    { type: 'Reels', avgReach: 53750, avgLikes: 2787.5, avgComments: 374.5 },
    { type: 'Carousels', avgReach: 38500, avgLikes: 1823, avgComments: 267 },
    { type: 'Singles', avgReach: 25500, avgLikes: 1174, avgComments: 172.5 },
    { type: 'Stories', avgReach: 8900, avgLikes: 345, avgComments: 45 },
  ];

  // Engagement trend data (12 weeks)
  const engagementTrend = [
    { week: 'W1', engagement: 3.2 },
    { week: 'W2', engagement: 3.8 },
    { week: 'W3', engagement: 4.5 },
    { week: 'W4', engagement: 4.1 },
    { week: 'W5', engagement: 5.2 },
    { week: 'W6', engagement: 6.1 },
    { week: 'W7', engagement: 5.7 },
    { week: 'W8', engagement: 6.8 },
    { week: 'W9', engagement: 7.3 },
    { week: 'W10', engagement: 6.9 },
    { week: 'W11', engagement: 7.6 },
    { week: 'W12', engagement: 8.2 },
  ];

  // Best time to post (7 days x 4 time slots)
  const timeSlots = ['6-9 AM', '10 AM-1 PM', '2-6 PM', '7-11 PM'];
  const bestTimeData = [
    { day: 'Monday', '6-9 AM': 35, '10 AM-1 PM': 42, '2-6 PM': 68, '7-11 PM': 75 },
    { day: 'Tuesday', '6-9 AM': 38, '10 AM-1 PM': 45, '2-6 PM': 70, '7-11 PM': 78 },
    { day: 'Wednesday', '6-9 AM': 32, '10 AM-1 PM': 48, '2-6 PM': 72, '7-11 PM': 82 },
    { day: 'Thursday', '6-9 AM': 40, '10 AM-1 PM': 50, '2-6 PM': 75, '7-11 PM': 85 },
    { day: 'Friday', '6-9 AM': 45, '10 AM-1 PM': 58, '2-6 PM': 80, '7-11 PM': 92 },
    { day: 'Saturday', '6-9 AM': 55, '10 AM-1 PM': 62, '2-6 PM': 78, '7-11 PM': 88 },
    { day: 'Sunday', '6-9 AM': 48, '10 AM-1 PM': 55, '2-6 PM': 70, '7-11 PM': 80 },
  ];

  // Sort posts
  const sortedPosts = [...posts].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortOrder === 'asc') {
      return aVal - bVal;
    }
    return bVal - aVal;
  });

  const getTypeBadgeClass = (type) => {
    const classes = {
      Reel: 'badge-reel',
      Carousel: 'badge-carousel',
      Single: 'badge-single',
      Story: 'badge-story',
    };
    return classes[type] || 'badge-reel';
  };

  const getTrendClass = (trend) => {
    return trend > 0 ? 'text-positive' : 'text-negative';
  };

  return (
    <div className="page">
      {/* Page Header */}
      <div className="page-header">
        <h1>Analytics & Insights</h1>
        <p>Track performance, identify trends, and optimize</p>
      </div>

      {/* Overview Metrics */}
      <div className="grid-4 analytics-metrics">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isTrendingUp = metric.trend > 0;

          return (
            <div key={idx} className="metric-card">
              <div className="metric-header">
                <Icon size={24} className="metric-icon" style={{ color: metric.color }} />
                <div className={`metric-trend ${getTrendClass(metric.trend)}`}>
                  {isTrendingUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(metric.trend).toFixed(1)}%
                </div>
              </div>
              <div className="num-lg">
                {metric.value.toLocaleString()}
                {metric.isSuffix && metric.isSuffix}
              </div>
              <div className="text-muted">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Engagement Trend Chart */}
      <div className="card analytics-chart">
        <div className="card-header">
          <h2>Engagement Trend</h2>
          <p className="text-muted">Last 12 weeks</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis dataKey="week" stroke="var(--text-tertiary)" />
            <YAxis stroke="var(--text-tertiary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
              name="Engagement Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Post Performance Table */}
      <div className="card analytics-table">
        <div className="card-header">
          <h2>Post Performance</h2>
          <div className="table-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="reach">Sort by Reach</option>
              <option value="likes">Sort by Likes</option>
              <option value="comments">Sort by Comments</option>
              <option value="saves">Sort by Saves</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="sort-button"
              title={`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Caption</th>
              <th>Date</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Saves</th>
              <th>Reach</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <span className={`badge ${getTypeBadgeClass(post.type)}`}>
                    {post.type}
                  </span>
                </td>
                <td className="caption-cell">{post.caption}</td>
                <td className="date-cell">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="num">{post.likes.toLocaleString()}</td>
                <td className="num">{post.comments.toLocaleString()}</td>
                <td className="num">{post.saves.toLocaleString()}</td>
                <td className="num text-positive">{post.reach.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Content Type Breakdown */}
      <div className="grid-2 analytics-breakdown">
        {/* Bar Chart */}
        <div className="card">
          <div className="card-header">
            <h2>Content Type Performance</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={contentComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="type" stroke="var(--text-tertiary)" />
              <YAxis stroke="var(--text-tertiary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                }}
              />
              <Legend />
              <Bar dataKey="avgReach" fill="var(--color-primary)" name="Avg Reach" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Best Time to Post Grid */}
        <div className="card">
          <div className="card-header">
            <h2>Best Time to Post</h2>
          </div>
          <div className="time-grid">
            <div className="time-header">
              <div className="time-label"></div>
              {timeSlots.map((slot) => (
                <div key={slot} className="time-slot-header">
                  {slot}
                </div>
              ))}
            </div>
            {bestTimeData.map((row) => (
              <div key={row.day} className="time-row">
                <div className="day-label">{row.day}</div>
                {timeSlots.map((slot) => {
                  const intensity = row[slot];
                  const opacity = intensity / 100;
                  return (
                    <div
                      key={`${row.day}-${slot}`}
                      className="time-cell"
                      style={{
                        backgroundColor: `rgba(225, 48, 108, ${opacity})`,
                        color: intensity > 50 ? 'white' : 'var(--text-muted)',
                      }}
                    >
                      {intensity}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly AI Report */}
      <div className="card analytics-report">
        <div className="card-header">
          <h2>Weekly AI Report</h2>
        </div>

        <div className="report-sections">
          <div className="report-section report-success">
            <h3>What Worked</h3>
            <ul>
              <li>Reels with editing tutorials averaged 53.7K reach</li>
              <li>Posts at 6 PM got 2.3x more engagement</li>
              <li>#photography hashtags drove 34% of new followers</li>
            </ul>
          </div>

          <div className="report-section report-warning">
            <h3>What Didn't Work</h3>
            <ul>
              <li>Single posts underperformed (avg 25.5K reach)</li>
              <li>Morning posts (8-10 AM) got 60% less engagement</li>
              <li>Captions over 150 words had lower comment rates</li>
            </ul>
          </div>

          <div className="report-section report-info">
            <h3>Top Recommendation</h3>
            <p>
              Post Reels at 6-9 PM on Fridays. Your audience is most active then, and
              Reels are your strongest content type. Add trending audio to boost reach further.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
