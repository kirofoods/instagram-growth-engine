import React, { useState, useEffect } from 'react';
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
import { useDocument } from '../firebase/useFirestore';
import '../styles/Strategy.css';

export default function Strategy() {
  const { data: profileData } = useDocument('settings', 'profile');

  const [auditInputs, setAuditInputs] = useState({
    username: '',
    bio: '',
    followers: 0,
    posts: 287,
    avgEngagement: 4.2,
  });

  // Update form with Firestore profile data when available
  useEffect(() => {
    if (profileData) {
      setAuditInputs({
        username: '@' + (profileData.handle || ''),
        bio: profileData.bio || '',
        followers: profileData.followers || 0,
        posts: profileData.postsCount || 287,
        avgEngagement: profileData.engagementRate || 4.2,
      });
    }
  }, [profileData]);

  const [competitors, setCompetitors] = useState([]);

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

  const [experiments, setExperiments] = useState([]);

  const [trendData, setTrendData] = useState([]);

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
    if (score >= 8.5) return 'var(--status-success)';
    if (score >= 7) return 'var(--status-warning)';
    return 'var(--status-error)';
  };

  const getTrendColor = (trend) => {
    const colors = { Rising: 'var(--status-success)', Stable: 'var(--status-warning)', Declining: 'var(--status-error)' };
    return colors[trend] || 'var(--text-muted)';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Growth Strategy Engine</h1>
        <p>Analyze, plan, and optimize your Instagram growth</p>
      </div>

      {/* Account Audit */}
      <div className="section">
        <h2 className="section-title">Account Audit Tool</h2>
        <div className="grid grid-2 gap-lg">
          {/* Input Section */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="gap-md flex-col">
              {[
                { key: 'username', label: 'Username', icon: Target },
                { key: 'bio', label: 'Bio', icon: Edit2 },
                { key: 'followers', label: 'Followers', icon: Users },
                { key: 'posts', label: 'Total Posts', icon: BarChart3 },
                { key: 'avgEngagement', label: 'Avg Engagement Rate (%)', icon: TrendingUp },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm text-secondary font-medium mb-2">{field.label}</label>
                  <input
                    type={field.key === 'bio' ? 'text' : 'number'}
                    value={auditInputs[field.key]}
                    onChange={(e) =>
                      setAuditInputs({ ...auditInputs, [field.key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>
            <button
              onClick={generateAudit}
              className="btn btn-primary w-full mt-6"
            >
              Generate Audit Report
            </button>
          </div>

          {/* Audit Report */}
          {showAudit && auditReport && (
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Audit Report</h3>
              <div className="gap-sm flex-col">
                {Object.entries(auditReport).map(([metric, data]) => (
                  <div key={metric} className="audit-item">
                    <div className="flex-between gap-sm mb-2">
                      <p className="text-sm font-semibold capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="text-lg font-bold" style={{ color: getScoreColor(data.score) }}>
                        {data.score}/10
                      </p>
                    </div>
                    <div className="score-bar">
                      <div
                        className="score-bar-fill"
                        style={{
                          width: `${(data.score / 10) * 100}%`,
                          backgroundColor: getScoreColor(data.score),
                        }}
                      />
                    </div>
                    {data.issues.length > 0 && (
                      <ul className="mt-2 text-xs text-negative gap-xs flex-col">
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
      </div>

      {/* Competitor Analysis */}
      <div className="section">
        <h2 className="section-title">Competitor Analysis</h2>
        <div className="card">
          <div className="flex gap-sm mb-6">
            <input
              type="text"
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              placeholder="Add competitor handle"
              className="flex-1"
            />
            <button
              onClick={addCompetitor}
              className="btn btn-primary"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="overflow-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Followers</th>
                  <th>Engagement</th>
                  <th>Posts/Week</th>
                  <th>Content Mix</th>
                  <th>Growth Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[{ name: 'Your Account', followers: auditInputs.followers, engagementRate: auditInputs.avgEngagement, postingFreq: 5, contentMix: 'Mixed', growthRate: 2.2 }, ...competitors].map((competitor, idx) => (
                  <tr key={idx} className={idx === 0 ? 'highlight-row' : ''}>
                    <td className="font-semibold">{competitor.name}</td>
                    <td>{competitor.followers.toLocaleString()}</td>
                    <td>{competitor.engagementRate}%</td>
                    <td>{competitor.postingFreq}</td>
                    <td className="text-sm">{competitor.contentMix}</td>
                    <td>
                      <span style={{ color: competitor.growthRate > 2 ? 'var(--status-success)' : 'var(--status-warning)' }} className="font-semibold">
                        +{competitor.growthRate}%
                      </span>
                    </td>
                    <td>
                      {idx > 0 && (
                        <button
                          onClick={() => deleteCompetitor(competitor.name)}
                          className="btn-ghost text-muted hover:text-negative"
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
      </div>

      {/* Weekly Playbook */}
      <div className="section">
        <h2 className="section-title">Weekly Playbook</h2>
        <div className="weekly-grid">
          {weeklyTasks.map((item, idx) => (
            <div
              key={idx}
              className="card card-sm task-card"
              onClick={() => toggleTaskCompletion(idx)}
            >
              <div className="flex gap-sm items-start mb-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(idx);
                  }}
                  className="mt-1 cursor-pointer"
                />
                <p className="text-sm font-semibold">{item.day}</p>
              </div>
              <p className={`text-sm mb-2 ${item.completed ? 'text-muted line-through' : 'text-secondary'}`}>
                {item.task}
              </p>
              <span className="badge badge-info text-xs">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Experiments */}
      <div className="section">
        <h2 className="section-title">Growth Experiments</h2>
        <div className="grid grid-2 gap-lg">
          {experiments.map((exp) => (
            <div key={exp.id} className="card">
              <div className="flex-between gap-sm mb-3">
                <h3 className="text-lg font-semibold flex-1">{exp.name}</h3>
                <button
                  onClick={() => deleteExperiment(exp.id)}
                  className="btn-ghost text-muted hover:text-negative"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="gap-md flex-col">
                <div>
                  <p className="text-sm text-muted font-medium mb-1">Hypothesis</p>
                  <p className="text-primary">{exp.hypothesis}</p>
                </div>
                <div className="flex gap-sm items-center">
                  <p className="text-sm text-muted font-medium">Result:</p>
                  <div className="flex gap-sm items-center">
                    {exp.result ? (
                      <CheckCircle size={20} style={{ color: 'var(--status-success)' }} />
                    ) : (
                      <XCircle size={20} style={{ color: 'var(--status-error)' }} />
                    )}
                    <span className="font-semibold">{exp.result ? 'Confirmed' : 'Rejected'}</span>
                  </div>
                </div>
                <div className="audit-item">
                  <p className="text-sm text-muted font-medium mb-1">Conclusion</p>
                  <p className="text-sm text-secondary">{exp.conclusion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Niche Research & Trends */}
      <div className="section">
        <h2 className="section-title">Niche Research & Trends</h2>
        <div className="card">
          <div className="gap-sm flex-col">
            {trendData.map((trend, idx) => (
              <div
                key={idx}
                className="trend-item"
              >
                <div className="flex-1">
                  <p className="font-semibold">{trend.topic}</p>
                  <p className="text-sm text-muted">Posts: {trend.posts.toLocaleString()} | Avg Engagement: {trend.engagement}%</p>
                </div>
                <div className="flex gap-sm items-center">
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
      </div>

      {/* SWOT Analysis */}
      <div className="section">
        <h2 className="section-title">SWOT Analysis</h2>
        <div className="grid grid-4 gap-lg">
          {[
            { title: 'Strengths', icon: '💪', borderColor: 'var(--status-success)' },
            { title: 'Weaknesses', icon: '⚠️', borderColor: 'var(--status-error)' },
            { title: 'Opportunities', icon: '🚀', borderColor: 'var(--status-warning)' },
            { title: 'Threats', icon: '⛔', borderColor: '#ff922b' },
          ].map((swot, idx) => (
            <div
              key={idx}
              className="card swot-card"
              style={{ borderColor: swot.borderColor, borderWidth: '2px' }}
            >
              <h3 className="text-lg font-semibold mb-4">
                <span className="mr-2">{swot.icon}</span>
                {swot.title}
              </h3>
              <ul className="gap-sm flex-col">
                {swotData[idx].items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-secondary text-sm flex gap-sm items-start">
                    <span style={{ color: swot.borderColor }}>•</span>
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
