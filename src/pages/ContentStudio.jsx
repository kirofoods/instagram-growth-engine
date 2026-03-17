import { useState } from 'react';
import {
  Copy,
  Sparkles,
  Send,
  Clock,
  Filter,
  Trash2,
  ChevronDown,
  Play,
  Zap,
  Hash,
} from 'lucide-react';
import '../styles/ContentStudio.css';

const tones = ['witty', 'professional', 'casual', 'inspirational', 'educational'];

const mockGenerations = {
  captions: [
    {
      id: 1,
      topic: 'morning workout motivation',
      tone: 'inspirational',
      captions: [
        "5am club hits different 💪 Your future self will thank you for the discipline you build today. What's your morning routine? #MorningGrind #FitnessJourney",
        "Coffee + discipline = unstoppable ☕️ Early mornings aren't about being perfect, they're about showing up for yourself consistently. Let's go! 💯 #EarlyBird #GymLife",
        "The win starts before sunrise ✨ Most people talk about their dreams. Champions wake up and live them. What are you building today? #NeverSettle #DayOneEnergy",
      ],
    },
    {
      id: 2,
      topic: 'product launch announcement',
      tone: 'professional',
      captions: [
        "After months of research and development, we're excited to announce the launch of [Product]. Built with your feedback in mind. Available now. 🚀",
        "Introducing [Product]: Engineered for excellence. Designed for you. Launching today with exclusive early-bird pricing for our community. Swipe up to learn more.",
        "The solution you've been waiting for is here. [Product] is now live. Read the full breakdown on our blog. Link in bio. 📊",
      ],
    },
  ],
  hashtags: [
    {
      id: 1,
      niche: 'fitness coaching',
      hashtags: {
        high: ['#FitnessCommunity', '#BodyTransformation', '#FitnessCoach', '#PersonalTrainer'],
        medium: ['#GymMotivation', '#WorkoutPlans', '#FitnessGoals', '#HealthCoach'],
        low: ['#FitnessTips', '#HealthyHabits', '#MorningWorkout', '#GymLife'],
      },
    },
  ],
};

const carouselTemplates = {
  '10Steps': {
    name: '10 Steps to [Goal]',
    slides: [
      'Slide 1: Eye-catching hook (problem statement)',
      'Slide 2: Why this matters (emotional hook)',
      'Slide 3-11: Each step with visual + explanation',
      'Slide 12: Summary + call to action',
    ],
  },
  'beforeAfter': {
    name: 'Before → After Journey',
    slides: [
      'Slide 1: "Before" state (relatable)',
      'Slide 2: What changed',
      'Slides 3-8: Key lessons learned',
      'Slide 9: "After" results',
      'Slide 10: How others can replicate',
    ],
  },
};

const reelsScripts = [
  {
    hook: 'Most people make this mistake...',
    structure: [
      { time: '0-3s', content: 'Hook: "Most people get this wrong about [topic]"' },
      { time: '3-12s', content: 'Explain the common mistake with B-roll' },
      { time: '12-18s', content: 'Share the correct approach' },
      { time: '18-21s', content: 'CTA: "Let me know if you knew this already"' },
    ],
  },
  {
    hook: 'This changed everything for me...',
    structure: [
      { time: '0-2s', content: 'Hook: "This one thing changed my [life/business]"' },
      { time: '2-12s', content: 'Tell the story with visuals' },
      { time: '12-18s', content: 'The lesson/takeaway' },
      { time: '18-21s', content: 'CTA: "Save this for later"' },
    ],
  },
];

const storySequences = [
  { order: 1, content: 'Story 1: Hook (problem relatable)' },
  { order: 2, content: 'Story 2: Curious question (add poll)' },
  { order: 3, content: 'Story 3: Answer + insight' },
  { order: 4, content: 'Story 4: Call-to-action (link or DM)' },
];

const imageIdeas = [
  'Before/After transformation split-screen',
  'Desk setup flat lay (for productivity niche)',
  'Product mockup in context of use',
  'Candid action shot (not posed)',
  'Text overlay with 3 key points on solid color',
  'Behind-the-scenes prep/process',
  'Data visualization or chart',
  'Comparison infographic',
];

