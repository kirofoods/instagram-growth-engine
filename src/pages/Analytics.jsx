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
  Cell,
} from 'recharts';

const Analytics = () => {
  const [sortBy, setSortBy] = useState('reach');
  const [sortOrder, setSortOrder] = useState('desc');

  // Overview metrics
  const metrics = [
    {
      label: 'Total Reach',
      value: 125400,
      trend: 12.5,
      icon: Eye,
      color: '#E1306C',
    },
    {
      label: 'Impressions',
      value: 342800,
      trend: 8.3,
      icon: Activity,
      color: '#833AB4',
    },
    {
      label: 'Profile Visits',
      value: 8942,
      trend: -2.1,
      icon: Target,
      color: '#F77737',
    },
    {
      label: 'Website Clicks',
      value: 412,
      trend: 18.7,
      icon: Share2,
      color: '#FCAF45',
    },
  ];

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
      shares: 145,
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
      shares: 98,
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
      shares: 67,
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
      shares: 201,
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
      shares: 42,
      reach: 18900,
    },
  ];

  // Content type comparison
  const contentComparison = [
    { type: 'Reels', avgLikes: 2787.5, avgComments: 374.5, avgSaves: 957.5, avgReach: 53750 },
    { type: 'Carousels', avgLikes: 1823, avgComments: 267, avgSaves: 621, avgReach: 38500 },
    { type: 'Singles', avgLikes: 1174, avgComments: 172.5, avgSaves: 339.5, avgReach: 25500 },
    { type: 'Stories', avgLikes: 345, avgComments: 45, avgSaves: 0, avgReach: 8900 },
  ];

  // Engagement heatmap data (simplified)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Best time data
  const bestTimeData = days.map((day, dayIdx) => {
    const obj = { day };
    hours.forEach(hour => {
      const intensity = Math.sin(hour / 24 * Math.PI) * Math.sin(dayIdx / 7 * Math.PI);
      obj[`h${hour}`] = Math.max(10, Math.round(intensity * 50 + 50));
    });
    return obj;
  });

  // Follower growth predictor
  const followerData = [
    { date: 'Week 1', actual: 2400, predicted: 2400 },
    { date: 'Week 2', actual: 2810, predicted: 2810 },
    { date: 'Week 3', actual: 3200, predicted: 3200 },
    { date: 'Week 4', actual: 3800, predicted: 3800 },
    { date: 'Week 5', actual: 4200, predicted: 4200 },
    { date: 'Week 6', actual: 4890, predicted: 4890 },
    { date: 'Week 7', actual: 5420, predicted: 5850 },
    { date: 'Week 8', actual: null, predicted: 6400 },
    { date: 'Week 9', actual: null, predicted: 7100 },
    { date: 'Week 10', actual: null, predicted: 7850 },
  ];

  // Engagement trend
  const engagementTrend = [
    { week: 'Week 1', engagement: 4.2, benchmark: 3.8 },
    { week: 'Week 2', engagement: 5.1, benchmark: 3.8 },
    { week: 'Week 3', engagement: 6.3, benchmark: 3.8 },
    { week: 'Week 4', engagement: 5.8, benchmark: 3.8 },
    { week: 'Week 5', engagement: 7.2, benchmark: 3.8 },
    { week: 'Week 6', engagement: 8.1, benchmark: 3.8 },
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

  const getContentTypeColor = (type) => {
    const colors = {
      Reel: '#E1306C',
      Carousel: '#833AB4',
      Single: '#F77737',
      Stories: '#FCAF45',
    };
    return colors[type] || '#E1306C';
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics & Insights</h1>
        <p className="text-gray-400">Track performance, identify trends, and optimize</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const isTrendingUp = metric.trend > 0;

          return (
            <div
              key={idx}
              className="rounded-lg p-6 border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon size={24} style={{ color: metric.color }} />
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    isTrendingUp ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {isTrendingUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(metric.trend)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Post Performance Table */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Heart size={24} className="text-pink-500" />
            Post Performance
          </h2>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white text-sm focus:outline-none"
            >
              <option value="reach">Sort by Reach</option>
              <option value="likes">Sort by Likes</option>
              <option value="comments">Sort by Comments</option>
              <option value="saves">Sort by Saves</option>
            </select>
            <button
              onClick={() =>
                setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
              }
              className="bg-gray-900 border border-gray-700 rounded px-3 py-1 text-gray-300 text-sm hover:bg-gray-800 transition"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-gray-400">Caption</th>
                <th className="text-center py-3 px-4 text-gray-400">Date</th>
                <th className="text-center py-3 px-4 text-gray-400">
                  <Heart size={16} className="inline" />
                </th>
                <th className="text-center py-3 px-4 text-gray-400">
                  <MessageCircle size={16} className="inline" />
                </th>
                <th className="text-center py-3 px-4 text-gray-400">Saves</th>
                <th className="text-center py-3 px-4 text-gray-400">Reach</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((post, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition"
                >
                  <td className="py-3 px-4">
                    <span
                      className="px-3 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: getContentTypeColor(post.type) + '40' }}
                    >
                      {post.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300 max-w-md truncate">
                    {post.caption}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400 text-xs">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-center text-white font-semibold">
                    {post.likes.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center text-white font-semibold">
                    {post.comments}
                  </td>
                  <td className="py-3 px-4 text-center text-white font-semibold">
                    {post.saves.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center text-pink-400 font-semibold">
                    {post.reach.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Type Comparison */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingUp size={24} className="text-blue-400" />
          Content Type Performance
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={contentComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="type" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #444',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
            <Bar dataKey="avgReach" fill="#E1306C" name="Avg Reach" />
            <Bar dataKey="avgLikes" fill="#833AB4" name="Avg Likes" />
            <Bar dataKey="avgComments" fill="#F77737" name="Avg Comments" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best Time to Post Heatmap */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Activity size={24} className="text-green-400" />
          Best Time to Post
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="py-2 px-2 text-gray-400">Day</th>
                {hours.map(hour => (
                  <th
                    key={hour}
                    className="py-2 px-1 text-gray-500 text-center"
                  >
                    {hour}h
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bestTimeData.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-2 font-medium text-gray-300">
                    {row.day}
                  </td>
                  {hours.map(hour => {
                    const intensity = row[`h${hour}`];
                    const color = `rgba(225, 48, 108, ${intensity / 100})`;
                    return (
                      <td
                        key={`${idx}-${hour}`}
                        className="py-1 px-1 text-center"
                        style={{
                          backgroundColor: color,
                          borderRadius: '4px',
                          fontSize: '10px',
                          color: intensity > 50 ? '#fff' : '#666',
                        }}
                      >
                        {intensity}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Follower Growth Predictor */}
        <div
          className="rounded-lg p-6 border border-gray-800"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-purple-400" />
            Follower Growth Predictor
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={followerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                stroke="#666"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#833AB4"
                strokeWidth={2}
                name="Actual"
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#F77737"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-4 text-center">
            📊 On track to reach 7,850 followers in 10 weeks
          </p>
        </div>

        {/* Engagement Rate Trend */}
        <div
          className="rounded-lg p-6 border border-gray-800"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Zap size={24} className="text-yellow-400" />
            Engagement Rate Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="week" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a2e',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#E1306C"
                strokeWidth={3}
                name="Your Engagement"
                dot={{ fill: '#E1306C' }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#666"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Niche Benchmark"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-green-400 mt-4 text-center">
            ✓ 113% above niche benchmark
          </p>
        </div>
      </div>

      {/* Weekly AI Report */}
      <div
        className="rounded-lg p-6 border border-gray-800"
        style={{ backgroundColor: 'linear-gradient(135deg, rgba(225, 48, 108, 0.1), rgba(131, 58, 180, 0.1))' }}
      >
        <div className="border border-gray-800 rounded-lg p-6" style={{ backgroundColor: '#1a1a2e' }}>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap size={24} className="text-yellow-400" />
            Weekly AI Report
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <h3 className="font-semibold text-green-400 mb-2">What Worked ✓</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Reels with editing tutorials averaged 53.7K reach</li>
                <li>• Posts at 6 PM got 2.3x more engagement</li>
                <li>• #photography hashtags drove 34% of new followers</li>
              </ul>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h3 className="font-semibold text-red-400 mb-2">What Didn't Work ✗</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Single posts underperformed (avg 25.5K reach)</li>
                <li>• Morning posts (8-10 AM) got 60% less engagement</li>
                <li>• Captions over 150 words had lower comment rates</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h3 className="font-semibold text-blue-400 mb-2">Top Recommendation 🎯</h3>
              <p className="text-sm text-gray-300">
                Post Reels at 6-9 PM on Fridays. Your audience is most active then,
                and Reels are your strongest content type. Add trending audio to boost reach further.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
