import React, { useState, useEffect } from 'react';
import { useAppCollection } from '../firebase/useAppData';
import {
  MessageCircle,
  Copy,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Download,
  TrendingUp,
  Settings,
  Plus,
  Edit2,
  ArrowDown,
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
} from 'recharts';
import '../styles/DmFunnels.css';

export default function DmFunnels() {
  const [activeTab, setActiveTab] = useState('sequences');
  const [showNewSequenceForm, setShowNewSequenceForm] = useState(false);
  const [newSequenceName, setNewSequenceName] = useState('');
  const [newSequenceTrigger, setNewSequenceTrigger] = useState('');
  const [newSequenceMessages, setNewSequenceMessages] = useState(['']);

  // Load DM templates from Firestore
  const { items: savedTemplates, addItem: addTemplate, updateItem: updateTemplate } = useAppCollection('dmTemplates');

  const [sequences, setSequences] = useState([]);

  const handleSaveNewSequence = async () => {
    if (!newSequenceName || !newSequenceTrigger) return;

    const newSequence = {
      name: newSequenceName,
      triggerKeyword: newSequenceTrigger,
      messages: newSequenceMessages.filter((m) => m.length > 0),
      isActive: true,
      conversions: 0,
      sent: 0,
      steps: newSequenceMessages.map((msg, idx) => ({
        id: idx + 1,
        title: `Message ${idx + 1}`,
        message: msg,
        delay: idx * 2,
        condition: idx === 0 ? 'First message' : `After ${idx * 2} days`,
      })),
    };

    // Save to Firestore
    try {
      await addTemplate({
        type: 'sequence',
        name: newSequenceName,
        trigger: newSequenceTrigger,
        steps: newSequence.steps,
      });

      setSequences([...sequences, { ...newSequence, id: sequences.length + 1 }]);
      setShowNewSequenceForm(false);
      setNewSequenceName('');
      setNewSequenceTrigger('');
      setNewSequenceMessages(['']);
    } catch (err) {
      console.error('Error saving template:', err);
    }
  };

  const [campaigns, setCampaigns] = useState([]);

  const [leadMagnets, setLeadMagnets] = useState([]);

  const funnelData = [
    { step: 'Profile', value: 10000, rate: '100%' },
    { step: 'Link Click', value: 2845, rate: '28.5%' },
    { step: 'Landing Page', value: 1456, rate: '51.2%' },
    { step: 'Email Signup', value: 728, rate: '50%' },
    { step: 'Purchase', value: 182, rate: '25%' },
  ];

  const funnelChartData = funnelData.map((item) => ({
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
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
          <h1>DM Funnels & Sequences</h1>
        </div>
        <p className="text-secondary">Automate your DM strategy with sequences, campaigns, and templates</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-4 mb-8">
        <div className="card">
          <div className="stat-label">Total DMs Sent</div>
          <div className="stat-value">{campaignMetrics.totalSent.toLocaleString()}</div>
          <div className="stat-change text-positive flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4" />
            +12% this week
          </div>
        </div>

        <div className="card">
          <div className="stat-label">Response Rate</div>
          <div className="stat-value">{campaignMetrics.responseRate.toFixed(1)}%</div>
          <div className="stat-change text-positive mt-2">Good engagement</div>
        </div>

        <div className="card">
          <div className="stat-label">Conversion Rate</div>
          <div className="stat-value">{campaignMetrics.conversionRate.toFixed(1)}%</div>
          <div className="stat-change text-positive mt-2">+2.3% from last month</div>
        </div>

        <div className="card">
          <div className="stat-label">Revenue Attributed</div>
          <div className="stat-value">${(campaignMetrics.revenueAttributed / 1000).toFixed(1)}k</div>
          <div className="stat-change text-positive mt-2">From DM funnels</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="dm-tabs mb-8">
        {['sequences', 'campaigns', 'magnets', 'funnel', 'templates'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* New Sequence Form */}
      {showNewSequenceForm && (
        <div className="card card-gradient mb-8">
          <h3 className="text-lg font-semibold mb-4">Create New DM Sequence</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Funnel Name</label>
              <input
                type="text"
                value={newSequenceName}
                onChange={(e) => setNewSequenceName(e.target.value)}
                className="w-full rounded-md p-2 text-sm focus:outline-none"
                placeholder="e.g., Welcome Sequence"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Trigger Keyword</label>
              <input
                type="text"
                value={newSequenceTrigger}
                onChange={(e) => setNewSequenceTrigger(e.target.value)}
                className="w-full rounded-md p-2 text-sm focus:outline-none"
                placeholder="e.g., 'start' or specific keyword to trigger sequence"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sequence Messages</label>
              {newSequenceMessages.map((msg, idx) => (
                <textarea
                  key={idx}
                  value={msg}
                  onChange={(e) => {
                    const updated = [...newSequenceMessages];
                    updated[idx] = e.target.value;
                    setNewSequenceMessages(updated);
                  }}
                  className="w-full rounded-md p-2 text-sm focus:outline-none resize-none mb-2 h-20"
                  placeholder={`Message ${idx + 1}...`}
                />
              ))}
              <button
                onClick={() => setNewSequenceMessages([...newSequenceMessages, ''])}
                className="btn btn-secondary btn-small mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Message
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveNewSequence} className="btn btn-primary flex-1">
                Save Sequence
              </button>
              <button
                onClick={() => {
                  setShowNewSequenceForm(false);
                  setNewSequenceName('');
                  setNewSequenceTrigger('');
                  setNewSequenceMessages(['']);
                }}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sequences Tab */}
      {activeTab === 'sequences' && (
        <div className="section">
          <div className="flex-between mb-6">
            <h2 className="section-title">DM Sequences</h2>
            <button
              onClick={() => setShowNewSequenceForm(true)}
              className="btn btn-primary"
            >
              <Plus className="w-5 h-5" />
              New Sequence
            </button>
          </div>

          {sequences.map((sequence) => (
            <div key={sequence.id} className="card mb-6">
              <div className="flex-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{sequence.name}</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-secondary">{sequence.sent.toLocaleString()} sent</span>
                    <span className="text-secondary">{sequence.conversions} conversions</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-ghost">
                    {sequence.isActive ? (
                      <Pause className="w-5 h-5" style={{ color: 'var(--status-warning)' }} />
                    ) : (
                      <Play className="w-5 h-5" style={{ color: 'var(--status-success)' }} />
                    )}
                  </button>
                  <button className="btn btn-ghost">
                    <Edit2 className="w-5 h-5" style={{ color: 'var(--status-info)' }} />
                  </button>
                </div>
              </div>

              {/* Sequence Flow */}
              <div className="dm-sequence-flow">
                {sequence.steps.map((step, idx) => (
                  <div key={step.id}>
                    <div className="dm-step-card">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="dm-step-number">{idx + 1}</span>
                            <h4 className="font-medium text-primary">{step.title}</h4>
                          </div>
                          <p className="text-secondary text-sm ml-8 mb-2">{step.message}</p>
                          <div className="text-xs text-tertiary ml-8 flex gap-4">
                            <span>Delay: {step.delay} days</span>
                            <span>Condition: {step.condition}</span>
                          </div>
                        </div>
                        <Copy
                          className="w-4 h-4 cursor-pointer transition hover:text-primary flex-shrink-0"
                          style={{ color: 'var(--text-muted)' }}
                          onClick={() => handleCopyTemplate(step.message)}
                        />
                      </div>
                    </div>
                    {idx < sequence.steps.length - 1 && (
                      <div className="dm-step-arrow">
                        <ArrowDown className="w-5 h-5" style={{ color: 'var(--border-secondary)' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Metrics Chart */}
              <div className="mt-6 pt-6" style={{ borderTopColor: 'var(--border-primary)', borderTopWidth: '1px' }}>
                <h4 className="text-sm font-medium text-secondary mb-4">Weekly Performance</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
                    <XAxis dataKey="name" stroke="var(--text-muted)" />
                    <YAxis stroke="var(--text-muted)" />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }}
                      labelStyle={{ color: 'var(--text-secondary)' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sent" stroke="var(--color-primary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="responses" stroke="var(--color-secondary)" strokeWidth={2} />
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
        <div className="section">
          <div className="flex-between mb-6">
            <h2 className="section-title">Comment-to-DM Campaigns</h2>
            <button className="btn btn-primary">
              <Plus className="w-5 h-5" />
              New Campaign
            </button>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card">
                <div className="flex-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-primary">{campaign.name}</h3>
                      <span className={`badge badge-${campaign.status === 'active' ? 'success' : campaign.status === 'paused' ? 'warning' : 'info'}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-ghost">
                    <Settings className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                  </button>
                </div>

                <div className="grid grid-2 gap-4 mb-4">
                  <div>
                    <label className="text-secondary text-sm block mb-2">Keyword Trigger</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 rounded-lg text-sm dm-code-block">
                        "{campaign.keyword}"
                      </code>
                      <Copy
                        className="w-4 h-4 cursor-pointer transition hover:text-primary flex-shrink-0"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={() => handleCopyCampaignKeyword(campaign.keyword)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-secondary text-sm block mb-2">Freebie</label>
                    <div className="px-3 py-2 rounded-lg text-sm flex items-center gap-2 dm-code-block">
                      <Download className="w-4 h-4" style={{ color: 'var(--status-info)' }} />
                      {campaign.freebie}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-secondary text-sm block mb-2">Auto Response</label>
                  <div className="px-3 py-3 rounded-lg text-sm dm-code-block">
                    {campaign.autoResponse}
                  </div>
                </div>

                {/* Campaign Metrics */}
                <div className="mt-4 pt-4 grid grid-3 gap-4" style={{ borderTopColor: 'var(--border-primary)', borderTopWidth: '1px' }}>
                  <div>
                    <div className="stat-label">Keyword Triggers</div>
                    <div className="stat-value">{campaign.metrics.triggers.toLocaleString()}</div>
                    <div className="stat-change text-positive mt-1">+24% this week</div>
                  </div>
                  <div>
                    <div className="stat-label">Responses</div>
                    <div className="stat-value">{campaign.metrics.responses.toLocaleString()}</div>
                    <div className="stat-change text-secondary mt-1">{((campaign.metrics.responses / campaign.metrics.triggers) * 100).toFixed(1)}% response rate</div>
                  </div>
                  <div>
                    <div className="stat-label">Conversions</div>
                    <div className="stat-value">{campaign.metrics.conversions}</div>
                    <div className="stat-change text-secondary mt-1">{((campaign.metrics.conversions / campaign.metrics.responses) * 100).toFixed(1)}% conv rate</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lead Magnets Tab */}
      {activeTab === 'magnets' && (
        <div className="section">
          <div className="flex-between mb-6">
            <h2 className="section-title">Lead Magnet Manager</h2>
            <button className="btn btn-primary">
              <Plus className="w-5 h-5" />
              New Lead Magnet
            </button>
          </div>

          <div className="space-y-4">
            {leadMagnets.map((magnet) => (
              <div key={magnet.id} className="card">
                <div className="flex-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2">{magnet.name}</h3>
                    <div className="flex gap-4 text-sm">
                      <span className="text-secondary">{magnet.type}</span>
                      <span className="text-secondary">Value: {magnet.value}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="stat-value">{magnet.downloads.toLocaleString()}</div>
                    <div className="stat-label">Downloads</div>
                  </div>
                </div>

                <div className="grid grid-3 gap-4">
                  <div className="dm-metric-box">
                    <div className="stat-label">Download Count</div>
                    <div className="stat-value">{magnet.downloads.toLocaleString()}</div>
                    <div className="stat-change text-positive mt-2">+18% this month</div>
                  </div>
                  <div className="dm-metric-box">
                    <div className="stat-label">Conversion Rate</div>
                    <div className="stat-value">{magnet.conversionRate.toFixed(1)}%</div>
                    <div className="stat-change text-info mt-2">From campaign clicks</div>
                  </div>
                  <div className="dm-metric-box">
                    <div className="stat-label">Associated Campaigns</div>
                    <div className="text-sm font-semibold text-primary">{magnet.campaigns.length} active</div>
                    <div className="text-xs text-tertiary mt-2">{magnet.campaigns.join(', ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="section">
          <h2 className="section-title">Conversion Funnel</h2>
          <div className="card">
            <div className="space-y-4 mb-8">
              {funnelData.map((item, idx) => {
                const percentage = (item.value / funnelData[0].value) * 100;
                return (
                  <div key={idx}>
                    <div className="flex-between mb-2">
                      <span className="font-medium text-primary">{item.step}</span>
                      <div className="text-right text-sm">
                        <span className="text-secondary">{item.value.toLocaleString()} users</span>
                        <span className="text-tertiary ml-2">({item.rate})</span>
                      </div>
                    </div>
                    <div className="dm-funnel-bar">
                      <div
                        className="dm-funnel-fill"
                        style={{
                          width: `${percentage}%`,
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
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)' }}
                  labelStyle={{ color: 'var(--text-secondary)' }}
                />
                <Bar dataKey="value" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-8 pt-8" style={{ borderTopColor: 'var(--border-primary)', borderTopWidth: '1px' }}>
              <h3 className="text-lg font-semibold text-primary mb-4">Funnel Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--status-warning)' }} />
                  <div>
                    <p className="font-medium text-primary">Landing page drop-off</p>
                    <p className="text-secondary text-sm">51% of visitors leave before entering email. Test value prop & CTAs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--status-success)' }} />
                  <div>
                    <p className="font-medium text-primary">Strong email → purchase conversion</p>
                    <p className="text-secondary text-sm">25% of email subscribers convert. Email list is high quality.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="section">
          <h2 className="section-title">DM Template Library</h2>

          {Object.entries(templates).map(([category, templateList]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-primary mb-4 capitalize">
                {category === 'collab' ? 'Collab Pitch' : category === 'brandReply' ? 'Brand Reply' : category === 'thankYou' ? 'Thank You' : category}
              </h3>
              <div className="space-y-3">
                {templateList.map((template, idx) => (
                  <div key={idx} className="card-sm">
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-secondary text-sm flex-1">{template}</p>
                      <Copy
                        className="w-5 h-5 cursor-pointer transition flex-shrink-0 hover:text-primary"
                        style={{ color: 'var(--text-muted)' }}
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
  );
}
