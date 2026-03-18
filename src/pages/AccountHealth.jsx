import React, { useState, useMemo } from 'react';
import { useAppData } from '../firebase/useAppData';
import { useInsights } from '../services/useInsights';
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
import '../styles/AccountHealth.css';

// Custom circular progress component (no external dependency)
const CircularProgress = ({ value, color, size = 128 }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="circular-progress">
      <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--bg-tertiary)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        className="circular-progress-fill"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--text-primary)"
        fontSize="24"
        fontWeight="bold"
      >
        {value}
      </text>
    </svg>
  );
};

export default function AccountHealth() {
  const [activeTab, setActiveTab] = useState('overview');
  const [shadowbanCheck, setShadowbanCheck] = useState(null);
  const [expandedPlaybook, setExpandedPlaybook] = useState(null);
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Reach Drop', checked: false, severity: 'critical' },
    { id: 2, name: 'Hashtag Performance', checked: false, severity: 'critical' },
    { id: 3, name: 'Explore Page Removal', checked: true, severity: 'high' },
    { id: 4, name: 'Engagement Drop', checked: false, severity: 'high' },
    { id: 5, name: 'New Follower Plateau', checked: true, severity: 'medium' },
    { id: 6, name: 'Shadowban Timer', checked: false, severity: 'medium' },
  ]);

  // Load profile data and use insights engine
  const { data: profileData = {} } = useAppData('profile', {});
  const { data: accountHealthData, updateData: updateAccountHealth } = useAppData('accountHealth', {});
  const { engine: insightsEngine, hasData } = useInsights();

  // Use engine's health score if available
  const healthScore = useMemo(() => {
    if (hasData && insightsEngine) {
      return insightsEngine.getHealthScore().score;
    }

    // Fallback to original calculation
    let score = 0;

    // Bio check (+10)
    if (profileData.bio && profileData.bio.length > 0) score += 10;

    // Profile picture (+10)
    if (profileData.profilePic) score += 10;

    // Posts regularly (+15)
    if (profileData.postsCount && profileData.postsCount > 10) score += 15;

    // Business account (+10)
    if (profileData.isBusinessAccount) score += 10;

    // Engagement rate > 3% (+15)
    if (profileData.engagementRate && profileData.engagementRate > 3) score += 15;

    // Verified (+10)
    if (profileData.isVerified) score += 10;

    // Category set (+5)
    if (profileData.category) score += 5;

    // Active/recently synced (+10)
    if (profileData.lastSynced) {
      const lastSyncTime = new Date(profileData.lastSynced).getTime();
      const now = new Date().getTime();
      const daysDiff = (now - lastSyncTime) / (1000 * 60 * 60 * 24);
      if (daysDiff < 7) score += 10;
    }

    // Follower/following ratio healthy (+15)
    if (profileData.followers && profileData.following) {
      const ratio = profileData.followers / (profileData.following || 1);
      if (ratio > 0.5) score += 15;
    }

    return Math.min(100, score);
  }, [hasData, insightsEngine, profileData]);

  const shadowbanSymptoms = [
    {
      id: 1,
      name: 'Reach Drop',
      description: 'Sudden 50%+ decrease in reach',
      checked: symptoms[0].checked,
      severity: 'critical',
    },
    {
      id: 2,
      name: 'Hashtag Performance',
      description: 'Posts not appearing on hashtag pages',
      checked: symptoms[1].checked,
      severity: 'critical',
    },
    {
      id: 3,
      name: 'Explore Page Removal',
      description: "Haven't appeared on Explore in 2+ weeks",
      checked: symptoms[2].checked,
      severity: 'high',
    },
    {
      id: 4,
      name: 'Engagement Drop',
      description: '70%+ decrease in likes/comments',
      checked: symptoms[3].checked,
      severity: 'high',
    },
    {
      id: 5,
      name: 'New Follower Plateau',
      description: 'No new followers despite engagement',
      checked: symptoms[4].checked,
      severity: 'medium',
    },
    {
      id: 6,
      name: 'Shadowban Timer',
      description: "You've used action limits recently",
      checked: symptoms[5].checked,
      severity: 'medium',
    },
  ];

  const [ghostFollowerData] = useState({
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
      color: 'var(--color-primary)',
    },
    {
      action: 'Unfollows',
      current: 156,
      safeLimit: 350,
      dailyLimit: 350,
      color: 'var(--color-secondary)',
    },
    {
      action: 'Likes',
      current: 1247,
      safeLimit: 1500,
      dailyLimit: 1500,
      color: 'var(--status-info)',
    },
    {
      action: 'Comments',
      current: 89,
      safeLimit: 250,
      dailyLimit: 250,
      color: 'var(--status-warning)',
    },
    {
      action: 'DMs',
      current: 34,
      safeLimit: 200,
      dailyLimit: 200,
      color: 'var(--status-success)',
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
        "Step 1: Check if you've hit any action limits (400+ follows)",
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
        "Step 1: You're likely hitting action limits - reduce follow volume",
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
    if (score >= 80) return 'var(--status-success)';
    if (score >= 60) return 'var(--status-warning)';
    return 'var(--status-error)';
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-sm">
          <Shield className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
          <h1>Account Health & Protection</h1>
        </div>
        <p>Monitor account health and prevent shadowbans</p>
      </div>

      {/* Health Score Gauge */}
      <div className="card card-gradient mb-8">
        <div className="health-score-container">
          <div className="health-score-circle">
            <CircularProgress value={healthScore} color={getHealthColor(healthScore)} />
          </div>
          <div className="health-score-content">
            <h2>Account Health Score</h2>
            <p className="health-score-status" style={{ color: getHealthColor(healthScore) }}>
              {healthScore >= 80
                ? '✓ Healthy - Keep up great practices'
                : healthScore >= 60
                  ? '⚠️ Fair - Some attention needed'
                  : '✗ At Risk - Take action soon'}
            </p>
            <div className="health-metrics">
              <div className="health-metric">
                <div className="metric-header">
                  <span>Content Quality</span>
                  <span>85%</span>
                </div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '85%', backgroundColor: 'var(--status-success)' }} />
                </div>
              </div>

              <div className="health-metric">
                <div className="metric-header">
                  <span>Action Limits Safety</span>
                  <span>72%</span>
                </div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '72%', backgroundColor: 'var(--status-warning)' }} />
                </div>
              </div>

              <div className="health-metric">
                <div className="metric-header">
                  <span>Engagement Quality</span>
                  <span>78%</span>
                </div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '78%', backgroundColor: 'var(--color-primary)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-group mb-8">
        {['overview', 'shadowban', 'ghost', 'limits', 'alerts', 'playbooks', 'settings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="section">
          <h2 className="section-title">Account Overview</h2>

          <div className="grid grid-3 mb-6">
            <div className="card">
              <div className="flex items-center gap-sm mb-2">
                <CheckCircle2 className="w-5 h-5 text-positive" />
                <span className="text-secondary text-sm">Status</span>
              </div>
              <div className="stat-value">Healthy</div>
              <div className="text-positive text-sm mt-2">No restrictions detected</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-sm mb-2">
                <AlertTriangle className="w-5 h-5" style={{ color: 'var(--status-warning)' }} />
                <span className="text-secondary text-sm">Warnings</span>
              </div>
              <div className="stat-value">2</div>
              <div className="text-sm mt-2" style={{ color: 'var(--status-warning)' }}>Action limits approaching</div>
            </div>

            <div className="card">
              <div className="flex items-center gap-sm mb-2">
                <Zap className="w-5 h-5" style={{ color: 'var(--status-warning)' }} />
                <span className="text-secondary text-sm">Last Check</span>
              </div>
              <div className="stat-value">2h ago</div>
              <div className="text-sm mt-2" style={{ color: 'var(--status-warning)' }}>Check again for updates</div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Recent Activity Monitoring</h3>
            <div className="activity-list">
              {[
                { metric: 'Posts published', value: '3', trend: '+1 this week' },
                { metric: 'Avg engagement rate', value: '6.8%', trend: '+0.3% improvement' },
                { metric: 'New followers', value: '342', trend: '+18 since yesterday' },
                { metric: 'Ghost followers estimated', value: '2,327', trend: '-89 cleaned' },
              ].map((item, idx) => (
                <div key={idx} className="activity-item">
                  <span className="text-secondary">{item.metric}</span>
                  <div className="text-right">
                    <div className="text-primary font-semibold">{item.value}</div>
                    <div className="text-muted text-xs">{item.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shadowban Tab */}
      {activeTab === 'shadowban' && (
        <div className="section">
          <h2 className="section-title">Shadowban Detector</h2>

          <div className="card card-gradient mb-6">
            <h3 className="font-semibold mb-4">Shadowban Symptom Checklist</h3>
            <div className="symptom-list mb-6">
              {shadowbanSymptoms.map((symptom) => (
                <div key={symptom.id} className="symptom-item">
                  <input
                    type="checkbox"
                    checked={symptom.checked}
                    onChange={(e) => {
                      const updated = symptoms.map((s) =>
                        s.id === symptom.id ? { ...s, checked: e.target.checked } : s
                      );
                      setSymptoms(updated);
                      updateAccountHealth({ symptoms: updated });
                    }}
                    className="symptom-checkbox"
                  />
                  <div className="flex-1">
                    <p className="text-primary font-semibold text-sm">{symptom.name}</p>
                    <p className="text-secondary text-sm">{symptom.description}</p>
                  </div>
                  <span className={`badge badge-${getSeverityClass(symptom.severity)}`}>
                    {symptom.severity}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={runShadowbanCheck}
              className="btn btn-primary w-full"
            >
              <Zap className="w-5 h-5" />
              Run Full Shadowban Check
            </button>

            {shadowbanCheck && (
              <div className="alert-box alert-warning mt-6">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="text-primary font-semibold">{shadowbanCheck.message}</p>
                    <p className="text-secondary text-sm mt-1">
                      {shadowbanCheck.symptoms} shadowban symptoms detected
                    </p>
                    <p className="text-sm mt-2">💡 {shadowbanCheck.recommendation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Recovery Steps</h3>
            <div className="recovery-steps">
              <div className="recovery-step">
                <div className="step-number">1</div>
                <div>
                  <p className="text-primary font-semibold">Stop all automation</p>
                  <p className="text-secondary text-sm">Pause growth tools for 48 hours minimum</p>
                </div>
              </div>
              <div className="recovery-step">
                <div className="step-number">2</div>
                <div>
                  <p className="text-primary font-semibold">Audit hashtags</p>
                  <p className="text-secondary text-sm">Remove banned hashtags from all posts</p>
                </div>
              </div>
              <div className="recovery-step">
                <div className="step-number">3</div>
                <div>
                  <p className="text-primary font-semibold">Manual engagement</p>
                  <p className="text-secondary text-sm">Spend 1-2 hours daily on authentic engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ghost Followers Tab */}
      {activeTab === 'ghost' && (
        <div className="section">
          <h2 className="section-title">Ghost Follower Audit</h2>

          <div className="grid grid-3 mb-6">
            <div className="card">
              <div className="text-secondary text-sm mb-2">Total Followers</div>
              <div className="stat-value">
                {ghostFollowerData.totalFollowers.toLocaleString()}
              </div>
            </div>

            <div className="card">
              <div className="text-secondary text-sm mb-2">Estimated Ghost %</div>
              <div className="stat-value">{ghostFollowerData.estimatedGhost}%</div>
              <div className="text-negative text-xs mt-2">
                ≈ {ghostFollowerData.ghostCount.toLocaleString()} accounts
              </div>
            </div>

            <div className="card">
              <div className="text-secondary text-sm mb-2">Engagement Impact</div>
              <div className="text-sm mt-2">
                <span className="text-negative">{ghostFollowerData.engagementBefore}%</span>
                <span className="text-secondary mx-sm">→</span>
                <span className="text-positive">{ghostFollowerData.engagementAfter}%</span>
              </div>
              <div className="text-positive text-xs mt-1">
                +{(ghostFollowerData.engagementAfter - ghostFollowerData.engagementBefore).toFixed(1)}% after cleanup
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Cleanup Recommendations</h3>
            <div className="recommendations">
              <div className="recommendation-item">
                <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0" />
                <div>
                  <p className="text-primary font-semibold">Run Instagram Analytics audit</p>
                  <p className="text-secondary text-sm">Check Insights for low-engagement followers</p>
                </div>
              </div>
              <div className="recommendation-item">
                <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0" />
                <div>
                  <p className="text-primary font-semibold">Use third-party ghost follower detector</p>
                  <p className="text-secondary text-sm">Cleaner, Ghost Buster, or FollowerWonk</p>
                </div>
              </div>
              <div className="recommendation-item">
                <CheckCircle2 className="w-5 h-5 text-positive flex-shrink-0" />
                <div>
                  <p className="text-primary font-semibold">Remove in batches</p>
                  <p className="text-secondary text-sm">Delete 100-200 ghost followers per day</p>
                </div>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-6">
              Start Ghost Follower Cleanup
            </button>
          </div>
        </div>
      )}

      {/* Action Limits Tab */}
      {activeTab === 'limits' && (
        <div className="section">
          <h2 className="section-title">Daily Action Limits</h2>

          <div className="limits-list mb-6">
            {actionLimits.map((limit) => {
              const percentage = (limit.current / limit.safeLimit) * 100;
              const isWarning = percentage > 85;
              const isCritical = percentage > 95;

              return (
                <div key={limit.action} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-primary font-semibold">{limit.action}</h3>
                    <div className="text-right">
                      <div className="stat-value">{limit.current.toLocaleString()}</div>
                      <div className="text-secondary text-sm">
                        of {limit.safeLimit.toLocaleString()} safe limit
                      </div>
                    </div>
                  </div>

                  <div className="metric-bar">
                    <div
                      className="metric-fill"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isCritical
                          ? 'var(--status-error)'
                          : isWarning
                            ? 'var(--status-warning)'
                            : limit.color,
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-secondary text-xs">Daily limit: {limit.dailyLimit.toLocaleString()}</span>
                    {isWarning && (
                      <span
                        className={`badge ${
                          isCritical ? 'badge-danger' : 'badge-warning'
                        }`}
                      >
                        {isCritical ? '⚠️ Critical' : '⚠️ Warning'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Safe Limits Explained</h3>
            <div className="text-secondary text-sm space-y-3">
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
        <div className="section">
          <h2 className="section-title">Risk Alerts & Flagged Activities</h2>

          <div className="alerts-list">
            {riskAlerts.map((alert) => (
              <div key={alert.id} className="alert-card">
                <div className="alert-indicator" style={{
                  backgroundColor:
                    alert.severity === 'critical'
                      ? 'var(--status-error)'
                      : alert.severity === 'warning'
                        ? 'var(--status-warning)'
                        : 'var(--status-info)',
                }} />
                <div className="alert-content">
                  <h4 className="text-primary font-semibold">{alert.activity}</h4>
                  <p className="text-secondary text-sm mt-1">{alert.description}</p>
                  <div className="flex items-center gap-md mt-3">
                    <span className="text-muted text-xs">{alert.timestamp}</span>
                    <span className={`badge badge-${getSeverityClass(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
                <button className="btn btn-secondary btn-small flex-shrink-0">
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Playbooks Tab */}
      {activeTab === 'playbooks' && (
        <div className="section">
          <h2 className="section-title">Recovery Playbooks</h2>

          <div className="playbooks-list">
            {recoveryPlaybooks.map((playbook) => (
              <div key={playbook.id} className="playbook-card">
                <button
                  onClick={() =>
                    setExpandedPlaybook(
                      expandedPlaybook === playbook.id ? null : playbook.id
                    )
                  }
                  className="playbook-header"
                >
                  <div className="playbook-title">
                    <h3 className="text-primary font-semibold mb-1">{playbook.issue}</h3>
                    <p className="text-secondary text-sm">{playbook.symptom}</p>
                  </div>
                  <div className="playbook-meta">
                    <div className="meta-item">
                      <div className="meta-label">Timeline</div>
                      <div className="meta-value">{playbook.timeline}</div>
                    </div>
                    <div className="meta-item">
                      <div className="meta-label">Success Rate</div>
                      <div className="meta-value text-positive">{playbook.success}%</div>
                    </div>
                    {expandedPlaybook === playbook.id ? (
                      <ChevronUp className="w-5 h-5 text-secondary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                </button>

                {expandedPlaybook === playbook.id && (
                  <div className="playbook-content">
                    <div className="playbook-steps">
                      {playbook.steps.map((step, idx) => (
                        <div key={idx} className="playbook-step">
                          <div className="step-number">{idx + 1}</div>
                          <p className="text-secondary text-sm">{step}</p>
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
        <div className="section">
          <h2 className="section-title">Account Settings Checklist</h2>

          <div className="card">
            <div className="settings-list">
              {settingsChecklist.map((item) => (
                <div key={item.id} className="settings-item">
                  {item.status ? (
                    <CheckSquare className="w-5 h-5 text-positive flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-secondary flex-shrink-0" />
                  )}
                  <span className={item.status ? 'text-secondary' : 'text-secondary'}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="settings-progress mt-6 pt-6" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <div className="flex justify-between items-center mb-4">
                <span className="text-primary font-semibold">Settings Complete</span>
                <span className="stat-value">
                  {settingsChecklist.filter((item) => item.status).length}/{settingsChecklist.length}
                </span>
              </div>
              <div className="metric-bar">
                <div
                  className="metric-fill gradient-bg"
                  style={{
                    width: `${(settingsChecklist.filter((item) => item.status).length / settingsChecklist.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getSeverityClass(severity) {
  switch (severity) {
    case 'critical':
      return 'danger';
    case 'high':
      return 'warning';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
}
