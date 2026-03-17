import React, { useState } from 'react';
import {
  MessageCircle,
  Send,
  ArrowRight,
  Copy,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Zap,
  Download,
  TrendingUp,
  Settings,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function DmFunnels() {
  const [activeTab, setActiveTab] = useState('sequences');
  const [sequences, setSequences] = useState([
    {
      id: 1,
      name: 'Welcome & Value Flow',
      steps: [
        {
          id: 1,
          title: 'Welcome Message',
          message: 'Hey {{name}}! 👋 Thanks for reaching out. I create content about {{niche}}...',
          delay: 0,
          condition: 'First message received',
        },
        {
          id: 2,
          title: 'Value Drop',
          message: 'Here\'s my best resource on {{topic}}. This helped 5000+ creators...',
          delay: 2,
          condition: 'If no response in 24h',
        },
        {
          id: 3,
          title: 'Offer',
          message: 'I\'m building a community of growth hackers. Free access to {{offer}}...',
          delay: 5,
          condition: 'If still engaged',
        },
        {
          id: 4,
          title: 'Follow-up',
          message: 'Last thing - I\'m doing a limited cohort. Spots filling up fast...',
          delay: 8,
          condition: 'Final check-in',
        },
      ],
      isActive: true,
      conversions: 32,
      sent: 156,
    },
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: '5-Step Email Building Guide',
      keyword: 'email marketing',
      autoResponse: 'Thanks! Sending your free guide now 📧',
      freebie: 'Email-Marketing-5-Steps.pdf',
      status: 'active',
      metrics: { triggers: 342, responses: 298, conversions: 67 },
    },
    {
      id: 2,
      name: 'Reel Template Bundle',
      keyword: 'reel templates',
      autoResponse: 'Grab your templates! Check your DMs for the link 🎬',
      freebie: 'Reel-Templates-Figma.zip',
      status: 'active',
      metrics: { triggers: 418, responses: 365, conversions: 94 },
    },
    {
      id: 3,
      name: 'Engagement Pod Invite',
      keyword: 'engagement pod',
      autoResponse: 'Join our engagement pod! Sending details now...',
      freebie: 'Pod-Invite-Link',
      status: 'paused',
      metrics: { triggers: 156, responses: 128, conversions: 31 },
    },
  ]);

  const [leadMagnets, setLeadMagnets] = useState([
    {
      id: 1,
      name: 'Email Building 5-Step Guide',
      type: 'PDF Guide',
      downloads: 1243,
      conversionRate: 19.6,
      campaigns: ['Email Guide Campaign'],
      value: '$47',
    },
    {
      id: 2,
      name: 'Viral Reel Templates (Figma)',
      type: 'Figma File',
      downloads: 892,
      conversionRate: 22.5,
      campaigns: ['Reel Template Campaign'],
      value: '$97',
    },
    {
      id: 3,
      name: 'DM Template Swipe File',
      type: 'Google Sheet',
      downloads: 567,
      conversionRate: 18.3,
      campaigns: ['DM Swipes Campaign'],
      value: '$27',
    },
  ]);

  const funnelData = [
    { step: 'Profile', value: 10000, rate: '100%' },
    { step: 'Link Click', value: 2845, rate: '28.5%' },
    { step: 'Landing Page', value: 1456, rate: '51.2%' },
    { step: 'Email Signup', value: 728, rate: '50%' },
    { step: 'Purchase', value: 182, rate: '25%' },
  ];

  const funnelChartData = funnelData.map((item, idx) => ({
    name: item.step,
    value: item.value,
  }));

  const templates = {
    welcome: [
      'Hey {{name}}! 👋 Love your {{content_type}} content, especially {{specific_post}}. This line resonated with me...',
      'Just found your account and I\'m impressed. The way you break down {{topic}} is gold. Keep it up!',
      'Hey {{name}}, your {{post_type}} about {{topic}} just helped me understand {{concept}}. Thanks for sharing!',
    ],
    collab: [
      'Hey {{name}}, I\'ve been following your work and I think our audiences would vibe together. Want to collab on {{idea}}?',
      'Love what you\'re doing with {{niche}}. I have {{follower_count}} followers in the same space. Open to a partnership?',
      'Hey! I\'ve got {{followers}} engaged {{niche}} followers and noticed our content aligns. Quick collab idea...?',
    ],
    brandReply: [
      'Thanks for the mention {{brand}}! Appreciate the love ❤️',
      '@{{brand}} Thanks for this shoutout! My audience will love this.',
      'Grateful for the collab {{brand}}! This is huge for my community.',
    ],
    thankYou: [
      'Hey {{name}}, just wanted to say thanks for the {{action}}. Means everything to me and my community!',
      'Your {{action}} absolutely made my day {{name}}. Thank you so much! 🙏',
      'Thanks for {{action}} {{name}}. I\'m building something special and your support means the world.',
    ],
    promotion: [
      'Quick update: launching {{offer}} tomorrow at {{time}}. Early birds get {{benefit}}. Link in bio! 🔗',
      '{{emoji}} Doors open soon for {{offer}}. {{benefit}}. {{limited_spots}} spots available. DM for details.',
      'Last chance for {{offer}}! {{benefit}}. {{closing_time}}. Don\'t miss out! 🔥',
    ],
  };

  const metricsData = [
    { name: 'Mon', sent: 45, responses: 28, conversions: 7 },
    { name: 'Tue', sent: 52, responses: 35, conversions: 9 },
    { name: 'Wed', sent: 48, responses: 31, conversions: 8 },
    { name: 'Thu', sent: 61, responses: 42, conversions: 12 },
    { name: 'Fri', sent: 58, responses: 38, conversions: 11 },
    { name: 'Sat', sent: 42, responses: 25, conversions: 6 },
    { name: 'Sun', sent: 38, responses: 20, conversions: 5 },
  ];

  const campaignMetrics = {
    totalSent: 2157,
    responseRate: 81.3,
    conversionRate: 18.7,
    revenueAttributed: 24580,
  };

  const handleCopyCampaignKeyword = (keyword) => {
    navigator.clipboard.writeText(keyword);
  };

  const handleCopyTemplate = (template) => {
    navigator.clipboard.writeText(template);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8" style={{ color: '#E1306C' }} />
            <h1 className="text-4xl font-bold text-white">DM Funnels & Sequences</h1>
          </div>
          <p className="text-gray-400">Automate your DM strategy with sequences, campaigns, and templates</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div
            className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-gray-400 text-sm mb-2">Total DMs Sent</div>
            <div className="text-4xl font-bold text-white">{campaignMetrics.totalSent.toLocaleString()}</div>
            <div className="text-green-400 text-sm mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12% this week
            </div>
          </div>

          <div
            className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-gray-400 text-sm mb-2">Response Rate</div>
            <div className="text-4xl font-bold text-white">{campaignMetrics.responseRate.toFixed(1)}%</div>
            <div className="text-green-400 text-sm mt-2">Good engagement</div>
          </div>

          <div
            className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-gray-400 text-sm mb-2">Conversion Rate</div>
            <div className="text-4xl font-bold text-white">{campaignMetrics.conversionRate.toFixed(1)}%</div>
            <div className="text-green-400 text-sm mt-2">+2.3% from last month</div>
          </div>

          <div
            className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-gray-400 text-sm mb-2">Revenue Attributed</div>
            <div className="text-4xl font-bold text-white">${(campaignMetrics.revenueAttributed / 1000).toFixed(1)}k</div>
            <div className="text-green-400 text-sm mt-2">From DM funnels</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['sequences', 'campaigns', 'magnets', 'funnel', 'templates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              style={{
                background:
                  activeTab === tab ? 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)' : 'transparent',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Sequences Tab */}
        {activeTab === 'sequences' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">DM Sequences</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                  color: 'white',
                }}
              >
                <Plus className="w-5 h-5" />
                New Sequence
              </button>
            </div>

            {sequences.map((sequence) => (
              <div
                key={sequence.id}
                className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                style={{ backgroundColor: '#1a1a2e' }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{sequence.name}</h3>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{sequence.sent.toLocaleString()} sent</span>
                      <span>{sequence.conversions} conversions</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-lg transition hover:opacity-80"
                      style={{ backgroundColor: '#252545' }}
                    >
                      {sequence.isActive ? (
                        <Pause className="w-5 h-5 text-orange-400" />
                      ) : (
                        <Play className="w-5 h-5 text-green-400" />
                      )}
                    </button>
                    <button
                      className="p-2 rounded-lg transition hover:opacity-80"
                      style={{ backgroundColor: '#252545' }}
                    >
                      <Edit2 className="w-5 h-5 text-blue-400" />
                    </button>
                  </div>
                </div>

                {/* Sequence Flow */}
                <div className="space-y-4">
                  {sequence.steps.map((step, idx) => (
                    <div key={step.id}>
                      <div
                        className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
                        style={{ backgroundColor: '#0f0f1e' }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{
                                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                                  color: 'white',
                                }}
                              >
                                {idx + 1}
                              </span>
                              <h4 className="font-semibold text-white">{step.title}</h4>
                            </div>
                            <p className="text-gray-400 text-sm ml-8 mb-2">{step.message}</p>
                            <div className="text-xs text-gray-500 ml-8 flex gap-4">
                              <span>Delay: {step.delay} days</span>
                              <span>Condition: {step.condition}</span>
                            </div>
                          </div>
                          <Copy
                            className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition"
                            onClick={() => handleCopyTemplate(step.message)}
                          />
                        </div>
                      </div>
                      {idx < sequence.steps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Metrics Chart */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">Weekly Performance</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={metricsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#252545', border: '1px solid #444' }}
                        labelStyle={{ color: '#999' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="sent" stroke="#E1306C" strokeWidth={2} />
                      <Line type="monotone" dataKey="responses" stroke="#833AB4" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" stroke="#5ed8f8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Comment-to-DM Campaigns</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                  color: 'white',
                }}
              >
                <Plus className="w-5 h-5" />
                New Campaign
              </button>
            </div>

            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{campaign.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            campaign.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : campaign.status === 'paused'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded-lg transition hover:opacity-80"
                      style={{ backgroundColor: '#252545' }}
                    >
                      <Settings className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-gray-400 text-sm block mb-2">Keyword Trigger</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 rounded-lg text-gray-200 text-sm" style={{ backgroundColor: '#0f0f1e' }}>
                          "{campaign.keyword}"
                        </code>
                        <Copy
                          className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition"
                          onClick={() => handleCopyCampaignKeyword(campaign.keyword)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm block mb-2">Freebie</label>
                      <div className="px-3 py-2 rounded-lg text-gray-200 text-sm flex items-center gap-2" style={{ backgroundColor: '#0f0f1e' }}>
                        <Download className="w-4 h-4 text-blue-400" />
                        {campaign.freebie}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Auto Response</label>
                    <div className="px-3 py-3 rounded-lg text-gray-200 text-sm" style={{ backgroundColor: '#0f0f1e' }}>
                      {campaign.autoResponse}
                    </div>
                  </div>

                  {/* Campaign Metrics */}
                  <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Keyword Triggers</div>
                      <div className="text-2xl font-bold text-white">{campaign.metrics.triggers.toLocaleString()}</div>
                      <div className="text-green-400 text-xs mt-1">+24% this week</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Responses</div>
                      <div className="text-2xl font-bold text-white">{campaign.metrics.responses.toLocaleString()}</div>
                      <div className="text-gray-400 text-xs mt-1">{((campaign.metrics.responses / campaign.metrics.triggers) * 100).toFixed(1)}% response rate</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Conversions</div>
                      <div className="text-2xl font-bold text-white">{campaign.metrics.conversions}</div>
                      <div className="text-gray-400 text-xs mt-1">{((campaign.metrics.conversions / campaign.metrics.responses) * 100).toFixed(1)}% conv rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lead Magnets Tab */}
        {activeTab === 'magnets' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Lead Magnet Manager</h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                  color: 'white',
                }}
              >
                <Plus className="w-5 h-5" />
                New Lead Magnet
              </button>
            </div>

            <div className="space-y-4">
              {leadMagnets.map((magnet) => (
                <div
                  key={magnet.id}
                  className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{magnet.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <span>{magnet.type}</span>
                        <span>Value: {magnet.value}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{magnet.downloads.toLocaleString()}</div>
                      <div className="text-gray-400 text-xs">Downloads</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#0f0f1e' }}
                    >
                      <div className="text-gray-400 text-sm mb-2">Download Count</div>
                      <div className="text-2xl font-bold text-white">{magnet.downloads.toLocaleString()}</div>
                      <div className="text-green-400 text-xs mt-2">+18% this month</div>
                    </div>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#0f0f1e' }}
                    >
                      <div className="text-gray-400 text-sm mb-2">Conversion Rate</div>
                      <div className="text-2xl font-bold text-white">{magnet.conversionRate.toFixed(1)}%</div>
                      <div className="text-blue-400 text-xs mt-2">From campaign clicks</div>
                    </div>
                    <div
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: '#0f0f1e' }}
                    >
                      <div className="text-gray-400 text-sm mb-2">Associated Campaigns</div>
                      <div className="text-white text-sm font-semibold">{magnet.campaigns.length} active</div>
                      <div className="text-gray-500 text-xs mt-2">{magnet.campaigns.join(', ')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Funnel Tab */}
        {activeTab === 'funnel' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Conversion Funnel</h2>
            <div
              className="p-8 rounded-xl border border-gray-800"
              style={{ backgroundColor: '#1a1a2e' }}
            >
              <div className="space-y-4 mb-8">
                {funnelData.map((item, idx) => {
                  const percentage = (item.value / funnelData[0].value) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{item.step}</span>
                        <div className="text-right">
                          <span className="text-gray-400 text-sm">{item.value.toLocaleString()} users</span>
                          <span className="text-gray-500 text-sm ml-2">({item.rate})</span>
                        </div>
                      </div>
                      <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Funnel Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#252545', border: '1px solid #444' }}
                    labelStyle={{ color: '#999' }}
                  />
                  <Bar dataKey="value" fill="#E1306C" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Funnel Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">Landing page drop-off</p>
                      <p className="text-gray-400 text-sm">51% of visitors leave before entering email. Test value prop & CTAs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold">Strong email → purchase conversion</p>
                      <p className="text-gray-400 text-sm">25% of email subscribers convert. Email list is high quality.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">DM Template Library</h2>

            {Object.entries(templates).map(([category, templateList]) => (
              <div key={category}>
                <h3 className="text-lg font-bold text-white mb-4 capitalize">
                  {category === 'collab' ? 'Collab Pitch' : category === 'brandReply' ? 'Brand Reply' : category === 'thankYou' ? 'Thank You' : category}
                </h3>
                <div className="space-y-3">
                  {templateList.map((template, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition"
                      style={{ backgroundColor: '#1a1a2e' }}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-gray-300 text-sm flex-1">{template}</p>
                        <Copy
                          className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition flex-shrink-0"
                          onClick={() => handleCopyTemplate(template)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
