import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  CalendarDays,
  Clock,
  Sparkles,
} from 'lucide-react';
import '../styles/Calendar.css';

const contentTypes = [
  { id: 'reel', name: 'Reel', color: 'var(--color-secondary)', emoji: '🎥' },
  { id: 'carousel', name: 'Carousel', color: 'var(--color-accent-cyan)', emoji: '📱' },
  { id: 'single', name: 'Single Post', color: 'var(--status-success)', emoji: '🖼️' },
  { id: 'story', name: 'Story', emoji: '📸', color: 'var(--color-primary)' },
  { id: 'caption', name: 'Caption Only', color: 'var(--status-warning)', emoji: '📝' },
];

const recurringThemes = [
  { day: 'Monday', theme: 'Motivation Monday 💪', color: 'var(--status-error)' },
  { day: 'Wednesday', theme: 'Wisdom Wednesday 🧠', color: 'var(--color-accent-cyan)' },
  { day: 'Friday', theme: 'Throwback Friday 📸', color: 'var(--status-warning)' },
];

const mockContent = [
  {
    id: 1,
    date: 15,
    month: 2,
    year: 2025,
    type: 'reel',
    title: 'Morning Motivation Reel',
    status: 'posted',
    caption: 'Rise and grind! Your future self will thank you.',
    hashtags: '#MondayMotivation #GymLife',
    stats: { views: 4523, likes: 345, comments: 28 },
  },
  {
    id: 2,
    date: 16,
    month: 2,
    year: 2025,
    type: 'carousel',
    title: '5 Productivity Tips',
    status: 'ready',
    caption: 'Swipe for these game-changing tips...',
    hashtags: '#ProductivityHacks #TimeManagement',
  },
  {
    id: 3,
    date: 18,
    month: 2,
    year: 2025,
    type: 'single',
    title: 'Office Setup Photo',
    status: 'draft',
    caption: 'Work from anywhere with this setup.',
    hashtags: '#WorkFromHome',
  },
  {
    id: 4,
    date: 20,
    month: 2,
    year: 2025,
    type: 'story',
    title: 'Daily Story Series',
    status: 'ready',
    caption: 'Behind the scenes content',
  },
  {
    id: 5,
    date: 22,
    month: 2,
    year: 2025,
    type: 'reel',
    title: 'Tutorial: Quick Lunch Ideas',
    status: 'ready',
    caption: 'Fast, healthy, and delicious!',
    hashtags: '#HealthyRecipes #FoodTutorial',
  },
];

