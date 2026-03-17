import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minus, Send } from 'lucide-react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    'How do I increase my engagement rate?',
    "What's the best time to post?",
    'How does the Auto Ads Engine work?',
    'Explain my analytics dashboard',
    'Tips for going viral on Reels',
    'How to use hashtag sets effectively?',
  ];

  const responseMap = {
    engagement: "Great question! To increase your engagement rate, focus on these proven strategies: 1) Respond to ALL comments within the first hour of posting - this signals to Instagram's algorithm that your content is getting conversation. 2) Use interactive features like polls and questions in Stories to encourage responses. 3) Create carousel posts as they typically get 3x more engagement than single images. 4) Post consistently and engage with your audience's content too. Check out your Engagement section to see which post types perform best for your account!",

    'best time': "Timing matters! Our analytics show that the best time to post varies by account, but we've found that weekdays between 9am-11am and 7pm-9pm generally perform well. The key is that Instagram's algorithm prioritizes ENGAGEMENT over timing now. However, use your Analytics dashboard's 'Best Time to Post' grid to see when YOUR followers are most active. We analyze your audience's behavior and show you the optimal posting schedule. Post when your followers are most engaged!",

    'ads engine': "The Auto Ads Engine is one of KiroGram's most powerful features! Here's how it works: 1) It analyzes your top-performing organic posts and identifies which ones have viral potential. 2) Automatically creates optimized ad variations with different hooks and CTAs. 3) Runs A/B tests across different audience segments to find your best-converting audience. 4) Scales budgets to your winning ads while pausing underperformers. 5) Continuously optimizes based on ROAS and conversion data. All without you lifting a finger! You can monitor all campaigns in the Ads section and adjust parameters anytime.",

    analytics: "Your Analytics Dashboard breaks down Instagram's most important metrics: REACH - how many unique people saw your content, IMPRESSIONS - total views including repeats, ENGAGEMENT RATE - interactions divided by impressions, SAVES - super important for algorithmic reach, SHARES - the holy grail metric, and PROFILE VISITS - showing if content drives traffic to your bio. Focus on SAVES and SHARES as these have the biggest impact on reach. Track these metrics over time in your analytics to identify patterns in what resonates with your audience.",

    viral: "Going viral on Reels requires understanding what hooks work. Here's the formula: 1) First 3 seconds are CRITICAL - use pattern interrupts (quick cuts, bold text, surprising visuals). 2) Use trending audio - this is huge for algorithmic distribution. 3) Post consistently so Instagram learns your content style. 4) Engage authentically with other creator's Reels in your niche. 5) Ask questions or create cliffhangers in captions. 6) Use text overlays to keep people watching. Your Viral Lab section analyzes trending content and recommends formats that match your niche. Start there!",

    hashtag: "Our Hashtag System is game-changing! Here's how it works: 1) Create hashtag SETS (groupings of 20-30 related hashtags at different popularity levels). 2) Never use the same set twice in a row - rotation is key. 3) Our Banned Checker automatically flags hashtags that Instagram has shadowbanned so you never waste tags. 4) Performance Tracking shows you exactly which sets drive the most reach and engagement for YOUR content. 5) Use 20-30 hashtags per post (Instagram allows 30). The Hashtags section gives you all these tools plus recommendations for your niche.",

    default: "That's a great question! Let me help you with that. Based on your account's current phase, I'd recommend focusing on the fundamentals first. You can find detailed guides for every feature in the Guide section. Would you like me to explain any specific feature in more detail? I'm here to help you grow!",
  };

  const getResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('engagement') ||
      lowerMessage.includes('comment') ||
      lowerMessage.includes('interaction')
    ) {
      return responseMap.engagement;
    }
    if (
      lowerMessage.includes('best time') ||
      lowerMessage.includes('posting time') ||
      lowerMessage.includes('when to post')
    ) {
      return responseMap['best time'];
    }
    if (
      lowerMessage.includes('auto ad') ||
      lowerMessage.includes('ad engine') ||
      lowerMessage.includes('ads')
    ) {
      return responseMap['ads engine'];
    }
    if (
      lowerMessage.includes('analytics') ||
      lowerMessage.includes('dashboard') ||
      lowerMessage.includes('metric') ||
      lowerMessage.includes('reach') ||
      lowerMessage.includes('impression')
    ) {
      return responseMap.analytics;
    }
    if (
      lowerMessage.includes('viral') ||
      lowerMessage.includes('reels') ||
      lowerMessage.includes('trending')
    ) {
      return responseMap.viral;
    }
    if (
      lowerMessage.includes('hashtag') ||
      lowerMessage.includes('tags') ||
      lowerMessage.includes('set')
    ) {
      return responseMap.hashtag;
    }

    return responseMap.default;
  };

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(messageText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsThinking(false);
    }, 800 + Math.random() * 1200);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="chat-title">KiroGram AI Assistant</h3>
            <div className="chat-header-actions">
              <button
                className="chat-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize"
              >
                <Minus size={18} />
              </button>
              <button
                className="chat-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <div className="chat-empty-icon">
                  <MessageCircle size={32} />
                </div>
                <h4 className="chat-empty-title">Hi! I'm your AI Assistant</h4>
                <p className="chat-empty-text">
                  I can help you with insights, features, and strategy questions.
                </p>
                <div className="quick-questions">
                  {quickQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      className="quick-question-btn"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="bot-avatar">KG</div>
                    )}
                    <div className="message-bubble">
                      <p className="message-text">{msg.text}</p>
                      <span className="message-time">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="chat-message bot-message">
                    <div className="bot-avatar">KG</div>
                    <div className="message-bubble">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about features, insights, or strategy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isThinking) {
                  handleSendMessage();
                }
              }}
              disabled={isThinking}
            />
            <button
              className="chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={isThinking || !input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Open chat"
      >
        <MessageCircle size={24} />
        <span className="chat-badge">AI</span>
      </button>
    </div>
  );
};

export default ChatBot;
