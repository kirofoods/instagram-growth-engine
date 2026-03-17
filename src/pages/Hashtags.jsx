import { useState } from 'react';
import {
  Hash,
  Zap,
  TrendingUp,
  Copy,
  RefreshCw,
  AlertTriangle,
  Download,
  Plus,
} from 'lucide-react';

const Hashtags = () => {
  const [mixRatio, setMixRatio] = useState(50);
  const [selectedSet, setSelectedSet] = useState(1);
  const [showBannedWarning, setShowBannedWarning] = useState(false);

  // Mock saved hashtag collections
  const savedSets = [
    {
      id: 1,
      name: 'Photography Pro Mix',
      rating: 4.8,
      timesUsed: 12,
      avgReach: 45200,
      tags: 30,
      created: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Travel Vibes',
      rating: 4.5,
      timesUsed: 8,
      avgReach: 38500,
      tags: 30,
      created: '1 month ago',
    },
    {
      id: 3,
      name: 'Lifestyle Everyday',
      rating: 4.2,
      timesUsed: 15,
      avgReach: 32000,
      tags: 30,
      created: '3 weeks ago',
    },
  ];

  // Individual hashtags for the selected set
  const selectedSetTags = [
    {
      tag: '#photography',
      reach: 'High',
      competition: 'Very High',
      trending: true,
    },
    { tag: '#photooftheday', reach: 'High', competition: 'Very High', trending: true },
    { tag: '#instadaily', reach: 'High', competition: 'Very High', trending: false },
    {
      tag: '#photographylovers',
      reach: 'High',
      competition: 'High',
      trending: false,
    },
    { tag: '#cameragear', reach: 'Medium', competition: 'Medium', trending: false },
    {
      tag: '#landscapephotography',
      reach: 'Medium',
      competition: 'Medium',
      trending: true,
    },
    { tag: '#shutterbug', reach: 'Medium', competition: 'Medium', trending: false },
    { tag: '#lensflare', reach: 'Low', competition: 'Low', trending: false },
    { tag: '#goldenhour', reach: 'Medium', competition: 'Low', trending: true },
    { tag: '#creativeshot', reach: 'Medium', competition: 'Medium', trending: false },
  ];

  // Trending hashtags
  const trendingTags = [
    { tag: '#ContentCreator', posts: 2.4, trend: 'up', trending: true },
    { tag: '#CreativeContent', posts: 1.9, trend: 'up', trending: true },
    { tag: '#PhotoOfTheDay', posts: 3.2, trend: 'stable', trending: true },
    { tag: '#DigitalArt', posts: 1.7, trend: 'up', trending: false },
    { tag: '#CreativeMind', posts: 1.5, trend: 'up', trending: true },
  ];

  // Banned hashtags list
  const bannedTags = [
    '#spam',
    '#follow',
    '#followme',
    '#likeforlike',
    '#likes',
    '#followback',
  ];

  const reachColors = {
    High: '#E1306C',
    Medium: '#F77737',
    Low: '#833AB4',
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Hashtag & Trend Research
        </h1>
        <p className="text-gray-400">
          Manage hashtag sets, track performance, and stay trending
        </p>
      </div>

      {/* Create New Set Section */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Plus size={24} className="text-cyan-400" />
          Create New Hashtag Set
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Niche / Topic
            </label>
            <input
              type="text"
              placeholder="e.g., photography, fashion, fitness..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Set Name
            </label>
            <input
              type="text"
              placeholder="Name for this set..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Mix Ratio: Broad vs Niche
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 w-12">Broad</span>
            <input
              type="range"
              min="0"
              max="100"
              value={mixRatio}
              onChange={e => setMixRatio(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <span className="text-xs text-gray-400 w-12">Niche</span>
            <span className="text-white font-semibold min-w-12">{mixRatio}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {mixRatio < 33
              ? 'Favor high-volume broad tags for maximum reach'
              : mixRatio < 66
                ? 'Balanced mix of broad and niche tags'
                : 'Favor niche tags for targeted, engaged audience'}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-2 mb-4 text-yellow-400">
            <AlertTriangle size={18} />
            <span className="text-sm font-medium">Banned Tag Checker</span>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            These hashtags may shadowban your content. We'll avoid them:
          </p>
          <div className="flex flex-wrap gap-2">
            {bannedTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs border border-red-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition">
          Generate Hashtag Set
        </button>
      </div>

      {/* Saved Collections */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Saved Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedSets.map(set => (
            <button
              key={set.id}
              onClick={() => setSelectedSet(set.id)}
              className={`p-4 rounded-lg border-2 text-left transition ${
                selectedSet === set.id
                  ? 'border-pink-500 bg-gradient-to-br from-pink-500/10 to-purple-600/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="font-semibold text-white mb-2">{set.name}</div>
              <div className="text-sm text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="text-yellow-400">⭐ {set.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span className="text-white">{set.timesUsed}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Reach:</span>
                  <span className="text-white">
                    {set.avgReach.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">{set.created}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Set Details */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Hash size={24} className="text-pink-500" />
            {selectedSets.find(s => s.id === selectedSet)?.name}
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition flex items-center gap-2">
              <Copy size={16} />
              Copy Set
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition flex items-center gap-2">
              <RefreshCw size={16} />
              Shuffle
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {selectedSetTags.map((tag, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-pink-500/50 transition flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="font-medium text-white">{tag.tag}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Reach: {tag.reach} • Competition: {tag.competition}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {tag.trending && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                    <TrendingUp size={12} />
                    Trending
                  </div>
                )}
                <button className="p-1 hover:bg-gray-800 rounded transition">
                  <Copy size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Tracking Table */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">
          Performance Tracking
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Set Name</th>
                <th className="text-center py-3 px-4 text-gray-400">Used</th>
                <th className="text-center py-3 px-4 text-gray-400">Avg Reach</th>
                <th className="text-center py-3 px-4 text-gray-400">Rating</th>
                <th className="text-center py-3 px-4 text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {savedSets.map((set, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition"
                >
                  <td className="py-3 px-4 text-white font-medium">{set.name}</td>
                  <td className="py-3 px-4 text-center text-gray-300">
                    {set.timesUsed}x
                  </td>
                  <td className="py-3 px-4 text-center text-gray-300">
                    {set.avgReach.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-yellow-400">⭐ {set.rating}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {set.id === 1 ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        ⭐ Best Performer
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                        Active
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trending Section */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap size={24} className="text-yellow-400" />
          Trending Now
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTags.map((tag, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 rounded-lg border border-yellow-500/30 hover:border-yellow-500/60 transition"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-white">{tag.tag}</div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    tag.trend === 'up'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {tag.trend === 'up' ? '↑ Up' : 'Stable'}
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-3">
                {tag.posts}M posts
              </div>
              <button className="w-full px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-sm rounded transition">
                <Download size={14} className="inline mr-2" />
                Add to Set
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Banned/Restricted Hashtags Warning */}
      <div
        className="rounded-lg p-6 border-2 border-red-500/30"
        style={{ backgroundColor: 'rgba(229, 48, 108, 0.05)' }}
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle size={24} className="text-red-400" />
          Restricted Hashtags
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          These hashtags are flagged for potential shadowbanning. Avoid using them:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            '#follow',
            '#spam',
            '#likeforlike',
            '#followme',
            '#likes',
            '#followback',
            '#f4f',
            '#tagforlikes',
          ].map((tag, idx) => (
            <div
              key={idx}
              className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-center"
            >
              <div className="font-medium text-red-300 text-sm">{tag}</div>
              <div className="text-xs text-red-400/70 mt-1">⚠ Flagged</div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium transition border border-red-500/30">
          Check My Posts for Restricted Tags
        </button>
      </div>
    </div>
  );
};

export default Hashtags;
