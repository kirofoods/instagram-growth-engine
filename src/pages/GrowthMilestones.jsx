import { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Target,
  Zap,
  Users,
  Heart,
  Sparkles,
  Lock,
  Unlock,
  Clock,
  Award,
  Rocket,
  Crown,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDocument } from '../firebase/useFirestore';
import { useInsights } from '../services/useInsights';
import '../styles/GrowthMilestones.css';

const phases = {
  1: {
    name: 'Phase 1: Building the Base',
    range: '0 → 1K',
    description: 'Profile optimization, content pillars, hashtag strategy',
    color: '#FF6B6B',
    icon: '🌱',
    timeline: '90 days',
    kpis: ['Profile CTR', 'Content consistency', 'Hashtag reach', 'Engagement rate'],
    strategies: [
      'Complete bio optimization with keyword and CTA',
      'Establish 3 core content pillars for your niche',
      'Create 30+ foundational posts showcasing expertise',
      'Develop hashtag strategy (20-25 relevant tags)',
      'Post 4-5 times weekly at consistent times',
      'Reply to every comment within first hour',
      'Create Reels from best foundational content',
      'Engage authentically with 50+ target audience accounts daily',
      'Document journey to humanize brand',
      'Build content calendar for 90 days',
    ],
    contentTips: [
      'Lead with education (70%) + entertainment (30%)',
      'Include before/afters and transformation stories',
      'Master the 9:16 Reel format for algorithm',
      'Use trending sounds within first 48 hours',
      'Create carousel posts (3-5 slides) twice weekly',
    ],
    engagementStrategy: [
      'Respond to all comments with personalized replies',
      'Ask genuine questions in every caption',
      'Create 2-3 Story polls weekly to boost engagement',
      'Host weekly Q&A sessions in Stories',
      'Engage with 50+ accounts in your niche daily',
    ],
    milestones: [
      { count: 100, task: 'First 100 followers', tips: 'Share authentic personal story', reward: 'Profile optimized' },
      { count: 300, task: 'First viral post (100+ likes)', tips: 'Analyze hooks and repost variations', reward: 'Content pillar validated' },
      { count: 500, task: 'Hit 500 followers', tips: 'Engage with 100 accounts daily', reward: 'Community growing' },
      { count: 1000, task: 'PHASE UNLOCKED: 1K followers 🎉', tips: 'Plan Phase 2 strategy now', reward: 'Ready to scale' },
    ],
  },
  2: {
    name: 'Phase 2: Finding Your Voice',
    range: '1K → 10K',
    description: 'Reels strategy, collaboration, engagement pods',
    color: '#4ECDC4',
    icon: '🎤',
    timeline: '6 months',
    kpis: ['Reel performance', 'Collaboration ROI', 'Audience retention', 'Views per post'],
    strategies: [
      'Create signature weekly Reel series (same day/time)',
      'Develop 5 distinct content pillars with unique hooks',
      'Analyze top 10 posts and recreate successful themes',
      'Collaborate with 2-3 micro-influencers (1-10K range)',
      'Build lead magnet for bio link (freebie)',
      'Post 5-10 Stories daily with strategic CTAs',
      'Go live 2x weekly for 15-20 minutes',
      'Create carousel posts twice weekly with insights',
      'Build email list (30+ subscribers per week target)',
      'Test and optimize posting times with analytics',
      'Spend 2+ hours daily engaging in Explore tab',
      'Launch educational content series (mini-curriculum)',
    ],
    contentTips: [
      'Create content mix: 50% Reels, 25% carousel, 25% Stories',
      'Combine education + inspiration + entertainment',
      'Film behind-the-scenes and process content',
      'Leverage trending filters and effects early',
      'Create "How To" tutorial series (5-10 parts)',
    ],
    engagementStrategy: [
      'Join 5-10 engagement pods (laser-focused niche)',
      'Engage with top 30 comments in first 30 minutes',
      'Save and reshare valuable community content',
      'Create exclusive content for close friends feature',
      'DM valuable followers weekly with personalized messages',
    ],
    milestones: [
      { count: 2000, task: 'Hit 2K followers', tips: 'Launch first collaboration (dual content)', reward: 'Cross-promotion unlocked' },
      { count: 5000, task: 'First 1K-likes Reel', tips: 'Deep dive into metrics and recreate', reward: 'Viral formula found' },
      { count: 7500, task: 'Hit 7.5K followers', tips: 'Pitch first brand partnership', reward: 'Monetization near' },
      { count: 10000, task: 'PHASE UNLOCKED: 10K followers 🎉', tips: 'Reels monetization activated', reward: 'Authority phase begins' },
    ],
  },
  3: {
    name: 'Phase 3: Scaling Content',
    range: '10K → 50K',
    description: 'Viral content formula, paid promotion testing, brand deals start',
    color: '#FFB84D',
    icon: '📈',
    timeline: '6 months',
    kpis: ['Cost per follower', 'Brand deal value', 'Community size', 'Viral rate'],
    strategies: [
      'Establish signature content format (your unique angle)',
      'Partner with 5-10 influencers monthly (various tiers)',
      'Build exclusive community (Discord/Circle/Facebook Group)',
      'Launch webinar or online workshop',
      'Develop micro-course or digital product',
      'Guest post on 3-5 industry blogs monthly',
      'Create monthly branded challenge or hashtag campaign',
      'Implement paid promotion strategy (test $500-1000/month)',
      'Build affiliate program with 5-10 relevant products',
      'Start podcast or audio content series',
      'Develop merchandise or digital goods',
      'Host monthly Twitter/LinkedIn Spaces',
    ],
    contentTips: [
      'Create series content (Part 1, 2, 3+ format)',
      'Deep-dive educational content (15-20 min value)',
      'Share strong opinions on industry trends',
      'Document case studies with measurable results',
      'Create resource lists and downloadable guides',
    ],
    engagementStrategy: [
      'Reply to every comment with additional value',
      'Create exclusive Discord community for engaged followers',
      'Celebrate and feature follower wins weekly',
      'Interview followers and collaborators on Reels/IGs',
      'Curate monthly roundup of best community questions',
    ],
    milestones: [
      { count: 15000, task: 'Hit 15K followers', tips: 'Launch signature digital product', reward: 'Authority established' },
      { count: 25000, task: 'First 100K+ view Reel', tips: 'Analyze and recreate pattern', reward: 'Viral formula refined' },
      { count: 35000, task: 'Hit 35K followers', tips: 'Secure media mentions and PR', reward: 'Thought leader status' },
      { count: 50000, task: 'PHASE UNLOCKED: 50K followers 🎉', tips: 'Begin team building', reward: 'Ready to scale to empire' },
    ],
  },
  4: {
    name: 'Phase 4: Establishing Authority',
    range: '50K → 100K',
    description: 'Thought leadership, PR features, community building',
    color: '#833AB4',
    icon: '👑',
    timeline: '6 months',
    kpis: ['PR mentions', 'Revenue per follower', 'Community engagement', 'Brand partnerships'],
    strategies: [
      'Establish yourself as niche authority (speaking, PR)',
      'Build VIP inner circle of top 1% engaged followers',
      'Create mentorship tier or premium membership ($19-99/mo)',
      'Expand to 2-3 additional platforms (TikTok, YouTube, LinkedIn)',
      'Create ambassador program for loyal followers',
      'Develop B2B service offerings or consulting',
      'Create multiple digital products (courses, templates, tools)',
      'Build strategic partnerships with complementary brands',
      'Secure speaking engagements at industry events',
      'Scale paid advertising ($2,000-5,000/month budget)',
      'Build agency or consulting service arm',
      'Create certification program for your methodology',
    ],
    contentTips: [
      'Focus on quality over quantity (post less, but higher value)',
      'Create premium behind-the-scenes content',
      'Share business metrics and income transparency',
      'Write thought leadership essays (long-form)',
      'Document your scaling journey and lessons',
    ],
    engagementStrategy: [
      'Build VIP inner circle with 100-500 members',
      'Create exclusive mentorship tier ($197-997/mo)',
      'Conduct one-on-one interviews with followers',
      'Share exclusive business insights and data',
      'Build referral program for premium offerings',
    ],
    milestones: [
      { count: 60000, task: 'Hit 60K followers', tips: 'Launch premium membership tier', reward: 'Recurring revenue unlocked' },
      { count: 75000, task: '10M+ monthly impressions', tips: 'Pitch enterprise sponsorships', reward: 'Major brand deals' },
      { count: 90000, task: 'Hit 90K followers', tips: 'Diversify revenue streams', reward: 'Six-figure potential' },
      { count: 100000, task: 'PHASE UNLOCKED: 100K followers 🎉', tips: 'Begin scaling to 500K', reward: 'Empire building begins' },
    ],
  },
  5: {
    name: 'Phase 5: Mass Scale',
    range: '100K → 500K',
    description: 'Multi-platform presence, team building, media buying, product launches',
    color: '#E74C3C',
    icon: '🚀',
    timeline: '12 months',
    kpis: ['Monthly revenue', 'Team size', 'Product launches', 'Platform diversification'],
    strategies: [
      'Build content team (2-5 creators/editors)',
      'Expand to YouTube with weekly video series',
      'Build TikTok presence (mirror top Instagram content)',
      'Scale paid media budget to $5,000-15,000/month',
      'Launch flagship course or signature program',
      'Build affiliate network with 20+ partners',
      'Create media company with branded content',
      'Launch product line (digital + physical)',
      'Build B2B consulting practice',
      'Expand to speaking circuit (conferences, events)',
      'Create licensing opportunities for methodology',
      'Build strategic partnerships with major brands',
    ],
    contentTips: [
      'Create 40% educational, 40% entertaining, 20% promotional',
      'Repurpose content across 4+ platforms',
      'Create flagship series with high production value',
      'Launch monthly product drops and launches',
      'Share business scaling insights and strategies',
    ],
    engagementStrategy: [
      'Build community of 5,000+ paying members',
      'Create exclusive circle with top 0.1% followers',
      'Host monthly virtual events or retreats',
      'Build ambassador program (50+ brand ambassadors)',
      'Create customer success stories and case studies',
    ],
    milestones: [
      { count: 150000, task: 'Hit 150K followers', tips: 'Launch flagship product line', reward: 'Multi-million potential' },
      { count: 250000, task: 'Hit 250K followers', tips: 'Build full content team', reward: 'Scalable systems' },
      { count: 350000, task: 'Hit 350K followers', tips: 'Launch second digital product', reward: 'Diversified revenue' },
      { count: 500000, task: 'PHASE UNLOCKED: 500K followers 🎉', tips: 'Begin empire phase', reward: 'Ready for global expansion' },
    ],
  },
  6: {
    name: 'Phase 6: Building Empire',
    range: '500K → 1M',
    description: 'Brand licensing, media company, monetization diversification',
    color: '#F39C12',
    icon: '👑',
    timeline: '12 months',
    kpis: ['Annual revenue', 'Global reach', 'Passive income %', 'Brand value'],
    strategies: [
      'Launch personal media company (podcast, YouTube channel)',
      'Build brand licensing partnerships',
      'Create merchandise empire (apparel, accessories, goods)',
      'Develop monetization portfolio (7+ revenue streams)',
      'Expand to international markets and languages',
      'Build investment fund or venture platform',
      'Create educational institution or academy',
      'Launch premium membership at $97-297/month',
      'Build influencer network and talent agency',
      'Create documentary or content series',
      'Build IP portfolio (courses, books, products)',
      'Establish foundation or charity aligned with brand',
    ],
    contentTips: [
      'Create cinematic, high-production-value content',
      'Launch branded entertainment properties',
      'Share vision and philosophy content',
      'Document global expansion and growth',
      'Create inspirational and aspirational content',
    ],
    engagementStrategy: [
      'Build 10,000+ premium community members',
      'Create exclusive experiences and retreats',
      'Build advisory board of top followers',
      'Create wealth-building community and cohorts',
      'Celebrate collective wins and milestones',
    ],
    milestones: [
      { count: 600000, task: 'Hit 600K followers', tips: 'Launch media company brand', reward: 'Entertainment platform' },
      { count: 750000, task: 'Hit 750K followers', tips: 'Launch international expansion', reward: 'Global audience' },
      { count: 900000, task: 'Hit 900K followers', tips: 'Build investment portfolio', reward: 'Wealth building' },
      { count: 1000000, task: 'ULTIMATE: 1M followers 🏆', tips: 'You\'ve built an empire!', reward: 'Legendary status achieved' },
    ],
  },
};

