import { useState, useEffect } from 'react';
import { Grid3x3, Eye, EyeOff, Lightbulb, RefreshCw, Copy } from 'lucide-react';
import { useDocument, useUpdateDocument } from '../firebase/useFirestore';
import '../styles/GridPlanner.css';

export default function GridPlanner() {
  const [gridSize, setGridSize] = useState('3x3');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState('default');
  const [aestheticScore, setAestheticScore] = useState(78);

  // Firestore integration
  const { data: gridSettings } = useDocument('settings', 'gridPlanner');
  const { updateDocument } = useUpdateDocument('settings');

  const mockPosts = [
    { id: 1, type: 'reel', color: 'var(--color-primary)', title: 'Reel 1' },
    { id: 2, type: 'carousel', color: 'var(--color-secondary)', title: 'Carousel 1' },
    { id: 3, type: 'single', color: 'var(--status-error)', title: 'Single 1' },
    { id: 4, type: 'carousel', color: 'var(--color-primary-start)', title: 'Carousel 2' },
    { id: 5, type: 'reel', color: 'var(--status-warning)', title: 'Reel 2' },
    { id: 6, type: 'single', color: 'var(--color-secondary)', title: 'Single 2' },
    { id: 7, type: 'reel', color: 'var(--color-primary)', title: 'Reel 3' },
    { id: 8, type: 'single', color: 'var(--status-error)', title: 'Single 3' },
    { id: 9, type: 'carousel', color: 'var(--color-secondary)', title: 'Carousel 3' },
  ];

  // Load settings from Firestore on mount
  useEffect(() => {
    if (gridSettings) {
      setGridSize(gridSettings.gridSize || '3x3');
      setSelectedPattern(gridSettings.selectedPattern || 'default');
      setAestheticScore(gridSettings.aestheticScore || 78);
    }
  }, [gridSettings]);

  // Calculate aesthetic score dynamically
  const calculateAestheticScore = () => {
    const colors = mockPosts.map(p => p.color);
    const uniqueColors = new Set(colors).size;
    const contentTypes = mockPosts.map(p => p.type);
    const uniqueTypes = new Set(contentTypes).size;

    // Color variety: best at 4-6 unique colors
    let colorScore = 0;
    if (uniqueColors >= 4 && uniqueColors <= 6) {
      colorScore = 40;
    } else if (uniqueColors >= 3 && uniqueColors <= 7) {
      colorScore = 35;
    } else if (uniqueColors >= 2) {
      colorScore = 20;
    }

    // Content variety: best with 2-3 content types distributed well
    let typeScore = 0;
    if (uniqueTypes === 3) {
      const typeCounts = {};
      contentTypes.forEach(type => {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });
      const counts = Object.values(typeCounts);
      const isBalanced = Math.max(...counts) - Math.min(...counts) <= 2;
      typeScore = isBalanced ? 40 : 35;
    } else if (uniqueTypes === 2) {
      typeScore = 30;
    } else {
      typeScore = 20;
    }

    // Pattern bonus
    let patternBonus = 0;
    if (selectedPattern !== 'default') {
      patternBonus = 10;
    }

    return Math.min(100, colorScore + typeScore + patternBonus);
  };

  // Update aesthetic score based on grid changes
  useEffect(() => {
    const newScore = calculateAestheticScore();
    setAestheticScore(newScore);
  }, [selectedPattern]);

  const patterns = {
    default: 'Default Mix',
    checkerboard: 'Checkerboard (Alt Colors)',
    rowThemes: 'Row Themes (Content Type)',
    gradient: 'Gradient Fade',
  };

  const getGridCount = () => {
    switch (gridSize) {
      case '4x4':
        return 16;
      case '6x6':
        return 36;
      default:
        return 9;
    }
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    saveGridSettings(size, selectedPattern);
  };

  const handlePatternChange = (pattern) => {
    setSelectedPattern(pattern);
    saveGridSettings(gridSize, pattern);
  };

  const saveGridSettings = async (size, pattern) => {
    try {
      const score = calculateAestheticScore();
      await updateDocument('gridPlanner', {
        gridSize: size,
        selectedPattern: pattern,
        aestheticScore: score,
      });
    } catch (error) {
      console.error('Error saving grid settings:', error);
    }
  };

  const extractedColors = mockPosts.slice(0, 6).map((post) => post.color);

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
            <div className="grid-display" style={{ gridTemplateColumns: `repeat(${gridSize.split('x')[0]}, 1fr)` }}>
              {Array.from({ length: getGridCount() }).map((_, idx) => {
                const post = mockPosts[idx];
                const isPreviewSlot = previewMode && idx === 0;

                // Apply pattern coloring
                let displayColor = post?.color || 'var(--bg-tertiary)';
                if (selectedPattern === 'checkerboard') {
                  displayColor = idx % 2 === 0 ? '#E1306C' : '#833AB4';
                } else if (selectedPattern === 'rowThemes') {
                  const colors = ['#E1306C', '#833AB4', '#FD1D1D'];
                  displayColor = colors[Math.floor(idx / parseInt(gridSize.split('x')[0]))];
                } else if (selectedPattern === 'gradient') {
                  const alpha = 0.3 + (idx / getGridCount()) * 0.7;
                  displayColor = `rgba(225, 48, 108, ${alpha})`;
                }

                return (
                  <div
                    key={idx}
                    className="grid-item"
                    style={{
                      backgroundColor: isPreviewSlot
                        ? 'rgba(100, 200, 255, 0.2)'
                        : displayColor,
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
              {['3x3', '4x4', '6x6'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleGridSizeChange(size)}
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
              onClick={() => handlePatternChange(key)}
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
