import React, { useState } from 'react';
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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Ads() {
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

  const [abTestVariants, setAbTestVariants] = useState([
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
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [budgetAllocations, setBudgetAllocations] = useState({
    1: 60,
    2: 25,
    3: 10,
    4: 5,
  });

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
  const totalResults = campaigns.reduce((sum, c) => sum + c.results, 0);

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
    const styles = {
      active: 'bg-green-900/30 text-green-300 border border-green-700',
      paused: 'bg-yellow-900/30 text-yellow-300 border border-yellow-700',
      completed: 'bg-blue-900/30 text-blue-300 border border-blue-700',
    };
    return styles[status] || styles.active;
  };

  const getObjectiveColor = (objective) => {
    const colors = {
      Conversions: '#E1306C',
      Reach: '#833AB4',
      Engagement: '#FD1D1D',
      Traffic: '#F77737',
    };
    return colors[objective] || '#E1306C';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Ad Manager</h1>
            <p className="text-gray-400">Manage campaigns, track ROI, and optimize spend</p>
          </div>
          <button
            onClick={() => setShowCampaignForm(!showCampaignForm)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow"
          >
            <Plus size={20} />
            New Campaign
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Budget', value: `$${totalBudget.toLocaleString()}`, icon: DollarSign, color: '#E1306C' },
            { label: 'Total Spend', value: `$${totalSpend.toLocaleString()}`, icon: TrendingUp, color: '#833AB4' },
            { label: 'Avg ROAS', value: '3.15x', icon: Zap, color: '#FD1D1D' },
            { label: 'Active Campaigns', value: campaigns.filter((c) => c.status === 'active').length, icon: Target, color: '#F77737' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon size={24} style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Creator Form */}
        {showCampaignForm && (
          <div className="mb-8 p-8 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Create New Campaign</h2>
              <button
                onClick={() => setShowCampaignForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Campaign Name', placeholder: 'Enter campaign name' },
                { label: 'Objective', placeholder: 'Select objective' },
                { label: 'Daily Budget', placeholder: '$100' },
                { label: 'Target Audience', placeholder: 'Select audience' },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-[#E1306C] transition-colors"
                  />
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow">
              Create Campaign
            </button>
          </div>
        )}

        {/* Campaigns Section */}
        <h2 className="text-2xl font-bold text-white mb-4">Active Campaigns</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all cursor-pointer group"
              style={{ backgroundColor: '#1a1a2e' }}
              onClick={() => setSelectedCampaign(selectedCampaign === campaign.id ? null : campaign.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{campaign.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                    <span className="text-gray-500 text-xs">{campaign.objective}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCampaignStatus(campaign.id);
                    }}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    {campaign.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCampaign(campaign.id);
                    }}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Budget', value: `$${campaign.budget}`, icon: DollarSign },
                  { label: 'Spend', value: `$${campaign.spend}`, icon: TrendingUp },
                  { label: 'CPC', value: `$${campaign.cpc || 'N/A'}`, icon: MousePointer },
                  { label: 'ROAS', value: `${campaign.roas}x`, icon: Award },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#0a0a0a' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={14} style={{ color: getObjectiveColor(campaign.objective) }} />
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                    <p className="text-sm font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Expandable Details */}
              {selectedCampaign === campaign.id && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Impressions', value: campaign.impressions.toLocaleString() },
                      { label: 'Clicks', value: campaign.clicks },
                      { label: 'Conversions', value: campaign.conversions },
                      { label: 'CPM', value: `$${campaign.cpm}` },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${(campaign.spend / campaign.budget) * 100}%`,
                    background: 'linear-gradient(90deg, #E1306C, #833AB4)',
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                ${campaign.spend} / ${campaign.budget} ({Math.round((campaign.spend / campaign.budget) * 100)}%)
              </p>
            </div>
          ))}
        </div>

        {/* A/B Testing Section */}
        <h2 className="text-2xl font-bold text-white mb-4">A/B Test Results</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {abTestVariants.map((variant) => (
            <div
              key={variant.id}
              className="p-6 rounded-xl border border-gray-800 relative overflow-hidden"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              {variant.winner && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white text-xs font-bold rounded-bl-lg">
                  WINNER
                </div>
              )}
              <h3 className="text-lg font-bold text-white mb-4">{variant.name}</h3>
              <div className="space-y-3">
                {[
                  { label: 'Impressions', value: variant.impressions.toLocaleString() },
                  { label: 'Clicks', value: variant.clicks },
                  { label: 'CTR', value: `${variant.ctr}%` },
                  { label: 'Conversions', value: variant.conversions },
                  { label: 'CPC', value: `$${variant.cpc}` },
                ].map((stat, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Budget Allocator */}
        <h2 className="text-2xl font-bold text-white mb-4">Budget Allocation</h2>
        <div className="p-6 rounded-xl border border-gray-800 mb-8" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white font-medium">{campaign.name}</p>
                  <p className="text-gray-400 text-sm">{budgetAllocations[campaign.id]}%</p>
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
                  className="w-full h-2 rounded-full appearance-none bg-gray-700 cursor-pointer accent-[#E1306C]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <h2 className="text-2xl font-bold text-white mb-4">ROI Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <div className="space-y-4">
              {[
                { key: 'adSpend', label: 'Ad Spend ($)', icon: DollarSign },
                { key: 'clicks', label: 'Clicks', icon: MousePointer },
                { key: 'conversions', label: 'Conversions', icon: ShoppingCart },
                { key: 'revenue', label: 'Revenue ($)', icon: TrendingUp },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                  <div className="flex items-center gap-3">
                    <field.icon size={18} className="text-gray-400" />
                    <input
                      type="number"
                      value={roiInputs[field.key]}
                      onChange={(e) =>
                        setRoiInputs({ ...roiInputs, [field.key]: parseFloat(e.target.value) || 0 })
                      }
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-[#E1306C] transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <h3 className="text-lg font-bold text-white mb-4">Results</h3>
            <div className="space-y-4">
              {[
                { label: 'ROI', value: `${roiResults.roi}%`, color: '#E1306C' },
                { label: 'ROAS', value: `${roiResults.roas}x`, color: '#833AB4' },
                { label: 'CPA', value: `$${roiResults.cpa}`, color: '#FD1D1D' },
                { label: 'Profit', value: `$${roiResults.profit}`, color: '#F77737' },
              ].map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  <p className="text-gray-400 text-sm mb-1">{result.label}</p>
                  <p className="text-2xl font-bold text-white">{result.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Charts */}
        <h2 className="text-2xl font-bold text-white mb-4">Performance Trends</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spend vs Results Chart */}
          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <h3 className="text-lg font-bold text-white mb-4">Spend vs Results</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="spend" fill="#E1306C" />
                <Bar dataKey="results" fill="#833AB4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CPC Trend Chart */}
          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <h3 className="text-lg font-bold text-white mb-4">CPC Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cpcTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="cpc" stroke="#E1306C" strokeWidth={2} dot={{ fill: '#E1306C' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Tips */}
        <h2 className="text-2xl font-bold text-white mb-4">Instagram Ads Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Use Carousel Ads', description: 'Carousel ads have 2.5x higher click-through rates than single image ads' },
            { title: 'Test Video Ads', description: 'Video ads achieve 30% lower CPC and 2x higher conversion rates' },
            { title: 'Optimize Landing Pages', description: 'Ensure 1-second mobile page load times for 50%+ conversion improvement' },
            { title: 'Segment Audiences', description: 'Custom audiences show 3x better ROAS than broad targeting' },
            { title: 'A/B Test Creative', description: 'Test headlines, images, and copy to find your winning combination' },
            { title: 'Use Dynamic Ads', description: 'Dynamic ads automatically show relevant products to interested users' },
          ].map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-400">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
