import { useState } from 'react';
import {
  Grid3x3,
  Eye,
  EyeOff,
  Lightbulb,
  RefreshCw,
  Copy,
} from 'lucide-react';

const GridPlanner = () => {
  const [gridSize, setGridSize] = useState('3x3');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('default');

  // Mock planned posts with different content types
  const mockPosts = [
    { id: 1, type: 'reel', color: '#E1306C', title: 'Reel 1' },
    { id: 2, type: 'carousel', color: '#833AB4', title: 'Carousel 1' },
    { id: 3, type: 'single', color: '#FD1D1D', title: 'Single 1' },
    { id: 4, type: 'carousel', color: '#F77737', title: 'Carousel 2' },
    { id: 5, type: 'reel', color: '#FCAF45', title: 'Reel 2' },
    { id: 6, type: 'single', color: '#833AB4', title: 'Single 2' },
    { id: 7, type: 'reel', color: '#E1306C', title: 'Reel 3' },
    { id: 8, type: 'single', color: '#FD1D1D', title: 'Single 3' },
    { id: 9, type: 'carousel', color: '#833AB4', title: 'Carousel 3' },
  ];

  // Extract dominant colors from posts
  const extractedColors = mockPosts.slice(0, 6).map(post => post.color);

  // Grid patterns
  const patterns = {
    default: 'Default Mix',
    checkerboard: 'Checkerboard (Alt Colors)',
    rowThemes: 'Row Themes (Content Type)',
    gradient: 'Gradient Fade',
  };

  // Get grid dimensions
  const getGridDimensions = (size) => {
    const dims = {
      '3x3': 3,
      '3x4': 4,
      '3x5': 5,
    };
    return dims[size] || 3;
  };

  const gridItems = getGridDimensions(gridSize);

  // Calculate aesthetic score (mock calculation)
  const aestheticScore = 78;

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Grid Planner</h1>
        <p className="text-gray-400">Plan your feed aesthetic with visual grid preview</p>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Grid Preview */}
        <div className="lg:col-span-2">
          <div
            className="rounded-lg p-6 border border-gray-800"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Grid3x3 size={24} className="text-pink-500" />
                Feed Preview
              </h2>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition"
              >
                {previewMode ? (
                  <>
                    <Eye size={18} />
                    Preview On
                  </>
                ) : (
                  <>
                    <EyeOff size={18} />
                    Preview Off
                  </>
                )}
              </button>
            </div>

            {/* Grid Display */}
            <div
              className="grid gap-2 p-4 rounded-lg border border-gray-700"
              style={{
                gridTemplateColumns: `repeat(3, 1fr)`,
                backgroundColor: '#0f0f1e',
              }}
            >
              {Array.from({ length: 9 }).map((_, idx) => {
                const post = mockPosts[idx];
                const isPreviewSlot = previewMode && idx === 0;

                return (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg border-2 border-gray-700 flex items-center justify-center cursor-pointer hover:border-pink-500 transition group relative overflow-hidden"
                    style={{
                      backgroundColor: isPreviewSlot
                        ? 'rgba(100, 200, 255, 0.2)'
                        : post
                          ? post.color
                          : '#2a2a3e',
                      borderColor: isPreviewSlot ? '#64c8ff' : 'inherit',
                    }}
                  >
                    {post && !isPreviewSlot && (
                      <>
                        <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition">
                          {post.title}
                        </span>
                        <div className="absolute top-1 right-1 text-xs bg-black/50 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          {post.type.charAt(0).toUpperCase() +
                            post.type.slice(1)}
                        </div>
                      </>
                    )}
                    {isPreviewSlot && (
                      <div className="text-center">
                        <div className="text-blue-300 text-sm font-semibold">
                          New Post Preview
                        </div>
                        <div className="text-xs text-blue-200 mt-1">
                          (Toggle preview off to place)
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid Size Selector */}
            <div className="mt-6 flex gap-2">
              {Object.keys(patterns).map(size => (
                <button
                  key={size}
                  onClick={() => setGridSize(size)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    gridSize === size
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Aesthetic Score */}
          <div
            className="rounded-lg p-6 border border-gray-800"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <h3 className="text-white font-semibold mb-4">Aesthetic Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#333"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${(aestheticScore / 100) * 340} 340`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#E1306C" />
                      <stop offset="100%" stopColor="#833AB4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {aestheticScore}
                    </div>
                    <div className="text-xs text-gray-400">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              Strong visual consistency
            </p>
          </div>

          {/* Color Palette */}
          <div
            className="rounded-lg p-6 border border-gray-800"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <h3 className="text-white font-semibold mb-4">Dominant Colors</h3>
            <div className="grid grid-cols-3 gap-2">
              {extractedColors.map((color, idx) => (
                <button
                  key={idx}
                  className="aspect-square rounded-lg hover:scale-110 transition border border-gray-700"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <button className="w-full mt-4 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition">
              <Copy size={14} className="inline mr-2" />
              Copy Palette
            </button>
          </div>
        </div>
      </div>

      {/* Pattern Suggestions */}
      <div
        className="rounded-lg p-6 border border-gray-800 mb-8"
        style={{ backgroundColor: '#1a1a2e' }}
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <RefreshCw size={20} className="text-pink-500" />
          Grid Pattern Suggestions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(patterns).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedPattern(key)}
              className={`p-4 rounded-lg border-2 text-left transition ${
                selectedPattern === key
                  ? 'border-pink-500 bg-gradient-to-r from-pink-500/10 to-purple-600/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="font-semibold text-white mb-2">{name}</div>
              <div className="text-sm text-gray-400">
                {key === 'default'
                  ? 'Mix of all content types'
                  : key === 'checkerboard'
                    ? 'Alternate colors for contrast'
                    : key === 'rowThemes'
                      ? 'Group by content type'
                      : 'Progressive color shift'}
              </div>
              <div
                className="mt-3 grid grid-cols-3 gap-1 h-12"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded"
                    style={{
                      backgroundColor:
                        key === 'checkerboard'
                          ? idx % 2 === 0
                            ? '#E1306C'
                            : '#833AB4'
                          : key === 'rowThemes'
                            ? ['#E1306C', '#833AB4', '#FD1D1D'][
                                Math.floor(idx / 3)
                              ]
                            : key === 'gradient'
                              ? `rgba(225, 48, 108, ${0.3 + (idx / 9) * 0.7})`
                              : ['#E1306C', '#833AB4', '#FD1D1D', '#F77737'][
                                  idx % 4
                                ],
                    }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Color Consistency',
            tip: 'Stick to a 3-5 color palette across your posts. This creates a cohesive feed aesthetic.',
          },
          {
            title: 'Content Balance',
            tip: 'Mix reels, carousels, and singles throughout your grid. Varied content keeps engagement high.',
          },
          {
            title: 'White Space',
            tip: 'Use white or light backgrounds periodically to give your feed breathing room.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4 border border-gray-800 bg-gradient-to-br from-pink-500/5 to-purple-600/5"
          >
            <div className="flex items-start gap-3">
              <Lightbulb
                size={20}
                className="text-yellow-400 flex-shrink-0 mt-1"
              />
              <div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridPlanner;
