import { useState, useEffect } from 'react';
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
import { useCollection, useAddDocument, useDeleteDocument } from '../firebase/useFirestore';
import '../styles/Hashtags.css';

const Hashtags = () => {
  const [mixRatio, setMixRatio] = useState(50);
  const [selectedSet, setSelectedSet] = useState(null);
  const [showBannedWarning, setShowBannedWarning] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [newSetTopic, setNewSetTopic] = useState('');
  const [newSetTags, setNewSetTags] = useState('');
  const [newSetCategory, setNewSetCategory] = useState('general');

  // Load from Firestore
  const { data: firestoreSets, loading: setsLoading } = useCollection('hashtagSets');
  const { addDocument } = useAddDocument('hashtagSets');
  const { deleteDocument } = useDeleteDocument('hashtagSets');

  // Default starter sets
  const defaultSets = [
    {
      name: 'Photography Pro Mix',
      rating: 4.8,
      timesUsed: 12,
      avgReach: 45200,
      tags: 30,
      created: '2 weeks ago',
      category: 'photography',
      isDefault: true,
    },
    {
      name: 'Travel Vibes',
      rating: 4.5,
      timesUsed: 8,
      avgReach: 38500,
      tags: 30,
      created: '1 month ago',
      category: 'travel',
      isDefault: true,
    },
    {
      name: 'Lifestyle Everyday',
      rating: 4.2,
      timesUsed: 15,
      avgReach: 32000,
      tags: 30,
      created: '3 weeks ago',
      category: 'lifestyle',
      isDefault: true,
    },
  ];

  // Combine default sets with Firestore sets
  const savedSets = firestoreSets.length > 0 ? firestoreSets : defaultSets;

  // Set initial selected set
  useEffect(() => {
    if (savedSets.length > 0 && selectedSet === null) {
      setSelectedSet(savedSets[0].id || savedSets[0].name);
    }
  }, [savedSets, selectedSet]);

  const handleCreateSet = async () => {
    if (!newSetName.trim() || !newSetTags.trim()) {
      alert('Please fill in set name and hashtags');
      return;
    }

    const tagsArray = newSetTags
      .split(/[\s,]+/)
      .filter(tag => tag.trim())
      .map(tag => (tag.startsWith('#') ? tag : `#${tag}`));

    try {
      await addDocument({
        name: newSetName,
        topic: newSetTopic,
        category: newSetCategory,
        hashtags: tagsArray,
        rating: 0,
        timesUsed: 0,
        avgReach: 0,
        tags: tagsArray.length,
        created: new Date().toLocaleDateString(),
      });
      setNewSetName('');
      setNewSetTopic('');
      setNewSetTags('');
      setNewSetCategory('general');
    } catch (error) {
      console.error('Error creating hashtag set:', error);
      alert('Failed to create set');
    }
  };

  const handleDeleteSet = async (setId) => {
    if (window.confirm('Delete this hashtag set?')) {
      try {
        await deleteDocument(setId);
        if (selectedSet === setId) {
          setSelectedSet(null);
        }
      } catch (error) {
        console.error('Error deleting set:', error);
        alert('Failed to delete set');
      }
    }
  };

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

  const restrictedTags = [
    '#follow',
    '#spam',
    '#likeforlike',
    '#followme',
    '#likes',
    '#followback',
    '#f4f',
    '#tagforlikes',
  ];

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <h1>Hashtag & Trend Research</h1>
        <p className="text-secondary">Manage hashtag sets, track performance, and stay trending</p>
      </div>

      {/* Create New Set Section */}
      <div className="card mb-8">
        <h2 className="flex items-center gap-md mb-6">
          <Plus size={24} />
          Create New Hashtag Set
        </h2>

        <div className="grid grid-2 gap-lg">
          <div>
            <label className="text-sm font-medium mb-2">Niche / Topic</label>
            <input
              type="text"
              placeholder="e.g., photography, fashion, fitness..."
              value={newSetTopic}
              onChange={e => setNewSetTopic(e.target.value)}
              className="w-full rounded-md p-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2">Set Name</label>
            <input
              type="text"
              placeholder="Name for this set..."
              value={newSetName}
              onChange={e => setNewSetName(e.target.value)}
              className="w-full rounded-md p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium mb-2">Hashtags (comma or space separated)</label>
          <textarea
            placeholder="e.g., #photography #photooftheday #instadaily"
            value={newSetTags}
            onChange={e => setNewSetTags(e.target.value)}
            className="w-full rounded-md p-2 text-sm focus:outline-none h-20"
          />
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium mb-2">Category</label>
          <select
            value={newSetCategory}
            onChange={e => setNewSetCategory(e.target.value)}
            className="w-full rounded-md p-2 text-sm focus:outline-none"
          >
            <option value="general">General</option>
            <option value="photography">Photography</option>
            <option value="fashion">Fashion</option>
            <option value="travel">Travel</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="fitness">Fitness</option>
            <option value="beauty">Beauty</option>
            <option value="food">Food</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium mb-4">Mix Ratio: Broad vs Niche</label>
          <div className="flex items-center gap-md">
            <span className="text-xs text-muted w-12">Broad</span>
            <input
              type="range"
              min="0"
              max="100"
              value={mixRatio}
              onChange={e => setMixRatio(Number(e.target.value))}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-muted w-12">Niche</span>
            <span className="font-semibold min-w-12">{mixRatio}%</span>
          </div>
          <p className="text-xs text-muted mt-2">
            {mixRatio < 33
              ? 'Favor high-volume broad tags for maximum reach'
              : mixRatio < 66
                ? 'Balanced mix of broad and niche tags'
                : 'Favor niche tags for targeted, engaged audience'}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-primary">
          <div className="flex items-center gap-sm mb-4 text-warning">
            <AlertTriangle size={18} />
            <span className="text-sm font-medium">Banned Tag Checker</span>
          </div>
          <p className="text-sm text-secondary mb-3">
            These hashtags may shadowban your content. We'll avoid them:
          </p>
          <div className="flex flex-wrap gap-sm">
            {bannedTags.map((tag, idx) => (
              <span key={idx} className="badge badge-danger">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button onClick={handleCreateSet} className="btn btn-primary w-full mt-6">Save Hashtag Set</button>
      </div>

      {/* Saved Collections */}
      <div className="card mb-8">
        <h2 className="font-semibold text-lg mb-6">Saved Collections</h2>
        <div className="grid grid-3 gap-md">
          {savedSets.map(set => (
            <div key={set.id || set.name} className={`hashtag-set-card ${selectedSet === (set.id || set.name) ? 'hashtag-set-active' : ''}`}>
              <button
                onClick={() => setSelectedSet(set.id || set.name)}
                className="w-full text-left"
              >
                <div className="font-semibold mb-2">{set.name}</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span>⭐ {set.rating || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Used:</span>
                    <span>{set.timesUsed || 0}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Reach:</span>
                    <span>{(set.avgReach || 0).toLocaleString()}</span>
                  </div>
                  <div className="text-xs text-muted mt-2">{set.created}</div>
                </div>
              </button>
              {!set.isDefault && set.id && (
                <button
                  onClick={() => handleDeleteSet(set.id)}
                  className="btn btn-small bg-error/20 text-error w-full mt-3"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Set Details */}
      {selectedSet && (
        <div className="card mb-8">
          <div className="flex-between mb-6">
            <h2 className="flex items-center gap-md">
              <Hash size={24} />
              {savedSets.find(s => (s.id || s.name) === selectedSet)?.name}
            </h2>
            <div className="flex gap-sm">
              <button
                onClick={() => {
                  const set = savedSets.find(s => (s.id || s.name) === selectedSet);
                  const tags = set?.hashtags || selectedSetTags.map(t => t.tag);
                  navigator.clipboard.writeText(tags.join(' '));
                  alert('Hashtag set copied to clipboard!');
                }}
                className="btn btn-secondary text-sm"
              >
                <Copy size={16} />
                Copy Set
              </button>
              <button className="btn btn-secondary text-sm">
                <RefreshCw size={16} />
                Shuffle
              </button>
            </div>
          </div>

          <div className="grid grid-2 gap-sm">
            {(() => {
              const set = savedSets.find(s => (s.id || s.name) === selectedSet);
              const tags = set?.hashtags || selectedSetTags;
              return (tags.length > 0
                ? tags.map((tag, idx) => {
                    const tagObj = typeof tag === 'string' ? { tag, reach: 'Medium', competition: 'Medium', trending: false } : tag;
                    return (
                      <div key={idx} className="hashtag-tag-card">
                        <div className="flex-1">
                          <div className="font-medium">{tagObj.tag}</div>
                          <div className="text-xs text-muted mt-1">
                            Reach: {tagObj.reach || 'N/A'} • Competition: {tagObj.competition || 'N/A'}
                          </div>
                        </div>
                        <div className="flex items-center gap-sm">
                          {tagObj.trending && (
                            <span className="badge badge-success text-xs">
                              <TrendingUp size={12} />
                              Trending
                            </span>
                          )}
                          <button className="p-1 hover:opacity-60 transition" onClick={() => navigator.clipboard.writeText(tagObj.tag)}>
                            <Copy size={14} className="text-secondary" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                : <p className="text-muted">No hashtags in this set yet</p>
              );
            })()}
          </div>
        </div>
      )}

      {/* Performance Tracking Table */}
      <div className="card mb-8">
        <h2 className="font-semibold text-lg mb-6">Performance Tracking</h2>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Set Name</th>
                <th className="text-center">Used</th>
                <th className="text-center">Avg Reach</th>
                <th className="text-center">Rating</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {savedSets.map((set, idx) => (
                <tr key={idx}>
                  <td className="font-medium">{set.name}</td>
                  <td className="text-center">{set.timesUsed}x</td>
                  <td className="text-center">{set.avgReach.toLocaleString()}</td>
                  <td className="text-center">⭐ {set.rating}</td>
                  <td className="text-center">
                    {set.id === 1 ? (
                      <span className="badge badge-success">⭐ Best Performer</span>
                    ) : (
                      <span className="badge">Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trending Section */}
      <div className="card mb-8">
        <h2 className="flex items-center gap-md mb-4">
          <Zap size={24} />
          Trending Now
        </h2>

        <div className="grid grid-3 gap-md">
          {trendingTags.map((tag, idx) => (
            <div key={idx} className="trending-tag-card">
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold">{tag.tag}</div>
                <div
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    tag.trend === 'up'
                      ? 'badge-success'
                      : 'bg-tertiary text-secondary'
                  }`}
                >
                  {tag.trend === 'up' ? '↑ Up' : 'Stable'}
                </div>
              </div>
              <div className="text-sm text-secondary mb-3">{tag.posts}M posts</div>
              <button className="btn btn-small w-full bg-warning/20 text-warning hover:bg-warning/30">
                <Download size={14} />
                Add to Set
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Banned/Restricted Hashtags Warning */}
      <div className="card restricted-hashtags-card">
        <h2 className="flex items-center gap-md mb-4 text-error">
          <AlertTriangle size={24} />
          Restricted Hashtags
        </h2>

        <p className="text-sm text-secondary mb-4">
          These hashtags are flagged for potential shadowbanning. Avoid using them:
        </p>

        <div className="grid grid-4 gap-sm">
          {restrictedTags.map((tag, idx) => (
            <div key={idx} className="restricted-tag-item">
              <div className="font-medium text-error text-sm">{tag}</div>
              <div className="text-xs text-error/70 mt-1">⚠ Flagged</div>
            </div>
          ))}
        </div>

        <button className="btn btn-small bg-error/20 text-error w-full mt-6 hover:bg-error/30">
          Check My Posts for Restricted Tags
        </button>
      </div>
    </div>
  );
};

export default Hashtags;