export default function GrowthMilestones() {
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [showPhaseUnlock, setShowPhaseUnlock] = useState(false);
  const [unlockedPhase, setUnlockedPhase] = useState(null);

  // Try to fetch real data from Firestore
  const { data: profileData, loading } = useDocument('settings', 'profile');
  const { engine: insightsEngine, hasData } = useInsights();
  const [followerCount, setFollowerCount] = useState(0);

  // Get growth projection from insights engine
  const growthProjection = useMemo(() => {
    if (hasData && insightsEngine) {
      return insightsEngine.getGrowthProjection();
    }
    return null;
  }, [hasData, insightsEngine]);

  useEffect(() => {
    if (profileData?.followers) {
      setFollowerCount(profileData.followers);
      // Auto-select the current phase based on followers
      const phase = getCurrentPhase(profileData.followers);
      setSelectedPhase(phase);
    }
  }, [profileData]);

  const getCurrentPhase = (count) => {
    if (count < 1000) return 1;
    if (count < 10000) return 2;
    if (count < 50000) return 3;
    if (count < 100000) return 4;
    if (count < 500000) return 5;
    return 6;
  };

  const currentPhase = getCurrentPhase(followerCount);
  const phase = phases[selectedPhase];

  // Progress data for 6-phase growth chart (0 to 1M over 4 years)
  const progressData = [
    { followers: 0, date: 'Start', phase: 'Foundation' },
    { followers: 500, date: '1.5mo', phase: 'Foundation' },
    { followers: 1000, date: '3mo', phase: 'Foundation' },
    { followers: 3000, date: '6mo', phase: 'Voice' },
    { followers: 10000, date: '9mo', phase: 'Voice' },
    { followers: 25000, date: '15mo', phase: 'Scaling' },
    { followers: 50000, date: '21mo', phase: 'Scaling' },
    { followers: 75000, date: '27mo', phase: 'Authority' },
    { followers: 100000, date: '33mo', phase: 'Authority' },
    { followers: 250000, date: '45mo', phase: 'Scale' },
    { followers: 500000, date: '57mo', phase: 'Scale' },
    { followers: 750000, date: '69mo', phase: 'Empire' },
    { followers: 1000000, date: '81mo', phase: 'Empire' },
  ];

  const getPhaseProgress = () => {
    const phaseLimits = {
      1: [0, 1000],
      2: [1000, 10000],
      3: [10000, 50000],
      4: [50000, 100000],
      5: [100000, 500000],
      6: [500000, 1000000],
    };
    const [min, max] = phaseLimits[selectedPhase];
    const progress = ((followerCount - min) / (max - min)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const isPhaseUnlocked = (phaseNum) => {
    return followerCount >= Object.values(phases).slice(0, phaseNum - 1).reduce((acc, p, i) => {
      const limits = [0, 1000, 10000, 50000, 100000, 500000];
      return limits[phaseNum - 1] || 0;
    }, 0);
  };

  const handlePhaseClick = (phaseNum) => {
    const phaseMins = [0, 1000, 10000, 50000, 100000, 500000];
    if (followerCount >= phaseMins[phaseNum - 1]) {
      setSelectedPhase(phaseNum);
    } else {
      setUnlockedPhase(phaseNum);
      setShowPhaseUnlock(true);
      setTimeout(() => setShowPhaseUnlock(false), 3000);
    }
  };

  // Empty state if no Firestore data
  if (loading) {
    return (
      <div className="page growth-milestones growth-milestones-loading">
        <div className="empty-state">
          <Sparkles size={48} />
          <h2>Loading your growth journey...</h2>
        </div>
      </div>
    );
  }

  const showEmptyState = !profileData || followerCount === 0;

  if (showEmptyState) {
    return (
      <div className="page growth-milestones growth-milestones-empty">
        <div className="empty-state-container">
          <div className="empty-state-icon">
            <Rocket size={64} />
          </div>
          <h1>Connect Your Profile to Track Your Milestone Journey</h1>
          <p>Once you connect your Instagram profile, we'll automatically track your growth across all 6 phases to 1M followers.</p>
          <div className="empty-state-features">
            <div className="feature-item">
              <Award size={24} />
              <span>Real-time follower tracking</span>
            </div>
            <div className="feature-item">
              <Target size={24} />
              <span>Phase-specific strategies</span>
            </div>
            <div className="feature-item">
              <TrendingUp size={24} />
              <span>Growth timeline projection</span>
            </div>
            <div className="feature-item">
              <Crown size={24} />
              <span>Empire building roadmap</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page growth-milestones">
      <div className="growth-milestones-header">
        <div className="header-content">
          <h1>🎯 Growth Milestone Engine</h1>
          <p>Your roadmap from 0 to 1M followers</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-label">Current Followers</span>
            <span className="stat-value">{followerCount.toLocaleString()}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Current Phase</span>
            <span className="stat-value">Phase {currentPhase}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Phase Progress</span>
            <span className="stat-value">{Math.floor(getPhaseProgress())}%</span>
          </div>
        </div>
      </div>

      {showPhaseUnlock && (
        <div className="phase-unlock-notification">
          <Lock size={20} />
          <span>Unlock Phase {unlockedPhase} by reaching the required follower count</span>
        </div>
      )}

      {/* Growth Projection Card */}
      {growthProjection && (
        <div className="card mb-8" style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--color-primary)' }}>
          <div className="card-header">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
              <TrendingUp size={20} /> Your Growth Projection
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Estimated Monthly Growth</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                +{growthProjection.estimatedMonthlyGrowth}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>followers/month</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Time to Next Milestone</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                {growthProjection.estimatedTimeToNextMilestone.estimatedMonths} months
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                to {growthProjection.estimatedTimeToNextMilestone.milestone.toLocaleString()} followers
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Daily Growth Rate</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{growthProjection.growthRate}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>at current engagement</div>
            </div>
          </div>
          {growthProjection.accelerators.length > 0 && (
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ marginBottom: '8px' }}>To Accelerate Growth:</h4>
              <ul style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                {growthProjection.accelerators.slice(0, 3).map((acc, idx) => (
                  <li key={idx}>• {acc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Timeline Roadmap */}
      <div className="timeline-roadmap">
        <div className="timeline-header">
          <h2>Your Growth Journey</h2>
          <p>6 phases to build your 1M-follower empire (typical timeline: 4 years)</p>
        </div>
        <div className="timeline-grid">
          {Object.entries(phases).map(([key, p]) => {
            const phaseNum = parseInt(key);
            const isUnlocked = followerCount >= [0, 1000, 10000, 50000, 100000, 500000][phaseNum - 1];
            const isCurrent = phaseNum === currentPhase;
            return (
              <button
                key={key}
                className={`timeline-phase ${isCurrent ? 'current' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`}
                onClick={() => handlePhaseClick(phaseNum)}
                disabled={!isUnlocked && phaseNum !== selectedPhase}
              >
                <div className="phase-badge">
                  {isCurrent && <Unlock size={16} />}
                  {!isUnlocked && <Lock size={16} />}
                  <span className="badge-icon">{p.icon}</span>
                </div>
                <div className="phase-label">
                  <div className="phase-num">Phase {phaseNum}</div>
                  <div className="phase-range">{p.range}</div>
                  <div className="phase-time">{p.timeline}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Growth Chart */}
      <div className="chart-container">
        <div className="chart-header">
          <h2>Growth Timeline Projection</h2>
          <p>Expected journey from 0 to 1M followers over 4 years</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis dataKey="date" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'var(--text-primary)' }}
            />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Phase Details */}
      <div className="phase-content">
        <div className="phase-hero">
          <div className="phase-hero-icon">{phase.icon}</div>
          <div className="phase-hero-content">
            <h2>{phase.name}</h2>
            <p className="phase-hero-desc">{phase.description}</p>
            <div className="phase-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>{phase.timeline}</span>
              </div>
              <div className="meta-item">
                <Target size={16} />
                <span>{phase.range}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="progress-section">
          <h3>Your Progress in This Phase</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${getPhaseProgress()}%` }} />
            </div>
          </div>
          <div className="progress-details">
            <span>{Math.floor(getPhaseProgress())}% complete</span>
            <span>{followerCount.toLocaleString()} / {phase.range.split('→')[1]} followers</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpis-section">
          <h3>Key Performance Indicators</h3>
          <div className="kpis-grid">
            {phase.kpis.map((kpi, idx) => (
              <div key={idx} className="kpi-card">
                <Target size={20} />
                <span>{kpi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategies Grid */}
        <div className="content-grid">
          <div className="strategy-card">
            <div className="strategy-header">
              <Target size={20} />
              <h3>Key Strategies</h3>
            </div>
            <ul className="strategy-list">
              {phase.strategies.map((strategy, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} />
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="strategy-card">
            <div className="strategy-header">
              <Zap size={20} />
              <h3>Content Strategy</h3>
            </div>
            <ul className="strategy-list">
              {phase.contentTips.map((tip, idx) => (
                <li key={idx}>
                  <Sparkles size={16} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="strategy-card">
            <div className="strategy-header">
              <Heart size={20} />
              <h3>Engagement Strategy</h3>
            </div>
            <ul className="strategy-list">
              {phase.engagementStrategy.map((strategy, idx) => (
                <li key={idx}>
                  <Users size={16} />
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Milestones */}
        <div className="milestones-section">
          <h3>
            <TrendingUp size={20} />
            Phase Milestones
          </h3>
          <div className="milestones-grid">
            {phase.milestones.map((milestone, idx) => (
              <div key={idx} className="milestone-card">
                <div className="milestone-header">
                  <div className="milestone-count">{milestone.count.toLocaleString()}</div>
                  <div className="milestone-badge">
                    {currentPhase === selectedPhase && followerCount >= milestone.count && <CheckCircle2 size={16} />}
                  </div>
                </div>
                <div className="milestone-task">{milestone.task}</div>
                <div className="milestone-tip">💡 {milestone.tips}</div>
                {milestone.reward && <div className="milestone-reward">✨ {milestone.reward}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="recommendations-section">
          <h3>
            <Sparkles size={20} />
            Phase {selectedPhase} Action Plan
          </h3>
          <div className="recommendation-cards">
            {selectedPhase === 1 && (
              <>
                <div className="recommendation-card">
                  <div className="rec-icon">🌱</div>
                  <div className="rec-content">
                    <strong>Build Your Foundation (0-90 days)</strong>
                    <p>Focus on profile optimization, consistency, and building authentic audience. Reply to every comment.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">🎯</div>
                  <div className="rec-content">
                    <strong>Content Pillar Strategy</strong>
                    <p>Establish 3 core topics and create 30+ foundational posts. Use 20-25 relevant hashtags per post.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">⚡</div>
                  <div className="rec-content">
                    <strong>Daily Engagement Routine</strong>
                    <p>Spend 2+ hours engaging with 50+ accounts in your niche daily. Build genuine relationships first.</p>
                  </div>
                </div>
              </>
            )}
            {selectedPhase === 2 && (
              <>
                <div className="recommendation-card">
                  <div className="rec-icon">🎬</div>
                  <div className="rec-content">
                    <strong>Master Reels (50%+ of content)</strong>
                    <p>Reels get 67% more engagement. Create signature weekly series same day/time. Use trending sounds.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">🤝</div>
                  <div className="rec-content">
                    <strong>Strategic Collaborations</strong>
                    <p>Partner with 2-3 micro-influencers (1-10K range) monthly. Dual content = audience expansion.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">📊</div>
                  <div className="rec-content">
                    <strong>Find Your Viral Formula</strong>
                    <p>Analyze top 10 posts. Identify hook patterns. Go live 2x weekly. Test different posting times.</p>
                  </div>
                </div>
              </>
            )}
            {selectedPhase === 3 && (
              <>
                <div className="recommendation-card">
                  <div className="rec-icon">💰</div>
                  <div className="rec-content">
                    <strong>Start Monetization</strong>
                    <p>Launch digital product, affiliate program, and brand partnerships. Monetize at 10K followers.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">🌍</div>
                  <div className="rec-content">
                    <strong>Multi-Platform Expansion</strong>
                    <p>Repurpose content to TikTok and YouTube for 3-5x views. Expand reach beyond Instagram.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">👑</div>
                  <div className="rec-content">
                    <strong>Establish Authority</strong>
                    <p>Build exclusive community, create webinars, share thought leadership. Position as expert.</p>
                  </div>
                </div>
              </>
            )}
            {selectedPhase === 4 && (
              <>
                <div className="recommendation-card">
                  <div className="rec-icon">🎓</div>
                  <div className="rec-content">
                    <strong>Thought Leadership</strong>
                    <p>Share strong opinions, get media features, speak at events. Build VIP inner circle of 100-500.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">💎</div>
                  <div className="rec-content">
                    <strong>Premium Membership Tier</strong>
                    <p>Launch $19-99/month membership. Create exclusive content, mentorship, and community.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">🚀</div>
                  <div className="rec-content">
                    <strong>Scale to Multiple Platforms</strong>
                    <p>Build YouTube presence, TikTok channel, LinkedIn authority. Scale paid ads to $2-5K/month.</p>
                  </div>
                </div>
              </>
            )}
            {selectedPhase === 5 && (
              <>
                <div className="recommendation-card">
                  <div className="rec-icon">👥</div>
                  <div className="rec-content">
                    <strong>Build Your Content Team</strong>
                    <p>Hire 2-5 creators/editors. Build scalable content systems. Focus on strategy, not execution.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">🎥</div>
                  <div className="rec-content">
                    <strong>Launch Media Company</strong>
                    <p>Create YouTube channel, podcast, branded entertainment. Own multiple platforms and distribution.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">💼</div>
                  <div className="rec-content">
                    <strong>Scale Paid Media</strong>
                    <p>Budget $5-15K/month on ads. Test products, courses, merchandise. Launch monthly product drops.</p>
                  </div>
                </div>
              </>
            )}
            {selectedPhase === 6 && (
              <>
                <div className="recommendation-card">
                  <div className="rec-icon">🏆</div>
                  <div className="rec-content">
                    <strong>Build Your Empire</strong>
                    <p>Create 7+ revenue streams. Launch merchandise, licensing deals, media company. Think global.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">🌐</div>
                  <div className="rec-content">
                    <strong>Global Expansion</strong>
                    <p>Expand to international markets, create localized content, build global brand. 10K+ paid members.</p>
                  </div>
                </div>
                <div className="recommendation-card">
                  <div className="rec-icon">💡</div>
                  <div className="rec-content">
                    <strong>Legacy Building</strong>
                    <p>Launch academy/certification, create IP portfolio, write book, start foundation. Create lasting impact.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="phase-cta">
          <h3>Ready to execute?</h3>
          <p>Your next milestone is waiting. Focus on the strategies above and track your progress.</p>
        </div>
      </div>
    </div>
  );
}
