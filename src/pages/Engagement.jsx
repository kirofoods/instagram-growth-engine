import React, { useState, useEffect } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  Copy,
  Plus,
  Zap,
  Target,
  TrendingUp,
  Award,
  Eye,
  MoreVertical,
  Check,
  BarChart3,
} from 'lucide-react';
import {
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
import { useFirebase } from '../firebase/FirebaseContext';
import { doc, setDoc } from 'firebase/firestore';
import '../styles/Engagement.css';

const defaultEngagementTargets = {
  comments: { current: 0, target: 30 },
  dms: { current: 0, target: 10 },
  stories: { current: 0, target: 15 },
  accountsEngaged: { current: 0, target: 50 },
};

export default function Engagement() {
  const { data: engagementData } = useDocument('settings', 'engagement');
  const { db } = useFirebase();
  const [activeTab, setActiveTab] = useState('targets');
  const [expandedStrategy, setExpandedStrategy] = useState(null);

  const [engagementTargets, setEngagementTargets] = useState(defaultEngagementTargets);

  useEffect(() => {
    if (engagementData) {
      setEngagementTargets(engagementData.targets || defaultEngagementTargets);
    }
  }, [engagementData]);

  const saveTargets = async (targets) => {
    if (db) {
      try {
        await setDoc(doc(db, 'settings', 'engagement'), { targets }, { merge: true });
      } catch (err) {
        console.error('Failed to save engagement targets:', err);
      }
    }
  };

  const updateTarget = (key, field, value) => {
    const updated = {
      ...engagementTargets,
      [key]: {
        ...engagementTargets[key],
        [field]: value,
      },
    };
    setEngagementTargets(updated);
    saveTargets(updated);
  };

  const [strategies] = useState([
    {
      id: 1,
      name: 'Power Hour',
      description: 'Dedicated engagement sprint for maximum impact',
      details: [
        'Time: 7-8 PM when audience is most active',
        'Target accounts: top 10 niche creators',
        'Actions: 10-15 meaningful comments, 5 DMs, 20 likes',
        'Focus on quality over quantity',
        'Leave 2-3 paragraph comments with questions',
      ],
      frequency: 'Daily',
      impact: 'High',
      color: 'var(--color-primary)',
    },
    {
      id: 2,
      name: 'Niche Engagement List',
      description: 'Pre-curated list of 50 accounts to engage daily',
      details: [
        'Same niche + audience alignment',
        'Engagement rate > 3%',
        'Active daily content posting',
        'Roughly same follower count',
        'Positive, brand-safe community',
      ],
      frequency: 'Daily',
      impact: 'High',
      color: 'var(--color-secondary)',
    },
    {
      id: 3,
      name: 'Competitor Follower Engagement',
      description: 'Engage with followers of top 3 competitors',
      details: [
        'Find competitors with aligned audience',
        'Engage with their 100 most recent followers',
        'Like their posts, comment meaningfully',
        'Follow those who engage back',
        'This brings warm traffic to your profile',
      ],
      frequency: 'Every 2 days',
      impact: 'Medium',
      color: 'var(--color-accent-cyan)',
    },
    {
      id: 4,
      name: 'Engagement Pod Participation',
      description: 'Join pods to boost initial post engagement',
      details: [
        'Join 3-5 micro pods (10-15 people each)',
        'Engage with all posts within 1 hour of posting',
        'Comment first, then share to stories if possible',
        'Rotate pods monthly to avoid algorithm detection',
        'Best for reels and carousel posts',
      ],
      frequency: 'Every post',
      impact: 'Medium',
      color: 'var(--status-warning)',
    },
  ]);

  const commentTemplates = {
    compliment: [
      'This line: "{{quote}}" just hit different 🎯 Been thinking about this all week',
      'Your {{topic}} breakdowns are unmatched. The way you explained {{concept}} just changed my perspective',
      'Not to be dramatic but this might be one of your best posts. The {{element}} is genius',
      'Absolutely this. {{related_thought}}. You saved me hours of trial and error here',
    ],
    question: [
      'How did you nail the {{process}}? I\'ve been stuck on {{problem}} for weeks',
      'Quick question: when you did {{action}}, did you {{follow_up}}? Trying to replicate this',
      'This is gold. Do you recommend {{tool/method}} for {{use_case}}, or is there something better?',
      'Love this {{topic}}. What would you do differently for {{scenario}}?',
    ],
    valueAdd: [
      'Adding to this - {{addition}} also works really well for {{use_case}}. Learned this the hard way lol',
      '{{related_success_story}} after implementing this. Game changer',
      'Pro tip: if you combine this with {{related_tactic}}, the results compound. Just tested it',
      'This + {{other_strategy}} = 🚀 The synergy between these two is underrated',
    ],
    funny: [
      'me: *reads this*\nalso me: *immediately screenshots and sends to 5 friends* 😂',
      'This is the way 👌 Saving this for my "reasons I trust this creator" folder',
      'Plot twist: most people see this and do nothing\nYou though? You\'ll actually implement it\n\nThat\'s the difference',
      'stop calling me out like this lmao but seriously this is facts 💯',
    ],
    supportive: [
      'Your consistency is unmatched {{name}}. Keep pushing 💪 This energy is contagious',
      'Thank you for always showing up and delivering value. Seriously grateful for creators like you',
      'The fact that you break things down THIS clearly with no paywall behind it 🙏 Mad respect',
      'Taking notes from your playbook. You\'re proof that authenticity > hustle culture nonsense',
    ],
  };

  const [superfans] = useState([
    {
      id: 1,
      username: '@sarah.growth',
      followers: '23.4k',
      engagement: 'Liked 47 posts',
      points: 342,
      avatar: '👩‍💼',
    },
    {
      id: 2,
      username: '@marco.creates',
      followers: '18.2k',
      engagement: 'Commented 23 times',
      points: 298,
      avatar: '👨‍🎨',
    },
    {
      id: 3,
      username: '@jessica.dm',
      followers: '14.1k',
      engagement: 'Shared 12 stories',
      points: 267,
      avatar: '👩‍💻',
    },
    {
      id: 4,
      username: '@alex.media',
      followers: '19.8k',
      engagement: 'Liked 34 posts',
      points: 245,
      avatar: '👨‍💼',
    },
    {
      id: 5,
      username: '@emma.coach',
      followers: '21.3k',
      engagement: 'Commented 18 times',
      points: 219,
      avatar: '👩‍🏫',
    },
  ]);

  const [collaborators] = useState([
    {
      id: 1,
      name: 'Sarah Growth',
      handle: '@sarah.growth',
      niche: 'Personal Branding',
      followers: '45.2k',
      engagementRate: 8.2,
      matchScore: 94,
      avatar: '👩‍💼',
    },
    {
      id: 2,
      name: 'Marco Creates',
      handle: '@marco.creates',
      niche: 'Content Creation',
      followers: '38.1k',
      engagementRate: 6.9,
      matchScore: 91,
      avatar: '👨‍🎨',
    },
    {
      id: 3,
      name: 'Alex Media',
      handle: '@alex.media',
      niche: 'Growth Hacking',
      followers: '52.3k',
      engagementRate: 7.4,
      matchScore: 87,
      avatar: '👨‍💼',
    },
    {
      id: 4,
      name: 'Emma Coach',
      handle: '@emma.coach',
      niche: 'Coaching & Mentorship',
      followers: '31.5k',
      engagementRate: 9.1,
      matchScore: 85,
      avatar: '👩‍🏫',
    },
  ]);

  const engagementReportData = [
    { day: 'Mon', given: 45, received: 62 },
    { day: 'Tue', given: 52, received: 71 },
    { day: 'Wed', given: 48, received: 58 },
    { day: 'Thu', given: 61, received: 84 },
    { day: 'Fri', given: 58, received: 92 },
    { day: 'Sat', given: 42, received: 55 },
    { day: 'Sun', given: 38, received: 48 },
  ];

  const milestoneData = [
    { name: 'Followers', value: 8500, total: 10000, achieved: '85%' },
    { name: 'Monthly Reach', value: 245000, total: 500000, achieved: '49%' },
    { name: 'Avg Engagement', value: 6.8, total: 10, achieved: '68%' },
  ];

  const handleCopyTemplate = (template) => {
    navigator.clipboard.writeText(template);
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
          <h1>Engagement & Community</h1>
        </div>
        <p className="text-secondary">Master engagement to build a loyal, engaged community</p>
      </div>

      {/* Daily Targets */}
      <div className="card mb-8">
        <h2 className="flex items-center gap-2 mb-6">
          <Target className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
          <span className="text-lg font-semibold">Daily Engagement Targets</span>
        </h2>

        <div className="grid grid-2 gap-6">
          {Object.entries(engagementTargets).map(([key, value]) => {
            const percentage = (value.current / value.target) * 100;
            const labels = {
              comments: { label: 'Comments Given', icon: MessageCircle },
              dms: { label: 'DMs Sent', icon: Share2 },
              stories: { label: 'Stories Replied', icon: Eye },
              accountsEngaged: { label: 'Accounts Engaged', icon: Users },
            };

            const Icon = labels[key].icon;

            return (
              <div key={key}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  <span className="font-medium text-primary">{labels[key].label}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="eng-progress-bar">
                      <div
                        className="eng-progress-fill"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          background: percentage >= 100
                            ? 'linear-gradient(90deg, var(--status-success) 0%, #34D399 100%)'
                            : 'linear-gradient(90deg, var(--color-primary-start), var(--color-primary-end))',
                        }}
                      />
                    </div>
                    <div className="text-secondary text-sm mt-2">
                      {value.current}/{value.target}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="stat-value">{percentage.toFixed(0)}%</div>
                    {percentage < 100 && (
                      <div className="stat-label mt-1">{value.target - value.current} left</div>
                    )}
                    {percentage >= 100 && (
                      <div className="stat-change text-positive mt-1">Complete!</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="eng-tabs mb-8">
        {['targets', 'strategies', 'templates', 'community', 'collabs', 'report'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Targets Tab */}
      {activeTab === 'targets' && (
        <div className="section">
          <h2 className="section-title">Daily Engagement Targets</h2>
          <p className="text-secondary mb-6">Adjust your daily engagement goals. These targets help you stay consistent with your growth strategy.</p>

          <div className="grid grid-2 gap-6">
            {Object.entries(engagementTargets).map(([key, value]) => {
              const labels = {
                comments: { label: 'Comments Given', icon: MessageCircle },
                dms: { label: 'DMs Sent', icon: Share2 },
                stories: { label: 'Stories Replied', icon: Eye },
                accountsEngaged: { label: 'Accounts Engaged', icon: Users },
              };

              const Icon = labels[key].icon;

              return (
                <div key={key} className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    <label className="font-medium text-primary">{labels[key].label}</label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-secondary block mb-2">Current: {value.current}</label>
                      <input
                        type="number"
                        value={value.current}
                        onChange={(e) => updateTarget(key, 'current', parseInt(e.target.value) || 0)}
                        min="0"
                        className="w-full px-3 py-2 bg-secondary border border-tertiary rounded text-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-secondary block mb-2">Target: {value.target}</label>
                      <input
                        type="number"
                        value={value.target}
                        onChange={(e) => updateTarget(key, 'target', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-full px-3 py-2 bg-secondary border border-tertiary rounded text-primary"
                      />
                    </div>

                    <div className="pt-2 border-t border-tertiary">
                      <div className="flex-between text-sm">
                        <span className="text-secondary">Progress</span>
                        <span className="text-primary font-semibold">{Math.round((value.current / value.target) * 100)}%</span>
                      </div>
                      <div className="eng-progress-bar mt-2">
                        <div
                          className="eng-progress-fill"
                          style={{
                            width: `${Math.min((value.current / value.target) * 100, 100)}%`,
                            background: (value.current / value.target) >= 1
                              ? 'linear-gradient(90deg, var(--status-success) 0%, #34D399 100%)'
                              : 'linear-gradient(90deg, var(--color-primary-start), var(--color-primary-end))',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Strategies Tab */}
      {activeTab === 'strategies' && (
        <div className="section">
          <h2 className="section-title">Engagement Strategies</h2>

          {strategies.map((strategy) => (
            <div key={strategy.id} className="eng-strategy-card">
              <button
                onClick={() =>
                  setExpandedStrategy(expandedStrategy === strategy.id ? null : strategy.id)
                }
                className="w-full p-6 flex items-center justify-between"
              >
                <div className="text-left flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: strategy.color }}
                    />
                    <h3 className="text-lg font-semibold text-primary">{strategy.name}</h3>
                  </div>
                  <p className="text-secondary text-sm">{strategy.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-xs text-secondary mb-2">{strategy.frequency}</div>
                  <span className="badge" style={{
                    backgroundColor: strategy.color + '20',
                    color: strategy.color,
                  }}>
                    {strategy.impact}
                  </span>
                </div>
              </button>

              {expandedStrategy === strategy.id && (
                <div className="px-6 pb-6 pt-4" style={{ borderTopColor: 'var(--border-primary)', borderTopWidth: '1px' }}>
                  <div className="space-y-3">
                    {strategy.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: strategy.color + '30' }}
                        >
                          <Check className="w-3 h-3" style={{ color: strategy.color }} />
                        </div>
                        <p className="text-secondary text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="section">
          <h2 className="section-title">Comment Templates</h2>

          {Object.entries(commentTemplates).map(([category, templateList]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-primary mb-4 capitalize">
                {category === 'valueAdd' ? 'Value-Add' : category}
              </h3>
              <div className="space-y-3">
                {templateList.map((template, idx) => (
                  <div key={idx} className="card-sm">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-secondary text-sm flex-1 whitespace-pre-wrap">{template}</p>
                      <Copy
                        className="w-5 h-5 cursor-pointer transition flex-shrink-0 hover:text-primary"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={() => handleCopyTemplate(template)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Community Tab */}
      {activeTab === 'community' && (
        <div className="section">
          <h2 className="section-title">Community Tracking</h2>

          {/* Milestone Display */}
          <div className="space-y-4 mb-8">
            {milestoneData.map((milestone, idx) => (
              <div key={idx} className="card">
                <div className="flex-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">{milestone.name}</h3>
                  <span className="stat-value">{milestone.achieved}</span>
                </div>
                <div className="eng-progress-bar mb-3">
                  <div
                    className="eng-progress-fill"
                    style={{
                      width: milestone.achieved,
                    }}
                  />
                </div>
                <div className="text-secondary text-sm">
                  {milestone.value.toLocaleString()} of {milestone.total.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Superfans */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" style={{ color: 'var(--status-warning)' }} />
              Your Superfans
            </h3>
            <div className="space-y-3">
              {superfans.map((fan) => (
                <div key={fan.id} className="eng-list-item">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{fan.avatar}</span>
                    <div>
                      <p className="font-semibold text-primary">{fan.username}</p>
                      <p className="text-secondary text-sm">{fan.followers} followers</p>
                      <p className="text-tertiary text-xs mt-1">{fan.engagement}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="stat-value">{fan.points}</div>
                    <div className="stat-label">engagement points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Pod Tracker */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
              Engagement Pod Status
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Growth Hackers Pod', members: 12, status: 'active' },
                { name: 'Content Creators Circle', members: 15, status: 'active' },
                { name: 'Niche Leaders', members: 8, status: 'active' },
              ].map((pod, idx) => (
                <div key={idx} className="eng-list-item">
                  <div>
                    <p className="font-semibold text-primary">{pod.name}</p>
                    <p className="text-secondary text-sm">{pod.members} members</p>
                  </div>
                  <span className="badge badge-success">
                    {pod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Tab */}
      {activeTab === 'collabs' && (
        <div className="section">
          <div className="flex-between mb-6">
            <h2 className="section-title">Collaboration Finder</h2>
            <button className="btn btn-primary">
              <Plus className="w-5 h-5" />
              New Collab Idea
            </button>
          </div>

          <div className="space-y-4">
            {collaborators.map((collab) => (
              <div key={collab.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{collab.avatar}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{collab.name}</h3>
                      <p className="text-secondary text-sm">{collab.handle}</p>
                      <p className="text-tertiary text-xs mt-1">📌 {collab.niche}</p>
                    </div>
                  </div>
                  <button className="btn btn-ghost">
                    <MoreVertical className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  </button>
                </div>

                <div className="grid grid-3 gap-4">
                  <div className="eng-metric-box">
                    <div className="stat-label">Followers</div>
                    <div className="text-lg font-semibold text-primary">{collab.followers}</div>
                  </div>
                  <div className="eng-metric-box">
                    <div className="stat-label">Engagement Rate</div>
                    <div className="text-lg font-semibold text-primary">{collab.engagementRate.toFixed(1)}%</div>
                  </div>
                  <div className="eng-metric-box">
                    <div className="stat-label">Match Score</div>
                    <div
                      className="text-lg font-semibold"
                      style={{
                        color:
                          collab.matchScore >= 90
                            ? 'var(--status-success)'
                            : collab.matchScore >= 80
                              ? 'var(--status-warning)'
                              : 'var(--status-error)',
                      }}
                    >
                      {collab.matchScore}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Tab */}
      {activeTab === 'report' && (
        <div className="section">
          <h2 className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            <span className="text-lg font-semibold">Weekly Engagement Report</span>
          </h2>

          <div className="grid grid-3 gap-4 mb-6">
            <div className="card">
              <div className="stat-label">Total Given</div>
              <div className="stat-value">344</div>
              <div className="stat-change text-positive mt-2">Engagement actions</div>
            </div>

            <div className="card">
              <div className="stat-label">Total Received</div>
              <div className="stat-value">470</div>
              <div className="stat-change text-positive mt-2">+36.6% ratio</div>
            </div>

            <div className="card">
              <div className="stat-label">Engagement ROI</div>
              <div className="stat-value">1.37x</div>
              <div className="stat-change text-positive mt-2">You're winning!</div>
            </div>
          </div>

          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-primary mb-4">Engagement Given vs Received</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementReportData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                />
                <Legend />
                <Bar dataKey="given" fill="var(--color-primary)" name="Given" />
                <Bar dataKey="received" fill="var(--status-success)" name="Received" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Insights</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <TrendingUp className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--status-success)' }} />
                  <div>
                    <p className="font-medium text-primary text-sm">Engagement momentum</p>
                    <p className="text-secondary text-xs">Thursday was your best day with +29 interactions</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MessageCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--status-info)' }} />
                  <div>
                    <p className="font-medium text-primary text-sm">Comment engagement wins</p>
                    <p className="text-secondary text-xs">Your comments get 3.2x more replies than average</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--status-warning)' }} />
                  <div>
                    <p className="font-medium text-primary text-sm">Power hour optimization</p>
                    <p className="text-secondary text-xs">Try 8-9 PM slot for 50% better response rates</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} />
                  <div>
                    <p className="font-medium text-primary text-sm">Expand engagement list</p>
                    <p className="text-secondary text-xs">Add 15 more accounts to your target list</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
