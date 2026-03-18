import React, { useState } from 'react';
import { useAppData, useAppCollection } from '../firebase/useAppData';
import {
  TrendingUp,
  Zap,
  DollarSign,
  Target,
  BarChart3,
  AlertCircle,
  Plus,
  Settings,
  Award,
  Eye,
  MousePointer,
  ShoppingCart,
  Pause,
  Play,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Ads.css';

export default function Ads() {
  // Load profile data and campaigns from Firestore
  const { data: profileData = {} } = useAppData('profile', {});
  const { items: savedCampaigns, addItem: addCampaign, updateItem: updateCampaign } = useAppCollection('adCampaigns');

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Collection Launch',
      status: 'active',
      objective: 'Conversions',
      budget: 5000,
      spend: 3240,
      results: 142,
      cpc: 22.82,
      cpm: 145.5,
      roas: 3.2,
      startDate: '2026-02-15',
      impressions: 22300,
      clicks: 142,
      conversions: 87,
    },
    {
      id: 2,
      name: 'Brand Awareness Push',
      status: 'active',
      objective: 'Reach',
      budget: 3000,
      spend: 2100,
      results: 45200,
      cpc: 0,
      cpm: 46.5,
      roas: 2.1,
      startDate: '2026-02-20',
      impressions: 45200,
      clicks: 1200,
      conversions: 45,
    },
    {
      id: 3,
      name: 'Engagement Boost',
      status: 'paused',
      objective: 'Engagement',
      budget: 2000,
      spend: 1850,
      results: 5600,
      cpc: 0,
      cpm: 89.2,
      roas: 1.8,
      startDate: '2026-03-01',
      impressions: 20700,
      clicks: 890,
      conversions: 34,
    },
    {
      id: 4,
      name: 'Retargeting Campaign',
      status: 'completed',
      objective: 'Conversions',
      budget: 4000,
      spend: 4000,
      results: 198,
      cpc: 20.2,
      cpm: 125.8,
      roas: 4.1,
      startDate: '2026-01-15',
      impressions: 31800,
      clicks: 198,
      conversions: 156,
    },
  ]);

  const [abTestVariants] = useState([
    {
      id: 1,
      name: 'Variant A: Lifestyle',
      impressions: 12300,
      clicks: 890,
      ctr: 7.23,
      conversions: 78,
      cpc: 18.5,
      winner: false,
    },
    {
      id: 2,
      name: 'Variant B: Product Focus',
      impressions: 12100,
      clicks: 1240,
      ctr: 10.24,
      conversions: 115,
      cpc: 14.2,
      winner: true,
    },
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignObjective, setNewCampaignObjective] = useState('Conversions');
  const [newCampaignBudget, setNewCampaignBudget] = useState('');
  const [newCampaignAudience, setNewCampaignAudience] = useState('');
  const [budgetAllocations, setBudgetAllocations] = useState({
    1: 60,
    2: 25,
    3: 10,
    4: 5,
  });

  const handleSaveNewCampaign = async () => {
    if (!newCampaignName || !newCampaignBudget) return;

    const newCampaign = {
      name: newCampaignName,
      status: 'active',
      objective: newCampaignObjective,
      budget: parseInt(newCampaignBudget),
      spend: 0,
      results: 0,
      cpc: 0,
      cpm: 0,
      roas: 0,
      startDate: new Date().toISOString().split('T')[0],
      impressions: 0,
      clicks: 0,
      conversions: 0,
      targetAudience: newCampaignAudience,
      followerCount: profileData.followers || 0,
      engagementRate: profileData.engagementRate || 0,
    };

    try {
      await addCampaign(newCampaign);
      setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }]);
      setShowCampaignForm(false);
      setNewCampaignName('');
      setNewCampaignBudget('');
      setNewCampaignAudience('');
      setNewCampaignObjective('Conversions');
    } catch (err) {
      console.error('Error saving campaign:', err);
    }
  };

  const [roiInputs, setRoiInputs] = useState({
    adSpend: 5000,
    clicks: 1200,
    conversions: 280,
    revenue: 18000,
  });

  const spendTrendData = [
    { date: 'Mar 1', spend: 450, results: 85 },
    { date: 'Mar 3', spend: 620, results: 142 },
    { date: 'Mar 5', spend: 540, results: 118 },
    { date: 'Mar 7', spend: 780, results: 195 },
    { date: 'Mar 9', spend: 920, results: 248 },
    { date: 'Mar 11', spend: 850, results: 215 },
    { date: 'Mar 13', spend: 1100, results: 312 },
    { date: 'Mar 15', spend: 980, results: 287 },
  ];

  const cpcTrendData = [
    { date: 'Mar 1', cpc: 28.5 },
    { date: 'Mar 3', cpc: 26.2 },
    { date: 'Mar 5', cpc: 24.8 },
    { date: 'Mar 7', cpc: 22.1 },
    { date: 'Mar 9', cpc: 20.5 },
    { date: 'Mar 11', cpc: 19.8 },
    { date: 'Mar 13', cpc: 18.5 },
    { date: 'Mar 15', cpc: 17.2 },
  ];

  const calculateROI = () => {
    const { adSpend, conversions, revenue } = roiInputs;
    const profit = revenue - adSpend;
    const roi = ((profit / adSpend) * 100).toFixed(2);
    const roas = (revenue / adSpend).toFixed(2);
    const cpa = (adSpend / conversions).toFixed(2);
    return { roi, roas, cpa, profit };
  };

  const roiResults = calculateROI();
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);

  const toggleCampaignStatus = (id) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === 'active' ? 'paused' : 'active',
            }
          : c
      )
    );
  };

  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'paused':
        return 'badge-warning';
      case 'completed':
        return 'badge-info';
      default:
        return 'badge-success';
    }
  };

  const getObjectiveColor = (objective) => {
    switch (objective) {
      case 'Conversions':
        return 'var(--color-primary)';
      case 'Reach':
        return 'var(--color-secondary)';
      case 'Engagement':
        return 'var(--status-error)';
      case 'Traffic':
        return 'var(--status-warning)';
      default:
        return 'var(--color-primary)';
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header flex-between">
        <div>
          <h1>Ad Manager</h1>
          <p>Manage campaigns, track ROI, and optimize spend</p>
        </div>
        <button
          onClick={() => setShowCampaignForm(!showCampaignForm)}
          className="btn btn-primary"
        >
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-4 mb-8">
        {[
          { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: DollarSign, color: 'var(--color-primary)' },
          { label: 'Total Spend', value: `$${totalSpend.toLocaleString()}`, icon: TrendingUp, color: 'var(--color-secondary)' },
          { label: 'Avg ROAS', value: '3.15x', icon: Zap, color: 'var(--status-error)' },
          { label: 'Active Campaigns', value: campaigns.filter((c) => c.status === 'active').length, icon: Target, color: 'var(--status-warning)' },
        ].map((stat, idx) => (
          <div key={idx} className="card stat-card">
            <div className="stat-header">
              <div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Creator Form */}
      {showCampaignForm && (
        <div className="card card-gradient mb-8">
          <div className="form-header">
            <h2>Create New Campaign</h2>
            <button
              onClick={() => setShowCampaignForm(false)}
              className="btn btn-ghost"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-2 gap-md">
            <div>
              <label className="form-label">Campaign Name</label>
              <input
                type="text"
                placeholder="Enter campaign name"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="form-label">Objective</label>
              <select
                value={newCampaignObjective}
                onChange={(e) => setNewCampaignObjective(e.target.value)}
                className="input"
              >
                <option>Conversions</option>
                <option>Reach</option>
                <option>Engagement</option>
                <option>Traffic</option>
              </select>
            </div>
            <div>
              <label className="form-label">Total Budget ($)</label>
              <input
                type="number"
                placeholder="e.g., 500"
                value={newCampaignBudget}
                onChange={(e) => setNewCampaignBudget(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="form-label">Target Audience</label>
              <input
                type="text"
                placeholder="e.g., Interested in photography"
                value={newCampaignAudience}
                onChange={(e) => setNewCampaignAudience(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-2 gap-3 mt-6">
            <button onClick={handleSaveNewCampaign} className="btn btn-primary">
              Create Campaign
            </button>
            <button
              onClick={() => setShowCampaignForm(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Campaigns Section */}
      <h2 className="section-title">Active Campaigns</h2>
      <div className="grid grid-2 gap-md mb-8">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="card campaign-card"
            onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
          >
            <div className="campaign-header">
              <div>
                <h3 className="text-primary font-semibold mb-2">{campaign.name}</h3>
                <div className="campaign-meta">
                  <span className={`badge ${getStatusBadge(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <span className="text-secondary text-xs">{campaign.objective}</span>
                </div>
              </div>
              <div className="campaign-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCampaignStatus(campaign.id);
                  }}
                  className="btn btn-secondary btn-small"
                >
                  {campaign.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCampaign(campaign.id);
                  }}
                  className="btn btn-secondary btn-small"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="campaign-stats">
              {[
                { label: 'Budget', value: `$${campaign.budget}`, icon: DollarSign },
                { label: 'Spend', value: `$${campaign.spend}`, icon: TrendingUp },
                { label: 'CPC', value: `$${campaign.cpc || 'N/A'}`, icon: MousePointer },
                { label: 'ROAS', value: `${campaign.roas}x`, icon: Award },
              ].map((stat, idx) => (
                <div key={idx} className="stat-box">
                  <div className="stat-box-label">
                    <stat.icon size={14} style={{ color: getObjectiveColor(campaign.objective) }} />
                    <p className="text-secondary text-xs">{stat.label}</p>
                  </div>
                  <p className="text-primary font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Expandable Details */}
            {selectedCampaign === campaign.id && (
              <div className="campaign-details">
                <div className="details-grid">
                  {[
                    { label: 'Impressions', value: campaign.impressions.toLocaleString() },
                    { label: 'Clicks', value: campaign.clicks },
                    { label: 'Conversions', value: campaign.conversions },
                    { label: 'CPM', value: `$${campaign.cpm}` },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <p className="text-muted text-xs mb-1">{item.label}</p>
                      <p className="text-primary font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="campaign-progress">
              <div className="metric-bar">
                <div
                  className="metric-fill gradient-bg"
                  style={{
                    width: `${(campaign.spend / campaign.budget) * 100}%`,
                  }}
                />
              </div>
              <p className="text-muted text-xs mt-2">
                ${campaign.spend} / ${campaign.budget} ({Math.round((campaign.spend / campaign.budget) * 100)}%)
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* A/B Testing Section */}
      <h2 className="section-title">A/B Test Results</h2>
      <div className="grid grid-2 gap-md mb-8">
        {abTestVariants.map((variant) => (
          <div key={variant.id} className="card ab-test-card">
            {variant.winner && (
              <div className="winner-badge">WINNER</div>
            )}
            <h3 className="text-primary font-semibold mb-4">{variant.name}</h3>
            <div className="variant-stats">
              {[
                { label: 'Impressions', value: variant.impressions.toLocaleString() },
                { label: 'Clicks', value: variant.clicks },
                { label: 'CTR', value: `${variant.ctr}%` },
                { label: 'Conversions', value: variant.conversions },
                { label: 'CPC', value: `$${variant.cpc}` },
              ].map((stat, idx) => (
                <div key={idx} className="variant-stat-row">
                  <p className="text-secondary text-sm">{stat.label}</p>
                  <p className="text-primary font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Budget Allocator */}
      <h2 className="section-title">Budget Allocation</h2>
      <div className="card card-gradient mb-8">
        <div className="allocator-list">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="allocator-item">
              <div className="allocator-header">
                <p className="text-primary font-medium">{campaign.name}</p>
                <p className="text-secondary text-sm">{budgetAllocations[campaign.id]}%</p>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={budgetAllocations[campaign.id]}
                onChange={(e) =>
                  setBudgetAllocations({
                    ...budgetAllocations,
                    [campaign.id]: parseInt(e.target.value),
                  })
                }
                className="allocator-slider"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ROI Calculator */}
      <h2 className="section-title">ROI Calculator</h2>
      <div className="grid grid-2 gap-md mb-8">
        <div className="card">
          <div className="calculator-inputs">
            {[
              { key: 'adSpend', label: 'Ad Spend ($)', icon: DollarSign },
              { key: 'clicks', label: 'Clicks', icon: MousePointer },
              { key: 'conversions', label: 'Conversions', icon: ShoppingCart },
              { key: 'revenue', label: 'Revenue ($)', icon: TrendingUp },
            ].map((field) => (
              <div key={field.key}>
                <label className="form-label">{field.label}</label>
                <div className="input-with-icon">
                  <field.icon size={18} className="text-secondary" />
                  <input
                    type="number"
                    value={roiInputs[field.key]}
                    onChange={(e) =>
                      setRoiInputs({ ...roiInputs, [field.key]: parseFloat(e.target.value) || 0 })
                    }
                    className="input"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-primary font-semibold mb-4">Results</h3>
          <div className="results-grid">
            {[
              { label: 'ROI', value: `${roiResults.roi}%`, color: 'var(--color-primary)' },
              { label: 'ROAS', value: `${roiResults.roas}x`, color: 'var(--color-secondary)' },
              { label: 'CPA', value: `$${roiResults.cpa}`, color: 'var(--status-error)' },
              { label: 'Profit', value: `$${roiResults.profit}`, color: 'var(--status-warning)' },
            ].map((result, idx) => (
              <div key={idx} className="result-box">
                <p className="text-secondary text-sm mb-1">{result.label}</p>
                <p className="text-primary font-semibold" style={{ color: result.color }}>{result.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <h2 className="section-title">Performance Trends</h2>
      <div className="grid grid-2 gap-md mb-8">
        {/* Spend vs Results Chart */}
        <div className="card chart-card">
          <h3 className="text-primary font-semibold mb-4">Spend vs Results</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <Bar dataKey="spend" fill="var(--color-primary)" />
              <Bar dataKey="results" fill="var(--color-secondary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CPC Trend Chart */}
        <div className="card chart-card">
          <h3 className="text-primary font-semibold mb-4">CPC Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cpcTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Line
                type="monotone"
                dataKey="cpc"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Tips */}
      <h2 className="section-title">Instagram Ads Best Practices</h2>
      <div className="grid grid-3 gap-md">
        {[
          { title: 'Use Carousel Ads', description: 'Carousel ads have 2.5x higher click-through rates than single image ads' },
          { title: 'Test Video Ads', description: 'Video ads achieve 30% lower CPC and 2x higher conversion rates' },
          { title: 'Optimize Landing Pages', description: 'Ensure 1-second mobile page load times for 50%+ conversion improvement' },
          { title: 'Segment Audiences', description: 'Custom audiences show 3x better ROAS than broad targeting' },
          { title: 'A/B Test Creative', description: 'Test headlines, images, and copy to find your winning combination' },
          { title: 'Use Dynamic Ads', description: 'Dynamic ads automatically show relevant products to interested users' },
        ].map((tip, idx) => (
          <div key={idx} className="card tip-card">
            <h3 className="text-primary font-semibold mb-2">{tip.title}</h3>
            <p className="text-secondary text-sm">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
