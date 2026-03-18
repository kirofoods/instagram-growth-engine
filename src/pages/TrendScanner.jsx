import { useState } from 'react';
import {
  Search,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Zap,
  AlertCircle,
  Loader,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { useApify } from '../services/useApify';
import '../styles/TrendScanner.css';

const TrendScanner = () => {
  const { execute, loading, error, data, isConfigured } = useApify();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setResults([]);

    try {
      let apiResults = [];

      switch (activeTab) {
        case 'trending':
          apiResults = await execute('scrapeInstagramHashtag', searchQuery, 50);
          break;
        case 'viral':
          apiResults = await execute('scrapeInstagramPosts', searchQuery, 20);
          break;
        case 'competitors':
          apiResults = await execute('analyzeCompetitors', [searchQuery]);
          break;
        case 'ads':
          apiResults = await execute('scrapeFacebookAds', searchQuery, { limit: 30 });
          break;
        default:
          break;
      }

      if (apiResults && Array.isArray(apiResults)) {
        setResults(apiResults);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="page">
        <div className="trend-scanner-empty">
          <div className="empty-state">
            <AlertCircle size={48} className="empty-icon" />
            <h2>Apify API Not Configured</h2>
            <p>Set up your Apify API token to unlock trending content analysis.</p>
            <a href="/settings" className="btn btn-primary btn-lg">
              <Settings size={18} />
              Configure API in Settings
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page trend-scanner-page">
      {/* Hero Section */}
      <div className="trend-scanner-hero">
        <div className="hero-content">
          <h1 className="hero-title">Trend Scanner</h1>
          <p className="hero-subtitle">
            Discover what's trending in your niche. Analyze competitors. Find viral opportunities.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder={
                  activeTab === 'trending'
                    ? 'Search hashtag...'
                    : activeTab === 'viral'
                    ? 'Search username...'
                    : activeTab === 'competitors'
                    ? 'Enter competitor username...'
                    : 'Search ads by query...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="btn btn-primary"
              >
                {isSearching ? <Loader size={18} className="spinner" /> : <Search size={18} />}
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="trend-scanner-tabs">
        <button
          className={`tab-button ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('trending');
            setResults([]);
            setSearchQuery('');
          }}
        >
          <TrendingUp size={18} />
          <span>Trending</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'viral' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('viral');
            setResults([]);
            setSearchQuery('');
          }}
        >
          <Zap size={18} />
          <span>Viral Content</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'competitors' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('competitors');
            setResults([]);
            setSearchQuery('');
          }}
        >
          <Users size={18} />
          <span>Competitors</span>
        </button>
        <button
          className={`tab-button ${activeTab === 'ads' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('ads');
            setResults([]);
            setSearchQuery('');
          }}
        >
          <MessageSquare size={18} />
          <span>Ads Spy</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger section">
          <AlertCircle size={20} />
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="trend-scanner-results">
        {isSearching && (
          <div className="loading-state">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        )}

        {!isSearching && results.length === 0 && !searchQuery && (
          <div className="empty-state-section">
            <div className="empty-graphic">
              <TrendingUp size={64} className="empty-icon-lg" />
            </div>
            <h3>Start discovering trends</h3>
            <p>Enter a hashtag, username, or search query to begin analyzing.</p>
          </div>
        )}

        {!isSearching && results.length === 0 && searchQuery && (
          <div className="empty-state-section">
            <div className="empty-graphic">
              <Search size={64} className="empty-icon-lg" />
            </div>
            <h3>No results found</h3>
            <p>Try a different search term or adjust your filters.</p>
          </div>
        )}

        {/* Results Grid */}
        {!isSearching && results.length > 0 && (
          <div className="results-grid">
            {activeTab === 'trending' && results.map((item, idx) => (
              <div key={idx} className="result-card trending-card">
                <div className="card-header">
                  <h3 className="card-title">#{item.name || item.hashtag || `Hashtag ${idx + 1}`}</h3>
                  <span className="badge badge-primary">Trending</span>
                </div>
                <div className="card-metrics">
                  <div className="metric">
                    <MessageSquare size={16} />
                    <div>
                      <p className="metric-label">Posts</p>
                      <p className="metric-value">{item.postCount?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="metric">
                    <TrendingUp size={16} />
                    <div>
                      <p className="metric-label">Trend</p>
                      <p className="metric-value metric-positive">↑ 12.5%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'viral' && results.map((item, idx) => (
              <div key={idx} className="result-card viral-card">
                <div className="card-header">
                  <h3 className="card-title">{item.caption?.substring(0, 40) || `Post ${idx + 1}`}</h3>
                  <span className={`badge badge-${item.type?.toLowerCase() || 'secondary'}`}>
                    {item.type || 'Post'}
                  </span>
                </div>
                <div className="card-metrics">
                  <div className="metric">
                    <Heart size={16} />
                    <div>
                      <p className="metric-label">Likes</p>
                      <p className="metric-value">{item.likes?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                  <div className="metric">
                    <MessageSquare size={16} />
                    <div>
                      <p className="metric-label">Comments</p>
                      <p className="metric-value">{item.comments?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="text-xs text-secondary">{item.timestamp || 'Recently posted'}</span>
                </div>
              </div>
            ))}

            {activeTab === 'competitors' && results.map((item, idx) => (
              <div key={idx} className="result-card competitor-card">
                <div className="card-header">
                  <h3 className="card-title">@{item.username || item.handle || `User ${idx + 1}`}</h3>
                  {item.isVerified && <span className="badge badge-success">Verified</span>}
                </div>
                <div className="card-metrics">
                  <div className="metric">
                    <Users size={16} />
                    <div>
                      <p className="metric-label">Followers</p>
                      <p className="metric-value">{item.followersCount?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                  <div className="metric">
                    <Heart size={16} />
                    <div>
                      <p className="metric-label">Avg Engagement</p>
                      <p className="metric-value">{item.avgEngagement?.toLocaleString() || '0'}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="text-xs text-secondary">Niche: {item.niche || 'Lifestyle'}</span>
                </div>
              </div>
            ))}

            {activeTab === 'ads' && results.map((item, idx) => (
              <div key={idx} className="result-card ads-card">
                <div className="card-header">
                  <h3 className="card-title">{item.title?.substring(0, 40) || `Ad ${idx + 1}`}</h3>
                  <span className="badge badge-warning">Ad</span>
                </div>
                <div className="card-metrics">
                  <div className="metric">
                    <Zap size={16} />
                    <div>
                      <p className="metric-label">Active Since</p>
                      <p className="metric-value text-xs">{item.startDate || 'Recent'}</p>
                    </div>
                  </div>
                  <div className="metric">
                    <Users size={16} />
                    <div>
                      <p className="metric-label">Spend Estimate</p>
                      <p className="metric-value">{item.spendEstimate || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="text-xs text-secondary">Platform: {item.platform || 'Facebook'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="trend-scanner-info">
        <div className="info-card">
          <h3>How to use Trend Scanner</h3>
          <ul className="info-list">
            <li>
              <strong>Trending:</strong> Find emerging hashtags in your niche with growth rates
            </li>
            <li>
              <strong>Viral Content:</strong> Analyze top-performing posts and reels for patterns
            </li>
            <li>
              <strong>Competitors:</strong> Compare your metrics with similar creators
            </li>
            <li>
              <strong>Ads Spy:</strong> See what ads are resonating in your industry
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrendScanner;
