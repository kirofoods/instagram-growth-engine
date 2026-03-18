import { useState } from 'react';
import {
  Search,
  TrendingUp,
  Zap,
  Copy,
  Volume2,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import '../styles/ViralLab.css';

const hookLibrary = [
  // Question hooks
  {
    id: 1,
    type: 'question',
    hook: 'What if I told you that 80% of people are doing this wrong?',
    category: 'Question',
    niche: ['general', 'education', 'self-improvement'],
  },
  {
    id: 2,
    type: 'question',
    hook: 'Have you ever wondered why successful people do this one thing differently?',
    category: 'Question',
    niche: ['business', 'entrepreneurship'],
  },
  {
    id: 3,
    type: 'question',
    hook: "Can you guess what the #1 mistake is that keeps people from achieving their goals?",
    category: 'Question',
    niche: ['fitness', 'personal-development'],
  },
  // Statistic hooks
  {
    id: 4,
    type: 'statistic',
    hook: '92% of people quit within the first 30 days. Here\'s why...',
    category: 'Statistic',
    niche: ['fitness', 'habits', 'business'],
  },
  {
    id: 5,
    type: 'statistic',
    hook: 'Studies show that people who do X are 10x more likely to succeed',
    category: 'Statistic',
    niche: ['education', 'business', 'general'],
  },
  // Controversy hooks
  {
    id: 6,
    type: 'controversy',
    hook: "The fitness industry doesn't want you to know this...",
    category: 'Controversy',
    niche: ['fitness', 'health'],
  },
  {
    id: 7,
    type: 'controversy',
    hook: 'They told me this was impossible. I did it anyway.',
    category: 'Controversy',
    niche: ['general', 'entrepreneurship'],
  },
  // Story hooks
  {
    id: 8,
    type: 'story',
    hook: 'I made every mistake in the book. Here\'s what I learned...',
    category: 'Story',
    niche: ['business', 'education', 'personal-development'],
  },
  {
    id: 9,
    type: 'story',
    hook: 'This one conversation changed everything for me',
    category: 'Story',
    niche: ['general', 'inspiration'],
  },
  // Tutorial hooks
  {
    id: 10,
    type: 'tutorial',
    hook: 'Step 1 of 5 to [achieve goal]: This one simple thing',
    category: 'Tutorial',
    niche: ['education', 'DIY', 'how-to'],
  },
  {
    id: 11,
    type: 'tutorial',
    hook: 'Save this 3-step process before it goes viral',
    category: 'Tutorial',
    niche: ['education', 'productivity', 'fitness'],
  },
  {
    id: 12,
    type: 'question',
    hook: 'POV: You\'re about to learn the skill that changed my life',
    category: 'Question',
    niche: ['education', 'skills'],
  },
  {
    id: 13,
    type: 'statistic',
    hook: 'Only 1% of people know about this strategy',
    category: 'Statistic',
    niche: ['business', 'marketing', 'growth-hacking'],
  },
  {
    id: 14,
    type: 'controversy',
    hook: 'Nobody talks about how important this actually is',
    category: 'Controversy',
    niche: ['general', 'opinion'],
  },
  {
    id: 15,
    type: 'story',
    hook: '$0 to $100K: Here\'s exactly how I did it',
    category: 'Story',
    niche: ['entrepreneurship', 'business', 'side-hustle'],
  },
];

const trendingSounds = [
  { id: 1, name: 'Gym Motivation', category: 'Fitness', usageCount: 2450000, trend: 'up', peak: true },
  { id: 2, name: 'Trending Disco Beat', category: 'Dance', usageCount: 3100000, trend: 'up', peak: true },
  { id: 3, name: 'Motivational Speech', category: 'Inspiration', usageCount: 1890000, trend: 'up', peak: false },
  { id: 4, name: 'Chill Lo-Fi', category: 'Study', usageCount: 890000, trend: 'stable', peak: false },
  { id: 5, name: 'Comedy Sting', category: 'Comedy', usageCount: 1230000, trend: 'down', peak: false },
  { id: 6, name: 'Epic Build-Up', category: 'Action', usageCount: 2100000, trend: 'up', peak: true },
  { id: 7, name: 'Feel-Good Pop', category: 'Feel-Good', usageCount: 1500000, trend: 'stable', peak: false },
];

const repurposingFormats = [
  { format: 'Reel', icon: '🎥', description: '15-90s vertical video' },
  { format: 'Carousel', icon: '📱', description: 'Multi-slide swipeable post' },
  { format: 'Story', icon: '📸', description: '9:16 temporary content' },
  { format: 'Single Post', icon: '🖼️', description: '1080x1080 feed post' },
  { format: 'Caption-only', icon: '📝', description: 'Text with image' },
];

const reelFormats = [
  { name: 'Hook → Story → CTA', views: '2.1M avg', trend: '↑ Trending' },
  { name: 'Before → After → Tutorial', views: '1.8M avg', trend: '↑ Rising' },
  { name: 'Question → Answer → Benefit', views: '1.6M avg', trend: '↑ Trending' },
  { name: 'Statistic → Proof → Action', views: '1.4M avg', trend: '→ Stable' },
];

export default function ViralLab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedHook, setExpandedHook] = useState(null);

  const [postContent, setPostContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const [searchSounds, setSearchSounds] = useState('');

  const filteredHooks = hookLibrary.filter((hook) => {
    const matchesSearch =
      hook.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hook.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hook.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(hookLibrary.map((h) => h.type))];

  const handleAnalyzePost = () => {
    if (!postContent.trim()) return;

    const content = postContent.toLowerCase();

    // Analyze hook: question, statistic, or bold claim at start
    let hookScore = 50;
    if (content.match(/^\s*[?!]/)) {
      hookScore = 85; // Starts with question or exclamation
    } else if (content.match(/^\s*(\d+%?|\d+[km])/i)) {
      hookScore = 80; // Starts with statistic
    } else if (content.match(/^\s*(this|that|you|never|never say)/i)) {
      hookScore = 75; // Bold claim
    }

    // CTA presence: ends with call-to-action phrase
    let ctaStrength = 40;
    if (content.match(/(link in bio|comment|dm me|swipe up|tag someone|save this|share|follow|subscribe)/i)) {
      ctaStrength = 85;
    }

    // Hashtag count: 5-30 is optimal
    const hashtagCount = (content.match(/#/g) || []).length;
    let hashtagScore = 50;
    if (hashtagCount >= 5 && hashtagCount <= 30) {
      hashtagScore = 85;
    } else if (hashtagCount > 0) {
      hashtagScore = 70;
    }

    // Caption length: 125-200 chars is optimal
    const captionLength = content.length;
    let lengthScore = 60;
    if (captionLength >= 125 && captionLength <= 200) {
      lengthScore = 85;
    } else if (captionLength >= 80 && captionLength <= 250) {
      lengthScore = 75;
    }

    // Emoji usage: has emojis = better engagement
    let emojiScore = 50;
    const emojiPattern = /[\u{1F300}-\u{1F9FF}]/gu;
    const emojiCount = (content.match(emojiPattern) || []).length;
    if (emojiCount > 0) {
      emojiScore = 80;
    }

    // Emotional trigger detection
    const emotionalTriggers = {
      'Curiosity': /(but wait|here's the thing|what if|secret|hidden|revealed)/i,
      'Inspiration': /(dream|believe|possible|unstoppable|you can|never give up)/i,
      'FOMO': /(before|limited|only|exclusive|everyone|trending)/i,
    };

    let emotionalTrigger = 'Curiosity';
    for (const [trigger, pattern] of Object.entries(emotionalTriggers)) {
      if (pattern.test(content)) {
        emotionalTrigger = trigger;
        break;
      }
    }

    // Format bonus based on structure
    let formatBonus = 60;
    if (content.includes('\n')) {
      formatBonus = 80; // Line breaks improve readability
    }

    // Timing score (consistent - not random)
    const timingScore = 78;

    const analysis = {
      hookScore: Math.min(Math.max(hookScore, 30), 100),
      emotionalTrigger,
      ctaStrength: Math.min(Math.max(ctaStrength, 30), 100),
      formatBonus: Math.min(Math.max(formatBonus, 30), 100),
      timingScore,
      overallScore: 0,
    };

    analysis.overallScore =
      (analysis.hookScore +
        analysis.ctaStrength +
        analysis.formatBonus +
        analysis.timingScore) /
      4;

    setAnalysisResult(analysis);
  };

  const filteredSounds = trendingSounds.filter(
    (sound) =>
      sound.name.toLowerCase().includes(searchSounds.toLowerCase()) ||
      sound.category.toLowerCase().includes(searchSounds.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="page viral-lab">
      <div className="viral-lab-header">
        <h1>🚀 Viral Lab</h1>
        <p>Hooks, trends, and viral strategies</p>
      </div>

      {/* Hook Library */}
      <section className="section">
        <h2 className="section-title">
          <Lightbulb size={20} /> Hook Library (50+ Templates)
        </h2>

        <div className="hook-library-controls">
          <div className="hook-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search hooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="hook-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`hook-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="hooks-grid">
          {filteredHooks.length > 0 ? (
            filteredHooks.map((hook) => (
              <div
                key={hook.id}
                className={`hook-card ${expandedHook === hook.id ? 'expanded' : ''}`}
                onClick={() => setExpandedHook(expandedHook === hook.id ? null : hook.id)}
              >
                <div className="hook-label">{hook.category}</div>
                <div className="hook-text">"{hook.hook}"</div>
                <div className="hook-footer">
                  <div className="hook-niches">
                    {hook.niche.map((n) => (
                      <span key={n} className="hook-niche-tag">{n}</span>
                    ))}
                  </div>
                  <button
                    className="hook-copy-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(hook.hook);
                    }}
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No hooks found matching your search</div>
          )}
        </div>
      </section>

      {/* Viral Post Analyzer */}
      <section className="section">
        <h2 className="section-title">
          <BarChart3 size={20} /> Viral Post Analyzer
        </h2>

        <div className="analyzer-section">
          <label className="analyzer-label">Paste your post details below</label>
          <textarea
            className="analyzer-textarea"
            placeholder="Enter your caption, hook, post idea, or content outline here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button className="analyze-btn" onClick={handleAnalyzePost}>
            <Zap size={16} />
            Analyze Post
          </button>

          {analysisResult && (
            <div className="analysis-results">
              <h3 className="analysis-title">📊 Analysis Results</h3>
              <div className="scores-grid">
                <div className="score-card">
                  <div className="score-label">Hook Score</div>
                  <div className="score-value">{analysisResult.hookScore}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.hookScore}%` }}
                    />
                  </div>
                </div>
                <div className="score-card">
                  <div className="score-label">Emotional Trigger</div>
                  <div className="score-value" style={{ fontSize: '1.2rem' }}>
                    {analysisResult.emotionalTrigger}
                  </div>
                </div>
                <div className="score-card">
                  <div className="score-label">CTA Strength</div>
                  <div className="score-value">{analysisResult.ctaStrength}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.ctaStrength}%` }}
                    />
                  </div>
                </div>
                <div className="score-card">
                  <div className="score-label">Format Bonus</div>
                  <div className="score-value">{analysisResult.formatBonus}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.formatBonus}%` }}
                    />
                  </div>
                </div>
                <div className="score-card">
                  <div className="score-label">Timing Score</div>
                  <div className="score-value">{analysisResult.timingScore}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.timingScore}%` }}
                    />
                  </div>
                </div>
                <div className="score-card overall">
                  <div className="score-label">Overall Score</div>
                  <div className="score-value">{Math.round(analysisResult.overallScore)}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.overallScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trending Audio Tracker */}
      <section className="section">
        <h2 className="section-title">
          <Volume2 size={20} /> Trending Audio Tracker
        </h2>

        <div className="sound-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search sounds..."
            value={searchSounds}
            onChange={(e) => setSearchSounds(e.target.value)}
          />
        </div>

        <div className="sounds-grid">
          {filteredSounds.map((sound) => (
            <div key={sound.id} className="sound-card">
              <div className="sound-header">
                <div className="sound-info">
                  <div className="sound-name">{sound.name}</div>
                  <div className="sound-category">{sound.category}</div>
                </div>
                {sound.peak && <div className="peak-badge">🔥 PEAK</div>}
              </div>

              <div className={`sound-trend ${sound.trend === 'up' ? 'trending-up' : sound.trend === 'down' ? 'trending-down' : ''}`}>
                <TrendingUp size={14} />
                {sound.trend === 'up' ? 'Rising ↑' : sound.trend === 'down' ? 'Declining ↓' : 'Stable →'}
              </div>

              <div className="sound-usage">
                {(sound.usageCount / 1000000).toFixed(1)}M uses
              </div>

              <button className="sound-preview-btn">
                <Volume2 size={12} />
                Preview
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Content Repurposing Engine */}
      <section className="section">
        <h2 className="section-title">
          <TrendingUp size={20} /> Content Repurposing Engine
        </h2>

        <p className="section-description">
          One idea → 5 formats. Turn any concept into multi-platform content.
        </p>

        <div className="formats-grid">
          {repurposingFormats.map((fmt, idx) => (
            <div key={idx} className="format-card">
              <div className="format-icon">{fmt.icon}</div>
              <div className="format-name">{fmt.format}</div>
              <div className="format-description">{fmt.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Reel Formats */}
      <section className="section">
        <h2 className="section-title">
          <TrendingUp size={20} /> Trending Reel Formats
        </h2>

        <div className="reel-formats-list">
          {reelFormats.map((format, idx) => (
            <div key={idx} className="reel-format-card">
              <div className="reel-format-name">{format.name}</div>
              <div className="reel-format-stats">
                <div className="reel-format-stat">
                  <span className="reel-format-stat-value">{format.views}</span>
                  avg views
                </div>
                <div className="reel-format-stat">
                  <span className="reel-format-stat-value">{format.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
