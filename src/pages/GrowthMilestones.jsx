import { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
  Users,
  Heart,
  Sparkles,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/GrowthMilestones.css';

const phases = {
  1: {
    name: 'Phase 1: The Foundation',
    range: '0 → 1K',
    description: 'Build your base and establish authenticity',
    color: '#FF6B6B',
    icon: '🌱',
    strategies: [
      'Establish consistent brand voice and aesthetic',
      'Create 20-30 foundational posts showcasing your niche',
      'Engage 2+ hours daily in your target community',
      'Use 20-25 relevant hashtags per post',
      'Post 4-5 times weekly minimum',
      'Reply to EVERY comment in first hour',
      'Create Reels from your best performing content',
      'Do 10-15 genuine follows/follows back daily',
      'Join 3-5 relevant niche communities',
      'Document your journey authentically',
      'Create a content calendar',
      'Implement consistent posting schedule',
    ],
    contentTips: [
      'Focus on education + entertainment ratio (70/30)',
      'Show before/afters or transformations',
      'Create 9:16 Reels as primary content',
      'Use trending sounds early in their lifecycle',
      'Post carousel posts (3-5 slides) regularly',
    ],
    engagementStrategy: [
      'Respond to comments within 1 hour',
      'Ask questions in every caption',
      'Create 2-3 polls per week in Stories',
      'Host monthly Q&A sessions',
      'Engage with 50+ accounts in your niche daily',
    ],
    milestones: [
      { count: 100, task: 'First 100 followers', tips: 'Share personal story' },
      { count: 300, task: 'First viral post (100+ likes)', tips: 'Repost with hook update' },
      { count: 500, task: 'First brand partnership inquiry', tips: 'Make profile swipe-up ready' },
      { count: 1000, task: 'Celebrate 1K milestone', tips: 'Announce exclusive content coming' },
    ],
  },
  2: {
    name: 'Phase 2: The Acceleration',
    range: '1K → 10K',
    description: 'Optimize content and build community',
    color: '#4ECDC4',
    icon: '🚀',
    strategies: [
      'Create weekly Reel series (same day/time)',
      'Develop 3-5 content pillars',
      'Analyze top 10 posts and recreate themes',
      'Collaborate with 2-3 micro-influencers',
      'Create lead magnet (freebie) for bio link',
      'Implement Story series (5-10 daily)',
      'Go live 2x weekly for 10-15 min',
      'Create carousel posts twice weekly',
      'Build email list from Instagram',
      'Test different posting times and days',
      'Engage with reels in Explore 2+ hours daily',
      'Create educational content series',
    ],
    contentTips: [
      'Mix educational + inspirational + entertaining',
      'Create "Best Of" compilations monthly',
      'Film behind-the-scenes content',
      'Leverage trending filters and effects',
      'Create "How To" content (tutorials)',
    ],
    engagementStrategy: [
      'Join 5-10 engagement pods (carefully)',
      'Engage within first 30 minutes of posting',
      'Save posts you want to revisit',
      'Create exclusive content for close friends',
      'DM high-value followers weekly',
    ],
    milestones: [
      { count: 2000, task: 'Hit 2K followers', tips: 'Launch first collaboration' },
      { count: 5000, task: 'First 1K likes on a Reel', tips: 'Analyze what worked' },
      { count: 7500, task: 'Get first brand offer', tips: 'Have media kit ready' },
      { count: 10000, task: 'Unlock Reels monetization', tips: 'Optimize for Reels revenue' },
    ],
  },
  3: {
    name: 'Phase 3: The Authority',
    range: '10K → 50K',
    description: 'Establish thought leadership',
    color: '#FFB84D',
    icon: '👑',
    strategies: [
      'Create signature content format',
      'Partner with 5-10 influencers monthly',
      'Build community through exclusive group',
      'Create webinar or workshop',
      'Develop mini-course or digital product',
      'Guest post on 3-5 industry blogs',
      'Create monthly challenge or hashtag campaign',
      'Leverage user-generated content',
      'Build affiliate program',
      'Create podcast or audio content',
      'Develop merchandise or digital goods',
      'Host monthly Twitter/LinkedIn Spaces',
    ],
    contentTips: [
      'Create series (Part 1, 2, 3 format)',
      'Do deep-dive educational content',
      'Create opinion pieces on industry trends',
      'Share case studies and results',
      'Create resource lists and guides',
    ],
    engagementStrategy: [
      'Reply to every comment with value-add',
      'Create exclusive Discord/community',
      'Share follower wins and transformations',
      'Interview followers or collaborators',
      'Create monthly round-ups of best questions',
    ],
    milestones: [
      { count: 15000, task: 'Hit 15K followers', tips: 'Launch signature product' },
      { count: 25000, task: 'First viral Reel (100K+ views)', tips: 'Analyze and recreate' },
      { count: 35000, task: 'Establish thought leader status', tips: 'Get media mentions' },
      { count: 50000, task: 'Reach 50K followers', tips: 'Plan monetization strategy' },
    ],
  },
  4: {
    name: 'Phase 4: The Scale',
    range: '50K → 100K',
    description: 'Scale business and influence',
    color: '#833AB4',
    icon: '🌟',
    strategies: [
      'Scale affiliate commissions',
      'Launch premium membership community',
      'Expand into other platforms (TikTok, YouTube)',
      'Create ambassador program',
      'Develop B2B service offerings',
      'Create multiple digital products',
      'Build strategic partnerships',
      'Expand to speaking engagements',
      'Create investment or acquisition pitch',
      'Build agency or consulting arm',
      'Create certification program',
      'Expand to international audience',
    ],
    contentTips: [
      'Focus on quality over quantity',
      'Create premium/behind-scenes content',
      'Share business metrics transparently',
      'Create thought leadership essays',
      'Document scaling journey',
    ],
    engagementStrategy: [
      'Build VIP inner circle',
      'Create exclusive mentorship tier',
      'Do one-on-one interviews with followers',
      'Share exclusive business insights',
      'Build referral program',
    ],
    milestones: [
      { count: 60000, task: 'Hit 60K followers', tips: 'Launch premium tier' },
      { count: 75000, task: '5M+ monthly views', tips: 'Pitch sponsorships' },
      { count: 90000, task: 'First $10K month from IG', tips: 'Diversify revenue' },
      { count: 100000, task: 'REACH 100K MILESTONE! 🎉', tips: 'Plan next 100K phase' },
    ],
  },
};

export default function GrowthMilestones() {
  const [followerCount, setFollowerCount] = useState(2500);
  const [selectedPhase, setSelectedPhase] = useState(2);

  const getCurrentPhase = () => {
    if (followerCount < 1000) return 1;
    if (followerCount < 10000) return 2;
    if (followerCount < 50000) return 3;
    return 4;
  };

  const currentPhase = getCurrentPhase();
  const phase = phases[selectedPhase];

  // Progress data for chart
  const progressData = [
    { followers: 0, date: 'Start' },
    { followers: 250, date: '3mo' },
    { followers: 500, date: '6mo' },
    { followers: 1000, date: '9mo' },
    { followers: 3000, date: '1yr' },
    { followers: 10000, date: '18mo' },
    { followers: 25000, date: '2yr' },
    { followers: 50000, date: '30mo' },
    { followers: 100000, date: '3yr' },
  ];

  const getPhaseProgress = () => {
    const phaseLimits = { 1: [0, 1000], 2: [1000, 10000], 3: [10000, 50000], 4: [50000, 100000] };
    const [min, max] = phaseLimits[selectedPhase];
    const progress = ((followerCount - min) / (max - min)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="page growth-milestones">
      <div className="growth-milestones-header">
        <h1>🚀 Growth Milestones Engine</h1>
        <p>Your journey from 0 to 100K followers</p>
      </div>

      <div className="follower-input-section">
        <div className="follower-input">
          <div className="input-group">
            <label>Current Followers</label>
            <input
              type="number"
              value={followerCount}
              onChange={(e) => setFollowerCount(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="100000"
            />
          </div>
          <div className="current-phase-badge">
            Phase {currentPhase}: {phases[currentPhase].range}
          </div>
        </div>
      </div>

      <div className="phase-selector">
        {Object.entries(phases).map(([key, phase]) => (
          <button
            key={key}
            className={`phase-button ${parseInt(key) === selectedPhase ? 'active' : ''}`}
            onClick={() => setSelectedPhase(parseInt(key))}
          >
            <span>{phase.icon}</span> {phase.range}
          </button>
        ))}
      </div>

      <div className="phase-content">
        <div className="phase-header">
          <div className="phase-title">
            <span className="phase-title-icon">{phase.icon}</span>
            <h2>{phase.name}</h2>
          </div>
          <div className="phase-range">{phase.description}</div>
        </div>

        <div className="progress-section">
          <h3>Phase Progress</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${getPhaseProgress()}%` }} />
            </div>
          </div>
          <div className="progress-text">
            <span>{Math.floor(getPhaseProgress())}% to next phase</span>
            <span>{followerCount.toLocaleString()} followers</span>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-title">Typical Growth Timeline</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip
                contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="var(--color-secondary)"
                dot={{ fill: 'var(--color-primary)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="content-grid">
          <div className="strategy-card">
            <h3>
              <Target size={18} />
              Key Strategies
            </h3>
            <ul className="strategy-list">
              {phase.strategies.map((strategy, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} />
                  {strategy}
                </li>
              ))}
            </ul>
          </div>

          <div className="strategy-card">
            <h3>
              <Sparkles size={18} />
              Content Strategy
            </h3>
            <ul className="strategy-list">
              {phase.contentTips.map((tip, idx) => (
                <li key={idx}>
                  <Zap size={16} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="strategy-card">
            <h3>
              <Heart size={18} />
              Engagement Strategy
            </h3>
            <ul className="strategy-list">
              {phase.engagementStrategy.map((strategy, idx) => (
                <li key={idx}>
                  <Users size={16} />
                  {strategy}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="milestones-card">
          <h3>
            <TrendingUp size={18} />
            Phase Milestones
          </h3>
          {phase.milestones.map((milestone, idx) => (
            <div key={idx} className="milestone-item">
              <div className="milestone-count">{milestone.count.toLocaleString()} followers</div>
              <div className="milestone-task">✓ {milestone.task}</div>
              <div className="milestone-tips">💡 Tip: {milestone.tips}</div>
            </div>
          ))}
        </div>

        <div className="recommendation-section">
          <h3>
            <Sparkles size={18} />
            AI Recommendations for Phase {selectedPhase}
          </h3>
          <ul className="recommendation-list">
            {selectedPhase === 1 && (
              <>
                <li>
                  <strong>Focus on Consistency:</strong> Post 4-5 times weekly at the same time. Your audience needs predictability.
                </li>
                <li>
                  <strong>Master the Hook:</strong> The first 0.5 seconds are critical. Use pattern interrupts and curiosity gaps.
                </li>
                <li>
                  <strong>Engagement is Key:</strong> Spend 2+ hours daily engaging with your target audience's content.
                </li>
                <li>
                  <strong>Build in Public:</strong> Show your journey. People follow people, not perfection.
                </li>
              </>
            )}
            {selectedPhase === 2 && (
              <>
                <li>
                  <strong>Optimize for Reels:</strong> 50%+ of your content should be Reels. They get 67% more engagement.
                </li>
                <li>
                  <strong>Collaboration Matters:</strong> Partner with micro-influencers (2K-10K followers) in your niche.
                </li>
                <li>
                  <strong>Find Your Format:</strong> Identify 2-3 content types that consistently perform. Double down on them.
                </li>
                <li>
                  <strong>Go Live Weekly:</strong> Live videos build deeper connection. Aim for 10-15 minutes.
                </li>
              </>
            )}
            {selectedPhase === 3 && (
              <>
                <li>
                  <strong>Monetize Early:</strong> Start affiliate programs, sponsorships, and digital products now.
                </li>
                <li>
                  <strong>Build Community:</strong> Create a private community or membership for your most engaged followers.
                </li>
                <li>
                  <strong>Expand Your Reach:</strong> Repurpose content to TikTok and YouTube for 3-5x more views.
                </li>
                <li>
                  <strong>Thought Leadership:</strong> Share strong opinions and unique perspectives. Be the expert in your niche.
                </li>
              </>
            )}
            {selectedPhase === 4 && (
              <>
                <li>
                  <strong>Quality Over Quantity:</strong> You can post less frequently. Focus on higher quality content.
                </li>
                <li>
                  <strong>Build an Empire:</strong> Create multiple revenue streams: course, membership, affiliate, sponsorships.
                </li>
                <li>
                  <strong>Leverage Your Name:</strong> You're now a personal brand. People will buy from you directly.
                </li>
                <li>
                  <strong>Plan the Next Phase:</strong> Consider expansion to podcasting, speaking, or even creating your own platform.
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
