import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Zap,
  TrendingUp,
  Hash,
  Play,
  MessageCircle,
  DollarSign,
  BarChart3,
  Megaphone,
  Award,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  Send,
  ExternalLink,
} from 'lucide-react';
import '../styles/KnowledgeBase.css';

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: 'Hello! I\'m your Instagram AI assistant. Ask me anything about growing your account, content strategy, monetization, or anything Instagram-related.' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const categories = [
    { id: 'algorithm', name: 'Algorithm', icon: Zap, color: '#E1306C' },
    { id: 'content', name: 'Content Strategy', icon: TrendingUp, color: '#833AB4' },
    { id: 'growth', name: 'Growth Hacks', icon: Award, color: '#FD1D1D' },
    { id: 'hashtags', name: 'Hashtags', icon: Hash, color: '#F77737' },
    { id: 'reels', name: 'Reels', icon: Play, color: '#20c997' },
    { id: 'stories', name: 'Stories', icon: MessageCircle, color: '#ffc107' },
    { id: 'monetization', name: 'Monetization', icon: DollarSign, color: '#60a5fa' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: '#a78bfa' },
    { id: 'ads', name: 'Ads', icon: Megaphone, color: '#f472b6' },
    { id: 'engagement', name: 'Engagement', icon: MessageCircle, color: '#34d399' },
  ];

  const articles = {
    algorithm: [
      { title: 'How the Instagram Algorithm Works in 2026', readTime: 8, summary: 'Deep dive into the latest algorithm changes and what they mean for your content strategy.' },
      { title: 'Mastering the Explore Page', readTime: 6, summary: 'Strategies to get your content on the Explore page and reach new audiences.' },
      { title: 'Reels Algorithm: Maximizing Visibility', readTime: 7, summary: 'Understanding the Reel-specific algorithm and optimization techniques.' },
      { title: 'Feed Algorithm Changes 2026', readTime: 5, summary: 'Latest updates to the feed algorithm and their impact.' },
      { title: 'Consistency Rewards in the Algorithm', readTime: 6, summary: 'How posting consistently affects your visibility.' },
    ],
    content: [
      { title: 'The Ultimate Content Pillar Strategy', readTime: 9, summary: 'Create a content pillars framework for consistent, valuable posts.' },
      { title: 'Content Calendar Best Practices', readTime: 7, summary: 'How to plan and organize content 3-4 weeks in advance.' },
      { title: 'Storytelling That Converts', readTime: 8, summary: 'Craft narratives that resonate with your audience and drive action.' },
      { title: 'Video Content Strategy for Instagram', readTime: 6, summary: 'Creating engaging video content that performs well.' },
      { title: 'Educational Content That Engages', readTime: 5, summary: 'Share knowledge while building authority in your niche.' },
    ],
    growth: [
      { title: '10 Proven Growth Hacks for 2026', readTime: 10, summary: 'Battle-tested strategies to accelerate your follower growth.' },
      { title: 'Collaboration Growth Strategy', readTime: 7, summary: 'Leverage collaborations and shoutouts for exponential growth.' },
      { title: 'Niche Domination Playbook', readTime: 9, summary: 'Become the go-to account in your niche.' },
      { title: 'Viral Content Formulas', readTime: 6, summary: 'Patterns and structures that make content go viral.' },
      { title: 'Engagement Pods vs Authentic Engagement', readTime: 5, summary: 'Why authentic engagement beats pods every time.' },
    ],
    hashtags: [
      { title: 'Hashtag Research Methodology', readTime: 7, summary: 'How to find the right hashtags for your content.' },
      { title: '30 Hashtag Strategy Breakdown', readTime: 8, summary: 'Why 30 hashtags and how to structure them perfectly.' },
      { title: 'Niche vs Broad Hashtags Balance', readTime: 6, summary: 'The perfect mix for maximum reach and engagement.' },
      { title: 'Hidden Hashtags: Myth or Reality?', readTime: 5, summary: 'Understanding hashtag suppression and avoiding it.' },
      { title: 'Creating a Hashtag Library', readTime: 5, summary: 'Organize and rotate hashtags efficiently.' },
    ],
    reels: [
      { title: 'Reel Hook Formula', readTime: 6, summary: 'How to grab attention in the first 0.5 seconds.' },
      { title: 'Reel Editing Best Practices', readTime: 8, summary: 'Professional editing techniques for short-form video.' },
      { title: 'Trending Audio Strategy', readTime: 5, summary: 'Using trending sounds to boost Reel performance.' },
      { title: 'Reel Length and Performance', readTime: 6, summary: '15s vs 30s vs 60s: Which length performs best?' },
      { title: 'Monetizing Reels in 2026', readTime: 7, summary: 'How to earn money directly from your Reels.' },
    ],
    stories: [
      { title: 'Story Strategy for Engagement', readTime: 5, summary: 'Using Stories to drive consistent engagement.' },
      { title: 'Story Stickers Guide', readTime: 7, summary: 'Interactive stickers that boost engagement.' },
      { title: 'Story Analytics Deep Dive', readTime: 6, summary: 'Understanding and optimizing Story metrics.' },
      { title: 'Story Sales Funnel', readTime: 8, summary: 'Convert story viewers into paying customers.' },
      { title: 'Story Sequencing', readTime: 5, summary: 'Tell compelling narrative arcs across Stories.' },
    ],
    monetization: [
      { title: 'Complete Monetization Guide 2026', readTime: 12, summary: 'All ways to earn money on Instagram.' },
      { title: 'Sponsorship Pricing Strategy', readTime: 8, summary: 'How to price your sponsorships correctly.' },
      { title: 'Affiliate Marketing on Instagram', readTime: 9, summary: 'Start earning from affiliate promotions.' },
      { title: 'Digital Products on Instagram', readTime: 10, summary: 'Launch and sell your own products.' },
      { title: 'Brand Deal Negotiation', readTime: 7, summary: 'Close high-paying brand deals.' },
    ],
    analytics: [
      { title: 'Understanding Insights Metrics', readTime: 7, summary: 'What each metric in Insights means.' },
      { title: 'KPIs Every Creator Should Track', readTime: 8, summary: 'Key performance indicators for growth.' },
      { title: 'Data-Driven Content Optimization', readTime: 9, summary: 'Use analytics to improve content.' },
      { title: 'Cohort Analysis for Growth', readTime: 8, summary: 'Analyze audience cohorts for insights.' },
      { title: 'Attribution Modeling', readTime: 6, summary: 'Track which content drives conversions.' },
    ],
    ads: [
      { title: 'Instagram Ads Best Practices', readTime: 8, summary: 'How to run profitable ad campaigns.' },
      { title: 'Ad Targeting Strategies', readTime: 7, summary: 'Reach the right audience with precision.' },
      { title: 'Ad Creative That Converts', readTime: 9, summary: 'Design ads that people want to click.' },
      { title: 'A/B Testing Guide', readTime: 6, summary: 'Systematically improve ad performance.' },
      { title: 'Budget Optimization', readTime: 5, summary: 'Get the most out of your ad budget.' },
    ],
    engagement: [
      { title: 'Authentic Engagement Strategy', readTime: 7, summary: 'Build real relationships with your audience.' },
      { title: 'Comment Strategies That Work', readTime: 6, summary: 'Encourage comments and respond effectively.' },
      { title: 'DM Growth Strategy', readTime: 7, summary: 'Use DMs to build deeper relationships.' },
      { title: 'Community Building Framework', readTime: 9, summary: 'Create a loyal, engaged community.' },
      { title: 'Engagement Pods vs Organic Growth', readTime: 5, summary: 'Why authentic beats artificial.' },
    ],
  };

  const algorithmUpdates = [
    { date: 'Mar 2026', update: 'AI-generated content detection implemented', impact: 'Moderate', description: 'Instagram now flags AI-generated content but doesn\'t penalize it.' },
    { date: 'Feb 2026', update: 'Short-form video push continues', impact: 'High', description: 'Reels get 3x more impressions than carousel posts.' },
    { date: 'Jan 2026', update: 'Community Notes launch', impact: 'Moderate', description: 'Users can add context to posts like Twitter.' },
    { date: 'Dec 2025', update: 'Engagement pod detection', impact: 'High', description: 'Algorithm reduces reach for accounts using pods.' },
    { date: 'Nov 2025', update: 'Original content bonus', impact: 'High', description: 'Original content gets 20% more reach than reposts.' },
  ];

  const quickTips = [
    { tip: 'Post Reels at 8 PM for 25% higher engagement', category: 'Timing' },
    { tip: 'Use 4-6 hook seconds at the beginning of Reels', category: 'Reels' },
    { tip: 'Captions under 150 words get 40% more engagement', category: 'Writing' },
    { tip: 'Comment on 50+ posts daily for growth', category: 'Community' },
    { tip: 'Use 10 niche + 10 broad hashtags for best reach', category: 'Hashtags' },
    { tip: 'Post 5-6 times per week for consistency', category: 'Frequency' },
  ];

  const faqs = [
    { question: 'How often should I post on Instagram?', answer: 'Post 5-6 times per week for optimal reach and engagement. Consistency matters more than quantity. Find a schedule you can maintain long-term.' },
    { question: 'What\'s the best time to post?', answer: 'Post when your audience is most active. Check your Instagram Insights for your specific audience. Generally, 8 PM-10 PM weekdays show strong engagement.' },
    { question: 'Should I use hashtags?', answer: 'Yes, absolutely. Use 30 hashtags (10 niche, 10 mid-tier, 10 broad). Hashtags can increase reach by 50%. Put them in first comment, not caption.' },
    { question: 'How long should Reels be?', answer: '30-45 seconds is optimal. Shorter Reels have higher completion rates, but 30s allows for better storytelling. Avoid 15s unless testing.' },
    { question: 'Do engagement pods help?', answer: 'No. Algorithm detects pods and reduces reach. Focus on authentic engagement. Authentic followers are worth 10x more than pod followers.' },
    { question: 'How do I go viral?', answer: 'No guaranteed formula, but: hook viewers in first 0.5s, use trending audio, create relatable content, optimize posting time, and engage authentically.' },
  ];

  const resources = [
    { title: 'Later - Content Planning', url: 'later.com', icon: BookOpen },
    { title: 'Buffer - Analytics', url: 'buffer.com', icon: BarChart3 },
    { title: 'Hootsuite - Team Management', url: 'hootsuite.com', icon: Award },
    { title: 'Canva - Design', url: 'canva.com', icon: TrendingUp },
  ];

  const filteredArticles = selectedCategory
    ? articles[selectedCategory] || []
    : [];

  const allArticles = Object.values(articles).flat();

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatMessages([
        ...chatMessages,
        { type: 'user', text: chatInput },
        { type: 'ai', text: 'Great question! Based on the latest Instagram trends and our research, here are some actionable insights you can use immediately to improve your strategy...' },
      ]);
      setChatInput('');
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1>Knowledge Base</h1>
        <p>Learn everything about growing on Instagram</p>
      </div>

      {/* Search Bar */}
      <div className="search-container section">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search articles, guides, and tips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category Cards */}
      <h2 className="section-title">Browse By Category</h2>
      <div className="category-grid section">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
          >
            <category.icon size={28} style={{ color: category.color }} className="category-icon" />
            <p className="category-name">{category.name}</p>
          </button>
        ))}
      </div>

      {/* Articles Display */}
      {selectedCategory && (
        <div className="section">
          <h2 className="section-title capitalize">
            {categories.find((c) => c.id === selectedCategory)?.name} Articles
          </h2>
          <div className="articles-list">
            {filteredArticles.map((article, idx) => (
              <div
                key={idx}
                className="article-card card"
                onClick={() => setExpandedArticle(expandedArticle === idx ? null : idx)}
              >
                <div className="article-header flex-between">
                  <div className="flex-1">
                    <h3 className="article-title text-lg font-bold text-primary mb-1">{article.title}</h3>
                    <p className="text-secondary text-sm mb-2">{article.summary}</p>
                    <div className="article-meta flex items-center gap-1">
                      <Clock size={14} />
                      <span className="text-xs text-muted">{article.readTime} min read</span>
                    </div>
                  </div>
                  {expandedArticle === idx ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
                </div>
                {expandedArticle === idx && (
                  <div className="article-content">
                    <p className="text-secondary mb-4">
                      {article.summary} This comprehensive guide covers all aspects of {article.title.toLowerCase()}. You'll learn practical strategies, real-world examples, and actionable tips you can implement immediately to see results.
                    </p>
                    <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold text-sm">
                      Read Full Article <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Article */}
      {!selectedCategory && (
        <>
          <h2 className="section-title">Featured Article</h2>
          <div className="featured-article card card-gradient section">
            <div className="mb-4">
              <p className="featured-badge">FEATURED</p>
              <h3 className="text-2xl font-bold text-primary mb-3">The Complete Instagram Algorithm Guide 2026</h3>
              <p className="text-secondary text-base">
                Everything you need to know about how Instagram's algorithm works and how to leverage it for maximum growth. This comprehensive guide breaks down the algorithm, explains ranking factors, and gives you actionable strategies.
              </p>
            </div>
            <div className="featured-footer">
              <span className="text-secondary text-sm">15 min read</span>
              <button className="btn btn-primary">
                Read Now
              </button>
            </div>
          </div>
        </>
      )}

      {/* Quick Tips */}
      <h2 className="section-title">Quick Tips</h2>
      <div className="quick-tips grid-3 section">
        {quickTips.map((item, idx) => (
          <div
            key={idx}
            className="card-sm card"
          >
            <span className="badge badge-warning text-xs mb-2">{item.category}</span>
            <p className="text-primary font-semibold text-sm">{item.tip}</p>
          </div>
        ))}
      </div>

      {/* Algorithm Updates Timeline */}
      <h2 className="section-title">Algorithm Updates Timeline</h2>
      <div className="timeline section">
        {algorithmUpdates.map((update, idx) => (
          <div
            key={idx}
            className="card-sm card"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-secondary font-semibold text-sm">{update.date}</p>
              <span className={update.impact === 'High' ? 'badge badge-danger' : 'badge badge-warning'}>
                {update.impact} Impact
              </span>
            </div>
            <h3 className="text-primary font-bold text-sm mb-1">{update.update}</h3>
            <p className="text-secondary text-sm">{update.description}</p>
          </div>
        ))}
      </div>

      {/* AI Q&A Section */}
      <h2 className="section-title">Ask AI</h2>
      <div className="card section">
        <div className="chat-messages">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.type === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <p className="text-white text-sm">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input-group">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
            placeholder="Ask any Instagram question..."
            className="search-input"
          />
          <button
            onClick={handleChatSubmit}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem' }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq-list section">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="card-sm card faq-item"
            onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
          >
            <div className="flex-between">
              <p className="text-primary font-semibold flex-1">{faq.question}</p>
              {expandedFAQ === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedFAQ === idx && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Resource Links */}
      <h2 className="section-title">Curated Resources</h2>
      <div className="resources-grid grid-2 section">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={`https://${resource.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-sm card resource-link"
          >
            <div className="flex-between">
              <div className="flex items-center gap-3 flex-1">
                <resource.icon size={24} style={{ color: 'var(--color-primary)' }} />
                <div className="min-w-0">
                  <p className="text-primary font-semibold text-sm">{resource.title}</p>
                  <p className="text-secondary text-xs truncate">{resource.url}</p>
                </div>
              </div>
              <ExternalLink size={20} className="text-muted" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
