import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Shield,
  Zap,
  TrendingDown,
  RotateCcw,
  BarChart3,
  Settings,
  CheckSquare,
  Square,
  Play,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
// Custom circular progress component (no external dependency)
const CircularProgress = ({ value, color, trailColor = '#252545', size = 128 }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} fill="none" stroke={trailColor} strokeWidth="8" />
      <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8"
        strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
        fill="#fff" fontSize="24" fontWeight="bold">{value}</text>
    </svg>
  );
};

export default function AccountHealth() {
  const [activeTab, setActiveTab] = useState('overview');
  const [shadowbanCheck, setShadowbanCheck] = useState(null);
  const [expandedPlaybook, setExpandedPlaybook] = useState(null);

  const healthScore = 78;

  const shadowbanSymptoms = [
    {
      id: 1,
      name: 'Reach Drop',
      description: 'Sudden 50%+ decrease in reach',
      checked: false,
      severity: 'critical',
    },
    {
      id: 2,
      name: 'Hashtag Performance',
      description: 'Posts not appearing on hashtag pages',
      checked: false,
      severity: 'critical',
    },
    {
      id: 3,
      name: 'Explore Page Removal',
      description: 'Haven\'t appeared on Explore in 2+ weeks',
      checked: true,
      severity: 'high',
    },
    {
      id: 4,
      name: 'Engagement Drop',
      description: '70%+ decrease in likes/comments',
      checked: false,
      severity: 'high',
    },
    {
      id: 5,
      name: 'New Follower Plateau',
      description: 'No new followers despite engagement',
      checked: true,
      severity: 'medium',
    },
    {
      id: 6,
      name: 'Shadowban Timer',
      description: 'You\'ve used action limits recently',
      checked: false,
      severity: 'medium',
    },
  ];

  const [ghostFollowerData, setGhostFollowerData] = useState({
    totalFollowers: 12450,
    estimatedGhost: 18.7,
    ghostCount: 2327,
    engagementBefore: 4.2,
    engagementAfter: 5.8,
  });

  const actionLimits = [
    {
      action: 'Follows',
      current: 287,
      safeLimit: 350,
      dailyLimit: 350,
      color: '#E1306C',
    },
    {
      action: 'Unfollows',
      current: 156,
      safeLimit: 350,
      dailyLimit: 350,
      color: '#833AB4',
    },
    {
      action: 'Likes',
      current: 1247,
      safeLimit: 1500,
      dailyLimit: 1500,
      color: '#5ed8f8',
    },
    {
      action: 'Comments',
      current: 89,
      safeLimit: 250,
      dailyLimit: 250,
      color: '#FFB533',
    },
    {
      action: 'DMs',
      current: 34,
      safeLimit: 200,
      dailyLimit: 200,
      color: '#10B981',
    },
  ];

  const riskAlerts = [
    {
      id: 1,
      activity: 'Follow spree detected',
      description: 'You followed 287 accounts today. Safe limit is 350. Be careful.',
      severity: 'warning',
      timestamp: '2 hours ago',
      action: 'Slow down',
    },
    {
      id: 2,
      activity: 'Banned hashtag usage',
      description: 'You used #viral and #follow in the same post. These are shadowban-prone.',
      severity: 'critical',
      timestamp: '4 hours ago',
      action: 'Edit caption',
    },
    {
      id: 3,
      activity: 'Unusual engagement pattern',
      description: 'Your 3:1 like ratio is atypical. Looks human but worth monitoring.',
      severity: 'info',
      timestamp: '8 hours ago',
      action: 'Monitor',
    },
    {
      id: 4,
      activity: 'Rapid unfollowing',
      description: 'Unfollowed 156 accounts in 24h. Instagram flags this.',
      severity: 'warning',
      timestamp: '1 day ago',
      action: 'Spread unfollows',
    },
  ];

  const recoveryPlaybooks = [
    {
      id: 1,
      issue: 'Shadowban Recovery',
      symptom: 'Posts not appearing on hashtags or Explore',
      steps: [
        'Step 1: Stop using all automation tools for 48 hours',
        'Step 2: Remove banned hashtags from old posts (edit captions)',
        'Step 3: Engage manually with 15-20 accounts daily in your niche',
        'Step 4: Wait 72 hours after last automation before resuming',
        'Step 5: Post organic content with clean hashtags only',
        'Step 6: Monitor reach recovery - should see improvement in 1-2 weeks',
      ],
      timeline: '2-3 weeks',
      success: 94,
    },
    {
      id: 2,
      issue: 'Reach Drop Recovery',
      symptom: 'Sudden 50%+ decrease in post reach',
      steps: [
        'Step 1: Check if you\'ve hit any action limits (400+ follows)',
        'Step 2: Analyze your last 10 posts - look for formatting/hashtag issues',
        'Step 3: Post 3x daily for next 7 days with optimized hashtags',
        'Step 4: Engage heavily with niche accounts (1+ hour daily)',
        'Step 5: Share posts to Stories with CTA to view comments',
        'Step 6: If after 1 week no improvement, you may have shadowban',
      ],
      timeline: '1-2 weeks',
      success: 87,
    },
    {
      id: 3,
      issue: 'Engagement Decline',
      symptom: 'Comments, shares, saves dropping off',
      steps: [
        'Step 1: Audit your content - are captions still compelling?',
        'Step 2: Check posting times - adjust to when audience is most active',
        'Step 3: Increase engagement pod activity (comment on 30 posts daily)',
        'Step 4: Improve CTAs - ask direct questions, not generic "thoughts?"',
        'Step 5: Try new content formats (Reels perform 30% better currently)',
        'Step 6: Host engagement pods or collaborations to boost reach',
      ],
      timeline: '1 week',
      success: 91,
    },
    {
      id: 4,
      issue: 'Growth Plateau',
      symptom: 'New followers stalled despite good engagement',
      steps: [
        'Step 1: You\'re likely hitting action limits - reduce follow volume',
        'Step 2: Focus on Reel strategy - they get 3x more reach',
        'Step 3: Increase hashtag variety - use 30 relevant hashtags',
        'Step 4: Collaborate with 2 accounts your size weekly',
        'Step 5: Host a challenge or giveaway (requires email list)',
        'Step 6: Create viral-potential content hooks in first 3 seconds',
      ],
      timeline: '2-3 weeks',
      success: 89,
    },
  ];

  const settingsChecklist = [
    { id: 1, name: 'Business/Creator Account', status: true },
    { id: 2, name: 'Connected to Facebook Business Manager', status: true },
    { id: 3, name: 'Alt Text Enabled for Images', status: false },
    { id: 4, name: 'IGTV Commenting Enabled', status: true },
    { id: 5, name: 'Story Sharing Disabled (Safety)', status: true },
    { id: 6, name: 'Download Your Data', status: false },
    { id: 7, name: 'Two-Factor Authentication', status: true },
    { id: 8, name: 'Login Activity Reviewed', status: false },
    { id: 9, name: 'Restrict Account Backup', status: true },
    { id: 10, name: 'Hashtag Following List Private', status: false },
  ];

  const runShadowbanCheck = () => {
    setShadowbanCheck({
      status: 'warning',
      message: 'Potential partial shadowban detected',
      symptoms: shadowbanSymptoms.filter((s) => s.checked).length,
      recommendation: 'Reduce action volume and audit hashtags',
    });
  };

  const getHealthColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#FFB533';
    return '#F87171';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8" style={{ color: '#E1306C' }} />
            <h1 className="text-4xl font-bold text-white">Account Health & Protection</h1>
          </div>
          <p className="text-gray-400">Monitor account health and prevent shadowbans</p>
        </div>

        {/* Health Score Gauge */}
        <div
          className="p-8 rounded-xl border border-gray-800 mb-8"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <div className="flex items-center gap-8">
            <div className="w-32 h-32">
              <CircularProgress value={healthScore} color={getHealthColor(healthScore)} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">Account Health Score</h2>
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: getHealthColor(healthScore) }}
              >
                {healthScore >= 80
                  ? '✓ Healthy - Keep up great practices'
                  : healthScore >= 60
                    ? '⚠️ Fair - Some attention needed'
                    : '✗ At Risk - Take action soon'}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Content Quality</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#252545' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: '85%',
                      backgroundColor: '#10B981',
                    }}
                  />
                </div>

                <div className="flex justify-between text-gray-400 mt-3">
                  <span>Action Limits Safety</span>
                  <span>72%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#252545' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: '72%',
                      backgroundColor: '#FFB533',
                    }}
                  />
                </div>

                <div className="flex justify-between text-gray-400 mt-3">
                  <span>Engagement Quality</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#252545' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: '78%',
                      backgroundColor: '#E1306C',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'shadowban', 'ghost', 'limits', 'alerts', 'playbooks', 'settings'].map((tab) => (
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Status</span>
                </div>
                <div className="text-2xl font-bold text-white">Healthy</div>
                <div className="text-green-400 text-xs mt-2">No restrictions detected</div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400 text-sm">Warnings</span>
                </div>
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-yellow-400 text-xs mt-2">Action limits approaching</div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-400 text-sm">Last Check</span>
                </div>
                <div className="text-2xl font-bold text-white">2h ago</div>
                <div className="text-orange-400 text-xs mt-2">Check again for updates</div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity Monitoring</h3>
              <div className="space-y-4">
                {[
                  { metric: 'Posts published', value: '3', trend: '+1 this week' },
                  { metric: 'Avg engagement rate', value: '6.8%', trend: '+0.3% improvement' },
                  { metric: 'New followers', value: '342', trend: '+18 since yesterday' },
                  { metric: 'Ghost followers estimated', value: '2,327', trend: '-89 cleaned' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-300">{item.metric}</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">{item.value}</div>
                      <div className="text-gray-500 text-xs">{item.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Shadowban Tab */}
        {activeTab === 'shadowban' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Shadowban Detector</h2>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Shadowban Symptom Checklist</h3>
              <div className="space-y-3 mb-6">
                {shadowbanSymptoms.map((symptom) => (
                  <div
                    key={symptom.id}
                    className="flex items-start gap-3 p-3 rounded-lg border"
                    style={{
                      backgroundColor: '#0f0f1e',
                      borderColor: '#333',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={symptom.checked}
                      className="w-5 h-5 mt-0.5 rounded cursor-pointer"
                      style={{
                        accentColor: '#E1306C',
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{symptom.name}</p>
                      <p className="text-gray-400 text-sm">{symptom.description}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 mt-1"
                      style={{
                        backgroundColor:
                          symptom.severity === 'critical'
                            ? '#F873171F'
                            : symptom.severity === 'high'
                              ? '#FFB5331F'
                              : '#FCA5A51F',
                        color:
                          symptom.severity === 'critical'
                            ? '#F87171'
                            : symptom.severity === 'high'
                              ? '#FFB533'
                              : '#FCA5A5',
                      }}
                    >
                      {symptom.severity}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={runShadowbanCheck}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition hover:opacity-80 w-full justify-center"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                  color: 'white',
                }}
              >
                <Zap className="w-5 h-5" />
                Run Full Shadowban Check
              </button>

              {shadowbanCheck && (
                <div
                  className="mt-6 p-4 rounded-lg border-l-4"
                  style={{
                    backgroundColor: '#1F2937',
                    borderColor: '#FFB533',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">{shadowbanCheck.message}</p>
                      <p className="text-gray-400 text-sm mt-1">
                        {shadowbanCheck.symptoms} shadowban symptoms detected
                      </p>
                      <p className="text-yellow-400 text-sm mt-2">💡 {shadowbanCheck.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Recovery Steps</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                      color: 'white',
                    }}
                  >
                    1
                  </div>
                  <div>
                    <p className="text-white font-semibold">Stop all automation</p>
                    <p className="text-gray-400 text-sm">Pause growth tools for 48 hours minimum</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                      color: 'white',
                    }}
                  >
                    2
                  </div>
                  <div>
                    <p className="text-white font-semibold">Audit hashtags</p>
                    <p className="text-gray-400 text-sm">Remove banned hashtags from all posts</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                      color: 'white',
                    }}
                  >
                    3
                  </div>
                  <div>
                    <p className="text-white font-semibold">Manual engagement</p>
                    <p className="text-gray-400 text-sm">Spend 1-2 hours daily on authentic engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ghost Followers Tab */}
        {activeTab === 'ghost' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Ghost Follower Audit</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="text-gray-400 text-sm mb-2">Total Followers</div>
                <div className="text-3xl font-bold text-white">
                  {ghostFollowerData.totalFollowers.toLocaleString()}
                </div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="text-gray-400 text-sm mb-2">Estimated Ghost %</div>
                <div className="text-3xl font-bold text-white">{ghostFollowerData.estimatedGhost}%</div>
                <div className="text-red-400 text-xs mt-2">
                  ≈ {ghostFollowerData.ghostCount.toLocaleString()} accounts
                </div>
              </div>

              <div
                className="p-6 rounded-xl border border-gray-800"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="text-gray-400 text-sm mb-2">Engagement Impact</div>
                <div className="text-white text-sm mt-2">
                  <span className="text-red-400">{ghostFollowerData.engagementBefore}%</span>
                  <span className="text-gray-400 mx-2">→</span>
                  <span className="text-green-400">{ghostFollowerData.engagementAfter}%</span>
                </div>
                <div className="text-green-400 text-xs mt-1">+{(ghostFollowerData.engagementAfter - ghostFollowerData.engagementBefore).toFixed(1)}% after cleanup</div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Cleanup Recommendations</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Run Instagram Analytics audit</p>
                    <p className="text-gray-400 text-sm">Check Insights for low-engagement followers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Use third-party ghost follower detector</p>
                    <p className="text-gray-400 text-sm">Cleaner, Ghost Buster, or FollowerWonk</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold">Remove in batches</p>
                    <p className="text-gray-400 text-sm">Delete 100-200 ghost followers per day</p>
                  </div>
                </div>
              </div>

              <button
                className="w-full mt-6 px-6 py-3 rounded-lg font-semibold transition hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                  color: 'white',
                }}
              >
                Start Ghost Follower Cleanup
              </button>
            </div>
          </div>
        )}

        {/* Action Limits Tab */}
        {activeTab === 'limits' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Daily Action Limits</h2>

            <div className="space-y-4">
              {actionLimits.map((limit) => {
                const percentage = (limit.current / limit.safeLimit) * 100;
                const isWarning = percentage > 85;
                const isCritical = percentage > 95;

                return (
                  <div
                    key={limit.action}
                    className="p-6 rounded-xl border border-gray-800"
                    style={{ backgroundColor: '#1a1a2e' }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-white font-semibold">{limit.action}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{limit.current.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">
                          of {limit.safeLimit.toLocaleString()} safe limit
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-4 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                      <div
                        className="h-4 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isCritical ? '#F87171' : isWarning ? '#FFB533' : limit.color,
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-gray-400 text-xs">Daily limit: {limit.dailyLimit.toLocaleString()}</span>
                      {isWarning && (
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: isCritical ? '#F871711F' : '#FFB5331F',
                            color: isCritical ? '#F87171' : '#FFB533',
                          }}
                        >
                          {isCritical ? '⚠️ Critical' : '⚠️ Warning'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="text-lg font-bold text-white mb-4">Safe Limits Explained</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  Instagram doesn't publish exact limits, but based on API behavior and community patterns:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• <strong>Follows:</strong> 350/day (200-250 if new account)</li>
                  <li>• <strong>Unfollows:</strong> 350/day</li>
                  <li>• <strong>Likes:</strong> 1500/day (spread throughout day)</li>
                  <li>• <strong>Comments:</strong> 250/day (quality over quantity)</li>
                  <li>• <strong>DMs:</strong> 200/day (different groups)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Risk Alerts & Flagged Activities</h2>

            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-6 rounded-xl border border-gray-800"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                        style={{
                          backgroundColor:
                            alert.severity === 'critical'
                              ? '#F87171'
                              : alert.severity === 'warning'
                                ? '#FFB533'
                                : '#5ed8f8',
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{alert.activity}</h4>
                        <p className="text-gray-400 text-sm mt-1">{alert.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-gray-500 text-xs">{alert.timestamp}</span>
                          <span
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{
                              backgroundColor:
                                alert.severity === 'critical'
                                  ? '#F871711F'
                                  : alert.severity === 'warning'
                                    ? '#FFB5331F'
                                    : '#5ed8f81F',
                              color:
                                alert.severity === 'critical'
                                  ? '#F87171'
                                  : alert.severity === 'warning'
                                    ? '#FFB533'
                                    : '#5ed8f8',
                            }}
                          >
                            {alert.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-80 flex-shrink-0"
                      style={{
                        backgroundColor: '#252545',
                        color: '#E1306C',
                      }}
                    >
                      {alert.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playbooks Tab */}
        {activeTab === 'playbooks' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Recovery Playbooks</h2>

            <div className="space-y-4">
              {recoveryPlaybooks.map((playbook) => (
                <div
                  key={playbook.id}
                  className="border border-gray-800 rounded-xl overflow-hidden"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <button
                    onClick={() =>
                      setExpandedPlaybook(
                        expandedPlaybook === playbook.id ? null : playbook.id
                      )
                    }
                    className="w-full p-6 flex items-center justify-between hover:opacity-90 transition"
                  >
                    <div className="text-left flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{playbook.issue}</h3>
                      <p className="text-gray-400 text-sm">{playbook.symptom}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Timeline</div>
                        <div className="text-sm font-semibold text-white">{playbook.timeline}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Success Rate</div>
                        <div className="text-sm font-semibold text-green-400">{playbook.success}%</div>
                      </div>
                      {expandedPlaybook === playbook.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {expandedPlaybook === playbook.id && (
                    <div className="px-6 pb-6 border-t border-gray-700">
                      <div className="space-y-3 mt-4">
                        {playbook.steps.map((step, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                              style={{
                                background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                                color: 'white',
                              }}
                            >
                              {idx + 1}
                            </div>
                            <p className="text-gray-300 text-sm pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Account Settings Checklist</h2>

            <div
              className="p-6 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="space-y-3">
                {settingsChecklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: '#0f0f1e' }}
                  >
                    {item.status ? (
                      <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                    <span className={item.status ? 'text-gray-300' : 'text-gray-400'}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-semibold">Settings Complete</span>
                  <span className="text-2xl font-bold text-white">
                    {settingsChecklist.filter((item) => item.status).length}/{settingsChecklist.length}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(settingsChecklist.filter((item) => item.status).length / settingsChecklist.length) * 100}%`,
                      background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
