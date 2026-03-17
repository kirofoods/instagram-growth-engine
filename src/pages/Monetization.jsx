import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Link2,
  Package,
  Target,
  Award,
  Plus,
  Trash2,
  Check,
  Clock,
  AlertCircle,
  Eye,
  MoreVertical,
  Download,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Monetization.css';

export default function Monetization() {
  const [deals, setDeals] = useState([
    { id: 1, brand: 'FashionBrand Co', amount: 5000, status: 'active', deliverables: '3 Posts + 1 Story', deadline: '2026-04-15', description: 'Spring collection promotion' },
    { id: 2, brand: 'TechGear Inc', amount: 3500, status: 'negotiating', deliverables: '2 Reels + 5 Stories', deadline: '2026-04-30', description: 'Product launch campaign' },
    { id: 3, brand: 'BeveragePure', amount: 2000, status: 'pitched', deliverables: '4 Posts', deadline: '2026-05-10', description: 'Summer campaign' },
    { id: 4, brand: 'SkinCare Luxe', amount: 4200, status: 'completed', deliverables: '5 Posts + 1 Reel', deadline: '2026-03-10', description: 'Monthly sponsorship' },
  ]);

  const [affiliateLinks, setAffiliateLinks] = useState([
    { id: 1, program: 'Amazon Associates', url: 'amazon.com/ref=123', clicks: 3421, conversions: 87, commission: 145.30, status: 'active', created: '2025-10-15' },
    { id: 2, program: 'Shein Affiliate', url: 'shein.com/aff/456', clicks: 2150, conversions: 43, commission: 289.50, status: 'active', created: '2025-11-20' },
    { id: 3, program: 'Audible', url: 'audible.com/ref/789', clicks: 890, conversions: 12, commission: 84.00, status: 'active', created: '2025-12-01' },
    { id: 4, program: 'Coursera', url: 'coursera.com/aff/321', clicks: 456, conversions: 3, commission: 12.50, status: 'expired', created: '2025-08-10' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Instagram Growth Masterclass', price: 49.99, status: 'planning', projectedRevenue: 5000, launchDate: '2026-04-01' },
    { id: 2, name: 'Content Calender Template Bundle', price: 29.99, status: 'launched', projectedRevenue: 8000, launchDate: '2026-02-15' },
    { id: 3, name: 'Engagement Hacks E-book', price: 9.99, status: 'planning', projectedRevenue: 2000, launchDate: '2026-05-01' },
  ]);

  const [incomeTarget, setIncomeTarget] = useState(15000);
  const [incomeActual, setIncomeActual] = useState(12340);

  const [affiliateInputs, setAffiliateInputs] = useState({
    followers: 150000,
    engagementRate: 4.5,
    niche: 'Fashion & Lifestyle',
  });

  const monthlyRevenueData = [
    { month: 'Jan', deals: 8000, affiliate: 450, products: 0, total: 8450 },
    { month: 'Feb', deals: 12000, affiliate: 680, products: 320, total: 13000 },
    { month: 'Mar', deals: 9500, affiliate: 520, products: 890, total: 10910 },
    { month: 'Apr', deals: 15000, affiliate: 1200, products: 1240, total: 17440 },
    { month: 'May', deals: 11000, affiliate: 750, products: 1100, total: 12850 },
    { month: 'Jun', deals: 18500, affiliate: 1450, products: 2100, total: 22050 },
  ];

  const nicheBenchmarks = {
    'Fashion & Lifestyle': 500,
    'Tech & Gadgets': 650,
    'Beauty & Skincare': 550,
    'Fitness & Wellness': 480,
    'Travel & Adventure': 600,
  };

  const calculateSponsorshipRate = () => {
    const { followers, engagementRate, niche } = affiliateInputs;
    const baseCPM = nicheBenchmarks[niche] || 500;
    const followerBonus = followers > 100000 ? 1.3 : followers > 50000 ? 1.15 : 1;
    const engagementBonus = engagementRate > 3 ? 1.2 : engagementRate > 2 ? 1.1 : 1;

    const costPerPost = Math.round((followers / 1000) * baseCPM * followerBonus * engagementBonus);
    const costPerStory = Math.round(costPerPost * 0.3);
    const costPerReel = Math.round(costPerPost * 1.5);

    return { costPerPost, costPerStory, costPerReel };
  };

  const sponsorshipRates = calculateSponsorshipRate();
  const totalRevenue = deals.reduce((sum, d) => sum + (d.status === 'completed' ? d.amount : 0), 0) +
    affiliateLinks.reduce((sum, a) => sum + a.commission, 0) +
    products.reduce((sum, p) => sum + (p.status === 'launched' ? p.projectedRevenue * 0.3 : 0), 0);

  const getDealBoard = (status) => {
    return deals.filter((d) => d.status === status);
  };

  const moveDeal = (dealId, newStatus) => {
    setDeals(deals.map((d) => (d.id === dealId ? { ...d, status: newStatus } : d)));
  };

  const deleteDeal = (id) => {
    setDeals(deals.filter((d) => d.id !== id));
  };

  const deleteAffiliateLink = (id) => {
    setAffiliateLinks(affiliateLinks.filter((a) => a.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Monetization Pipeline</h1>
        <p>Track revenue streams and maximize earnings</p>
      </div>

      {/* Revenue Dashboard */}
      <div className="grid grid-4 section">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'var(--color-primary)' },
          { label: 'Active Deals', value: deals.filter((d) => d.status === 'active').length, icon: Briefcase, color: 'var(--color-secondary)' },
          { label: 'Affiliate Revenue', value: `$${affiliateLinks.reduce((s, a) => s + a.commission, 0).toFixed(2)}`, icon: Link2, color: '#ef4444' },
          { label: 'Monthly Target', value: `$${incomeTarget.toLocaleString()}`, icon: Target, color: '#f59e0b' },
        ].map((stat, idx) => (
          <div key={idx} className="card metric-card">
            <div className="flex-between items-start">
              <div className="flex-col gap-sm">
                <span className="stat-label">{stat.label}</span>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="metric-card-icon" style={{ color: stat.color }}>
                <stat.icon size={32} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <div className="section">
        <h2 className="section-title">Revenue Trends</h2>
        <div className="card">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
              <XAxis dataKey="month" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
                labelStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <Bar dataKey="deals" fill="var(--color-primary)" />
              <Bar dataKey="affiliate" fill="var(--color-secondary)" />
              <Bar dataKey="products" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Goal Tracker */}
      <div className="section">
        <h2 className="section-title">Monthly Income Goal</h2>
        <div className="card">
          <div className="flex-between gap-lg mb-4">
            <div>
              <p className="text-sm text-muted mb-1">Progress</p>
              <p className="stat-value">
                ${incomeActual.toLocaleString()} / ${incomeTarget.toLocaleString()}
              </p>
            </div>
            <p className="stat-value" style={{ color: 'var(--color-primary)' }}>
              {Math.round((incomeActual / incomeTarget) * 100)}%
            </p>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min((incomeActual / incomeTarget) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Sponsorship Rate Calculator */}
      <div className="section">
        <h2 className="section-title">Sponsorship Rate Calculator</h2>
        <div className="grid grid-2 gap-lg">
          {/* Input Section */}
          <div className="card">
            <div className="gap-md flex-col">
              {[
                { key: 'followers', label: 'Followers', icon: Target },
                { key: 'engagementRate', label: 'Engagement Rate (%)', icon: TrendingUp },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm text-secondary font-medium mb-2">{field.label}</label>
                  <div className="flex gap-sm items-center">
                    <field.icon size={18} style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="number"
                      value={affiliateInputs[field.key]}
                      onChange={(e) =>
                        setAffiliateInputs({ ...affiliateInputs, [field.key]: parseFloat(e.target.value) || 0 })
                      }
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="text-sm text-secondary font-medium mb-2">Niche</label>
                <select
                  value={affiliateInputs.niche}
                  onChange={(e) => setAffiliateInputs({ ...affiliateInputs, niche: e.target.value })}
                >
                  {Object.keys(nicheBenchmarks).map((niche) => (
                    <option key={niche} value={niche}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Suggested Rates</h3>
            <div className="gap-md flex-col">
              {[
                { label: 'Cost Per Post', value: `$${sponsorshipRates.costPerPost}`, color: 'var(--color-primary)' },
                { label: 'Cost Per Story', value: `$${sponsorshipRates.costPerStory}`, color: 'var(--color-secondary)' },
                { label: 'Cost Per Reel', value: `$${sponsorshipRates.costPerReel}`, color: '#ef4444' },
              ].map((rate, idx) => (
                <div key={idx} className="rate-item">
                  <p className="text-sm text-muted">{rate.label}</p>
                  <p className="stat-value">{rate.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Deal CRM - Kanban Board */}
      <div className="section">
        <h2 className="section-title">Brand Deal Pipeline</h2>
        <div className="kanban-board">
          {['pitched', 'negotiating', 'active', 'completed'].map((status) => (
            <div key={status} className="kanban-column">
              <div className="flex-between gap-sm mb-4">
                <h3 className="text-sm font-semibold capitalize">{status}</h3>
                <span className="badge badge-info text-sm">{getDealBoard(status).length}</span>
              </div>
              <div className="kanban-cards">
                {getDealBoard(status).map((deal) => (
                  <div key={deal.id} className="deal-card">
                    <div className="flex-between gap-sm mb-3">
                      <h4 className="text-sm font-semibold">{deal.brand}</h4>
                      <button
                        onClick={() => deleteDeal(deal.id)}
                        className="btn-ghost btn-small text-muted hover:text-negative"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-muted mb-3">{deal.description}</p>
                    <div className="gap-sm flex-col mb-3">
                      <p className="stat-value">${deal.amount}</p>
                      <p className="text-xs text-muted">{deal.deliverables}</p>
                    </div>
                    <div className="flex gap-sm flex-wrap">
                      {status !== 'completed' && (
                        <>
                          {status === 'pitched' && (
                            <button
                              onClick={() => moveDeal(deal.id, 'negotiating')}
                              className="btn-small badge badge-info"
                            >
                              Negotiate
                            </button>
                          )}
                          {status === 'negotiating' && (
                            <button
                              onClick={() => moveDeal(deal.id, 'active')}
                              className="btn-small badge badge-success"
                            >
                              Activate
                            </button>
                          )}
                          {status === 'active' && (
                            <button
                              onClick={() => moveDeal(deal.id, 'completed')}
                              className="btn-small badge"
                            >
                              Complete
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Kit Preview */}
      <div className="section">
        <h2 className="section-title">Media Kit Preview</h2>
        <div className="card">
          <div className="grid grid-2 gap-lg">
            <div>
              <h3 className="text-xl font-semibold mb-2">@your_handle</h3>
              <p className="text-muted mb-6">Fashion & Lifestyle Influencer</p>
              <div className="gap-md flex-col">
                <div>
                  <p className="text-xs text-muted mb-1">Followers</p>
                  <p className="stat-value">{affiliateInputs.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Engagement Rate</p>
                  <p className="stat-value">{affiliateInputs.engagementRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted mb-1">Content Type</p>
                  <p className="text-primary">Posts • Reels • Stories</p>
                </div>
              </div>
            </div>
            <div className="gap-md flex-col">
              <div className="rate-item">
                <p className="text-xs text-muted mb-1">Avg Monthly Reach</p>
                <p className="stat-value">2.4M</p>
              </div>
              <div className="rate-item">
                <p className="text-xs text-muted mb-1">Top Content Type</p>
                <p className="text-primary font-semibold">Lifestyle Reels (8.5% avg engagement)</p>
              </div>
              <button className="btn btn-primary gap-sm">
                <Download size={18} />
                Download Media Kit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Links Manager */}
      <div className="section">
        <h2 className="section-title">Affiliate Link Manager</h2>
        <div className="card overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Clicks</th>
                <th>Conversions</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {affiliateLinks.map((link) => (
                <tr key={link.id}>
                  <td>
                    <p className="font-semibold">{link.program}</p>
                    <p className="text-xs text-muted">{link.url}</p>
                  </td>
                  <td>{link.clicks.toLocaleString()}</td>
                  <td>{link.conversions}</td>
                  <td className="font-semibold">${link.commission.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${link.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteAffiliateLink(link.id)}
                      className="btn-ghost text-muted hover:text-negative"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Products */}
      <div className="section">
        <h2 className="section-title">Digital Product Launchpad</h2>
        <div className="grid grid-3 gap-lg">
          {products.map((product) => (
            <div key={product.id} className="card card-gradient">
              <div className="flex-between gap-sm mb-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className={`badge ${product.status === 'launched' ? 'badge-success' : 'badge-warning'}`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>
              <div className="gap-md flex-col mb-4">
                <div>
                  <p className="text-xs text-muted">Price</p>
                  <p className="stat-value">${product.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Projected Revenue</p>
                  <p className="text-lg font-semibold">${product.projectedRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Launch Date</p>
                  <p className="text-primary">{new Date(product.launchDate).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="btn btn-secondary w-full">
                {product.status === 'launched' ? 'View Analytics' : 'Create Checklist'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
