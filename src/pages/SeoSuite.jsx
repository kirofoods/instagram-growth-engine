import { useState } from 'react';
import {
  Search,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Zap,
  Copy,
  RefreshCw,
} from 'lucide-react';

const SeoSuite = () => {
  const [bio, setBio] = useState(
    'Digital Creator | Photography | Lifestyle | 📸 DM for collabs'
  );
  const [caption, setCaption] = useState(
    'Loving this golden hour light! 🌅 Photography tips coming soon. What\'s your favorite time of day to shoot? #photography #goldenhour #creator'
  );
  const [imageDesc, setImageDesc] = useState('Golden hour landscape with mountains');
  const [niche, setNiche] = useState('photography');
  const [altText, setAltText] = useState('');
  const [showAltSuggestions, setShowAltSuggestions] = useState(false);

  // Mock SEO data
  const seoScore = 72;

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
    keywordDensity: 8.5, // Mock value
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

  const volumeColors = {
    high: '#E1306C',
    medium: '#F77737',
    low: '#833AB4',
  };

  const volumeLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Instagram SEO Suite</h1>
        <p className="text-gray-400">
          Optimize your profile and content for discoverability
        </p>
      </div>

      {/* SEO Score Card */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Profile SEO Score</h2>
            <p className="text-gray-400">
              Optimize these areas to improve discoverability
            </p>
          </div>
          <div className="relative w-40 h-40">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#333"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#seoGradient)"
                strokeWidth="8"
                strokeDasharray={`${(seoScore / 100) * 340} 340`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="seoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#E1306C" />
                  <stop offset="100%" stopColor="#833AB4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{seoScore}</div>
                <div className="text-xs text-gray-400">/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bio Optimizer */}
        <div
          className="rounded-lg p-6 border border-gray-800"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" />
            Bio Optimizer
          </h3>

          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Bio
          </label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full h-24 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-pink-500 focus:outline-none resize-none mb-3"
            placeholder="Enter your bio..."
          />

          <div className="flex justify-between text-xs text-gray-400 mb-4">
            <span>{bio.length} / 150 characters</span>
            {bio.length > 150 && (
              <span className="text-red-400">Over limit!</span>
            )}
          </div>

          <div className="bg-gray-900 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              AI Suggestions
            </h4>
            {bioSuggestions.map((suggestion, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <p className="text-sm text-gray-300 mb-2">{suggestion.text}</p>
                <div className="flex flex-wrap gap-2">
                  {suggestion.keywords.map((keyword, kidx) => (
                    <span
                      key={kidx}
                      className="inline-block px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <button className="text-xs text-pink-400 hover:text-pink-300 mt-2">
                  Use this suggestion →
                </button>
              </div>
            ))}
          </div>

          <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition">
            Generate AI Suggestions
          </button>
        </div>

        {/* Caption SEO Checker */}
        <div
          className="rounded-lg p-6 border border-gray-800"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Search size={20} className="text-cyan-400" />
            Caption SEO Checker
          </h3>

          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste Caption
          </label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            className="w-full h-24 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-pink-500 focus:outline-none resize-none mb-4"
            placeholder="Paste your Instagram caption..."
          />

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
              <span className="text-sm text-gray-300">Word Count</span>
              <span className="text-white font-semibold">
                {captionAnalysis.wordCount}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
              <span className="text-sm text-gray-300">Hashtags</span>
              <span className="text-white font-semibold">
                {captionAnalysis.hashtagCount}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
              <span className="text-sm text-gray-300">Emojis</span>
              <span className="text-white font-semibold">
                {captionAnalysis.emojiCount}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-lg border border-pink-500/30">
              <span className="text-sm text-gray-300">Keyword Density</span>
              <span className="text-pink-400 font-semibold">
                {captionAnalysis.keywordDensity}%
              </span>
            </div>
          </div>

          <button className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition">
            <RefreshCw size={16} className="inline mr-2" />
            Get Suggestions
          </button>
        </div>
      </div>

      {/* Alt Text Generator */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h3 className="text-xl font-semibold text-white mb-4">
          Alt Text Generator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image Description
            </label>
            <textarea
              value={imageDesc}
              onChange={e => setImageDesc(e.target.value)}
              className="w-full h-20 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-pink-500 focus:outline-none resize-none mb-4"
              placeholder="Describe what's in the image..."
            />
            <button
              onClick={generateAltText}
              className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Generate Alt Text
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Generated Alt Text
            </label>
            <div className="w-full min-h-20 bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-300 text-sm">
              {altText || (
                <span className="text-gray-500">
                  Alt text will appear here...
                </span>
              )}
            </div>
            {altText && (
              <button className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition text-sm">
                <Copy size={16} className="inline mr-2" />
                Copy
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Keyword Research */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Search size={20} className="text-blue-400" />
          Keyword Research
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Niche
          </label>
          <input
            value={niche}
            onChange={e => setNiche(e.target.value)}
            type="text"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-pink-500 focus:outline-none"
            placeholder="e.g., photography, fashion, fitness..."
          />
        </div>

        <div className="space-y-3">
          {keywordData.map((keyword, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 transition"
            >
              <div className="flex-1">
                <div className="font-medium text-white mb-1">
                  {keyword.term}
                </div>
                <div className="text-xs text-gray-400">
                  ~{keyword.searches.toLocaleString()} searches
                </div>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: volumeColors[keyword.volume] }}
              >
                {volumeLabels[keyword.volume]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Checklist */}
      <div
        className="rounded-lg p-6 border border-gray-800"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <CheckCircle size={20} className="text-green-400" />
            SEO Checklist
          </h3>
          <div className="text-sm font-medium text-gray-400">
            {completedCount} of {checklistItems.length} completed
          </div>
        </div>

        <div className="w-full bg-gray-900 rounded-full h-2 mb-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all"
            style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklistItems.map(item => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition"
            >
              <input
                type="checkbox"
                checked={item.completed}
                readOnly
                className="w-5 h-5 rounded border-gray-700 bg-gray-800"
              />
              <span
                className={`text-sm ${
                  item.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-300'
                }`}
              >
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
