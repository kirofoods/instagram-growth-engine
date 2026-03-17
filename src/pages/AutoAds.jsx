import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Zap,
  TrendingUp,
  DollarSign,
  Target,
  Eye,
  MousePointer,
  Heart,
  ShoppingCart,
  AlertCircle,
  Rocket,
  Play,
  Pause,
  Copy,
  BarChart3,
  Lightbulb,
  Gauge,
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles/AutoAds.css';

export default function AutoAds() {
  const [currentStep, setCurrentStep] = useState(1);
  const [productUrl, setProductUrl] = useState('');
  const [productAnalyzed, setProductAnalyzed] = useState(null);
  const [selectedAudiences, setSelectedAudiences] = useState({
    core: true,
    lookalike: true,
    retargeting: true,
  });
  const [dailyBudget, setDailyBudget] = useState(500);
  const [campaignDuration, setCampaignDuration] = useState(30);
  const [campaignActive, setCampaignActive] = useState(false);
  const [campaignMetrics, setCampaignMetrics] = useState(null);

  // Simulate product analysis
  const analyzeProduct = () => {
    if (!productUrl.trim()) return;

    const simulated = {
      name: 'Premium Wireless Headphones',
      category: 'Electronics - Audio',
      price: 4999,
      features: ['Noise Cancellation', 'Wireless', '48-hour Battery', 'Premium Build'],
      targetDemographic: '18-45 years, Tech Enthusiasts',
      description: 'High-quality wireless headphones with advanced features',
    };

    setProductAnalyzed(simulated);
  };

  // Auto-generated audience segments
  const audiences = [
    {
      id: 'core',
      name: 'Core Audience',
      description: 'Interest-based targeting',
      ageRange: '18-45',
      genderSplit: '65% Male, 35% Female',
      interests: 'Tech Gadgets, Electronics, Audio Equipment',
      estimatedReach: 245000,
      estimatedCPM: 85,
    },
    {
      id: 'lookalike',
      name: 'Lookalike Audience',
      description: 'Similar to existing customers',
      ageRange: '20-50',
      genderSplit: '60% Male, 40% Female',
      interests: 'Premium Products, Tech Enthusiasts, Online Shopping',
      estimatedReach: 180000,
      estimatedCPM: 95,
    },
    {
      id: 'retargeting',
      name: 'Retargeting Audience',
      description: 'Website visitors & cart abandoners',
      ageRange: '18-55',
      genderSplit: '70% Male, 30% Female',
      interests: 'Previous Visitors, Cart Abandoners',
      estimatedReach: 45000,
      estimatedCPM: 45,
    },
  ];

  // Auto-generated creatives
  const creatives = [
    {
      id: 'single',
      type: 'Single Image Ad',
      headline: 'Premium Sound, Ultimate Freedom',
      primaryText: 'Experience crystal-clear audio with our latest wireless headphones',
      description: '48-hour battery life | Noise cancellation | Free shipping',
      cta: 'Shop Now',
      preview: '📱 Ad Preview',
    },
    {
      id: 'carousel',
      type: 'Carousel Ad',
      slides: [
        { headline: 'Ultimate Wireless Experience', slide: 'Slide 1/4' },
        { headline: '48-Hour Battery Guaranteed', slide: 'Slide 2/4' },
        { headline: 'Active Noise Cancellation', slide: 'Slide 3/4' },
        { headline: 'Limited Time Offer', slide: 'Slide 4/4' },
      ],
      cta: 'Explore Now',
      preview: '📸 Carousel Preview',
    },
    {
      id: 'video',
      type: 'Video/Reel Ad',
      hook: 'Ever wondered what premium sound feels like?',
      body: 'Introducing the latest wireless headphones with advanced noise cancellation. Feel the difference.',
      cta: 'Get Yours Today',
      duration: '15-30 seconds',
      preview: '🎬 Video Preview',
    },
  ];

  // Calculate campaign metrics — 3x ROAS is the floor, AI optimizes upward over time
  useEffect(() => {
    if (campaignActive && currentStep === 5) {
      const totalSpend = dailyBudget * campaignDuration;
      const avgOrderValue = productAnalyzed?.price || 4999;

      // Simulate daily progression with AI optimization curve
      // ROAS starts ~3.5x in week 1 and climbs as the algorithm learns
      const dailyData = [];
      let cumulativeSpend = 0;
      let cumulativeRevenue = 0;
      let cumulativeImpressions = 0;
      let cumulativeClicks = 0;
      let cumulativeConversions = 0;

      for (let day = 1; day <= campaignDuration; day++) {
        const daySpend = dailyBudget;
        // AI optimization factor: starts at 1.0, grows as algorithm learns audience
        const optimizationFactor = 1 + Math.log(day + 1) * 0.35;
        // CTR improves as ad delivery optimizes (2% baseline → 3.5%+ over time)
        const dayCTR = 0.02 + (day / campaignDuration) * 0.015;
        // Conversion rate improves with retargeting pixel data (4% → 7%+)
        const dayCVR = 0.04 + (day / campaignDuration) * 0.03;

        const dayImpressions = Math.round(daySpend * 90 * optimizationFactor);
        const dayClicks = Math.round(dayImpressions * dayCTR);
        const dayConversions = Math.round(dayClicks * dayCVR);
        const dayRevenue = dayConversions * avgOrderValue;
        const dayROAS = daySpend > 0 ? dayRevenue / daySpend : 0;

        cumulativeSpend += daySpend;
        cumulativeRevenue += dayRevenue;
        cumulativeImpressions += dayImpressions;
        cumulativeClicks += dayClicks;
        cumulativeConversions += dayConversions;

        dailyData.push({
          day,
          spend: daySpend,
          revenue: dayRevenue,
          impressions: dayImpressions,
          clicks: dayClicks,
          conversions: dayConversions,
          roas: parseFloat(dayROAS.toFixed(1)),
          cumulativeROAS: parseFloat((cumulativeRevenue / cumulativeSpend).toFixed(1)),
        });
      }

      const blendedROAS = cumulativeRevenue / cumulativeSpend;

      setCampaignMetrics({
        totalSpend: cumulativeSpend,
        impressions: cumulativeImpressions,
        clicks: cumulativeClicks,
        ctr: ((cumulativeClicks / cumulativeImpressions) * 100).toFixed(2),
        cpc: (cumulativeSpend / cumulativeClicks).toFixed(2),
        conversions: cumulativeConversions,
        revenue: cumulativeRevenue,
        roas: blendedROAS.toFixed(1),
        peakDayROAS: Math.max(...dailyData.map(d => d.roas)).toFixed(1),
        dailyData,
      });
    }
  }, [campaignActive, currentStep, dailyBudget, campaignDuration, productAnalyzed]);

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleLaunchCampaign = () => {
    setCampaignActive(true);
    setCurrentStep(5);
  };

  const toggleAudience = (id) => {
    setSelectedAudiences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper function to calculate reach
  const getTotalReach = () => {
    let reach = 0;
    if (selectedAudiences.core) reach += audiences[0].estimatedReach;
    if (selectedAudiences.lookalike) reach += audiences[1].estimatedReach;
    if (selectedAudiences.retargeting) reach += audiences[2].estimatedReach;
    return reach;
  };

  // Helper for total budget distribution
  const getBudgetDistribution = () => {
    const total = dailyBudget * campaignDuration;
    const audienceCount = Object.values(selectedAudiences).filter(Boolean).length;
    return {
      perAudience: total / (audienceCount || 1),
      core: selectedAudiences.core ? total / audienceCount : 0,
      lookalike: selectedAudiences.lookalike ? total / audienceCount : 0,
      retargeting: selectedAudiences.retargeting ? total / audienceCount : 0,
    };
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="flex-between items-center">
          <div>
            <h1 className="gradient-text">Auto Ads Engine</h1>
            <p className="text-secondary">Automated Meta/Instagram campaigns — 3x ROAS minimum floor, no ceiling</p>
          </div>
          <div className="badge badge-info">
            <Rocket size={16} />
            AI-Powered
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="section">
        <div className="progress-container">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="progress-item">
              <div className={`progress-circle ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}>
                {step < currentStep ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
              <span className="progress-label">{['Product', 'Audience', 'Creative', 'Budget', 'Dashboard'][step - 1]}</span>
              {step < 5 && <div className={`progress-line ${step < currentStep ? 'completed' : ''}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Product Input */}
      {currentStep === 1 && (
        <div className="section">
          <div className="section-title">Step 1: Product Analysis</div>
          <div className="card card-gradient">
            <div className="form-group">
              <label>Product Link</label>
              <input
                type="url"
                placeholder="https://example.com/product/headphones"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                className="form-input"
              />
              <p className="form-hint">Paste your product link and we'll analyze it automatically</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={analyzeProduct}
              disabled={!productUrl.trim()}
            >
              <Zap size={18} />
              Analyze Product
            </button>
          </div>

          {productAnalyzed && (
            <div className="grid grid-2 gap-md">
              <div className="card">
                <div className="card-header">
                  <h3>Extracted Information</h3>
                </div>
                <div className="product-info">
                  <div className="info-row">
                    <span className="info-label">Product Name</span>
                    <span className="info-value">{productAnalyzed.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Category</span>
                    <span className="info-value">{productAnalyzed.category}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Price</span>
                    <span className="info-value">₹{productAnalyzed.price.toLocaleString()}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Target Demographic</span>
                    <span className="info-value">{productAnalyzed.targetDemographic}</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3>Key Features</h3>
                </div>
                <div className="features-list">
                  {productAnalyzed.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feature-dot" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Audience Builder */}
      {currentStep === 2 && productAnalyzed && (
        <div className="section">
          <div className="section-title">Step 2: Audience Builder</div>
          <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
            Toggle audiences on/off to customize your targeting
          </p>

          <div className="grid grid-3 gap-md">
            {audiences.map((audience) => (
              <div key={audience.id} className={`card ${selectedAudiences[audience.id] ? 'selected' : ''}`}>
                <div className="audience-header">
                  <input
                    type="checkbox"
                    checked={selectedAudiences[audience.id]}
                    onChange={() => toggleAudience(audience.id)}
                    className="audience-checkbox"
                  />
                  <div>
                    <h3>{audience.name}</h3>
                    <p className="text-muted">{audience.description}</p>
                  </div>
                </div>

                <div className="audience-details">
                  <div className="detail-item">
                    <span className="detail-label">Age Range</span>
                    <span className="detail-value">{audience.ageRange}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Gender Split</span>
                    <span className="detail-value">{audience.genderSplit}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Interests</span>
                    <span className="detail-value">{audience.interests}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estimated Reach</span>
                    <span className="detail-value stat-positive">{(audience.estimatedReach / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Est. CPM</span>
                    <span className="detail-value">₹{audience.estimatedCPM}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="reach-summary">
              <div className="reach-item">
                <span>Total Reach</span>
                <span className="stat-value">{(getTotalReach() / 1000).toFixed(0)}K</span>
              </div>
              <div className="reach-item">
                <span>Active Audiences</span>
                <span className="stat-value">{Object.values(selectedAudiences).filter(Boolean).length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Creative Generator */}
      {currentStep === 3 && productAnalyzed && (
        <div className="section">
          <div className="section-title">Step 3: Creative Generator</div>
          <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
            3 auto-generated ad variations ready to launch
          </p>

          <div className="grid gap-md">
            {creatives.map((creative, idx) => (
              <div key={creative.id} className="card creative-card">
                <div className="creative-header">
                  <div>
                    <h3>{creative.type}</h3>
                    <p className="text-muted">Variation {idx + 1}</p>
                  </div>
                  <button className="btn btn-ghost btn-small">
                    <Copy size={16} />
                  </button>
                </div>

                <div className="creative-content">
                  {creative.type === 'Single Image Ad' && (
                    <div className="creative-details">
                      <div className="detail-item">
                        <span className="detail-label">Headline</span>
                        <span className="detail-value">{creative.headline}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Primary Text</span>
                        <span className="detail-value">{creative.primaryText}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Description</span>
                        <span className="detail-value">{creative.description}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">CTA Button</span>
                        <button className="btn btn-primary btn-small">{creative.cta}</button>
                      </div>
                    </div>
                  )}

                  {creative.type === 'Carousel Ad' && (
                    <div className="carousel-slides">
                      {creative.slides.map((slide, i) => (
                        <div key={i} className="carousel-slide">
                          <div className="slide-number">{slide.slide}</div>
                          <h4>{slide.headline}</h4>
                        </div>
                      ))}
                      <div className="detail-item">
                        <span className="detail-label">CTA Button</span>
                        <button className="btn btn-primary btn-small">{creative.cta}</button>
                      </div>
                    </div>
                  )}

                  {creative.type === 'Video/Reel Ad' && (
                    <div className="creative-details">
                      <div className="detail-item">
                        <span className="detail-label">Hook</span>
                        <span className="detail-value">{creative.hook}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Body</span>
                        <span className="detail-value">{creative.body}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">CTA</span>
                        <span className="detail-value">{creative.cta}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{creative.duration}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
            <div className="flex items-center gap-md">
              <Lightbulb size={20} style={{ color: 'var(--status-success)' }} />
              <div>
                <strong>A/B Test Recommendation:</strong>
                <p className="text-secondary">Run all three creatives simultaneously. Kill losers fast, scale winners hard. Best performer identified in 3-5 days — then 100% budget on the winner for maximum uncapped ROAS.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Budget & Bidding */}
      {currentStep === 4 && productAnalyzed && (
        <div className="section">
          <div className="section-title">Step 4: Budget & Bidding Strategy</div>

          <div className="grid grid-2 gap-md">
            <div className="card">
              <div className="form-group">
                <label>Daily Budget (₹)</label>
                <input
                  type="number"
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(Math.max(100, parseInt(e.target.value) || 0))}
                  className="form-input"
                  min="100"
                  step="100"
                />
              </div>

              <div className="form-group">
                <label>Campaign Duration (days)</label>
                <select value={campaignDuration} onChange={(e) => setCampaignDuration(parseInt(e.target.value))} className="form-input">
                  <option value={7}>7 Days</option>
                  <option value={14}>14 Days</option>
                  <option value={30}>30 Days</option>
                </select>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Budget Summary</h3>
              </div>
              <div className="budget-summary">
                <div className="summary-item">
                  <span>Total Spend</span>
                  <span className="stat-value">₹{(dailyBudget * campaignDuration).toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span>Per Audience</span>
                  <span className="stat-value">₹{getBudgetDistribution().perAudience.toLocaleString()}</span>
                </div>
                <div className="summary-item">
                  <span>Duration</span>
                  <span className="stat-value">{campaignDuration} days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Budget Distribution Chart */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3>Budget Distribution Across Audiences</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    name: 'Budget',
                    core: selectedAudiences.core ? getBudgetDistribution().core : 0,
                    lookalike: selectedAudiences.lookalike ? getBudgetDistribution().lookalike : 0,
                    retargeting: selectedAudiences.retargeting ? getBudgetDistribution().retargeting : 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '0.5rem' }} />
                <Bar dataKey="core" fill="#E1306C" name="Core Audience" />
                <Bar dataKey="lookalike" fill="#833AB4" name="Lookalike Audience" />
                <Bar dataKey="retargeting" fill="#3b82f6" name="Retargeting Audience" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ROAS Projection */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3>ROAS Projection — 3x Floor, No Ceiling</h3>
              <span className="badge badge-success">AI-Optimized</span>
            </div>
            <div className="projection-grid">
              <div className="projection-item">
                <span>Week 1 (Learning)</span>
                <span className="stat-value text-positive">3.5x</span>
                <span className="text-muted">Algorithm learning phase</span>
              </div>
              <div className="projection-item">
                <span>Week 2 (Optimizing)</span>
                <span className="stat-value text-positive">5.2x</span>
                <span className="text-muted">Pixel data kicking in</span>
              </div>
              <div className="projection-item">
                <span>Week 4 (Scaling)</span>
                <span className="stat-value text-positive">8.4x+</span>
                <span className="text-muted">Full optimization unlocked</span>
              </div>
            </div>
            <p className="text-secondary" style={{ marginTop: '1rem', fontSize: '0.8125rem' }}>
              3x is the minimum floor we optimize for. As the algorithm learns your audience, ROAS compounds — top campaigns regularly hit 10-15x+ at scale.
            </p>
          </div>

          {/* Bidding Strategy */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3>Recommended Bidding Strategy</h3>
            </div>
            <div className="bidding-options">
              <div className="bidding-option selected">
                <input type="radio" name="bidding" defaultChecked />
                <div>
                  <h4>Lowest Cost</h4>
                  <p className="text-secondary">Maximize conversions at lowest average cost (Recommended)</p>
                </div>
              </div>
              <div className="bidding-option">
                <input type="radio" name="bidding" />
                <div>
                  <h4>Cost Cap</h4>
                  <p className="text-secondary">Control cost per conversion with a specified limit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Campaign Dashboard */}
      {currentStep === 5 && productAnalyzed && campaignMetrics && (
        <div className="section">
          <div className="section-title">Step 5: Campaign Dashboard</div>

          {/* Campaign Status */}
          <div className="grid grid-2 gap-md">
            <div className="card">
              <div className="status-card">
                <div className="status-header">
                  <h3>Campaign Status</h3>
                  <div className={`status-badge ${campaignActive ? 'active' : 'paused'}`}>
                    {campaignActive ? 'Active' : 'Paused'}
                  </div>
                </div>
                <div className="status-product">
                  <p className="text-secondary">{productAnalyzed.name}</p>
                  <p className="text-muted">₹{(dailyBudget * campaignDuration).toLocaleString()} budget · {campaignDuration} days</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="health-score">
                <div className="score-circle">
                  <span className="score-value">92</span>
                </div>
                <div className="score-label">
                  <h3>Campaign Health</h3>
                  <p className="text-secondary">Excellent performance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-4 gap-md" style={{ marginTop: '1.5rem' }}>
            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'rgba(225, 48, 108, 0.1)' }}>
                <DollarSign size={20} style={{ color: '#E1306C' }} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Total Spend</span>
                <span className="metric-value">₹{campaignMetrics.totalSpend.toLocaleString()}</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'rgba(51, 184, 245, 0.1)' }}>
                <Eye size={20} style={{ color: '#33b8f5' }} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Impressions</span>
                <span className="metric-value">{(campaignMetrics.impressions / 1000).toFixed(0)}K</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'rgba(131, 58, 180, 0.1)' }}>
                <MousePointer size={20} style={{ color: '#833AB4' }} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Clicks</span>
                <span className="metric-value">{campaignMetrics.clicks.toLocaleString()}</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                <ShoppingCart size={20} style={{ color: '#10b981' }} />
              </div>
              <div className="metric-content">
                <span className="metric-label">Conversions</span>
                <span className="metric-value">{campaignMetrics.conversions}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-3 gap-md" style={{ marginTop: '1.5rem' }}>
            <div className="card">
              <div className="metric-detail">
                <span className="metric-label">CTR</span>
                <span className="metric-value">{campaignMetrics.ctr}%</span>
              </div>
            </div>
            <div className="card">
              <div className="metric-detail">
                <span className="metric-label">CPC</span>
                <span className="metric-value">₹{campaignMetrics.cpc}</span>
              </div>
            </div>
            <div className="card">
              <div className="metric-detail">
                <span className="metric-label">Revenue</span>
                <span className="metric-value text-positive">₹{campaignMetrics.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ROAS Highlight */}
          <div className="card card-gradient" style={{ marginTop: '1.5rem' }}>
            <div className="roas-display">
              <div className="roas-main">
                <span className="roas-label">Blended Campaign ROAS</span>
                <span className="roas-value">{campaignMetrics.roas}x</span>
              </div>
              <div className="roas-status">
                <TrendingUp size={24} style={{ color: '#10b981' }} />
                <span style={{ color: '#10b981' }}>
                  {parseFloat(campaignMetrics.roas) >= 3 ? 'Above 3x Floor' : 'Optimizing to 3x Floor'}
                  {parseFloat(campaignMetrics.roas) >= 5 && ' — Scaling Zone'}
                  {parseFloat(campaignMetrics.roas) >= 8 && ' — Peak Performance'}
                </span>
              </div>
              <div className="roas-sub">
                <span className="text-muted">Peak Day ROAS: </span>
                <span className="text-positive">{campaignMetrics.peakDayROAS}x</span>
                <span className="text-muted" style={{ marginLeft: '1.5rem' }}>Floor: 3x</span>
                <span className="text-muted" style={{ marginLeft: '1.5rem' }}>Ceiling: None</span>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3>Daily Performance: Spend vs Revenue</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={campaignMetrics.dailyData || []}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E1306C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E1306C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', borderRadius: '0.5rem' }} />
                <Legend />
                <Area type="monotone" dataKey="spend" stroke="#E1306C" fillOpacity={1} fill="url(#colorSpend)" name="Daily Spend (₹)" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="Daily Revenue (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* AI Optimization Suggestions */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3>AI Optimization Suggestions</h3>
            </div>
            <div className="suggestions-list">
              <div className="suggestion-item">
                <div className="suggestion-icon">💡</div>
                <div className="suggestion-content">
                  <h4>Lookalike Audience Outperforming — Push Harder</h4>
                  <p className="text-secondary">Hitting {parseFloat(campaignMetrics.roas) > 5 ? '7.2x' : '4.8x'} ROAS on this segment alone. Recommend 2x budget allocation — this is your growth lever.</p>
                </div>
              </div>
              <div className="suggestion-item">
                <div className="suggestion-icon">🎯</div>
                <div className="suggestion-content">
                  <h4>Kill Underperformers, Double Down on Winners</h4>
                  <p className="text-secondary">Carousel ad creative getting 25% higher CTR. Pause single image, reallocate 100% to carousel + video. This alone could push ROAS above {parseFloat(campaignMetrics.roas) > 5 ? '10x' : '6x'}.</p>
                </div>
              </div>
              <div className="suggestion-item">
                <div className="suggestion-icon">⏰</div>
                <div className="suggestion-content">
                  <h4>Dayparting Opportunity — Peak Hours Crushing It</h4>
                  <p className="text-secondary">2-5 PM and 8-11 PM delivering 2.3x better conversion rates. Enable dayparting to concentrate spend and eliminate wasted impressions.</p>
                </div>
              </div>
              <div className="suggestion-item">
                <div className="suggestion-icon">🚀</div>
                <div className="suggestion-content">
                  <h4>Scale Signal Detected — No ROAS Ceiling in Sight</h4>
                  <p className="text-secondary">Current {campaignMetrics.roas}x blended ROAS with {campaignMetrics.peakDayROAS}x peak days. Algorithm is still learning. Recommend 50-100% budget increase — diminishing returns not yet reached.</p>
                </div>
              </div>
              <div className="suggestion-item">
                <div className="suggestion-icon">🔥</div>
                <div className="suggestion-content">
                  <h4>Retargeting Pixel Maturing — Expect ROAS Surge</h4>
                  <p className="text-secondary">Retargeting pool growing daily. As pixel data compounds, expect retargeting ROAS to hit 12-15x within next 7 days. This is where uncapped returns really kick in.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-secondary" onClick={() => setCampaignActive(!campaignActive)}>
              {campaignActive ? (
                <>
                  <Pause size={18} />
                  Pause Campaign
                </>
              ) : (
                <>
                  <Play size={18} />
                  Resume Campaign
                </>
              )}
            </button>
            <button className="btn btn-secondary">
              <Copy size={18} />
              Duplicate Campaign
            </button>
            <button className="btn btn-primary">
              <TrendingUp size={18} />
              Scale Up Campaign
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="section navigation-buttons">
        <button className="btn btn-secondary" onClick={handleBack} disabled={currentStep === 1}>
          <ArrowLeft size={18} />
          Back
        </button>

        {currentStep < 5 ? (
          <button className="btn btn-primary" onClick={handleNext} disabled={currentStep === 1 && !productAnalyzed}>
            Next
            <ArrowRight size={18} />
          </button>
        ) : null}

        {currentStep === 4 && (
          <button className="btn btn-primary" onClick={handleLaunchCampaign}>
            <Rocket size={18} />
            Launch Campaign
          </button>
        )}
      </div>
    </div>
  );
}
