import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  PenTool,
  Zap,
  CalendarDays,
  Grid3x3,
  Search,
  Hash,
  BarChart3,
  Target,
  MessageSquare,
  Heart,
  ShieldCheck,
  Megaphone,
  DollarSign,
  BookOpen,
  CheckCircle2,
  Settings,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  HelpCircle,
  Keyboard,
} from 'lucide-react';
import '../styles/Guide.css';

const Guide = () => {
  const [expandedStep, setExpandedStep] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  const features = [
    // CORE
    {
      category: 'CORE',
      name: 'Dashboard',
      description: 'Overview of key metrics and account health',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      category: 'CORE',
      name: 'Growth Milestones',
      description: '0→100K roadmap and milestone tracking',
      icon: TrendingUp,
      path: '/growth-milestones',
    },
    // CREATE
    {
      category: 'CREATE',
      name: 'Content Studio',
      description: 'AI captions, hashtags, and carousel generator',
      icon: PenTool,
      path: '/content-studio',
    },
    {
      category: 'CREATE',
      name: 'Viral Lab',
      description: 'Hook library and viral content formulas',
      icon: Zap,
      path: '/viral-lab',
    },
    {
      category: 'CREATE',
      name: 'Calendar',
      description: 'Content scheduling and posting automation',
      icon: CalendarDays,
      path: '/calendar',
    },
    {
      category: 'CREATE',
      name: 'Grid Planner',
      description: 'Instagram feed aesthetic optimization',
      icon: Grid3x3,
      path: '/grid-planner',
    },
    // GROW
    {
      category: 'GROW',
      name: 'SEO Suite',
      description: 'Profile optimization for discoverability',
      icon: Search,
      path: '/seo-suite',
    },
    {
      category: 'GROW',
      name: 'Hashtags',
      description: 'Hashtag research, strategy, and saved sets',
      icon: Hash,
      path: '/hashtags',
    },
    {
      category: 'GROW',
      name: 'Analytics',
      description: 'Performance tracking and insights',
      icon: BarChart3,
      path: '/analytics',
    },
    {
      category: 'GROW',
      name: 'Strategy',
      description: 'Growth planning and optimization',
      icon: Target,
      path: '/strategy',
    },
    // ENGAGE
    {
      category: 'ENGAGE',
      name: 'DM Funnels',
      description: 'Automated DM sequences for conversions',
      icon: MessageSquare,
      path: '/dm-funnels',
    },
    {
      category: 'ENGAGE',
      name: 'Engagement',
      description: 'Community building and interaction tools',
      icon: Heart,
      path: '/engagement',
    },
    {
      category: 'ENGAGE',
      name: 'Account Health',
      description: 'Shadowban detection and account status',
      icon: ShieldCheck,
      path: '/account-health',
    },
    // MONETIZE
    {
      category: 'MONETIZE',
      name: 'Ads Manager',
      description: 'Meta ads campaign management',
      icon: Megaphone,
      path: '/ads',
    },
    {
      category: 'MONETIZE',
      name: 'Auto Ads Engine',
      description: 'Automated ads optimization and scaling',
      icon: DollarSign,
      path: '/monetization',
    },
    // LEARN
    {
      category: 'LEARN',
      name: 'Daily Actions',
      description: 'Daily checklist for consistent growth',
      icon: CheckCircle2,
      path: '/daily-actions',
    },
    {
      category: 'LEARN',
      name: 'Knowledge Base',
      description: 'Comprehensive guides and tips',
      icon: BookOpen,
      path: '/knowledge-base',
    },
    {
      category: 'LEARN',
      name: 'Settings',
      description: 'App configuration and preferences',
      icon: Settings,
      path: '/settings',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Start with Dashboard',
      description: 'Check your current metrics and account status',
      details: 'Visit the Dashboard to see your follower count, engagement rate, reach, and overall account health. This gives you the baseline for tracking progress.',
    },
    {
      number: 2,
      title: 'Set Growth Milestones',
      description: 'Know where you\'re headed with a clear roadmap',
      details: 'Use Growth Milestones to set targets from 0 to 100K followers. Break down your goals and track progress toward each milestone with actionable steps.',
    },
    {
      number: 3,
      title: 'Plan Content',
      description: 'Create and schedule using AI tools',
      details: 'Use Content Studio to generate captions and hashtags with AI. Create carousel posts, then schedule them in Calendar for consistent posting.',
    },
    {
      number: 4,
      title: 'Optimize Discovery',
      description: 'Get found by the right audience',
      details: 'Optimize your profile with SEO Suite. Research and apply high-performing hashtags using Hashtags tool. Update your bio and link for maximum reach.',
    },
    {
      number: 5,
      title: 'Engage Daily',
      description: 'Follow the Daily Actions checklist',
      details: 'Complete Daily Actions every day: respond to comments, engage with follower posts, and build community. Consistency is key to algorithm favor.',
    },
    {
      number: 6,
      title: 'Track Progress',
      description: 'Check Analytics weekly for insights',
      details: 'Review Analytics weekly to see what\'s working. Track top-performing content, follower growth trends, and engagement patterns to refine your strategy.',
    },
    {
      number: 7,
      title: 'Scale with Ads',
      description: 'Boost reach when ready',
      details: 'Once you have solid content, use Auto Ads Engine to scale reach. Create Meta ads campaigns for your best-performing content and leverage DM Funnels for conversions.',
    },
    {
      number: 8,
      title: 'Monetize',
      description: 'Set up revenue streams',
      details: 'Explore Monetization options: affiliate links, sponsored content, product sales. Use DM Funnels to convert followers into customers.',
    },
  ];

  const tips = [
    {
      title: 'Post Consistently',
      description: 'Use Calendar to schedule 3-5 posts per week. Consistency signals the algorithm that your account is active.',
    },
    {
      title: 'Engage First, Grow Second',
      description: 'Spend 20% of time on your own content and 80% engaging with others. This builds community and increases discoverability.',
    },
    {
      title: 'Test, Measure, Optimize',
      description: 'Use Analytics to identify top performers. Double down on content types, hooks, and hashtags that get the most engagement.',
    },
    {
      title: 'Use DM Funnels for Conversion',
      description: 'Set up automated DM sequences for new followers. Convert engaged followers into customers or subscribers.',
    },
    {
      title: 'Keep Profile Updated',
      description: 'Monthly, revisit SEO Suite to update your bio, link, and profile photo. This keeps your profile fresh and optimized.',
    },
  ];

  const faqs = [
    {
      question: 'How often should I post?',
      answer: 'We recommend 3-5 posts per week for consistent growth. Use Calendar to maintain this schedule. More frequent posting increases visibility, but quality matters more than quantity.',
    },
    {
      question: 'Will KiroGram work for any niche?',
      answer: 'Yes! KiroGram is designed for all niches. Tailor your hashtags, content strategy, and audience targeting using the tools provided. Every niche has engaged audiences waiting to find you.',
    },
    {
      question: 'How long does it take to see results?',
      answer: 'Most users see initial traction within 2-4 weeks of consistent posting and engagement. Faster growth typically happens after 8-12 weeks when the algorithm recognizes your account.',
    },
    {
      question: 'Can I use KiroGram to manage multiple accounts?',
      answer: 'Yes! You can add multiple Instagram accounts in Settings. Switch between accounts and manage them all from KiroGram.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Your data is encrypted and stored securely. KiroGram only accesses public information from your Instagram profile and doesn\'t store passwords.',
    },
    {
      question: 'What if I get shadowbanned?',
      answer: 'Use Account Health to detect shadowbans early. We provide recovery steps including hashtag rotation, content audit, and temporary engagement slowdown to restore visibility.',
    },
  ];

  const shortcuts = [
    { keys: 'D', action: 'Go to Dashboard' },
    { keys: 'C', action: 'Open Content Studio' },
    { keys: 'A', action: 'Open Analytics' },
    { keys: 'S', action: 'Open Settings' },
    { keys: '?', action: 'Open this help menu' },
  ];

  const groupedFeatures = {};
  features.forEach((feature) => {
    if (!groupedFeatures[feature.category]) {
      groupedFeatures[feature.category] = [];
    }
    groupedFeatures[feature.category].push(feature);
  });

  const categoryOrder = ['CORE', 'CREATE', 'GROW', 'ENGAGE', 'MONETIZE', 'LEARN'];

  return (
    <div className="page guide-page">
      <div className="page-header">
        <h1 className="gradient-text">KiroGram Guide</h1>
        <p>Complete walkthrough and feature reference for growing your Instagram</p>
      </div>

      {/* Feature Summary Section */}
      <section className="section">
        <h2 className="section-title">All Features</h2>
        <div className="guide-features">
          {categoryOrder.map((category) => (
            <div key={category} className="feature-category">
              <h3 className="category-header">{category}</h3>
              <div className="grid grid-2">
                {groupedFeatures[category]?.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <a
                      key={feature.path}
                      href={feature.path}
                      className="feature-card card"
                    >
                      <div className="feature-icon-box">
                        <Icon size={24} />
                      </div>
                      <div className="feature-content">
                        <h4 className="feature-name">{feature.name}</h4>
                        <p className="feature-description">
                          {feature.description}
                        </p>
                      </div>
                      <ChevronRight className="feature-arrow" size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use Guide */}
      <section className="section">
        <h2 className="section-title">How to Use KiroGram</h2>
        <div className="steps-container">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step-card card ${
                expandedStep === step.number ? 'expanded' : ''
              }`}
              onClick={() =>
                setExpandedStep(
                  expandedStep === step.number ? null : step.number
                )
              }
            >
              <div className="step-header">
                <div className="step-number-badge">{step.number}</div>
                <div className="step-title-section">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                <ChevronDown
                  className={`step-chevron ${
                    expandedStep === step.number ? 'rotated' : ''
                  }`}
                  size={20}
                />
              </div>
              {expandedStep === step.number && (
                <div className="step-details">
                  <p>{step.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="section">
        <h2 className="section-title">Pro Tips</h2>
        <div className="grid grid-2">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className={`tip-card card ${
                expandedTip === idx ? 'expanded' : ''
              }`}
              onClick={() => setExpandedTip(expandedTip === idx ? null : idx)}
            >
              <div className="tip-header">
                <Lightbulb size={20} className="tip-icon" />
                <h4 className="tip-title">{tip.title}</h4>
              </div>
              <p className="tip-description">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="section">
        <h2 className="section-title">Keyboard Shortcuts</h2>
        <div className="shortcuts-table card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shortcuts.map((shortcut, idx) => (
                <tr key={idx}>
                  <td>
                    <kbd className="shortcut-key">{shortcut.keys}</kbd>
                  </td>
                  <td>{shortcut.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-card card ${
                expandedFaq === idx ? 'expanded' : ''
              }`}
              onClick={() =>
                setExpandedFaq(expandedFaq === idx ? null : idx)
              }
            >
              <div className="faq-header">
                <HelpCircle size={18} className="faq-icon" />
                <h4 className="faq-question">{faq.question}</h4>
                <ChevronDown
                  className={`faq-chevron ${
                    expandedFaq === idx ? 'rotated' : ''
                  }`}
                  size={18}
                />
              </div>
              {expandedFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Guide;
