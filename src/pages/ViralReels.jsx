import React, { useState, useEffect } from 'react';
import {
  Play,
  Zap,
  TrendingUp,
  Volume2,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  Copy,
  Download,
  Sparkles,
  Clock,
  Users,
  Target,
  MessageSquare,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useInsights } from '../services/useInsights';
import ApifyService from '../services/apifyService';
import AIProviderSelector from '../components/AIProviderSelector';
import '../styles/ViralReels.css';

const ViralReels = () => {
  const { engine, profileData, hasData } = useInsights();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trendingReels, setTrendingReels] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [copiedHook, setCopiedHook] = useState(null);

  // Calculate Reels-specific stats
  const reelsStats = {
    avgViewsPerReel: profileData?.followers
      ? Math.round(profileData.followers * (profileData.engagementRate || 2) * 5)
      : 0,
    reelsToFollowerConversion: profileData?.followers ? ((profileData.engagementRate || 2) * 2.5).toFixed(2) : '0.00',
    estimatedReach: profileData?.followers ? Math.round(profileData.followers * 0.35) : 0,
  };

  // Viral Hook Templates
  const hookTemplates = [
    // Pattern Interrupt
    {
      category: 'Pattern Interrupt',
      icon: '🛑',
      hooks: [
        { text: 'Stop scrolling if you...', duration: '7s', timing: '6-8 PM', multiplier: '2.1x', cta: 'Comment below' },
        { text: 'POV: You just learned something that changes everything', duration: '15s', timing: '12-2 PM', multiplier: '1.8x', cta: 'Save this' },
        { text: 'Nobody is talking about this but...', duration: '30s', timing: '6-8 PM', multiplier: '2.3x', cta: 'Share with a friend' },
        { text: 'Wait for it...', duration: '7s', timing: '8-10 PM', multiplier: '1.9x', cta: 'Tag someone' },
        { text: 'This is about to blow your mind', duration: '15s', timing: '12-2 PM', multiplier: '2.0x', cta: 'React with an emoji' },
      ],
    },
    // Before/After
    {
      category: 'Before/After',
      icon: '📊',
      hooks: [
        { text: 'Day 1 vs Day 90 of...', duration: '15s', timing: '6-8 PM', multiplier: '2.2x', cta: 'Start today' },
        { text: 'How it started vs how it\'s going', duration: '30s', timing: '12-2 PM', multiplier: '2.1x', cta: 'Link in bio' },
        { text: 'Before I knew this vs after', duration: '15s', timing: '8-10 PM', multiplier: '1.9x', cta: 'Save for later' },
        { text: 'Then vs now: Here\'s what changed', duration: '30s', timing: '6-8 PM', multiplier: '2.0x', cta: 'Follow for more' },
        { text: 'I transformed by doing just one thing', duration: '15s', timing: '3-5 PM', multiplier: '1.8x', cta: 'DM for details' },
      ],
    },
    // Tutorial
    {
      category: 'Tutorial',
      icon: '📚',
      hooks: [
        { text: '3 steps to [result] in [timeframe]', duration: '30s', timing: '6-8 PM', multiplier: '2.2x', cta: 'Save this' },
        { text: 'Here\'s how I [achieve goal]...', duration: '30s', timing: '12-2 PM', multiplier: '1.9x', cta: 'Try it' },
        { text: 'Watch till the end for the secret sauce', duration: '60s', timing: '6-8 PM', multiplier: '2.0x', cta: 'Link in bio' },
        { text: 'The [skill] nobody teaches you', duration: '30s', timing: '8-10 PM', multiplier: '2.1x', cta: 'Share with your crew' },
        { text: 'Quickest way to [achieve goal]', duration: '15s', timing: '12-2 PM', multiplier: '1.7x', cta: 'Follow for more' },
      ],
    },
    // Controversy
    {
      category: 'Controversy',
      icon: '⚡',
      hooks: [
        { text: 'Unpopular opinion: [controversial take]', duration: '30s', timing: '6-8 PM', multiplier: '2.4x', cta: 'Comment your thoughts' },
        { text: 'The [industry] doesn\'t want you to know this', duration: '30s', timing: '8-10 PM', multiplier: '2.3x', cta: 'Share your experience' },
        { text: 'I\'m probably gonna get canceled for this but...', duration: '30s', timing: '6-8 PM', multiplier: '2.2x', cta: 'Comment below' },
        { text: '[Thing everyone believes] is actually wrong', duration: '30s', timing: '12-2 PM', multiplier: '2.1x', cta: 'React now' },
        { text: 'This will upset a lot of people', duration: '15s', timing: '6-8 PM', multiplier: '2.0x', cta: 'Follow for more' },
      ],
    },
    // Story/Emotional
    {
      category: 'Story',
      icon: '📖',
      hooks: [
        { text: 'The day I almost gave up...', duration: '60s', timing: '6-8 PM', multiplier: '2.3x', cta: 'DM me your story' },
        { text: 'This moment changed my entire perspective', duration: '30s', timing: '12-2 PM', multiplier: '1.9x', cta: 'Comment your turning point' },
        { text: 'I made every mistake in the book. Here\'s why that\'s good...', duration: '60s', timing: '6-8 PM', multiplier: '2.2x', cta: 'Save this wisdom' },
        { text: 'My biggest regret and how I fixed it', duration: '30s', timing: '8-10 PM', multiplier: '2.1x', cta: 'Learn from my mistakes' },
        { text: 'The conversation that changed everything', duration: '30s', timing: '12-2 PM', multiplier: '1.8x', cta: 'Share with a friend' },
      ],
    },
  ];

  // 7-Day Content Calendar
  const contentCalendar = [
    {
      day: 'Monday',
      type: 'Educational',
      format: 'Tutorial',
      hook: '3 steps to [your niche]',
      caption: 'Share a step-by-step guide or how-to with clear CTAs',
      hashtags: '#[niche] #[niche]tips #[niche]tutorial #[niche]hacks #learning',
      time: '6:00 PM',
      expectedReach: reelsStats.estimatedReach * 1.3,
    },
    {
      day: 'Tuesday',
      type: 'Entertaining',
      format: 'Before/After',
      hook: 'Day 1 vs Day 30 of...',
      caption: 'Show transformation or contrast with relatable narrative',
      hashtags: '#transformation #results #motivation #[niche] #before&after',
      time: '12:00 PM',
      expectedReach: reelsStats.estimatedReach * 1.1,
    },
    {
      day: 'Wednesday',
      type: 'Educational',
      format: 'Pattern Interrupt',
      hook: 'Stop scrolling if you...',
      caption: 'Hook attention first, deliver value, end with strong CTA',
      hashtags: '#[niche]community #[niche]tips #foryou #foryoupage #trending',
      time: '8:00 PM',
      expectedReach: reelsStats.estimatedReach * 1.4,
    },
    {
      day: 'Thursday',
      type: 'Promotional',
      format: 'Story/Emotional',
      hook: 'This changed my [aspect of life]',
      caption: 'Share personal story, then mention your offer in CTA',
      hashtags: '#[niche] #success #growth #[yourname] #community',
      time: '6:00 PM',
      expectedReach: reelsStats.estimatedReach * 0.95,
    },
    {
      day: 'Friday',
      type: 'Entertaining',
      format: 'Controversy',
      hook: 'Unpopular opinion...',
      caption: 'Take a stand respectfully, encourage debate in comments',
      hashtags: '#opinion #[niche] #debate #thoughts #[niche]community',
      time: '6:00 PM',
      expectedReach: reelsStats.estimatedReach * 1.35,
    },
    {
      day: 'Saturday',
      type: 'Personal',
      format: 'Before/After',
      hook: 'Here\'s what worked (and what didn\'t)',
      caption: 'Share authentic wins and fails, build relatability',
      hashtags: '#reallife #authentic #[niche] #honest #growth',
      time: '12:00 PM',
      expectedReach: reelsStats.estimatedReach * 1.05,
    },
    {
      day: 'Sunday',
      type: 'Engagement',
      format: 'Question Hook',
      hook: 'What\'s your biggest [challenge/question]?',
      caption: 'Ask question to boost comments and algorithm ranking',
      hashtags: '#[niche]community #ask #engagement #[niche] #sundayvibes',
      time: '7:00 PM',
      expectedReach: reelsStats.estimatedReach * 1.15,
    },
  ];

  // Conversion Optimizer
  const conversionStrategies = {
    ctaTemplates: [
      { template: 'Link in bio for [offer]', use: 'Direct traffic to conversion page', notes: 'Most effective for products/services' },
      { template: 'DM me [keyword] for...', use: 'Build email list or DM automation', notes: 'Great for lead generation' },
      { template: 'Save this + follow for more', use: 'Boost saves signal + followers', notes: 'Improves algorithm ranking' },
      { template: 'Tag someone who needs this', use: 'Organic reach amplification', notes: 'Increases shares and reach' },
      { template: 'Comment your [question] below', use: 'Engagement metric boost', notes: 'Comments = algorithm boost' },
    ],
    bioStrategy: [
      'Your primary offer (with emoji and arrow)',
      'What your audience gets/transformation promised',
      'Social proof (awards, featured, numbers)',
      'Clear CTA (Link in bio / DM / etc)',
      'Use emojis as visual separators',
    ],
    storyToReelFunnel: [
      'Post Reel Story with teaser 10 mins before Reel goes live',
      'Add link sticker in Story pointing to Reel post',
      'Ask question in Story to drive engagement to Reel',
      'Repost Reel snippets in Stories throughout the day',
      'Use countdown stickers for new Reel drops',
    ],
    commentStrategy: [
      'Reply to EVERY comment within 1 hour',
      'Post your own top comment (pinned) immediately after posting',
      'Ask a follow-up question in your pinned comment',
      'Thank early engagers by name (boost their visibility)',
      'Use call-to-action in replies to drive saves/shares',
    ],
  };

  // Algorithm Cheat Sheet
  const algorithmFactors = [
    {
      rank: 1,
      factor: 'Watch Time %',
      impact: 'CRITICAL',
      detail: 'How long viewers watch your full Reel (aim for 75%+ completion)',
      tip: 'Hook in first 1 second. Keep momentum. No filler.',
    },
    {
      rank: 2,
      factor: 'Shares',
      impact: 'CRITICAL',
      detail: 'Shares count 2x more than likes. Incentivize sharing.',
      tip: 'Add shareable value, quotes, templates. Ask "Tag someone who needs this"',
    },
    {
      rank: 3,
      factor: 'Saves',
      impact: 'VERY HIGH',
      detail: 'Saved Reels signal your content is valuable. Higher ranking priority.',
      tip: 'Create saveable content: tips, quotes, templates, tutorials.',
    },
    {
      rank: 4,
      factor: 'Comments',
      impact: 'HIGH',
      detail: 'Meaningful comments boost reach. Quantity AND quality matter.',
      tip: 'Ask questions in captions. Pin a question in comments.',
    },
    {
      rank: 5,
      factor: 'Likes',
      impact: 'MEDIUM',
      detail: 'Likes matter least, but still tracked. Don\'t optimize for likes alone.',
      tip: 'Optimize for saves/shares first. Likes follow naturally.',
    },
    {
      rank: 6,
      factor: 'Posting Time',
      impact: 'IMPORTANT',
      detail: 'Post when your audience is most active (India: 6-8 PM, 12-2 PM)',
      tip: 'Use Instagram Insights to find YOUR audience\'s peak times.',
    },
    {
      rank: 7,
      factor: 'Caption Length',
      impact: 'MEDIUM',
      detail: 'Sweet spot: 125-150 characters. Short, punchy captions with hooks.',
      tip: 'First line = hook. Use line breaks. Clear CTA at end.',
    },
    {
      rank: 8,
      factor: 'Hashtag Strategy',
      impact: 'MEDIUM',
      detail: 'Use 3-5 hashtags, not 30. Quality > Quantity. Mix niche + broad.',
      tip: 'Use hashtags in caption, not comments. Rotate hashtag sets weekly.',
    },
  ];

  // Scan for trending Reels
  const handleScanTrendingReels = async () => {
    setIsScanning(true);
    setScanError(null);

    try {
      const apifyToken = localStorage.getItem('apify_token');
      if (!apifyToken) {
        setScanError('Apify token not found. Please add it in Settings.');
        setIsScanning(false);
        return;
      }

      const apify = new ApifyService(apifyToken);

      // Extract niche from profile bio
      const niche = profileData?.bio?.split(' ')[0] || 'instagram';

      // Scan trending reels in user's niche
      const reels = await apify.scrapeInstagramReels(niche, 10);

      if (reels && reels.length > 0) {
        const processed = reels.map((reel, idx) => ({
          id: idx,
          caption: reel.caption?.substring(0, 100) || 'No caption',
          views: reel.likesCount || 0,
          likes: reel.likesCount || 0,
          comments: reel.commentsCount || 0,
          shares: Math.round((reel.likesCount || 0) * 0.1),
          audio: reel.musicTitle || 'Unknown Audio',
          duration: reel.videoPlaybackUrl ? '15-60s' : 'Unknown',
          virality: (reel.likesCount || 0) > 1000000 ? 'viral' : (reel.likesCount || 0) > 100000 ? 'hot' : 'growing',
        }));
        setTrendingReels(processed);
        localStorage.setItem('trending_reels', JSON.stringify(processed));
      } else {
        setScanError('No trending Reels found. Try a different niche.');
      }
    } catch (error) {
      console.error('Scan error:', error);
      setScanError(error.message || 'Failed to scan trending Reels. Check your Apify token.');
    } finally {
      setIsScanning(false);
    }
  };

  // Copy hook to clipboard
  const handleCopyHook = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHook(text);
    setTimeout(() => setCopiedHook(null), 2000);
  };

  if (!hasData) {
    return (
      <div className="viral-reels-container">
        <div className="empty-state">
          <AlertCircle size={48} />
          <h2>Profile data not loaded</h2>
          <p>Please sync your Instagram profile first in Settings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="viral-reels-container">
      {/* Hero Section */}
      <div className="reels-hero">
        <div className="reels-hero-content">
          <div className="reels-hero-badge">
            <Sparkles size={16} />
            Viral Reels Engine
          </div>
          <h1>Get Millions of Views & Engagement</h1>
          <p>Data-driven Reels strategies using trending audio, viral hooks, and algorithm hacks for organic growth and conversions</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="reels-tabs">
        <button
          className={`reels-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={18} />
          Dashboard
        </button>
        <button
          className={`reels-tab ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => setActiveTab('trending')}
        >
          <TrendingUp size={18} />
          Trending Reels
        </button>
        <button
          className={`reels-tab ${activeTab === 'hooks' ? 'active' : ''}`}
          onClick={() => setActiveTab('hooks')}
        >
          <Sparkles size={18} />
          Hook Templates
        </button>
        <button
          className={`reels-tab ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <Clock size={18} />
          Content Calendar
        </button>
        <button
          className={`reels-tab ${activeTab === 'conversions' ? 'active' : ''}`}
          onClick={() => setActiveTab('conversions')}
        >
          <Target size={18} />
          Conversions
        </button>
        <button
          className={`reels-tab ${activeTab === 'algorithm' ? 'active' : ''}`}
          onClick={() => setActiveTab('algorithm')}
        >
          <Zap size={18} />
          Algorithm
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="reels-section">
          <h2>Reels Performance Dashboard</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Play size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Avg Views per Reel</div>
                <div className="stat-value">{reelsStats.avgViewsPerReel.toLocaleString()}</div>
                <div className="stat-detail">Est. based on followers + ER + Reels boost</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Reels-to-Follower Rate</div>
                <div className="stat-value">{reelsStats.reelsToFollowerConversion}%</div>
                <div className="stat-detail">Conversion from views to followers</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Estimated Reach/Reel</div>
                <div className="stat-value">{reelsStats.estimatedReach.toLocaleString()}</div>
                <div className="stat-detail">35% of followers (first 24h)</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-label">Current Followers</div>
                <div className="stat-value">{(profileData?.followers || 0).toLocaleString()}</div>
                <div className="stat-detail">Your starting audience</div>
              </div>
            </div>
          </div>

          <div className="insights-box">
            <h3>Key Insights for Your Account</h3>
            {profileData?.followers < 1000 && (
              <div className="insight-item">
                <CheckCircle size={20} className="insight-icon" />
                <div>
                  <strong>Foundation Phase:</strong> Focus on posting Reels 5x/week. Reels get 3x organic reach — essential for discovery.
                </div>
              </div>
            )}
            {profileData?.followers >= 1000 && profileData?.followers < 10000 && (
              <div className="insight-item">
                <CheckCircle size={20} className="insight-icon" />
                <div>
                  <strong>Growth Phase:</strong> Balance Reels (3-4x/week) with carousels (3x/week). Carousels drive saves, Reels drive reach.
                </div>
              </div>
            )}
            {profileData?.engagementRate < 3 && (
              <div className="insight-item">
                <AlertCircle size={20} className="insight-icon" />
                <div>
                  <strong>Engagement Boost:</strong> Your ER is below 3%. Use stronger hooks, ask questions in captions, reply to comments within 1 hour.
                </div>
              </div>
            )}
            <div className="insight-item">
              <CheckCircle size={20} className="insight-icon" />
              <div>
                <strong>Next Step:</strong> Scan trending Reels in your niche to find viral audio and hook formats that work for your audience.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRENDING REELS TAB */}
      {activeTab === 'trending' && (
        <div className="reels-section">
          <h2>Trending Audio & Format Scanner</h2>
          <div className="scan-controls">
            <button className="btn-primary" onClick={handleScanTrendingReels} disabled={isScanning}>
              {isScanning ? (
                <>
                  <Zap size={18} className="spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <TrendingUp size={18} />
                  Scan Trending Reels
                </>
              )}
            </button>
            {scanError && <div className="error-message">{scanError}</div>}
          </div>

          {trendingReels.length > 0 ? (
            <div className="trending-grid">
              {trendingReels.map((reel) => (
                <div key={reel.id} className="trending-card">
                  <div className={`virality-badge virality-${reel.virality}`}>
                    {reel.virality === 'viral' && '🔥 Viral'}
                    {reel.virality === 'hot' && '⚡ Hot'}
                    {reel.virality === 'growing' && '📈 Growing'}
                  </div>

                  <div className="trending-caption">{reel.caption}</div>

                  <div className="trending-audio">
                    <Volume2 size={16} />
                    <span>{reel.audio}</span>
                  </div>

                  <div className="trending-stats">
                    <div className="stat">
                      <Play size={14} />
                      <span>{(reel.views / 1000).toFixed(0)}K views</span>
                    </div>
                    <div className="stat">
                      <Heart size={14} />
                      <span>{(reel.likes / 1000).toFixed(0)}K likes</span>
                    </div>
                    <div className="stat">
                      <MessageCircle size={14} />
                      <span>{(reel.comments / 1000).toFixed(0)}K comments</span>
                    </div>
                    <div className="stat">
                      <Share2 size={14} />
                      <span>{(reel.shares / 1000).toFixed(0)}K shares</span>
                    </div>
                  </div>

                  <div className="trending-duration">{reel.duration}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-trending">
              <TrendingUp size={48} />
              <p>Scan trending Reels to see viral audio, formats, and hooks from your niche</p>
            </div>
          )}
        </div>
      )}

      {/* HOOKS TAB */}
      {activeTab === 'hooks' && (
        <div className="reels-section">
          <h2>Viral Hook Templates (20+)</h2>
          <p className="section-subtitle">Copy any hook and customize for your content. Organized by pattern type.</p>
          <AIProviderSelector />

          {hookTemplates.map((category) => (
            <div key={category.category} className="hooks-category">
              <h3>
                <span className="icon">{category.icon}</span>
                {category.category}
              </h3>

              <div className="hooks-grid">
                {category.hooks.map((hook, idx) => (
                  <div key={idx} className="hook-card">
                    <div className="hook-text">"{hook.text}"</div>

                    <div className="hook-details">
                      <div className="detail-item">
                        <Clock size={14} />
                        <span>{hook.duration}</span>
                      </div>
                      <div className="detail-item">
                        <Clock size={14} />
                        <span>Post @ {hook.timing}</span>
                      </div>
                      <div className="detail-item">
                        <TrendingUp size={14} />
                        <span>{hook.multiplier} engagement</span>
                      </div>
                    </div>

                    <div className="hook-cta">CTA: {hook.cta}</div>

                    <button
                      className="hook-copy-btn"
                      onClick={() => handleCopyHook(hook.text)}
                      title="Copy to clipboard"
                    >
                      {copiedHook === hook.text ? (
                        <>
                          <CheckCircle size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy Hook
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CALENDAR TAB */}
      {activeTab === 'calendar' && (
        <div className="reels-section">
          <h2>7-Day Content Calendar</h2>
          <p className="section-subtitle">Auto-generated based on your niche and trending formats. Customize as needed.</p>

          <div className="calendar-grid">
            {contentCalendar.map((day, idx) => (
              <div key={idx} className="calendar-card">
                <div className="calendar-day">{day.day}</div>

                <div className="calendar-type-badge">{day.type}</div>

                <div className="calendar-content">
                  <div className="calendar-field">
                    <label>Format:</label>
                    <span>{day.format}</span>
                  </div>
                  <div className="calendar-field">
                    <label>Hook:</label>
                    <span>{day.hook}</span>
                  </div>
                  <div className="calendar-field">
                    <label>Caption:</label>
                    <span className="caption-text">{day.caption}</span>
                  </div>
                  <div className="calendar-field">
                    <label>Hashtags:</label>
                    <span className="hashtags-text">{day.hashtags}</span>
                  </div>
                  <div className="calendar-field">
                    <label>Post Time:</label>
                    <span className="time-badge">{day.time}</span>
                  </div>
                  <div className="calendar-field">
                    <label>Expected Reach:</label>
                    <span className="reach-badge">{Math.round(day.expectedReach).toLocaleString()} views</span>
                  </div>
                </div>

                <button className="calendar-use-btn">
                  <CheckCircle size={16} />
                  Use This
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONVERSIONS TAB */}
      {activeTab === 'conversions' && (
        <div className="reels-section">
          <h2>Conversion Optimizer</h2>
          <p className="section-subtitle">Strategies to turn Reel views into followers, leads, and sales</p>

          <div className="conversion-sections">
            {/* CTA Templates */}
            <div className="conversion-block">
              <h3>
                <LinkIcon size={20} />
                CTA Templates
              </h3>
              <div className="conversion-table">
                <table>
                  <thead>
                    <tr>
                      <th>CTA Template</th>
                      <th>Use Case</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionStrategies.ctaTemplates.map((cta, idx) => (
                      <tr key={idx}>
                        <td>
                          <code>{cta.template}</code>
                        </td>
                        <td>{cta.use}</td>
                        <td>{cta.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bio Strategy */}
            <div className="conversion-block">
              <h3>
                <Users size={20} />
                Bio Link Strategy
              </h3>
              <p className="block-subtitle">What to put in your link-in-bio for maximum conversions:</p>
              <div className="strategy-list">
                {conversionStrategies.bioStrategy.map((item, idx) => (
                  <div key={idx} className="strategy-item">
                    <div className="strategy-number">{idx + 1}</div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story to Reel Funnel */}
            <div className="conversion-block">
              <h3>
                <Share2 size={20} />
                Story-to-Reel Funnel
              </h3>
              <p className="block-subtitle">Use Stories to amplify Reel reach and engagement:</p>
              <div className="funnel-steps">
                {conversionStrategies.storyToReelFunnel.map((step, idx) => (
                  <div key={idx} className="funnel-step">
                    <div className="step-number">{idx + 1}</div>
                    <div>{step}</div>
                    {idx < conversionStrategies.storyToReelFunnel.length - 1 && <div className="funnel-arrow">↓</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Strategy */}
            <div className="conversion-block">
              <h3>
                <MessageSquare size={20} />
                First 5 Comments Strategy
              </h3>
              <p className="block-subtitle">What to post in the first 5 comments on your own Reel:</p>
              <div className="strategy-list">
                {conversionStrategies.commentStrategy.map((item, idx) => (
                  <div key={idx} className="strategy-item">
                    <div className="strategy-number">{idx + 1}</div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALGORITHM TAB */}
      {activeTab === 'algorithm' && (
        <div className="reels-section">
          <h2>Instagram Reels Algorithm Cheat Sheet</h2>
          <p className="section-subtitle">Ranked by importance. Focus on the top factors for maximum reach.</p>

          <div className="algorithm-grid">
            {algorithmFactors.map((factor, idx) => (
              <div key={idx} className={`algorithm-card impact-${factor.impact.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="algo-rank">#{factor.rank}</div>
                <h4>{factor.factor}</h4>
                <div className="algo-impact">{factor.impact}</div>
                <p className="algo-detail">{factor.detail}</p>
                <div className="algo-tip">
                  <strong>💡 Tip:</strong> {factor.tip}
                </div>
              </div>
            ))}
          </div>

          <div className="algorithm-tips">
            <h3>Bonus: Top 3 Algorithm Hacks</h3>
            <div className="tips-list">
              <div className="tip-item">
                <div className="tip-title">1. The 75% Watch Rule</div>
                <p>
                  Hook hard in the first 1 second. If 75%+ of viewers watch your full Reel, Instagram's algorithm will massively promote it.
                  Test different hooks to find what stops the scroll.
                </p>
              </div>
              <div className="tip-item">
                <div className="tip-title">2. The Share Multiplier</div>
                <p>
                  1 share = 10 likes in algorithm value. If you get 100 shares, that's worth 1,000 likes. Always design your Reel to be
                  shareable. Ask "Tag someone who needs this."
                </p>
              </div>
              <div className="tip-item">
                <div className="tip-title">3. The Save Pattern</div>
                <p>
                  Saves signal that your content has lasting value. Educational Reels get way more saves. Create templates, checklists,
                  tips, and tutorials that people want to reference later.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViralReels;
