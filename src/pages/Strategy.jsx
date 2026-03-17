import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  Users,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Lightbulb,
  Award,
  Search,
  Edit2,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Strategy() {
  const [auditInputs, setAuditInputs] = useState({
    username: '@fashionista_sarah',
    bio: 'Fashion, Travel & Lifestyle | DM for collabs',
    followers: 152000,
    posts: 287,
    avgEngagement: 4.2,
  });

  const [competitors, setCompetitors] = useState([
    { name: 'competitor1', followers: 180000, engagementRate: 3.8, postingFreq: 5, contentMix: 'Mixed', growthRate: 2.1 },
    { name: 'competitor2', followers: 165000, engagementRate: 5.2, postingFreq: 6, contentMix: 'Reels Heavy', growthRate: 3.2 },
    { name: 'competitor3', followers: 142000, engagementRate: 4.5, postingFreq: 4, contentMix: 'Balanced', growthRate: 1.8 },
  ]);

  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [newCompetitor, setNewCompetitor] = useState('');

  const [weeklyTasks, setWeeklyTasks] = useState([
    { day: 'Monday', task: 'Analyze top-performing posts from past week', category: 'Analytics', completed: false },
    { day: 'Tuesday', task: 'Plan and create 4 content pieces for the week', category: 'Content', completed: false },
    { day: 'Wednesday', task: 'Engage with 50+ accounts in your niche', category: 'Community', completed: true },
    { day: 'Thursday', task: 'Review and optimize hashtag strategy', category: 'Strategy', completed: false },
    { day: 'Friday', task: 'Post main content & engage with comments', category: 'Publishing', completed: false },
    { day: 'Saturday', task: 'Create Reels or Stories for weekend reach', category: 'Content', completed: false },
    { day: 'Sunday', task: 'Plan next week campaigns & review analytics', category: 'Planning', completed: false },
  ]);

  const [experiments, setExperiments] = useState([
    { id: 1, name: 'Posting at 8 PM vs 6 PM', hypothesis: 'Posts at 8 PM get 25% more engagement', result: true, conclusion: 'Confirmed: 8 PM has higher engagement' },
    { id: 2, name: 'Hashtag Strategy: Niche vs Broad', hypothesis: 'Niche hashtags reduce reach but improve quality', result: true, conclusion: 'Mix of both works best' },
    { id: 3, name: 'Reel lengths: 15s vs 45s', hypothesis: '45s Reels perform better than 15s', result: false, conclusion: '30s Reels actually perform best' },
    { id: 4, name: 'Caption length: Short vs Long', hypothesis: 'Long captions (200+ words) reduce engagement', result: true, conclusion: 'Keep captions under 150 words' },
  ]);

  const [trendData, setTrendData] = useState([
    { topic: 'Sustainable Fashion', trend: 'Rising', posts: 2400, engagement: 8.5 },
    { topic: 'Vintage Clothing', trend: 'Stable', posts: 1800, engagement: 7.2 },
    { topic: 'Minimalist Style', trend: 'Rising', posts: 1200, engagement: 9.1 },
    { topic: 'Y2K Fashion', trend: 'Declining', posts: 3200, engagement: 6.8 },
    { topic: 'Thrift Hauls', trend: 'Rising', posts: 950, engagement: 8.9 },
  ]);

  const [showAudit, setShowAudit] = useState(false);
  const [auditReport, setAuditReport] = useState(null);

  const auditMetrics = {
    bio: {
      score: 8.5,
      issues: ['Could add more CTAs', 'Emoji use could be optimized'],
      recommendations: ['Add link in bio to latest content', 'Include a clear call-to-action'],
    },
    contentMix: {
      score: 7.2,
      issues: ['Reels are 30% of content', 'Could increase video content'],
      recommendations: ['Aim for 40-50% Reels', 'Test carousel posts more'],
    },
    postingFrequency: {
      score: 6.8,
      issues: ['Inconsistent posting schedule'],
      recommendations: ['Post 5-6 times per week for optimal reach'],
    },
    engagementQuality: {
      score: 8.8,
      issues: [],
      recommendations: ['Keep engagement rate above 4%', 'Focus on meaningful comments'],
    },
    hashtags: {
      score: 7.5,
      issues: ['Using some oversaturated hashtags', 'Missing niche hashtags'],
      recommendations: ['Use mix of 10 niche + 10 broad hashtags', 'Research trending hashtags weekly'],
    },
    aesthetics: {
      score: 8.2,
      issues: ['Feed color palette could be more cohesive'],
      recommendations: ['Consider theme-based editing', 'Maintain consistent filter style'],
    },
  };

  const swotData = [
    { category: 'Strengths', items: ['High engagement rate (4.2%)', 'Consistent posting', 'Strong brand voice', 'Loyal community'] },
    { category: 'Weaknesses', items: ['Low Reel percentage', 'Inconsistent posting times', 'Limited product diversity'] },
    { category: 'Opportunities', items: ['Growing trend: Sustainable Fashion', 'Affiliate partnerships available', 'YouTube Shorts potential'] },
    { category: 'Threats', items: ['Algorithm changes', 'Increased competition', 'Audience saturation in niche'] },
  ];

  const toggleTaskCompletion = (index) => {
    const updated = [...weeklyTasks];
    updated[index].completed = !updated[index].completed;
    setWeeklyTasks(updated);
  };

  const deleteExperiment = (id) => {
    setExperiments(experiments.filter((e) => e.id !== id));
  };

  const generateAudit = () => {
    setAuditReport(auditMetrics);
    setShowAudit(true);
  };

  const addCompetitor = () => {
    if (newCompetitor.trim()) {
      setCompetitors([
        ...competitors,
        {
          name: newCompetitor,
          followers: 120000,
          engagementRate: 3.9,
          postingFreq: 5,
          contentMix: 'Mixed',
          growthRate: 1.5,
        },
      ]);
      setNewCompetitor('');
    }
  };

  const deleteCompetitor = (name) => {
    setCompetitors(competitors.filter((c) => c.name !== name));
  };

  const getScoreColor = (score) => {
    if (score >= 8.5) return '#20c997';
    if (score >= 7) return '#ffc107';
    return '#ff6b6b';
  };

  const getTrendColor = (trend) => {
    const colors = { Rising: '#20c997', Stable: '#ffc107', Declining: '#ff6b6b' };
    return colors[trend] || '#666';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Growth Strategy Engine</h1>
          <p className="text-gray-400">Analyze, plan, and optimize your Instagram growth</p>
        </div>

        {/* Account Audit */}
        <h2 className="text-2xl font-bold text-white mb-4">Account Audit Tool</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <h3 className="text-lg font-bold text-white mb-4">Account Information</h3>
            <div className="space-y-4">
              {[
                { key: 'username', label: 'Username', icon: Target },
                { key: 'bio', label: 'Bio', icon: Edit2 },
                { key: 'followers', label: 'Followers', icon: Users },
                { key: 'posts', label: 'Total Posts', icon: BarChart3 },
                { key: 'avgEngagement', label: 'Avg Engagement Rate (%)', icon: TrendingUp },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                  <input
                    type={field.key === 'bio' ? 'text' : 'number'}
                    value={auditInputs[field.key]}
                    onChange={(e) =>
                      setAuditInputs({ ...auditInputs, [field.key]: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-[#E1306C]"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={generateAudit}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow"
            >
              Generate Audit Report
            </button>
          </div>

          {/* Audit Report */}
          {showAudit && auditReport && (
            <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
              <h3 className="text-lg font-bold text-white mb-4">Audit Report</h3>
              <div className="space-y-3">
                {Object.entries(auditReport).map(([metric, data]) => (
                  <div key={metric} className="p-3 rounded-lg bg-gray-900">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white font-semibold capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-lg font-bold" style={{ color: getScoreColor(data.score) }}>
                        {data.score}/10
                      </p>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${(data.score / 10) * 100}%`,
                          backgroundColor: getScoreColor(data.score),
                        }}
                      />
                    </div>
                    {data.issues.length > 0 && (
                      <ul className="mt-2 text-xs text-red-300 space-y-1">
                        {data.issues.map((issue, idx) => (
                          <li key={idx}>• {issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Competitor Analysis */}
        <h2 className="text-2xl font-bold text-white mb-4">Competitor Analysis</h2>
        <div className="p-6 rounded-xl border border-gray-800 mb-8" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              placeholder="Add competitor handle"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#E1306C]"
            />
            <button
              onClick={addCompetitor}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Account</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Followers</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Engagement</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Posts/Week</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Content Mix</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Growth Rate</th>
                  <th className="px-4 py-3 text-left text-gray-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {[{ name: 'Your Account', followers: auditInputs.followers, engagementRate: auditInputs.avgEngagement, postingFreq: 5, contentMix: 'Mixed', growthRate: 2.2 }, ...competitors].map((competitor, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-800 hover:bg-gray-900/20 transition-colors"
                    style={{ backgroundColor: idx === 0 ? '#0a0a0a' : '#1a1a2e' }}
                  >
                    <td className="px-4 py-4">
                      <p className="font-semibold text-white">{competitor.name}</p>
                    </td>
                    <td className="px-4 py-4 text-white">{competitor.followers.toLocaleString()}</td>
                    <td className="px-4 py-4 text-white">{competitor.engagementRate}%</td>
                    <td className="px-4 py-4 text-white">{competitor.postingFreq}</td>
                    <td className="px-4 py-4 text-white text-sm">{competitor.contentMix}</td>
                    <td className="px-4 py-4">
                      <span style={{ color: competitor.growthRate > 2 ? '#20c997' : '#ffc107' }} className="font-semibold">
                        +{competitor.growthRate}%
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {idx > 0 && (
                        <button
                          onClick={() => deleteCompetitor(competitor.name)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Playbook */}
        <h2 className="text-2xl font-bold text-white mb-4">Weekly Playbook</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3 mb-8">
          {weeklyTasks.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-gray-800 cursor-pointer hover:border-gray-700 transition-colors"
              style={{ backgroundColor: '#1a1a2e' }}
              onClick={() => toggleTaskCompletion(idx)}
            >
              <div className="flex items-start gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(idx);
                  }}
                  className="mt-1 w-4 h-4 accent-[#E1306C] cursor-pointer"
                />
                <p className="text-sm font-bold text-white">{item.day}</p>
              </div>
              <p className={`text-sm mb-2 ${item.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                {item.task}
              </p>
              <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded inline-block">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Growth Experiments */}
        <h2 className="text-2xl font-bold text-white mb-4">Growth Experiments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white flex-1">{exp.name}</h3>
                <button
                  onClick={() => deleteExperiment(exp.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Hypothesis</p>
                  <p className="text-white">{exp.hypothesis}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 text-sm font-medium">Result:</p>
                  <div className="flex items-center gap-2">
                    {exp.result ? (
                      <CheckCircle size={20} style={{ color: '#20c997' }} />
                    ) : (
                      <XCircle size={20} style={{ color: '#ff6b6b' }} />
                    )}
                    <span className="text-white font-semibold">{exp.result ? 'Confirmed' : 'Rejected'}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900">
                  <p className="text-gray-400 text-sm font-medium mb-1">Conclusion</p>
                  <p className="text-white text-sm">{exp.conclusion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Niche Research & Trends */}
        <h2 className="text-2xl font-bold text-white mb-4">Niche Research & Trends</h2>
        <div className="p-6 rounded-xl border border-gray-800 mb-8" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="space-y-3">
            {trendData.map((trend, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-gray-900 flex items-center justify-between hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white font-semibold">{trend.topic}</p>
                  <p className="text-sm text-gray-400">Posts: {trend.posts.toLocaleString()} | Avg Engagement: {trend.engagement}%</p>
                </div>
                <div className="flex items-center gap-3">
                  <Lightbulb size={20} style={{ color: getTrendColor(trend.trend) }} />
                  <span
                    style={{ color: getTrendColor(trend.trend) }}
                    className="font-semibold text-sm"
                  >
                    {trend.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SWOT Analysis */}
        <h2 className="text-2xl font-bold text-white mb-4">SWOT Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Strengths', color: '#20c997', icon: '💪' },
            { title: 'Weaknesses', color: '#ff6b6b', icon: '⚠️' },
            { title: 'Opportunities', color: '#ffc107', icon: '🚀' },
            { title: 'Threats', color: '#ff922b', icon: '⛔' },
          ].map((swot, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border-2 overflow-hidden"
              style={{ backgroundColor: '#1a1a2e', borderColor: swot.color }}
            >
              <h3 className="text-lg font-bold text-white mb-4">
                <span className="mr-2">{swot.icon}</span>
                {swot.title}
              </h3>
              <ul className="space-y-2">
                {swotData[idx].items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-300 text-sm flex items-start gap-2">
                    <span style={{ color: swot.color }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
