import React, { useState } from 'react';
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
  X,
  Search,
  BarChart3,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function Engagement() {
  const [activeTab, setActiveTab] = useState('targets');
  const [expandedStrategy, setExpandedStrategy] = useState(null);

  const [engagementTargets, setEngagementTargets] = useState({
    comments: { current: 18, target: 30 },
    dms: { current: 7, target: 10 },
    stories: { current: 12, target: 15 },
    accountsEngaged: { current: 42, target: 50 },
  });

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
      color: '#E1306C',
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
      color: '#833AB4',
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
      color: '#5ed8f8',
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
      color: '#FFB533',
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
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8" style={{ color: '#E1306C' }} />
            <h1 className="text-4xl font-bold text-white">Engagement & Community</h1>
          </div>
          <p className="text-gray-400">Master engagement to build a loyal, engaged community</p>
        </div>

        {/* Daily Targets */}
        <div
          className="p-6 rounded-xl border border-gray-800 mb-8"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" style={{ color: '#E1306C' }} />
            Daily Engagement Targets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <Icon className="w-5 h-5" style={{ color: '#E1306C' }} />
                    <span className="text-white font-semibold">{labels[key].label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full h-4 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                        <div
                          className="h-4 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            background:
                              percentage >= 100
                                ? 'linear-gradient(90deg, #10B981 0%, #34D399 100%)'
                                : 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                          }}
                        />
                      </div>
                      <div className="text-gray-400 text-sm mt-2">
                        {value.current}/{value.target}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</div>
                      {percentage < 100 && (
                        <div className="text-gray-400 text-xs mt-1">{value.target - value.current} left</div>
                      )}
                      {percentage >= 100 && (
                        <div className="text-green-400 text-xs mt-1">Complete!</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['targets', 'strategies', 'templates', 'community', 'collabs', 'report'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{
                background:
                  activeTab === tab ? 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)' : 'transparent',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Engagement Strategies</h2>

            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <button
                  onClick={() =>
                    setExpandedStrategy(expandedStrategy === strategy.id ? null : strategy.id)
                  }
                  className="w-full p-6 flex items-center justify-between hover:opacity-90 transition"
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: strategy.color }}
                      />
                      <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{strategy.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-gray-400 mb-2">{strategy.frequency}</div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: strategy.color + '20',
                        color: strategy.color,
                      }}
                    >
                      {strategy.impact}
                    </div>
                  </div>
                </button>

                {expandedStrategy === strategy.id && (
                  <div className="px-6 pb-6 border-t border-gray-700">
                    <div className="space-y-3 mt-4">
                      {strategy.details.map((detail, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: strategy.color + '30' }}
                          >
                            <Check className="w-3 h-3" style={{ color: strategy.color }} />
                          </div>
                          <p className="text-gray-300 text-sm">{detail}</p>
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Comment Templates</h2>

            {Object.entries(commentTemplates).map(([category, templateList]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-white mb-4 capitalize">
                  {category === 'valueAdd' ? 'Value-Add' : category}
                </h3>
                <div className="space-y-3 mb-8">
                  {templateList.map((template, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
                      style={{ backgroundColor: '#1a1a2e' }}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-gray-300 text-sm flex-1 whitespace-pre-wrap">{template}</p>
                        <Copy
                          className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition flex-shrink-0"
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Community Tracking</h2>

            {/* Milestone Display */}
            <div className="space-y-4">
              {milestoneData.map((milestone, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-gray-800"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{milestone.name}</h3>
                    <span className="text-2xl font-bold text-white">{milestone.achieved}</span>
                  </div>
                  <div className="w-full h-4 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                    <div
                      className="h-4 rounded-full transition-all duration-500"
                      style={{
                        width: milestone.achieved,
                        background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                      }}
                    />
                  </div>
                  <div className="text-gray-400 text-sm mt-3">
                    {milestone.value.toLocaleString()} of {milestone.total.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Superfans */}
            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" style={{ color: '#FFB533' }} />
                Your Superfans
              </h3>
              <div className="space-y-3">
                {superfans.map((fan) => (
                  <div
                    key={fan.id}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ backgroundColor: '#0f0f1e' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fan.avatar}</span>
                      <div>
                        <p className="text-white font-semibold">{fan.username}</p>
                        <p className="text-gray-400 text-sm">{fan.followers} followers</p>
                        <p className="text-gray-500 text-xs mt-1">{fan.engagement}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{fan.points}</div>
                      <div className="text-gray-400 text-xs">engagement points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Pod Tracker */}
            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" style={{ color: '#833AB4' }} />
                Engagement Pod Status
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Growth Hackers Pod', members: 12, status: 'active' },
                  { name: 'Content Creators Circle', members: 15, status: 'active' },
                  { name: 'Niche Leaders', members: 8, status: 'active' },
                ].map((pod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ backgroundColor: '#0f0f1e' }}
                  >
                    <div>
                      <p className="text-white font-semibold">{pod.name}</p>
                      <p className="text-gray-400 text-sm">{pod.members} members</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: '#10B98120',
                        color: '#10B981',
                      }}
                    >
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Collaboration Finder</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                  color: 'white',
                }}
              >
                <Plus className="w-5 h-5" />
                New Collab Idea
              </button>
            </div>

            <div className="space-y-4">
              {collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{collab.avatar}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{collab.name}</h3>
                        <p className="text-gray-400 text-sm">{collab.handle}</p>
                        <p className="text-gray-500 text-xs mt-1">📌 {collab.niche}</p>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded-lg transition hover:opacity-80"
                      style={{ backgroundColor: '#252545' }}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#0f0f1e' }}
                    >
                      <div className="text-gray-400 text-xs mb-2">Followers</div>
                      <div className="text-lg font-bold text-white">{collab.followers}</div>
                    </div>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#0f0f1e' }}
                    >
                      <div className="text-gray-400 text-xs mb-2">Engagement Rate</div>
                      <div className="text-lg font-bold text-white">{collab.engagementRate.toFixed(1)}%</div>
                    </div>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#0f0f1e' }}
                    >
                      <div className="text-gray-400 text-xs mb-2">Match Score</div>
                      <div
                        className="text-lg font-bold"
                        style={{
                          color:
                            collab.matchScore >= 90
                              ? '#10B981'
                              : collab.matchScore >= 80
                                ? '#FFB533'
                                : '#F87171',
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" style={{ color: '#E1306C' }} />
              Weekly Engagement Report
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="text-gray-400 text-sm mb-2">Total Given</div>
                <div className="text-4xl font-bold text-white">344</div>
                <div className="text-green-400 text-sm mt-2">Engagement actions</div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="text-gray-400 text-sm mb-2">Total Received</div>
                <div className="text-4xl font-bold text-white">470</div>
                <div className="text-green-400 text-sm mt-2">+36.6% ratio</div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="text-gray-400 text-sm mb-2">Engagement ROI</div>
                <div className="text-4xl font-bold text-white">1.37x</div>
                <div className="text-green-400 text-sm mt-2">You're winning!</div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Engagement Given vs Received</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={engagementReportData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252545', border: '1px solid #444' }}
                    labelStyle={{ color: '#999' }}
                  />
                  <Legend />
                  <Bar dataKey="given" fill="#E1306C" name="Given" />
                  <Bar dataKey="received" fill="#10B981" name="Received" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Insights</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">Engagement momentum</p>
                      <p className="text-gray-400 text-xs">Thursday was your best day with +29 interactions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MessageCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">Comment engagement wins</p>
                      <p className="text-gray-400 text-xs">Your comments get 3.2x more replies than average</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <h3 className="text-lg font-bold text-white mb-4">Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">Power hour optimization</p>
                      <p className="text-gray-400 text-xs">Try 8-9 PM slot for 50% better response rates</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">Expand engagement list</p>
                      <p className="text-gray-400 text-xs">Add 15 more accounts to your target list</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
