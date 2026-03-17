import { useState } from 'react';
import {
  Search,
  TrendingUp,
  Zap,
  Copy,
  Filter,
  MessageCircle,
  Volume2,
  BarChart3,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

    const mockAnalysis = {
      hookScore: Math.floor(Math.random() * 30 + 70),
      emotionalTrigger: ['Curiosity', 'Inspiration', 'FOMO'][Math.floor(Math.random() * 3)],
      ctaStrength: Math.floor(Math.random() * 30 + 60),
      formatBonus: Math.floor(Math.random() * 20 + 70),
      timingScore: Math.floor(Math.random() * 25 + 75),
      overallScore: 0,
    };

    mockAnalysis.overallScore =
      (mockAnalysis.hookScore +
        mockAnalysis.ctaStrength +
        mockAnalysis.formatBonus +
        mockAnalysis.timingScore) /
      4;

    setAnalysisResult(mockAnalysis);
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
    <div className="viral-lab-container">
      <style>{`
        .viral-lab-container {
          background: #0a0a0a;
          color: #e0e0e0;
          min-height: 100vh;
          padding: 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 2.5rem;
        }

        .header p {
          color: #999;
          font-size: 1.1rem;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section-title {
          color: #fff;
          font-size: 1.5rem;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-title svg {
          color: #833AB4;
        }

        .hook-library-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 200px;
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          outline: none;
        }

        .search-box input::placeholder {
          color: #666;
        }

        .category-filter {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-button {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          color: #999;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .filter-button:hover,
        .filter-button.active {
          background: #833AB4;
          border-color: #833AB4;
          color: #fff;
        }

        .hooks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1rem;
        }

        .hook-card {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hook-card:hover {
          border-color: #833AB4;
          transform: translateY(-2px);
        }

        .hook-card.expanded {
          background: linear-gradient(135deg, #E1306C15, #833AB415);
          border-color: #833AB4;
        }

        .hook-category {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 0.5rem;
        }

        .hook-text {
          color: #fff;
          font-weight: 500;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .hook-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #2a2a3e;
        }

        .hook-niche {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: #666;
        }

        .hook-button {
          background: #833AB4;
          border: none;
          border-radius: 6px;
          padding: 0.4rem 0.8rem;
          color: #fff;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .hook-button:hover {
          background: #E1306C;
        }

        .analyzer-section {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 2rem;
        }

        .analyzer-input {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 1rem;
          color: #fff;
          font-size: 0.95rem;
          font-family: inherit;
          min-height: 120px;
          margin-bottom: 1rem;
          resize: vertical;
        }

        .analyzer-input::placeholder {
          color: #666;
        }

        .analyze-button {
          background: linear-gradient(135deg, #E1306C, #833AB4);
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .analyze-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(131, 58, 180, 0.3);
        }

        .analysis-results {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #2a2a3e;
        }

        .score-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .score-card {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-left: 3px solid #833AB4;
          border-radius: 8px;
          padding: 1.25rem;
          text-align: center;
        }

        .score-label {
          color: #999;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .score-value {
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .score-bar {
          width: 100%;
          height: 4px;
          background: #1a1a2e;
          border-radius: 2px;
          overflow: hidden;
        }

        .score-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #E1306C, #833AB4);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .sounds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .sound-card {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .sound-card:hover {
          border-color: #833AB4;
        }

        .sound-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .sound-name {
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .sound-category {
          color: #999;
          font-size: 0.85rem;
        }

        .peak-badge {
          background: linear-gradient(135deg, #E1306C, #FF6B9D);
          color: #fff;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .trend-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ccc;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .trend-up {
          color: #4ECDC4;
        }

        .trend-down {
          color: #FF6B6B;
        }

        .usage-count {
          color: #999;
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .sound-button {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
          color: #ccc;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sound-button:hover {
          background: #833AB4;
          border-color: #833AB4;
          color: #fff;
        }

        .formats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .format-card {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .format-card:hover {
          border-color: #833AB4;
          transform: translateY(-2px);
        }

        .format-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .format-name {
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .format-description {
          color: #999;
          font-size: 0.85rem;
        }

        .reel-formats {
          display: grid;
          gap: 1rem;
        }

        .reel-format-card {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-left: 3px solid #833AB4;
          border-radius: 8px;
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .reel-format-name {
          color: #fff;
          font-weight: 600;
        }

        .reel-format-stats {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .reel-format-stat {
          text-align: right;
          color: #999;
          font-size: 0.9rem;
        }

        .reel-format-stat strong {
          color: #fff;
          display: block;
          font-size: 1rem;
        }

        .empty-state {
          text-align: center;
          color: #666;
          padding: 2rem;
        }
      `}</style>

      <div className="header">
        <h1>🚀 Viral Lab</h1>
        <p>Hooks, trends, and viral strategies</p>
      </div>

      {/* Hook Library */}
      <div className="section">
        <div className="section-title">
          <Lightbulb size={24} />
          Hook Library (50+ Templates)
        </div>

        <div className="hook-library-header">
          <div className="search-box">
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="Search hooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-button ${selectedCategory === cat ? 'active' : ''}`}
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
                <div className="hook-category">{hook.category}</div>
                <div className="hook-text">"{hook.hook}"</div>
                <div className="hook-footer">
                  <div className="hook-niche">
                    {hook.niche.map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                  <button
                    className="hook-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(hook.hook);
                    }}
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No hooks found matching your search</div>
          )}
        </div>
      </div>

      {/* Viral Post Analyzer */}
      <div className="section">
        <div className="section-title">
          <BarChart3 size={24} />
          Viral Post Analyzer
        </div>

        <div className="analyzer-section">
          <label style={{ color: '#fff', display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
            Paste your post details below
          </label>
          <textarea
            className="analyzer-input"
            placeholder="Enter your caption, hook, post idea, or content outline here..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button className="analyze-button" onClick={handleAnalyzePost}>
            <Zap size={18} />
            Analyze Post
          </button>

          {analysisResult && (
            <div className="analysis-results">
              <h3 style={{ color: '#fff', margin: '0 0 1rem 0' }}>📊 Analysis Results</h3>
              <div className="score-grid">
                <div className="score-card">
                  <div className="score-label">Hook Score</div>
                  <div className="score-value">{analysisResult.hookScore}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.hookScore}%` }}
                    ></div>
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
                    ></div>
                  </div>
                </div>
                <div className="score-card">
                  <div className="score-label">Format Bonus</div>
                  <div className="score-value">{analysisResult.formatBonus}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.formatBonus}%` }}
                    ></div>
                  </div>
                </div>
                <div className="score-card">
                  <div className="score-label">Timing Score</div>
                  <div className="score-value">{analysisResult.timingScore}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${analysisResult.timingScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="score-card" style={{ borderLeftColor: '#4ECDC4' }}>
                  <div className="score-label">Overall Score</div>
                  <div className="score-value">{Math.round(analysisResult.overallScore)}</div>
                  <div className="score-bar">
                    <div
                      className="score-bar-fill"
                      style={{
                        width: `${analysisResult.overallScore}%`,
                        background: 'linear-gradient(90deg, #4ECDC4, #44A08D)',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trending Audio Tracker */}
      <div className="section">
        <div className="section-title">
          <Volume2 size={24} />
          Trending Audio Tracker
        </div>

        <div className="hook-library-header">
          <div className="search-box">
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="Search sounds..."
              value={searchSounds}
              onChange={(e) => setSearchSounds(e.target.value)}
            />
          </div>
        </div>

        <div className="sounds-grid">
          {filteredSounds.map((sound) => (
            <div key={sound.id} className="sound-card">
              <div className="sound-header">
                <div>
                  <div className="sound-name">{sound.name}</div>
                  <div className="sound-category">{sound.category}</div>
                </div>
                {sound.peak && <div className="peak-badge">🔥 PEAK</div>}
              </div>

              <div className="trend-indicator">
                <TrendingUp
                  size={16}
                  className={sound.trend === 'up' ? 'trend-up' : sound.trend === 'down' ? 'trend-down' : ''}
                />
                {sound.trend === 'up' ? 'Rising ↑' : sound.trend === 'down' ? 'Declining ↓' : 'Stable →'}
              </div>

              <div className="usage-count">
                {(sound.usageCount / 1000000).toFixed(1)}M uses
              </div>

              <button className="sound-button">
                <Volume2 size={14} />
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Content Repurposing Engine */}
      <div className="section">
        <div className="section-title">
          <TrendingUp size={24} />
          Content Repurposing Engine
        </div>

        <p style={{ color: '#999', marginBottom: '1.5rem' }}>
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
      </div>

      {/* Format Templates */}
      <div className="section">
        <div className="section-title">
          <TrendingUp size={24} />
          Trending Reel Formats
        </div>

        <div className="reel-formats">
          {reelFormats.map((format, idx) => (
            <div key={idx} className="reel-format-card">
              <div className="reel-format-name">{format.name}</div>
              <div className="reel-format-stats">
                <div className="reel-format-stat">
                  <strong>{format.views}</strong>
                  avg views
                </div>
                <div className="reel-format-stat">
                  <strong>{format.trend}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
