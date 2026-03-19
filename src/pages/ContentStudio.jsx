import { useState, useMemo } from 'react';
import {
  Copy,
  Sparkles,
  Check,
  Trash2,
  Hash,
  Play,
  Zap,
  ImageIcon,
} from 'lucide-react';
import { useInsights } from '../services/useInsights';
import AIProviderSelector from '../components/AIProviderSelector';
import { generateContent } from '../services/aiProvider';
import '../styles/ContentStudio.css';

const tones = ['Witty', 'Professional', 'Casual', 'Inspirational', 'Educational'];

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

const ContentStudio = () => {
  const [activeTab, setActiveTab] = useState('captions');
  const [captionTopic, setCaptionTopic] = useState('morning workout motivation');
  const [captionTone, setCaptionTone] = useState('Inspirational');
  const [captionLength, setCaptionLength] = useState('medium');
  const [includeCTA, setIncludeCTA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState(null);

  // Load insights for data-driven recommendations
  const { engine: insightsEngine, hasData } = useInsights();
  const contentInsights = useMemo(() => {
    if (hasData && insightsEngine) {
      return insightsEngine.getContentInsights();
    }
    return null;
  }, [hasData, insightsEngine]);

  const [hashtagNiche, setHashtagNiche] = useState('fitness coaching');
  const [hashtagCount, setHashtagCount] = useState(20);
  const [generatedHashtags, setGeneratedHashtags] = useState(null);

  const [carouselTopic, setCarouselTopic] = useState('How to build a morning routine');
  const [carouselTemplate, setCarouselTemplate] = useState('10Steps');
  const [carouselSlides, setCarouselSlides] = useState([]);

  const [reelsTopic, setReelsTopic] = useState('');
  const [reelsHook, setReelsHook] = useState(reelsScripts[0]?.hook || '');
  const [reelsScript, setReelsScript] = useState(reelsScripts[0]?.structure || []);

  const [savedItems, setSavedItems] = useState([]);

  const handleGenerateCaptions = async () => {
    setLoading(true);
    try {
      const lengthMap = { short: '100 characters', medium: '200-250 characters', long: '500+ characters' };
      const prompt = `Generate 3 Instagram captions about "${captionTopic}" in a ${captionTone} tone. Each caption should be ${lengthMap[captionLength]}, include a hook, body, and ${includeCTA ? 'a strong CTA' : 'no CTA'}. Format as numbered list (1. 2. 3.)`;

      const result = await generateContent(prompt);
      setGeneratedCaptions(result.split('\n').filter(line => line.trim()));
    } catch (err) {
      setGeneratedCaptions([`Error: ${err.message}`]);
    } finally {
      setLoading(false);
    }
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
  };

  const saveToHistory = (item) => {
    setSavedItems([{ ...item, id: Date.now(), timestamp: new Date() }, ...savedItems]);
  };

  const deleteHistoryItem = (id) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="flex-col">
          <h1><Sparkles size={24} /> AI Content Studio</h1>
          <p className="text-muted">Generate captions, hashtags, carousels, and more</p>
        </div>
      </div>

      {contentInsights && (
        <div className="card mb-8" style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--color-primary)' }}>
          <div className="card-header">
            <h3 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} /> Data-Driven Content Tips for You
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <strong>Caption Strategy</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>{contentInsights.captionTip}</p>
            </div>
            <div>
              <strong>Hashtag Strategy</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>{contentInsights.hashtagTip}</p>
            </div>
            <div>
              <strong>Posting Schedule</strong>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>{contentInsights.postingSchedule}</p>
            </div>
          </div>
        </div>
      )}

      <div className="cs-main-grid">
        <div className="cs-left-section">
          <div className="tab-group">
            <button
              className={`tab-item ${activeTab === 'captions' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('captions')}
            >
              Caption Generator
            </button>
            <button
              className={`tab-item ${activeTab === 'hashtags' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('hashtags')}
            >
              Hashtag Generator
            </button>
            <button
              className={`tab-item ${activeTab === 'carousel' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('carousel')}
            >
              Carousel Planner
            </button>
            <button
              className={`tab-item ${activeTab === 'reels' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('reels')}
            >
              Reels Script
            </button>
            <button
              className={`tab-item ${activeTab === 'stories' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('stories')}
            >
              Story Planner
            </button>
            <button
              className={`tab-item ${activeTab === 'images' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('images')}
            >
              Image Ideas
            </button>
          </div>

        {activeTab === 'captions' && (
          <div className="card">
            <div className="card-header">
              <h2>Generate Captions</h2>
            </div>
            <AIProviderSelector />
            <div className="flex-col">
              <div>
                <label className="input-label">Topic / Subject</label>
                <input
                  className="input"
                  type="text"
                  value={captionTopic}
                  onChange={(e) => setCaptionTopic(e.target.value)}
                  placeholder="e.g., morning workout motivation"
                />
              </div>

              <div>
                <label className="input-label">Tone</label>
                <div className="tone-pills">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      className={`tone-pill ${captionTone === tone ? 'tone-pill-active' : ''}`}
                      onClick={() => setCaptionTone(tone)}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="input-label">Length</label>
                <select className="select" value={captionLength} onChange={(e) => setCaptionLength(e.target.value)}>
                  <option value="short">Short (100 chars)</option>
                  <option value="medium">Medium (250 chars)</option>
                  <option value="long">Long (500+ chars)</option>
                </select>
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeCTA}
                  onChange={(e) => setIncludeCTA(e.target.checked)}
                />
                Include Call-to-Action
              </label>

              <button className="btn-primary" onClick={handleGenerateCaptions} disabled={loading}>
                <Sparkles size={18} />
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'captions' && generatedCaptions?.length > 0 && (
          <div className="card cs-results">
            <div className="card-header">
              <h2>Generated Captions</h2>
            </div>
            <div className="flex-col">
              {generatedCaptions?.map((caption, idx) => (
                <div key={idx} className="result-item">
                  <p>{caption}</p>
                  <div className="flex-between">
                    <span />
                    <div className="flex-gap">
                      <button
                        className="btn-ghost"
                        onClick={() => copyToClipboard(caption)}
                        title="Copy"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        className="btn-ghost"
                        onClick={() => saveToHistory({ type: 'caption', content: caption })}
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hashtags' && (
          <div className="card">
            <div className="card-header">
              <h2>Generate Hashtags</h2>
            </div>
            <div className="flex-col">
              <div>
                <label className="input-label">Niche / Industry</label>
                <input
                  className="input"
                  type="text"
                  value={hashtagNiche}
                  onChange={(e) => setHashtagNiche(e.target.value)}
                  placeholder="e.g., fitness coaching, digital marketing"
                />
              </div>

              <div>
                <label className="input-label">Count: {hashtagCount}</label>
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={hashtagCount}
                  onChange={(e) => setHashtagCount(parseInt(e.target.value))}
                  className="input-range"
                />
                <p className="text-muted cs-small">Range: 10-30 hashtags</p>
              </div>

              <button className="btn-primary" onClick={handleGenerateHashtags} disabled={loading}>
                <Hash size={18} />
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'hashtags' && generatedHashtags && (
          <div className="card cs-results">
            <div className="card-header">
              <h2>Hashtag Groups</h2>
            </div>
            <div className="flex-col">
              {Object.entries(generatedHashtags).map(([category, tags]) => (
                <div key={category} className="hashtag-group">
                  <p className="text-muted cs-category">{category.charAt(0).toUpperCase() + category.slice(1)} Competition</p>
                  <div className="hashtag-pills">
                    {tags.map((tag, idx) => (
                      <button
                        key={idx}
                        className="badge"
                        onClick={() => copyToClipboard(tag)}
                        title="Click to copy"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                className="btn-secondary"
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
          </div>
        )}

        {activeTab === 'carousel' && (
          <div className="card">
            <div className="card-header">
              <h2>Carousel Planner</h2>
            </div>
            <div className="flex-col">
              <div>
                <label className="input-label">Topic</label>
                <input
                  className="input"
                  type="text"
                  value={carouselTopic}
                  onChange={(e) => setCarouselTopic(e.target.value)}
                  placeholder="What should the carousel teach?"
                />
              </div>

              <div>
                <label className="input-label">Template</label>
                <select className="select" value={carouselTemplate} onChange={(e) => setCarouselTemplate(e.target.value)}>
                  {Object.entries(carouselTemplates).map(([key, template]) => (
                    <option key={key} value={key}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn-primary" onClick={handleGenerateCarousel} disabled={loading}>
                <Sparkles size={18} />
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'carousel' && carouselSlides?.length > 0 && (
          <div className="card cs-results">
            <div className="card-header">
              <h2>Slide Outline</h2>
            </div>
            <div className="flex-col">
              {carouselSlides?.map((slide) => (
                <div key={slide.num} className="slide-card">
                  <p className="text-muted cs-small">Slide {slide.num} of {carouselSlides?.length}</p>
                  <p>{slide.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="card">
            <div className="card-header">
              <h2>Reels Script</h2>
            </div>
            <div className="flex-col">
              <div>
                <label className="input-label">Hook</label>
                <select className="select" value={reelsHook} onChange={(e) => setReelsHook(e.target.value)}>
                  {reelsScripts.map((script, idx) => (
                    <option key={idx} value={script.hook}>
                      {script.hook}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label">Topic (Optional)</label>
                <input
                  className="input"
                  type="text"
                  value={reelsTopic}
                  onChange={(e) => setReelsTopic(e.target.value)}
                  placeholder="What's the Reel about?"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reels' && reelsScript?.length > 0 && (
          <div className="card cs-results">
            <div className="card-header">
              <h2>Script (21 seconds)</h2>
            </div>
            <div className="flex-col">
              {reelsScript?.map((segment, idx) => (
                <div key={idx} className="slide-card">
                  <p className="text-muted cs-small">{segment.time}</p>
                  <p>{segment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="card">
            <div className="card-header">
              <h2>Story Sequence</h2>
            </div>
            <div className="flex-col">
              {storySequences.map((story) => (
                <div key={story.order} className="slide-card">
                  <p className="text-muted cs-small">Story {story.order}</p>
                  <p>{story.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="card">
            <div className="card-header">
              <h2>Visual Content Ideas</h2>
            </div>
            <div className="flex-col">
              {imageIdeas.map((idea, idx) => (
                <div key={idx} className="idea-card">
                  <p>{idea}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className="cs-sidebar">
        <div className="card">
          <div className="card-header">
            <h3>Saved Items</h3>
            <span className="badge">{savedItems.length}</span>
          </div>

          {savedItems.length === 0 ? (
            <p className="text-muted cs-empty">No saved items yet</p>
          ) : (
            <div className="saved-list">
              {savedItems.map((item) => (
                <div key={item.id} className="saved-item flex-between">
                  <div className="saved-preview">
                    <span className="badge">{item.type}</span>
                    <p title={item.content}>{item.content.substring(0, 40)}...</p>
                    <span className="text-muted cs-small">{formatDate(item.timestamp)}</span>
                  </div>
                  <button
                    className="btn-ghost"
                    onClick={() => deleteHistoryItem(item.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
      </div>
    </div>
  );
};

export default ContentStudio;