const contentPipeline = [
  { stage: 'Idea', count: 8, color: 'var(--status-warning)' },
  { stage: 'Draft', count: 5, color: 'var(--status-error)' },
  { stage: 'Ready', count: 12, color: 'var(--color-accent-cyan)' },
  { stage: 'Posted', count: 24, color: 'var(--status-success)' },
  { stage: 'Analyzed', count: 18, color: 'var(--color-secondary)' },
];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'reel',
    caption: '',
    hashtags: '',
    status: 'draft',
    scheduledTime: '',
  });

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getContentForDate = (day) => {
    return mockContent.filter((c) => c.date === day && c.month === currentMonth && c.year === currentYear);
  };

  const getContentTypeInfo = (typeId) => {
    return contentTypes.find((t) => t.id === typeId);
  };

  const handleAddContent = () => {
    if (!selectedDate || !newContent.title.trim()) return;
    // TODO: Save to Firestore when data sync is wired up
    setShowModal(false);
    setNewContent({ title: '', type: 'reel', caption: '', hashtags: '', status: 'draft', scheduledTime: '' });
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentDate = new Date();
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - currentDate.getDay());

  const postsThisWeek = mockContent.filter((c) => {
    const contentDate = new Date(c.year, c.month, c.date);
    return contentDate >= weekStart && contentDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
  });

  const typeDistribution = {
    reel: mockContent.filter((c) => c.type === 'reel').length,
    carousel: mockContent.filter((c) => c.type === 'carousel').length,
    single: mockContent.filter((c) => c.type === 'single').length,
    story: mockContent.filter((c) => c.type === 'story').length,
    caption: mockContent.filter((c) => c.type === 'caption').length,
  };

  const days_array = [];
  for (let i = 0; i < firstDay; i++) {
    days_array.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days_array.push(i);
  }

  return (
    <div className="calendar-page">
      <div className="calendar-header-section">
        <h1 className="calendar-title">📅 Content Calendar & Scheduler</h1>
        <p className="calendar-subtitle">Plan, schedule, and track your Instagram content</p>
      </div>

      <div className="calendar-grid-container">
        <div className="calendar-main">
          <div className="card calendar-card">
            <div className="calendar-controls flex-between">
              <h2 className="calendar-month-year">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-md items-center">
                <div className="view-toggle tab-group">
                  <button
                    className={`tab view-toggle-btn ${viewMode === 'month' ? 'tab-active' : ''}`}
                    onClick={() => setViewMode('month')}
                  >
                    Month
                  </button>
                  <button
                    className={`tab view-toggle-btn ${viewMode === 'week' ? 'tab-active' : ''}`}
                    onClick={() => setViewMode('week')}
                  >
                    Week
                  </button>
                </div>
                <div className="flex gap-sm">
                  <button className="btn btn-ghost" onClick={prevMonth} title="Previous month">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="btn btn-ghost" onClick={nextMonth} title="Next month">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="calendar-grid">
              {days.map((day) => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}

              {days_array.map((day, idx) => {
                const content = day ? getContentForDate(day) : [];
                return (
                  <div
                    key={idx}
                    className={`calendar-day-cell ${!day ? 'empty' : 'active'}`}
                    onClick={() => {
                      if (day) {
                        setSelectedDate(day);
                        setShowModal(true);
                      }
                    }}
                  >
                    {day && (
                      <>
                        <div className="calendar-day-number">{day}</div>
                        <div className="calendar-day-items">
                          {content.map((c) => {
                            const typeInfo = getContentTypeInfo(c.type);
                            return (
                              <div
                                key={c.id}
                                className="content-badge"
                                style={{ borderLeftColor: typeInfo.color }}
                              >
                                {typeInfo.emoji} {c.title.substring(0, 12)}
                              </div>
                            );
                          })}
                          {content.length === 0 && (
                            <div className="calendar-day-empty">Click to add</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="calendar-sidebar">
          {/* This Week Stats */}
          <div className="card">
            <h3 className="card-header-title flex items-center gap-md">
              <CalendarDays size={18} />
              This Week
            </h3>
            <div className="stats-row">
              <span className="text-secondary">Posts Planned</span>
              <span className="stat-value">{postsThisWeek.length}</span>
            </div>
            <div className="type-distribution-section">
              <strong className="text-primary text-sm">Type Distribution:</strong>
              <div className="type-distribution">
                {Object.entries(typeDistribution).map(([type, count]) => {
                  const typeInfo = contentTypes.find((t) => t.id === type);
                  return count > 0 ? (
                    <div key={type} className="flex gap-sm items-center">
                      <span>{typeInfo.emoji}</span>
                      <span className="text-secondary text-sm">{typeInfo.name}: {count}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {/* Content Pipeline */}
          <div className="card">
            <h3 className="card-header-title flex items-center gap-md">
              <Clock size={18} />
              Content Pipeline
            </h3>
            {contentPipeline.map((item) => (
              <div key={item.stage} className="stats-row">
                <span className="text-secondary text-sm">{item.stage}</span>
                <span className="stat-value" style={{ color: item.color }}>
                  {item.count}
                </span>
              </div>
            ))}
            <div className="pipeline-bar">
              {contentPipeline.map((item) => (
                <div
                  key={item.stage}
                  className="pipeline-segment"
                  style={{
                    backgroundColor: item.color,
                    flex: item.count / 10,
                  }}
                  title={`${item.stage}: ${item.count}`}
                />
              ))}
            </div>
          </div>

          {/* Recurring Themes */}
          <div className="card">
            <h3 className="card-header-title flex items-center gap-md">
              <Sparkles size={18} style={{ color: 'var(--status-warning)' }} />
              Recurring Themes
            </h3>
            {recurringThemes.map((theme) => (
              <div key={theme.day} className="theme-badge">
                <span
                  className="theme-dot"
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-sm">
                  <strong className="text-primary">{theme.day}:</strong> {theme.theme}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Content Modal */}
      {showModal && (
        <div className="calendar-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              Add Content - {monthNames[currentMonth]} {selectedDate}
            </h2>

            <div className="form-group">
              <label className="form-label">Content Type</label>
              <div className="type-selector">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`type-button ${newContent.type === type.id ? 'active' : ''}`}
                    onClick={() => setNewContent({ ...newContent, type: type.id })}
                  >
                    {type.emoji} {type.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                placeholder="e.g., Morning Motivation Reel"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Caption</label>
              <textarea
                value={newContent.caption}
                onChange={(e) => setNewContent({ ...newContent, caption: e.target.value })}
                placeholder="Write your caption here..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hashtags</label>
              <input
                type="text"
                value={newContent.hashtags}
                onChange={(e) => setNewContent({ ...newContent, hashtags: e.target.value })}
                placeholder="#hashtag1 #hashtag2"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                value={newContent.status}
                onChange={(e) => setNewContent({ ...newContent, status: e.target.value })}
              >
                <option value="idea">Idea</option>
                <option value="draft">Draft</option>
                <option value="ready">Ready to Post</option>
                <option value="posted">Posted</option>
                <option value="analyzed">Analyzed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Scheduled Time (Optional)</label>
              <input
                type="time"
                value={newContent.scheduledTime}
                onChange={(e) => setNewContent({ ...newContent, scheduledTime: e.target.value })}
              />
            </div>

            <div className="modal-actions flex gap-md">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddContent}>
                Add Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
