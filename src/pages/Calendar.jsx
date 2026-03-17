import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit,
  CalendarDays,
  Clock,
  Type,
  Hash,
  Eye,
  MessageCircle,
  Heart,
} from 'lucide-react';
import '../styles/Calendar.css';

const contentTypes = [
  { id: 'reel', name: 'Reel', color: '#833AB4', emoji: '🎥' },
  { id: 'carousel', name: 'Carousel', color: '#4ECDC4', emoji: '📱' },
  { id: 'single', name: 'Single Post', color: '#4CAF50', emoji: '🖼️' },
  { id: 'story', name: 'Story', emoji: '📸', color: '#FF6B9D' },
  { id: 'caption', name: 'Caption Only', color: '#FFB84D', emoji: '📝' },
];

const recurringThemes = [
  { day: 'Monday', theme: 'Motivation Monday 💪', color: '#FF6B6B' },
  { day: 'Wednesday', theme: 'Wisdom Wednesday 🧠', color: '#4ECDC4' },
  { day: 'Friday', theme: 'Throwback Friday 📸', color: '#FFB84D' },
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
  { stage: 'Idea', count: 8, color: '#FFB84D' },
  { stage: 'Draft', count: 5, color: '#FF9999' },
  { stage: 'Ready', count: 12, color: '#4ECDC4' },
  { stage: 'Posted', count: 24, color: '#4CAF50' },
  { stage: 'Analyzed', count: 18, color: '#833AB4' },
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
  const [editingId, setEditingId] = useState(null);

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
    console.log('Adding content:', newContent);
    setShowModal(false);
    setNewContent({ title: '', type: 'reel', caption: '', hashtags: '', status: 'draft', scheduledTime: '' });
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get posts planned this week
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
    <div className="calendar-container">
      <style>{`
        .calendar-container {
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
          grid-template-columns: 1fr 320px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        .calendar-card {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 2rem;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .month-year {
          color: #fff;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .nav-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .nav-button {
          background: #0a0a0a;
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

        .nav-button:hover {
          background: #833AB4;
          border-color: #833AB4;
          color: #fff;
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          background: #0a0a0a;
          border-radius: 6px;
          padding: 0.25rem;
        }

        .view-button {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 0.4rem 0.8rem;
          color: #999;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .view-button.active {
          background: #833AB4;
          border-color: #833AB4;
          color: #fff;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .day-header {
          text-align: center;
          color: #999;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.75rem 0;
        }

        .calendar-day {
          aspect-ratio: 1;
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          min-height: 80px;
        }

        .calendar-day:hover {
          border-color: #833AB4;
          background: #151530;
        }

        .calendar-day.empty {
          background: transparent;
          border: none;
          cursor: default;
        }

        .calendar-day.empty:hover {
          border: none;
          background: transparent;
        }

        .day-number {
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .day-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow-y: auto;
          font-size: 0.65rem;
        }

        .content-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 0.25rem;
        }

        .content-item-mini {
          padding: 0.25rem 0.4rem;
          border-radius: 3px;
          background: rgba(131, 58, 180, 0.2);
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-card {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .sidebar-card h3 {
          color: #fff;
          margin: 0 0 1rem 0;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sidebar-card h3 svg {
          color: #833AB4;
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #2a2a3e;
        }

        .stats-row:last-child {
          border-bottom: none;
        }

        .stats-label {
          color: #999;
          font-size: 0.9rem;
        }

        .stats-value {
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
        }

        .pipeline-bar {
          display: flex;
          gap: 0.25rem;
          margin-top: 1rem;
        }

        .pipeline-segment {
          flex: 1;
          height: 8px;
          border-radius: 4px;
          position: relative;
        }

        .theme-badge {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 6px;
          padding: 0.6rem 0.8rem;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #ccc;
        }

        .theme-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 0.5rem;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 12px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          color: #fff;
          margin: 0 0 1.5rem 0;
          font-size: 1.3rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          color: #fff;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
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

        .type-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .type-button {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 6px;
          padding: 0.75rem;
          color: #999;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          text-align: center;
        }

        .type-button:hover,
        .type-button.active {
          border-color: #833AB4;
          color: #fff;
        }

        .modal-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .button {
          flex: 1;
          background: linear-gradient(135deg, #E1306C, #833AB4);
          border: none;
          border-radius: 8px;
          padding: 0.75rem;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(131, 58, 180, 0.3);
        }

        .button-cancel {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          color: #ccc;
        }

        .button-cancel:hover {
          background: #252540;
        }

        .content-preview {
          background: #0a0a0a;
          border: 1px solid #2a2a3e;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .content-preview h4 {
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 0.95rem;
        }

        .content-preview p {
          color: #999;
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .icon-button {
          background: #1a1a2e;
          border: 1px solid #2a2a3e;
          border-radius: 4px;
          padding: 0.4rem;
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
      `}</style>

      <div className="header">
        <h1>📅 Content Calendar & Scheduler</h1>
        <p>Plan, schedule, and track your Instagram content</p>
      </div>

      <div className="main-grid">
        <div>
          <div className="calendar-card">
            <div className="calendar-header">
              <div className="month-year">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="view-toggle">
                  <button
                    className={`view-button ${viewMode === 'month' ? 'active' : ''}`}
                    onClick={() => setViewMode('month')}
                  >
                    Month
                  </button>
                  <button
                    className={`view-button ${viewMode === 'week' ? 'active' : ''}`}
                    onClick={() => setViewMode('week')}
                  >
                    Week
                  </button>
                </div>
                <div className="nav-buttons">
                  <button className="nav-button" onClick={prevMonth} title="Previous month">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="nav-button" onClick={nextMonth} title="Next month">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="calendar-grid">
              {days.map((day) => (
                <div key={day} className="day-header">
                  {day}
                </div>
              ))}

              {days_array.map((day, idx) => {
                const content = day ? getContentForDate(day) : [];
                return (
                  <div
                    key={idx}
                    className={`calendar-day ${!day ? 'empty' : ''}`}
                    onClick={() => {
                      if (day) {
                        setSelectedDate(day);
                        setShowModal(true);
                      }
                    }}
                  >
                    {day && (
                      <>
                        <div className="day-number">{day}</div>
                        <div className="day-content">
                          {content.map((c) => {
                            const typeInfo = getContentTypeInfo(c.type);
                            return (
                              <div key={c.id} className="content-item-mini" style={{ borderLeft: `3px solid ${typeInfo.color}` }}>
                                {typeInfo.emoji} {c.title.substring(0, 12)}
                              </div>
                            );
                          })}
                          {content.length === 0 && (
                            <div style={{ color: '#666', fontSize: '0.7rem', padding: '0.25rem' }}>
                              Click to add
                            </div>
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

        <div className="sidebar">
          {/* Stats Card */}
          <div className="sidebar-card">
            <h3>
              <CalendarDays size={18} />
              This Week
            </h3>
            <div className="stats-row">
              <span className="stats-label">Posts Planned</span>
              <span className="stats-value">{postsThisWeek.length}</span>
            </div>
            <div style={{ marginTop: '1rem', color: '#999', fontSize: '0.85rem' }}>
              <strong style={{ color: '#fff' }}>Type Distribution:</strong>
              <div style={{ marginTop: '0.5rem' }}>
                {Object.entries(typeDistribution).map(([type, count]) => {
                  const typeInfo = contentTypes.find((t) => t.id === type);
                  return count > 0 ? (
                    <div key={type} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span>{typeInfo.emoji}</span>
                      <span>{typeInfo.name}: {count}</span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {/* Content Pipeline */}
          <div className="sidebar-card">
            <h3>
              <Clock size={18} />
              Content Pipeline
            </h3>
            {contentPipeline.map((item) => (
              <div key={item.stage} className="stats-row">
                <span className="stats-label">{item.stage}</span>
                <span className="stats-value" style={{ color: item.color }}>
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
                    background: item.color,
                    flex: item.count / 10,
                  }}
                  title={`${item.stage}: ${item.count}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Recurring Themes */}
          <div className="sidebar-card">
            <h3>
              <Sparkles size={18} style={{ color: '#FFB84D' }} />
              Recurring Themes
            </h3>
            {recurringThemes.map((theme) => (
              <div key={theme.day} className="theme-badge">
                <span
                  className="theme-indicator"
                  style={{ background: theme.color }}
                ></span>
                <strong>{theme.day}:</strong> {theme.theme}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">Add Content - {monthNames[currentMonth]} {selectedDate}</h2>

            <div className="form-group">
              <label>Content Type</label>
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
              <label>Title</label>
              <input
                type="text"
                value={newContent.title}
                onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                placeholder="e.g., Morning Motivation Reel"
              />
            </div>

            <div className="form-group">
              <label>Caption</label>
              <textarea
                value={newContent.caption}
                onChange={(e) => setNewContent({ ...newContent, caption: e.target.value })}
                placeholder="Write your caption here..."
              />
            </div>

            <div className="form-group">
              <label>Hashtags</label>
              <input
                type="text"
                value={newContent.hashtags}
                onChange={(e) => setNewContent({ ...newContent, hashtags: e.target.value })}
                placeholder="#hashtag1 #hashtag2"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
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
              <label>Scheduled Time (Optional)</label>
              <input
                type="time"
                value={newContent.scheduledTime}
                onChange={(e) => setNewContent({ ...newContent, scheduledTime: e.target.value })}
              />
            </div>

            <div className="modal-buttons">
              <button className="button button-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="button" onClick={handleAddContent}>
                Add Content
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
