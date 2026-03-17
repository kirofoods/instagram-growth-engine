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
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8" style={{ color: '#E1306C' }} />
            <h1 className="text-4xl font-bold text-white">Daily Growth Actions</h1>
          </div>
          <p className="text-gray-400">Complete daily tasks to unlock rewards and level up</p>
        </div>

        {/* Growth Score & Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Daily Growth Score */}
          <div
            className="p-6 rounded-xl border border-gray-800"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-gray-400 text-sm mb-4">Daily Growth Score</div>
            <div className="text-5xl font-bold text-white mb-2">{growthScore}</div>
            <div className="text-gray-400 text-sm">
              {growthScore >= 80
                ? '🔥 Exceptional!'
                : growthScore >= 60
                  ? '✓ Great progress'
                  : '⚡ Keep pushing'}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Daily target</span>
                <span className="text-white font-semibold">80/100</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: '80%',
                    background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Level & XP */}
          <div
            className="p-6 rounded-xl border border-gray-800"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="text-gray-400 text-sm mb-4">Current Level</div>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)',
                }}
              >
                <span className="text-3xl font-bold text-white">{level}</span>
              </div>
              <div>
                <div className="text-sm text-gray-400">Level {level}</div>
                <div className="text-lg font-bold text-white">{totalPoints.toLocaleString()} XP</div>
              </div>
            </div>
            <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${levelProgress}%`,
                  background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {Math.round(levelProgress)}% to Level {level + 1}
            </div>
          </div>

          {/* Streak */}
          <div
            className="p-6 rounded-xl border border-gray-800"
            style={{ backgroundColor: '#1a1a2e' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-400" />
              <div className="text-gray-400 text-sm">Current Streak</div>
            </div>
            <div className="text-5xl font-bold text-orange-400 mb-2">{streak.current}</div>
            <div className="text-gray-400 text-sm mb-4">days in a row</div>
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Longest streak</span>
                <span className="text-white font-semibold">{streak.longest} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last activity</span>
                <span className="text-white font-semibold">{streak.lastActivity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Comparison */}
        <div
          className="p-6 rounded-xl border border-gray-800 mb-8"
          style={{ backgroundColor: '#1a1a2e' }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Your Growth This Week vs Target</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#252545', border: '1px solid #444' }}
                labelStyle={{ color: '#999' }}
              />
              <Legend />
              <Bar dataKey="growth" fill="#E1306C" name="Actual Growth" />
              <Bar dataKey="target" fill="#5ed8f8" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Today's Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Today's Tasks</h2>

          {/* Content Tasks */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" style={{ color: '#E1306C' }} />
              Content ({tasks.content.filter((t) => t.completed).length}/{tasks.content.length})
            </h3>
            <div className="space-y-3">
              {tasks.content.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition cursor-pointer"
                  style={{ backgroundColor: '#1a1a2e' }}
                  onClick={() => toggleTask('content', task.id)}
                >
                  <div className="flex items-center gap-3">
                    <button className="focus:outline-none">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          task.completed ? 'text-gray-400 line-through' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-gray-500 text-sm">{task.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-white">+{task.points}</div>
                      <div className="text-gray-400 text-xs">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Tasks */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" style={{ color: '#833AB4' }} />
              Engagement ({tasks.engagement.filter((t) => t.completed).length}/{tasks.engagement.length})
            </h3>
            <div className="space-y-3">
              {tasks.engagement.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition cursor-pointer"
                  style={{ backgroundColor: '#1a1a2e' }}
                  onClick={() => toggleTask('engagement', task.id)}
                >
                  <div className="flex items-center gap-3">
                    <button className="focus:outline-none">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          task.completed ? 'text-gray-400 line-through' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-gray-500 text-sm">{task.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-white">+{task.points}</div>
                      <div className="text-gray-400 text-xs">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Tasks */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: '#5ed8f8' }} />
              Growth ({tasks.growth.filter((t) => t.completed).length}/{tasks.growth.length})
            </h3>
            <div className="space-y-3">
              {tasks.growth.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition cursor-pointer"
                  style={{ backgroundColor: '#1a1a2e' }}
                  onClick={() => toggleTask('growth', task.id)}
                >
                  <div className="flex items-center gap-3">
                    <button className="focus:outline-none">
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          task.completed ? 'text-gray-400 line-through' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-gray-500 text-sm">{task.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-white">+{task.points}</div>
                      <div className="text-gray-400 text-xs">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Challenges */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" style={{ color: '#E1306C' }} />
              Active Challenges
            </h2>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-bold">{challenge.title}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: '#FFB5331F', color: '#FFB533' }}>
                      {challenge.daysLeft}d left
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white font-semibold">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(challenge.progress / challenge.total) * 100}%`,
                          background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-700 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Reward: {challenge.reward}</span>
                    <button
                      className="text-sm px-3 py-1 rounded transition hover:opacity-80"
                      style={{
                        backgroundColor: '#252545',
                        color: '#E1306C',
                      }}
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Challenges */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Gift className="w-6 h-6" style={{ color: '#833AB4' }} />
              Upcoming Challenges
            </h2>
            <div className="space-y-4">
              {upcomingChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition"
                  style={{ backgroundColor: '#0f0f1e' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-gray-300 font-bold">{challenge.title}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: '#5ed8f81F', color: '#5ed8f8' }}>
                      {challenge.startsIn}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{challenge.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Reward: {challenge.reward}</span>
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* In Progress Milestones */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6" style={{ color: '#FFB533' }} />
              Milestones
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <milestone.icon className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{milestone.milestone}</h3>
                      <p className="text-gray-400 text-sm">Reward: {milestone.reward}</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-semibold">
                      {milestone.progress.toLocaleString()}/{milestone.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ backgroundColor: '#0f0f1e' }}>
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${(milestone.progress / milestone.target) * 100}%`,
                        background: 'linear-gradient(90deg, #E1306C 0%, #833AB4 100%)',
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {Math.round((milestone.progress / milestone.target) * 100)}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unlocked Milestones */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6" style={{ color: '#FFD700' }} />
              Unlocked Milestones
            </h2>
            <div className="space-y-4">
              {unlockedMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition"
                  style={{ backgroundColor: '#1a1a2e' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold">{milestone.milestone}</h3>
                      <p className="text-gray-400 text-sm">{milestone.reward}</p>
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    🎉 Unlocked on {milestone.unlockedDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
