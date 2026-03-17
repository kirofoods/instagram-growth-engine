import { useState } from 'react';
import { Grid3x3, Eye, EyeOff, Lightbulb, RefreshCw, Copy } from 'lucide-react';
import '../styles/GridPlanner.css';

export default function GridPlanner() {
  const [gridSize, setGridSize] = useState('3x3');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('default');

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

  const extractedColors = mockPosts.slice(0, 6).map((post) => post.color);

  const patterns = {
    default: 'Default Mix',
    checkerboard: 'Checkerboard (Alt Colors)',
    rowThemes: 'Row Themes (Content Type)',
    gradient: 'Gradient Fade',
  };

  const aestheticScore = 78;

  const tips = [
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
  ];

  return (
    <div className="grid-planner-page">
      {/* Header */}
      <div className="planner-header">
        <h1 className="planner-title">Grid Planner</h1>
        <p className="planner-subtitle">Plan your feed aesthetic with visual grid preview</p>
      </div>

      {/* Main Grid Section */}
      <div className="planner-layout">
        {/* Grid Preview */}
        <div className="planner-main">
          <div className="card grid-preview-card">
            <div className="preview-header flex-between">
              <h2 className="preview-title flex items-center gap-md">
                <Grid3x3 size={24} style={{ color: 'var(--color-primary)' }} />
                Feed Preview
              </h2>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="btn btn-primary btn-small"
              >
                {previewMode ? (
                  <>
                    <Eye size={16} />
                    Preview On
                  </>
                ) : (
                  <>
                    <EyeOff size={16} />
                    Preview Off
                  </>
                )}
              </button>
            </div>

            {/* Grid Display */}
            <div className="grid-display">
              {Array.from({ length: 9 }).map((_, idx) => {
                const post = mockPosts[idx];
                const isPreviewSlot = previewMode && idx === 0;

                return (
                  <div
                    key={idx}
                    className="grid-item"
                    style={{
                      backgroundColor: isPreviewSlot
                        ? 'rgba(100, 200, 255, 0.2)'
                        : post?.color || 'var(--bg-tertiary)',
                      borderColor: isPreviewSlot ? '#64c8ff' : 'var(--border-primary)',
                    }}
                  >
                    {post && !isPreviewSlot && (
                      <>
                        <span className="grid-item-title">{post.title}</span>
                        <div className="grid-item-badge">{post.type}</div>
                      </>
                    )}
                    {isPreviewSlot && (
                      <div className="grid-item-preview">
                        <div className="preview-label">New Post Preview</div>
                        <div className="preview-hint">(Toggle preview off to place)</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grid Size Selector */}
            <div className="grid-size-selector">
              {Object.keys(patterns).map((size) => (
                <button
                  key={size}
                  onClick={() => setGridSize(size)}
                  className={`grid-size-btn ${gridSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="planner-sidebar">
          {/* Aesthetic Score */}
          <div className="card aesthetic-card">
            <h3 className="card-title">Aesthetic Score</h3>
            <div className="aesthetic-circle">
              <svg className="aesthetic-svg" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--border-primary)"
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
                    <stop offset="0%" stopColor="var(--color-primary-start)" />
                    <stop offset="100%" stopColor="var(--color-primary-end)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="aesthetic-value">
                <span className="score-number">{aestheticScore}</span>
                <span className="score-max">/ 100</span>
              </div>
            </div>
            <p className="aesthetic-feedback">Strong visual consistency</p>
          </div>

          {/* Color Palette */}
          <div className="card palette-card">
            <h3 className="card-title">Dominant Colors</h3>
            <div className="color-grid">
              {extractedColors.map((color, idx) => (
                <button
                  key={idx}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <button className="btn btn-secondary btn-full gap-md">
              <Copy size={14} />
              Copy Palette
            </button>
          </div>
        </div>
      </div>

      {/* Pattern Suggestions */}
      <div className="card patterns-card">
        <h2 className="patterns-title flex items-center gap-md">
          <RefreshCw size={20} style={{ color: 'var(--color-primary)' }} />
          Grid Pattern Suggestions
        </h2>
        <div className="patterns-grid">
          {Object.entries(patterns).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedPattern(key)}
              className={`pattern-card ${selectedPattern === key ? 'active' : ''}`}
            >
              <div className="pattern-name">{name}</div>
              <div className="pattern-description">
                {key === 'default'
                  ? 'Mix of all content types'
                  : key === 'checkerboard'
                    ? 'Alternate colors for contrast'
                    : key === 'rowThemes'
                      ? 'Group by content type'
                      : 'Progressive color shift'}
              </div>
              <div className="pattern-preview">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="pattern-cell"
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
      <div className="tips-grid">
        {tips.map((item, idx) => (
          <div key={idx} className="card tip-card">
            <div className="tip-content flex gap-md">
              <Lightbulb
                size={20}
                style={{ color: 'var(--status-warning)' }}
                className="tip-icon"
              />
              <div className="tip-text">
                <h4 className="tip-title">{item.title}</h4>
                <p className="tip-description">{item.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
