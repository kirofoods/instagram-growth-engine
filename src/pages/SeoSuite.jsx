import { useState, useMemo } from 'react';
import { useAppData } from '../firebase/useAppData';
import {
  Search,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Zap,
  Copy,
  RefreshCw,
} from 'lucide-react';
import '../styles/SeoSuite.css';

const SeoSuite = () => {
  // Load profile data from Firestore
  const { data: profileData = {}, updateData: updateProfile } = useAppData('profile', {});
  const { data: seoProgressData = {}, updateData: updateSeoProgress } = useAppData('seoProgress', {});

  const [bio, setBio] = useState(profileData.bio || 'Digital Creator | Photography | Lifestyle | 📸 DM for collabs');
  const [caption, setCaption] = useState(
    'Loving this golden hour light! 🌅 Photography tips coming soon. What\'s your favorite time of day to shoot? #photography #goldenhour #creator'
  );
  const [imageDesc, setImageDesc] = useState('Golden hour landscape with mountains');
  const [niche, setNiche] = useState(profileData.niche || 'photography');
  const [altText, setAltText] = useState('');
  const [showAltSuggestions, setShowAltSuggestions] = useState(false);

  // Calculate SEO score dynamically
  const seoScore = useMemo(() => {
    let score = 0;

    // Bio completeness
    if (bio.length > 50) score += 15;
    if (bio.includes('CTA') || bio.includes('DM') || bio.includes('Link')) score += 10;
    if (bio.match(/[\p{Emoji}]/gu)) score += 10;

    // Profile completeness
    if (profileData.profilePic) score += 15;
    if (profileData.followers && profileData.followers > 100) score += 10;

    // Caption quality
    if (caption.length > 50) score += 10;
    if (caption.match(/#\w+/g)) score += 10;

    // Keyword presence
    if (niche && caption.toLowerCase().includes(niche)) score += 10;

    return Math.min(100, score);
  }, [bio, caption, niche, profileData]);

  // Bio suggestions with highlighted keywords
  const bioSuggestions = [
    {
      text: 'Photography Creator | Lifestyle Content | Helping creatives grow 📸 Book: [link]',
      keywords: ['photography', 'creator', 'creatives'],
    },
    {
      text: '📷 Photography | Lifestyle | Travel Tips & Tutorials | DM for partnerships',
      keywords: ['photography', 'lifestyle', 'travel'],
    },
  ];

  // Caption analysis
  const captionAnalysis = {
    wordCount: caption.split(/\s+/).length,
    hashtagCount: (caption.match(/#\w+/g) || []).length,
    emojiCount: (caption.match(/\p{Emoji}/gu) || []).length,
    keywordDensity: 8.5,
  };

  // Keyword research data
  const keywordData = [
    { term: 'photography tips', volume: 'high', searches: 45000 },
    { term: 'photography tutorial', volume: 'high', searches: 38000 },
    { term: 'landscape photography', volume: 'medium', searches: 28000 },
    { term: 'photography inspiration', volume: 'medium', searches: 22000 },
    { term: 'golden hour photography', volume: 'low', searches: 12000 },
    { term: 'camera settings', volume: 'medium', searches: 18000 },
  ];

  // SEO Checklist items
  const checklistItems = [
    {
      id: 1,
      label: 'Profile name includes primary keyword',
      completed: true,
    },
    { id: 2, label: 'Bio has clear CTA (link, DM, etc)', completed: true },
    { id: 3, label: 'Bio includes 2-3 searchable keywords', completed: false },
    { id: 4, label: 'Using relevant hashtags (max 30)', completed: true },
    { id: 5, label: 'Alt text added to images', completed: false },
    { id: 6, label: 'Captions include primary keyword', completed: true },
    { id: 7, label: 'Profile linked to website/Linktree', completed: false },
    { id: 8, label: 'Consistent posting schedule', completed: true },
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;

  // Generate alt text suggestion
  const generateAltText = () => {
    const suggestion = `${imageDesc} - ${niche} content showing scenic landscape at sunset with mountain backdrop`;
    setAltText(suggestion);
  };

  const volumeBadgeClass = {
    high: 'badge-danger',
    medium: 'badge-warning',
    low: 'badge-info',
  };

  const volumeLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1>Instagram SEO Suite</h1>
        <p className="text-secondary">Optimize your profile and content for discoverability</p>
      </div>

      {/* SEO Score Card */}
      <div className="card card-gradient mb-8 seo-score-card">
        <div className="flex-between">
          <div>
            <h2 className="font-bold text-2xl mb-2">Profile SEO Score</h2>
            <p className="text-secondary">Optimize these areas to improve discoverability</p>
          </div>
          <div className="seo-score-circle">
            <svg className="seo-score-svg" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" className="seo-score-bg" />
              <circle
                cx="60"
                cy="60"
                r="54"
                className="seo-score-progress"
                style={{ strokeDasharray: `${(seoScore / 100) * 340} 340` }}
              />
              <defs>
                <linearGradient id="seoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-secondary)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="seo-score-value">
              <div className="stat-value">{seoScore}</div>
              <div className="text-muted text-sm">/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-2 mb-8">
        {/* Bio Optimizer */}
        <div className="card">
          <h3 className="flex items-center gap-sm mb-4">
            <Zap size={20} />
            Bio Optimizer
          </h3>

          <label className="text-sm font-medium mb-2">Current Bio</label>
          <textarea
            value={bio}
            onChange={e => {
              setBio(e.target.value);
              updateProfile({ bio: e.target.value });
            }}
            className="w-full h-24 rounded-md p-2 text-sm focus:outline-none resize-none mb-3"
            placeholder="Enter your bio..."
          />

          <div className="flex-between text-sm text-muted mb-4">
            <span>{bio.length} / 150 characters</span>
            {bio.length > 150 && (
              <span className="text-negative">Over limit!</span>
            )}
          </div>

          <div className="seo-suggestions mb-4">
            <h4 className="font-medium text-sm mb-3">AI Suggestions</h4>
            {bioSuggestions.map((suggestion, idx) => (
              <div key={idx} className="seo-suggestion-item">
                <p className="text-sm mb-2">{suggestion.text}</p>
                <div className="flex flex-wrap gap-sm">
                  {suggestion.keywords.map((keyword, kidx) => (
                    <span key={kidx} className="badge badge-info">
                      {keyword}
                    </span>
                  ))}
                </div>
                <button className="text-sm text-primary hover:opacity-80 mt-2">
                  Use this suggestion →
                </button>
              </div>
            ))}
          </div>

          <button className="btn btn-primary w-full">Generate AI Suggestions</button>
        </div>

        {/* Caption SEO Checker */}
        <div className="card">
          <h3 className="flex items-center gap-sm mb-4">
            <Search size={20} />
            Caption SEO Checker
          </h3>

          <label className="text-sm font-medium mb-2">Paste Caption</label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            className="w-full h-24 rounded-md p-2 text-sm focus:outline-none resize-none mb-4"
            placeholder="Paste your Instagram caption..."
          />

          <div className="space-y-3">
            <div className="seo-stat">
              <span className="text-sm">Word Count</span>
              <span className="font-semibold">{captionAnalysis.wordCount}</span>
            </div>
            <div className="seo-stat">
              <span className="text-sm">Hashtags</span>
              <span className="font-semibold">{captionAnalysis.hashtagCount}</span>
            </div>
            <div className="seo-stat">
              <span className="text-sm">Emojis</span>
              <span className="font-semibold">{captionAnalysis.emojiCount}</span>
            </div>
            <div className="seo-stat seo-stat-highlight">
              <span className="text-sm">Keyword Density</span>
              <span className="font-semibold">{captionAnalysis.keywordDensity}%</span>
            </div>
          </div>

          <button className="btn btn-secondary w-full mt-4">
            <RefreshCw size={16} />
            Get Suggestions
          </button>
        </div>
      </div>

      {/* Alt Text Generator */}
      <div className="card mb-8">
        <h3 className="font-semibold text-lg mb-4">Alt Text Generator</h3>

        <div className="grid grid-2 gap-lg">
          <div>
            <label className="text-sm font-medium mb-2">Image Description</label>
            <textarea
              value={imageDesc}
              onChange={e => setImageDesc(e.target.value)}
              className="w-full h-20 rounded-md p-2 text-sm focus:outline-none resize-none mb-4"
              placeholder="Describe what's in the image..."
            />
            <button onClick={generateAltText} className="btn btn-primary w-full">
              Generate Alt Text
            </button>
          </div>

          <div>
            <label className="text-sm font-medium mb-2">Generated Alt Text</label>
            <div className="alt-text-output">
              {altText || (
                <span className="text-muted">Alt text will appear here...</span>
              )}
            </div>
            {altText && (
              <button className="btn btn-secondary w-full mt-4 text-sm">
                <Copy size={16} />
                Copy
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keyword Research */}
      <div className="card mb-8">
        <h3 className="flex items-center gap-sm mb-6">
          <Search size={20} />
          Keyword Research
        </h3>

        <div className="mb-6">
          <label className="text-sm font-medium mb-2">Your Niche</label>
          <input
            value={niche}
            onChange={e => {
              setNiche(e.target.value);
              updateProfile({ niche: e.target.value });
            }}
            type="text"
            className="w-full rounded-md p-2 text-sm focus:outline-none"
            placeholder="e.g., photography, fashion, fitness..."
          />
        </div>

        <div className="space-y-3">
          {keywordData.map((keyword, idx) => (
            <div key={idx} className="keyword-item">
              <div className="flex-1">
                <div className="font-medium">{keyword.term}</div>
                <div className="text-xs text-muted">
                  ~{keyword.searches.toLocaleString()} searches
                </div>
              </div>
              <span className={`badge ${volumeBadgeClass[keyword.volume]}`}>
                {volumeLabels[keyword.volume]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Checklist */}
      <div className="card">
        <div className="flex-between mb-6">
          <h3 className="flex items-center gap-sm">
            <CheckCircle size={20} />
            SEO Checklist
          </h3>
          <div className="text-sm font-medium text-secondary">
            {completedCount} of {checklistItems.length} completed
          </div>
        </div>

        <div className="checklist-progress mb-6">
          <div
            className="checklist-progress-bar"
            style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
          />
        </div>

        <div className="grid grid-2 gap-sm">
          {checklistItems.map(item => (
            <label key={item.id} className="checklist-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) => {
                  const updated = checklistItems.map((i) =>
                    i.id === item.id ? { ...i, completed: e.target.checked } : i
                  );
                  updateSeoProgress({ checklist: updated });
                }}
                className="mr-3"
              />
              <span className={item.completed ? 'text-muted line-through' : 'text-primary'}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeoSuite;
