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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

  const revenueBySource = [
    { name: 'Brand Deals', value: 65, color: '#E1306C' },
    { name: 'Affiliate', value: 20, color: '#833AB4' },
    { name: 'Products', value: 15, color: '#FD1D1D' },
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

  const getDealStatus = (status) => {
    const styles = {
      pitched: 'bg-yellow-900/30 text-yellow-300 border border-yellow-700',
      negotiating: 'bg-blue-900/30 text-blue-300 border border-blue-700',
      active: 'bg-green-900/30 text-green-300 border border-green-700',
      completed: 'bg-gray-900/30 text-gray-300 border border-gray-700',
    };
    return styles[status] || styles.pitched;
  };

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
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Monetization Pipeline</h1>
          <p className="text-gray-400">Track revenue streams and maximize earnings</p>
        </div>

        {/* Revenue Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#E1306C' },
            { label: 'Active Deals', value: deals.filter((d) => d.status === 'active').length, icon: Briefcase, color: '#833AB4' },
            { label: 'Affiliate Revenue', value: `$${affiliateLinks.reduce((s, a) => s + a.commission, 0).toFixed(2)}`, icon: Link2, color: '#FD1D1D' },
            { label: 'Monthly Target', value: `$${incomeTarget.toLocaleString()}`, icon: Target, color: '#F77737' },
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

        {/* Revenue Trend Chart */}
        <h2 className="text-2xl font-bold text-white mb-4">Revenue Trends</h2>
        <div className="p-6 rounded-xl border border-gray-800 mb-8" style={{ backgroundColor: '#1a1a2e' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="deals" fill="#E1306C" />
              <Bar dataKey="affiliate" fill="#833AB4" />
              <Bar dataKey="products" fill="#FD1D1D" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income Goal Tracker */}
        <h2 className="text-2xl font-bold text-white mb-4">Monthly Income Goal</h2>
        <div className="p-6 rounded-xl border border-gray-800 mb-8" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Progress</p>
              <p className="text-2xl font-bold text-white">
                ${incomeActual.toLocaleString()} / ${incomeTarget.toLocaleString()}
              </p>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#E1306C' }}>
              {Math.round((incomeActual / incomeTarget) * 100)}%
            </p>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4">
            <div
              className="h-4 rounded-full transition-all"
              style={{
                width: `${Math.min((incomeActual / incomeTarget) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #E1306C, #833AB4)',
              }}
            />
          </div>
        </div>

        {/* Sponsorship Rate Calculator */}
        <h2 className="text-2xl font-bold text-white mb-4">Sponsorship Rate Calculator</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <div className="space-y-4">
              {[
                { key: 'followers', label: 'Followers', icon: Target },
                { key: 'engagementRate', label: 'Engagement Rate (%)', icon: TrendingUp },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                  <div className="flex items-center gap-3">
                    <field.icon size={18} className="text-gray-400" />
                    <input
                      type="number"
                      value={affiliateInputs[field.key]}
                      onChange={(e) =>
                        setAffiliateInputs({ ...affiliateInputs, [field.key]: parseFloat(e.target.value) || 0 })
                      }
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-[#E1306C]"
                    />
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Niche</label>
                <select
                  value={affiliateInputs.niche}
                  onChange={(e) => setAffiliateInputs({ ...affiliateInputs, niche: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-[#E1306C]"
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
          <div className="p-6 rounded-xl border border-gray-800" style={{ backgroundColor: '#1a1a2e' }}>
            <h3 className="text-lg font-bold text-white mb-4">Suggested Rates</h3>
            <div className="space-y-4">
              {[
                { label: 'Cost Per Post', value: `$${sponsorshipRates.costPerPost}`, color: '#E1306C' },
                { label: 'Cost Per Story', value: `$${sponsorshipRates.costPerStory}`, color: '#833AB4' },
                { label: 'Cost Per Reel', value: `$${sponsorshipRates.costPerReel}`, color: '#FD1D1D' },
              ].map((rate, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: '#0a0a0a' }}
                >
                  <p className="text-gray-400 text-sm mb-1">{rate.label}</p>
                  <p className="text-2xl font-bold text-white">{rate.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Deal CRM - Kanban Board */}
        <h2 className="text-2xl font-bold text-white mb-4">Brand Deal Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {['pitched', 'negotiating', 'active', 'completed'].map((status) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white capitalize">{status}</h3>
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  {getDealBoard(status).length}
                </span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {getDealBoard(status).map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 rounded-lg border border-gray-700 cursor-move hover:border-gray-600 transition-colors group"
                    style={{ backgroundColor: '#1a1a2e' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-white text-sm">{deal.brand}</h4>
                      <button
                        onClick={() => deleteDeal(deal.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{deal.description}</p>
                    <div className="space-y-2 mb-3">
                      <p className="text-lg font-bold text-white">${deal.amount}</p>
                      <p className="text-xs text-gray-500">{deal.deliverables}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {status !== 'completed' && (
                        <>
                          {status === 'pitched' && (
                            <button
                              onClick={() => moveDeal(deal.id, 'negotiating')}
                              className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 transition-colors"
                            >
                              Negotiate
                            </button>
                          )}
                          {status === 'negotiating' && (
                            <button
                              onClick={() => moveDeal(deal.id, 'active')}
                              className="text-xs px-2 py-1 rounded bg-green-900/30 text-green-300 hover:bg-green-900/50 transition-colors"
                            >
                              Activate
                            </button>
                          )}
                          {status === 'active' && (
                            <button
                              onClick={() => moveDeal(deal.id, 'completed')}
                              className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
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

        {/* Media Kit Preview */}
        <h2 className="text-2xl font-bold text-white mb-4">Media Kit Preview</h2>
        <div className="p-8 rounded-xl border border-gray-800 mb-8" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">@your_handle</h3>
              <p className="text-gray-400 mb-6">Fashion & Lifestyle Influencer</p>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Followers</p>
                  <p className="text-2xl font-bold text-white">{affiliateInputs.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Engagement Rate</p>
                  <p className="text-2xl font-bold text-white">{affiliateInputs.engagementRate}%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Content Type</p>
                  <p className="text-white">Posts • Reels • Stories</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-900">
                <p className="text-gray-400 text-sm mb-1">Avg Monthly Reach</p>
                <p className="text-2xl font-bold text-white">2.4M</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-900">
                <p className="text-gray-400 text-sm mb-1">Top Content Type</p>
                <p className="text-white font-semibold">Lifestyle Reels (8.5% avg engagement)</p>
              </div>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold hover:shadow-lg transition-shadow">
                <Download size={18} className="inline mr-2" />
                Download Media Kit
              </button>
            </div>
          </div>
        </div>

        {/* Affiliate Links Manager */}
        <h2 className="text-2xl font-bold text-white mb-4">Affiliate Link Manager</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Program</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Clicks</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Conversions</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Commission</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {affiliateLinks.map((link) => (
                <tr
                  key={link.id}
                  className="border-b border-gray-800 hover:bg-gray-900/20 transition-colors"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-white">{link.program}</p>
                    <p className="text-xs text-gray-500">{link.url}</p>
                  </td>
                  <td className="px-4 py-4 text-white">{link.clicks.toLocaleString()}</td>
                  <td className="px-4 py-4 text-white">{link.conversions}</td>
                  <td className="px-4 py-4 font-bold text-white">${link.commission.toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        link.status === 'active'
                          ? 'bg-green-900/30 text-green-300 border border-green-700'
                          : 'bg-red-900/30 text-red-300 border border-red-700'
                      }`}
                    >
                      {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => deleteAffiliateLink(link.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Digital Products */}
        <h2 className="text-2xl font-bold text-white mb-4">Digital Product Launchpad</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white flex-1">{product.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'launched'
                      ? 'bg-green-900/30 text-green-300'
                      : 'bg-yellow-900/30 text-yellow-300'
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-2xl font-bold text-white">${product.price}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Projected Revenue</p>
                  <p className="text-xl font-bold text-white">${product.projectedRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Launch Date</p>
                  <p className="text-white">{new Date(product.launchDate).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold transition-colors">
                {product.status === 'launched' ? 'View Analytics' : 'Create Checklist'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
