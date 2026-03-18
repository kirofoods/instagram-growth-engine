import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Zap,
  TrendingUp,
  Calendar,
  Award,
  Star,
  Target,
  ChevronRight,
  Plus,
  Flame,
  Gift,
  Trophy,
  Lock,
  Camera,
  MessageCircle,
  Users,
  Search,
  Share2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import '../styles/DailyActions.css';

export default function DailyActions() {
  const [tasks, setTasks] = useState({
    content: [
      {
        id: 1,
        title: 'Post main feed content',
        description: 'Share 1 carousel or static post',
        points: 50,
        completed: false,
        category: 'content',
      },
      {
        id: 2,
        title: 'Post stories (min 3)',
        description: 'Share daily behind-the-scenes or tips',
        points: 30,
        completed: false,
        category: 'content',
      },
      {
        id: 3,
        title: 'Post reel',
        description: 'Short video content (under 60 seconds)',
        points: 100,
        completed: true,
        category: 'content',
      },
    ],
    engagement: [
      {
        id: 4,
        title: 'Leave 10+ meaningful comments',
        description: 'Target niche creators in your list',
        points: 40,
        completed: false,
        category: 'engagement',
      },
      {
        id: 5,
        title: 'Send 5 DMs',
        description: 'Start conversations with potential partners',
        points: 25,
        completed: true,
        category: 'engagement',
      },
      {
        id: 6,
        title: 'Reply to 15+ story mentions',
        description: 'Engage with your audience stories',
        points: 35,
        completed: false,
        category: 'engagement',
      },
      {
        id: 7,
        title: 'Like 50+ relevant posts',
        description: 'Spread engagement across accounts',
        points: 30,
        completed: false,
        category: 'engagement',
      },
    ],
    growth: [
      {
        id: 8,
        title: 'Research 5 collab accounts',
        description: 'Find potential partnership opportunities',
        points: 35,
        completed: false,
        category: 'growth',
      },
      {
        id: 9,
        title: 'Outreach to 2 creators',
        description: 'Send personalized DMs with collab ideas',
        points: 50,
        completed: true,
        category: 'growth',
      },
      {
        id: 10,
        title: 'Analyze top performing post',
        description: 'Study what worked and why',
        points: 25,
        completed: false,
        category: 'growth',
      },
      {
        id: 11,
        title: 'Update content calendar',
        description: 'Plan next 5 posts with themes',
        points: 30,
        completed: false,
        category: 'growth',
      },
    ],
  });

  const [streak, setStreak] = useState({
    current: 23,
    longest: 67,
    lastActivity: 'Today at 2:45 PM',
  });

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: '7-Day Content Blitz',
      description: 'Post every single day for 7 days',
      progress: 5,
      total: 7,
      reward: '500 XP + Badge',
      status: 'active',
      daysLeft: 2,
    },
    {
      id: 2,
      title: 'Engagement King',
      description: 'Leave 100 meaningful comments in one week',
      progress: 67,
      total: 100,
      reward: '300 XP + Title',
      status: 'active',
      daysLeft: 3,
    },
    {
      id: 3,
      title: 'DM Master',
      description: 'Start 50 conversations via DM',
      progress: 32,
      total: 50,
      reward: '250 XP',
      status: 'active',
      daysLeft: 7,
    },
  ]);

  const [upcomingChallenges] = useState([
    {
      id: 4,
      title: 'Reels Domination',
      description: 'Post 10 reels in 2 weeks',
      reward: '400 XP + Badge',
      startsIn: '2 days',
    },
    {
      id: 5,
      title: 'Story Streaker',
      description: 'Post stories every day for 30 days',
      reward: '1000 XP + Title',
      startsIn: '5 days',
    },
    {
      id: 6,
      title: 'Collab Master',
      description: 'Complete 5 collaborations',
      reward: '600 XP + Badge',
      startsIn: '1 week',
    },
  ]);

  const [milestones] = useState([
    {
      id: 1,
      milestone: '10,000 Followers',
      progress: 8500,
      target: 10000,
      reward: 'Verified Badge Unlock',
      icon: Trophy,
      status: 'in-progress',
    },
    {
      id: 2,
      milestone: '500k Total Reach',
      progress: 245000,
      target: 500000,
      reward: '1000 XP Bonus',
      icon: TrendingUp,
      status: 'in-progress',
    },
    {
      id: 3,
      milestone: '100 Posts',
      progress: 87,
      target: 100,
      reward: 'Content Creator Badge',
      icon: Camera,
      status: 'in-progress',
    },
  ]);

  const [unlockedMilestones] = useState([
    {
      id: 1,
      milestone: '1,000 Followers',
      unlockedDate: 'Mar 5, 2026',
      reward: 'Apprentice Creator Badge',
    },
    {
      id: 2,
      milestone: '5,000 Followers',
      unlockedDate: 'Mar 10, 2026',
      reward: 'Creator Badge',
    },
    {
      id: 3,
      milestone: '50 Posts',
      unlockedDate: 'Mar 12, 2026',
      reward: '200 XP Bonus',
    },
  ]);

  const weeklyGrowthData = [
    { day: 'Mon', growth: 45, target: 50, xp: 320 },
    { day: 'Tue', growth: 52, target: 50, xp: 380 },
    { day: 'Wed', growth: 48, target: 50, xp: 350 },
    { day: 'Thu', growth: 61, target: 50, xp: 420 },
    { day: 'Fri', growth: 58, target: 50, xp: 410 },
    { day: 'Sat', growth: 42, target: 50, xp: 290 },
    { day: 'Sun', growth: 38, target: 50, xp: 260 },
  ];

  const calculateGrowthScore = () => {
    let score = 0;
    let totalPoints = 0;

    Object.values(tasks).forEach((category) => {
      category.forEach((task) => {
        totalPoints += task.points;
        if (task.completed) {
          score += task.points;
        }
      });
    });

    return Math.round((score / totalPoints) * 100);
  };

  const calculateTotalPoints = () => {
    let total = 0;
    Object.values(tasks).forEach((category) => {
      category.forEach((task) => {
        if (task.completed) {
          total += task.points;
        }
      });
    });
    return total;
  };

  const toggleTask = (category, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const growthScore = calculateGrowthScore();
  const totalPoints = calculateTotalPoints();
  const level = Math.floor(totalPoints / 500) + 1;
  const levelProgress = ((totalPoints % 500) / 500) * 100;

  const TaskCategoryIcon = ({ category }) => {
    switch (category) {
      case 'content':
        return <Camera className="w-5 h-5" />;
      case 'engagement':
        return <MessageCircle className="w-5 h-5" />;
      case 'growth':
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
          <h1>Daily Growth Actions</h1>
        </div>
        <p>Complete daily tasks to unlock rewards and level up</p>
      </div>

      {/* Growth Score & Level */}
      <div className="grid grid-3 section">
        {/* Daily Growth Score */}
        <div className="card card-gradient">
          <div className="stat-label">Daily Growth Score</div>
          <div className="stat-value">{growthScore}</div>
          <div className="text-secondary text-sm">
            {growthScore >= 80
              ? 'Exceptional!'
              : growthScore >= 60
                ? 'Great progress'
                : 'Keep pushing'}
          </div>
          <div className="daily-score-footer">
            <div className="flex-between text-sm">
              <span className="text-secondary">Daily target</span>
              <span className="text-primary font-semibold">80/100</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill gradient-bg" style={{ width: '80%' }} />
            </div>
          </div>
        </div>

        {/* Level & XP */}
        <div className="card card-gradient">
          <div className="stat-label">Current Level</div>
          <div className="flex items-center gap-4">
            <div className="level-badge gradient-bg">
              <span>{level}</span>
            </div>
            <div>
              <div className="text-sm text-secondary">Level {level}</div>
              <div className="text-lg font-bold text-primary">{totalPoints.toLocaleString()} XP</div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill gradient-bg" style={{ width: `${levelProgress}%` }} />
          </div>
          <div className="text-sm text-muted">
            {Math.round(levelProgress)}% to Level {level + 1}
          </div>
        </div>

        {/* Streak */}
        <div className="card card-gradient">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5" style={{ color: 'var(--status-warning)' }} />
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-value" style={{ color: 'var(--status-warning)' }}>{streak.current}</div>
          <div className="text-secondary text-sm">days in a row</div>
          <div className="streak-footer">
            <div className="flex-between text-sm">
              <span className="text-secondary">Longest streak</span>
              <span className="text-primary font-semibold">{streak.longest} days</span>
            </div>
            <div className="flex-between text-sm">
              <span className="text-secondary">Last activity</span>
              <span className="text-primary font-semibold">{streak.lastActivity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Comparison */}
      <div className="card section">
        <h2 className="section-title">Your Growth This Week vs Target</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis dataKey="day" stroke="var(--text-muted)" />
            <YAxis stroke="var(--text-muted)" />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-primary)' }}
              labelStyle={{ color: 'var(--text-secondary)' }}
            />
            <Legend />
            <Bar dataKey="growth" fill="var(--color-primary)" name="Actual Growth" />
            <Bar dataKey="target" fill="var(--status-info)" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Today's Tasks */}
      <div className="section">
        <h2 className="section-title">Today's Tasks</h2>

        {/* Content Tasks */}
        <div className="task-section">
          <h3 className="task-category-title flex items-center gap-2">
            <Camera className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            Content ({tasks.content.filter((t) => t.completed).length}/{tasks.content.length})
          </h3>
          <div className="task-list">
            {tasks.content.map((task) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => toggleTask('content', task.id)}
              >
                <button className="focus:outline-none">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-positive" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={task.completed ? 'text-muted line-through font-medium' : 'text-primary font-medium'}>
                    {task.title}
                  </p>
                  <p className="text-secondary text-sm">{task.description}</p>
                </div>
                <div className="task-points">
                  <div className="font-bold text-primary">+{task.points}</div>
                  <div className="text-muted text-xs">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Tasks */}
        <div className="task-section">
          <h3 className="task-category-title flex items-center gap-2">
            <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
            Engagement ({tasks.engagement.filter((t) => t.completed).length}/{tasks.engagement.length})
          </h3>
          <div className="task-list">
            {tasks.engagement.map((task) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => toggleTask('engagement', task.id)}
              >
                <button className="focus:outline-none">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-positive" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={task.completed ? 'text-muted line-through font-medium' : 'text-primary font-medium'}>
                    {task.title}
                  </p>
                  <p className="text-secondary text-sm">{task.description}</p>
                </div>
                <div className="task-points">
                  <div className="font-bold text-primary">+{task.points}</div>
                  <div className="text-muted text-xs">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Tasks */}
        <div className="task-section">
          <h3 className="task-category-title flex items-center gap-2">
            <Users className="w-5 h-5" style={{ color: 'var(--status-info)' }} />
            Growth ({tasks.growth.filter((t) => t.completed).length}/{tasks.growth.length})
          </h3>
          <div className="task-list">
            {tasks.growth.map((task) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => toggleTask('growth', task.id)}
              >
                <button className="focus:outline-none">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-positive" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={task.completed ? 'text-muted line-through font-medium' : 'text-primary font-medium'}>
                    {task.title}
                  </p>
                  <p className="text-secondary text-sm">{task.description}</p>
                </div>
                <div className="task-points">
                  <div className="font-bold text-primary">+{task.points}</div>
                  <div className="text-muted text-xs">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="grid grid-2 section">
        {/* Active Challenges */}
        <div>
          <h2 className="section-title flex items-center gap-2">
            <Target className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            Active Challenges
          </h2>
          <div className="challenges-list">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="card"
              >
                <div className="flex-between items-start gap-2 mb-3">
                  <h3 className="text-primary font-bold">{challenge.title}</h3>
                  <span className="badge badge-warning">
                    {challenge.daysLeft}d left
                  </span>
                </div>
                <p className="text-secondary text-sm mb-4">{challenge.description}</p>

                <div className="mb-3">
                  <div className="flex-between text-sm mb-2">
                    <span className="text-secondary">Progress</span>
                    <span className="text-primary font-semibold">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill gradient-bg"
                      style={{
                        width: `${(challenge.progress / challenge.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="challenge-footer">
                  <span className="text-secondary text-sm">Reward: {challenge.reward}</span>
                  <button className="btn-ghost text-sm">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Challenges */}
        <div>
          <h2 className="section-title flex items-center gap-2">
            <Gift className="w-6 h-6" style={{ color: 'var(--color-secondary)' }} />
            Upcoming Challenges
          </h2>
          <div className="challenges-list">
            {upcomingChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="card"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <div className="flex-between items-start gap-2 mb-3">
                  <h3 className="text-secondary font-bold">{challenge.title}</h3>
                  <span className="badge badge-info">
                    {challenge.startsIn}
                  </span>
                </div>
                <p className="text-tertiary text-sm mb-4">{challenge.description}</p>
                <div className="flex-between items-center">
                  <span className="text-secondary text-sm">Reward: {challenge.reward}</span>
                  <Lock className="w-4 h-4 text-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="grid grid-2 section">
        {/* In Progress Milestones */}
        <div>
          <h2 className="section-title flex items-center gap-2">
            <Trophy className="w-6 h-6" style={{ color: 'var(--status-warning)' }} />
            Milestones
          </h2>
          <div className="milestones-list">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="card"
              >
                <div className="flex items-start gap-3 mb-3">
                  <milestone.icon className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--status-warning)' }} />
                  <div className="flex-1">
                    <h3 className="text-primary font-bold">{milestone.milestone}</h3>
                    <p className="text-secondary text-sm">Reward: {milestone.reward}</p>
                  </div>
                </div>

                <div className="flex-between text-sm mb-2">
                  <span className="text-secondary">Progress</span>
                  <span className="text-primary font-semibold">
                    {milestone.progress.toLocaleString()}/{milestone.target.toLocaleString()}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill gradient-bg"
                    style={{
                      width: `${(milestone.progress / milestone.target) * 100}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-muted mt-2">
                  {Math.round((milestone.progress / milestone.target) * 100)}% complete
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocked Milestones */}
        <div>
          <h2 className="section-title flex items-center gap-2">
            <Star className="w-6 h-6" style={{ color: 'var(--status-warning)' }} />
            Unlocked Milestones
          </h2>
          <div className="milestones-list">
            {unlockedMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="card"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5 text-positive" />
                  <div className="flex-1">
                    <h3 className="text-primary font-bold">{milestone.milestone}</h3>
                    <p className="text-secondary text-sm">{milestone.reward}</p>
                  </div>
                </div>
                <div className="text-muted text-xs">
                  Unlocked on {milestone.unlockedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