export default function ContentStudio() {
  const [activeTab, setActiveTab] = useState('captions');
  const [captionTopic, setCaptionTopic] = useState('morning workout motivation');
  const [captionTone, setCaptionTone] = useState('inspirational');
  const [captionLength, setCaptionLength] = useState('medium');
  const [includeCTA, setIncludeCTA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState(
    mockGenerations.captions[0]?.captions || []
  );

  const [hashtagNiche, setHashtagNiche] = useState('fitness coaching');
  const [hashtagCount, setHashtagCount] = useState(20);
  const [generatedHashtags, setGeneratedHashtags] = useState(mockGenerations.hashtags[0]?.hashtags || null);

  const [carouselTopic, setCarouselTopic] = useState('How to build a morning routine');
  const [carouselTemplate, setCarouselTemplate] = useState('10Steps');
  const [carouselSlides, setCarouselSlides] = useState([]);

  const [reelsTopic, setReelsTopic] = useState('');
  const [reelsHook, setReelsHook] = useState(reelsScripts[0]?.hook || '');
  const [reelsScript, setReelsScript] = useState(reelsScripts[0]?.structure || []);

  const [savedItems, setSavedItems] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleGenerateCaptions = () => {
    setLoading(true);
    setTimeout(() => {
      const newCaptions = [
        `${captionTone} caption about ${captionTopic} - Hook them in the first line. Then tell the story. End with a question to boost engagement. ${includeCTA ? 'Swipe up to learn more!' : ''}`,
        `Another ${captionTone} take on ${captionTopic}. This version focuses on the emotional angle and builds curiosity throughout. Perfect for ${captionLength} form content. ${includeCTA ? 'Link in bio!' : ''}`,
        `Third variation: Lead with the benefit, not the feature. Talk about ${captionTopic} in a way that makes people stop scrolling. ${captionLength === 'short' ? 'Keep it tight.' : 'Give them details.'} ${includeCTA ? 'Comment "READY" below!' : ''}`,
      ];
      setGeneratedCaptions(newCaptions);
      setLoading(false);
    }, 1500);
  };

  const handleGenerateHashtags = () => {
    setLoading(true);
    setTimeout(() => {
      const mockTags = {
        high: [`#${hashtagNiche.split(' ')[0]}Expert`, `#${hashtagNiche.split(' ')[0]}Professional`],
        medium: [`#${hashtagNiche.split(' ')[0]}Tips`, `#${hashtagNiche.split(' ')[0]}Guide`],
        low: [`#${hashtagNiche.split(' ')[0]}Journey`, `#${hashtagNiche.split(' ')[0]}Daily`],
      };
      setGeneratedHashtags(mockTags);
      setLoading(false);
    }, 1200);
  };

  const handleGenerateCarousel = () => {
    setLoading(true);
    setTimeout(() => {
      setCarouselSlides([
        { num: 1, content: `Slide 1: Hook - "${carouselTopic}" - Why should they care?` },
        { num: 2, content: `Slide 2: The problem - Why people struggle with ${carouselTopic}` },
        { num: 3, content: `Slide 3: Step 1 - First actionable tip` },
        { num: 4, content: `Slide 4: Step 2 - Second actionable tip` },
        { num: 5, content: `Slide 5: Step 3 - Third actionable tip` },
        { num: 6, content: `Slide 6: Common mistake to avoid` },
        { num: 7, content: `Slide 7: Pro tip for faster results` },
        { num: 8, content: `Slide 8: Real example or case study` },
        { num: 9, content: `Slide 9: How to measure success` },
        { num: 10, content: `Slide 10: CTA - Save this, share with someone, DM me` },
      ]);
      setLoading(false);
    }, 1300);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const saveToHistory = (item) => {
    setSavedItems([...savedItems, { ...item, id: Date.now() }]);
  };

  const deleteHistoryItem = (id) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  return (
    <div className="content-studio-container">
      <style>{`
        .content-studio-container {
          background: #0a0a0a;
          color: #e0e0e0;
          min-height: 100vh;
          padding: 2rem;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 2.5rem;
        }

        .header p {
          color: #999;
          font-size: 1.1rem;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        .tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }

        .tab-button {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 0.75rem 1.25rem;
          color: #999;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .tab-button:hover {
          border-color: #3a3a4e;
          color: #e0e0e0;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #E1306C, #833AB4);
          border-color: transparent;
          color: #fff;
        }

        .tab-content {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: #fff;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-family: inherit;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #833AB4;
          box-shadow: 0 0 0 3px rgba(131, 58, 180, 0.1);
        }

        .form-group textarea {
          min-height: 80px;
          resize: vertical;
        }

        .slider-value {
          color: #999;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .checkbox-group input[type='checkbox'] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .generate-btn {
          flex: 1;
          background: linear-gradient(135deg, #E1306C, #833AB4);
          border: none;
          border-radius: 8px;
          padding: 1rem;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(131, 58, 180, 0.3);
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .output-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #2a2a3e;
        }

        .output-section h3 {
          color: #fff;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .output-card {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-left: 3px solid #833AB4;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .output-card:hover {
          border-color: #833AB4;
          background: #151530;
        }

        .output-card p {
          color: #ccc;
          margin: 0 0 1rem 0;
          line-height: 1.6;
        }

        .output-card-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .icon-button {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 6px;
          padding: 0.5rem;
          color: #999;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-button:hover {
          background: #833AB4;
          border-color: #833AB4;
          color: #fff;
        }

        .sidebar {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .sidebar h3 {
          color: #fff;
          margin: 0 0 1rem 0;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .history-list {
          max-height: 400px;
          overflow-y: auto;
        }

        .history-item {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 6px;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
        }

        .history-item-text {
          flex: 1;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .hashtag-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .hashtag-category {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 1rem;
        }

        .hashtag-category h4 {
          color: #999;
          margin: 0 0 0.75rem 0;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .hashtag-tag {
          background: #1a1a2e;
          border-radius: 4px;
          padding: 0.4rem 0.6rem;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #ccc;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tone-options {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .tone-button {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 6px;
          padding: 0.4rem 0.8rem;
          color: #999;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .tone-button:hover,
        .tone-button.active {
          background: #833AB4;
          border-color: #833AB4;
          color: #fff;
        }

        .slide-preview {
          background: #0a0a0a;
          border-left: 3px solid #833AB4;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          color: #ccc;
        }

        .slide-number {
          color: #999;
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }

        .empty-state {
          text-align: center;
          color: #666;
          padding: 2rem;
        }
      `}</style>

      <div className="header">
        <h1>✨ AI Content Studio</h1>
        <p>Generate captions, hashtags, carousels, and more</p>
      </div>

      <div className="main-grid">
        <div>
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'captions' ? 'active' : ''}`}
              onClick={() => setActiveTab('captions')}
            >
              Caption Generator
            </button>
            <button
              className={`tab-button ${activeTab === 'hashtags' ? 'active' : ''}`}
              onClick={() => setActiveTab('hashtags')}
            >
              Hashtag Generator
            </button>
            <button
              className={`tab-button ${activeTab === 'carousel' ? 'active' : ''}`}
              onClick={() => setActiveTab('carousel')}
            >
              Carousel Planner
            </button>
            <button
              className={`tab-button ${activeTab === 'reels' ? 'active' : ''}`}
              onClick={() => setActiveTab('reels')}
            >
              Reels Script
            </button>
            <button
              className={`tab-button ${activeTab === 'stories' ? 'active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              Story Planner
            </button>
            <button
              className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
              onClick={() => setActiveTab('images')}
            >
              Image Ideas
            </button>
          </div>

          {/* Caption Generator */}
          {activeTab === 'captions' && (
            <div className="tab-content">
              <div className="form-group">
                <label>Topic / Subject</label>
                <input
                  type="text"
                  value={captionTopic}
                  onChange={(e) => setCaptionTopic(e.target.value)}
                  placeholder="e.g., morning workout, product launch..."
                />
              </div>

              <div className="form-group">
                <label>Tone</label>
                <div className="tone-options">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      className={`tone-button ${captionTone === tone ? 'active' : ''}`}
                      onClick={() => setCaptionTone(tone)}
                    >
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Length</label>
                <select value={captionLength} onChange={(e) => setCaptionLength(e.target.value)}>
                  <option value="short">Short (100 chars)</option>
                  <option value="medium">Medium (250 chars)</option>
                  <option value="long">Long (500+ chars)</option>
                </select>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="includeCTA"
                  checked={includeCTA}
                  onChange={(e) => setIncludeCTA(e.target.checked)}
                />
                <label htmlFor="includeCTA">Include Call-to-Action</label>
              </div>

              <button className="generate-btn" onClick={handleGenerateCaptions} disabled={loading}>
                <Sparkles size={18} />
                {loading ? 'Generating...' : 'Generate Captions'}
              </button>

              {generatedCaptions.length > 0 && (
                <div className="output-section">
                  <h3>
                    <Sparkles size={18} />
                    Generated Captions
                  </h3>
                  {generatedCaptions.map((caption, idx) => (
                    <div key={idx} className="output-card">
                      <p>{caption}</p>
                      <div className="output-card-buttons">
                        <button
                          className="icon-button"
                          onClick={() => copyToClipboard(caption)}
                          title="Copy"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => saveToHistory({ type: 'caption', content: caption })}
                          title="Save"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Hashtag Generator */}
          {activeTab === 'hashtags' && (
            <div className="tab-content">
              <div className="form-group">
                <label>Niche / Industry</label>
                <input
                  type="text"
                  value={hashtagNiche}
                  onChange={(e) => setHashtagNiche(e.target.value)}
                  placeholder="e.g., fitness coaching, digital marketing..."
                />
              </div>

              <div className="form-group">
                <label>Number of Hashtags: {hashtagCount}</label>
                <input
                  type="range"
                  min="15"
                  max="30"
                  value={hashtagCount}
                  onChange={(e) => setHashtagCount(parseInt(e.target.value))}
                />
                <div className="slider-value">Range: 15-30 hashtags</div>
              </div>

              <button className="generate-btn" onClick={handleGenerateHashtags} disabled={loading}>
                <Hash size={18} />
                {loading ? 'Generating...' : 'Generate Hashtags'}
              </button>

              {generatedHashtags && (
                <div className="output-section">
                  <h3>
                    <Hash size={18} />
                    Categorized Hashtags
                  </h3>
                  <div className="hashtag-grid">
                    {Object.entries(generatedHashtags).map(([category, tags]) => (
                      <div key={category} className="hashtag-category">
                        <h4>{category.toUpperCase()} COMPETITION</h4>
                        {tags.map((tag, idx) => (
                          <div
                            key={idx}
                            className="hashtag-tag"
                            onClick={() => copyToClipboard(tag)}
                            style={{ cursor: 'pointer' }}
                          >
                            {tag}
                            <Copy size={12} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <button
                    className="generate-btn"
                    style={{ marginTop: '1rem', background: '#1a1a2e', color: '#ccc' }}
                    onClick={() => {
                      const allTags = Object.values(generatedHashtags)
                        .flat()
                        .join(' ');
                      copyToClipboard(allTags);
                    }}
                  >
                    <Copy size={16} />
                    Copy All
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Carousel Planner */}
          {activeTab === 'carousel' && (
            <div className="tab-content">
              <div className="form-group">
                <label>Carousel Topic</label>
                <input
                  type="text"
                  value={carouselTopic}
                  onChange={(e) => setCarouselTopic(e.target.value)}
                  placeholder="What should the carousel teach?"
                />
              </div>

              <div className="form-group">
                <label>Template</label>
                <select value={carouselTemplate} onChange={(e) => setCarouselTemplate(e.target.value)}>
                  {Object.entries(carouselTemplates).map(([key, template]) => (
                    <option key={key} value={key}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <button className="generate-btn" onClick={handleGenerateCarousel} disabled={loading}>
                <Sparkles size={18} />
                {loading ? 'Generating...' : 'Generate Slides'}
              </button>

              {carouselSlides.length > 0 && (
                <div className="output-section">
                  <h3>
                    <Sparkles size={18} />
                    Slide Outline
                  </h3>
                  {carouselSlides.map((slide) => (
                    <div key={slide.num} className="slide-preview">
                      <div className="slide-number">Slide {slide.num} of {carouselSlides.length}</div>
                      <p>{slide.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reels Script */}
          {activeTab === 'reels' && (
            <div className="tab-content">
              <div className="form-group">
                <label>Hook</label>
                <select value={reelsHook} onChange={(e) => setReelsHook(e.target.value)}>
                  {reelsScripts.map((script, idx) => (
                    <option key={idx} value={script.hook}>
                      {script.hook}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Topic (Optional)</label>
                <input
                  type="text"
                  value={reelsTopic}
                  onChange={(e) => setReelsTopic(e.target.value)}
                  placeholder="What's the Reel about?"
                />
              </div>

              {reelsScript.length > 0 && (
                <div className="output-section">
                  <h3>
                    <Play size={18} />
                    Reel Script (21 seconds)
                  </h3>
                  {reelsScript.map((segment, idx) => (
                    <div key={idx} className="slide-preview">
                      <div className="slide-number">{segment.time}</div>
                      <p>{segment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Story Planner */}
          {activeTab === 'stories' && (
            <div className="tab-content">
              <div className="output-section" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                <h3>
                  <Zap size={18} />
                  Multi-Story Sequence
                </h3>
                {storySequences.map((story) => (
                  <div key={story.order} className="slide-preview">
                    <div className="slide-number">Story {story.order}</div>
                    <p>{story.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Ideas */}
          {activeTab === 'images' && (
            <div className="tab-content">
              <h3 style={{ color: '#fff', margin: '0 0 1rem 0' }}>📸 Visual Content Ideas</h3>
              {imageIdeas.map((idea, idx) => (
                <div key={idx} className="output-card">
                  <p>{idea}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar - Saved Generations History */}
        <div className="sidebar">
          <h3>
            <Clock size={16} />
            Saved Items ({savedItems.length})
          </h3>

          {savedItems.length === 0 ? (
            <div className="empty-state" style={{ padding: '1rem' }}>
              <p>No saved items yet</p>
            </div>
          ) : (
            <div className="history-list">
              {savedItems.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-item-text" title={item.content}>
                    {item.content.substring(0, 40)}...
                  </div>
                  <button
                    className="icon-button"
                    onClick={() => deleteHistoryItem(item.id)}
                    style={{ padding: '0.25rem' }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
