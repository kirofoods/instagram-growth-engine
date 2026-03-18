/**
 * InsightsEngine — Generates real, data-driven insights from scraped Instagram data
 *
 * Input: User's real profile data (from Firestore) + optionally competitor data
 * Output: Page-specific insights, recommendations, and action items
 */

export class InsightsEngine {
  constructor(profileData, competitorData = []) {
    this.profile = profileData || {};
    this.competitors = competitorData;
    this.followers = Number(this.profile.followers) || 0;
    this.engagementRate = Number(this.profile.engagementRate) || 0;
    this.postsCount = Number(this.profile.postsCount) || 0;
    this.following = Number(this.profile.following) || 0;
    this.bio = this.profile.bio || '';
    this.isBusinessAccount = this.profile.isBusinessAccount || false;
  }

  // ======= DASHBOARD INSIGHTS =======
  getDashboardInsights() {
    const insights = [];

    // Engagement analysis
    if (this.engagementRate > 6) {
      insights.push(
        'Your engagement rate of ' +
          this.engagementRate +
          '% is excellent — well above the 3-6% industry average. Keep your current content strategy.'
      );
    } else if (this.engagementRate > 3) {
      insights.push(
        'Your ' +
          this.engagementRate +
          '% engagement rate is solid. To push above 6%, try more Reels and carousel posts which get 2x more engagement.'
      );
    } else if (this.engagementRate > 0) {
      insights.push(
        'Your ' +
          this.engagementRate +
          '% engagement rate is below the 3% benchmark. Focus on posting when your audience is active and use strong CTAs in captions.'
      );
    }

    // Follower/following ratio
    const ratio = this.followers > 0 ? this.following / this.followers : 0;
    if (ratio > 2) {
      insights.push(
        'You follow ' +
          this.following +
          ' accounts but have ' +
          this.followers +
          ' followers. Unfollow non-engaging accounts to improve your ratio — a healthy ratio is under 1.0.'
      );
    } else if (ratio < 0.5) {
      insights.push(
        'Great follower/following ratio. You follow ' +
          this.following +
          ' and have ' +
          this.followers +
          ' followers — this signals authority in your niche.'
      );
    }

    // Posting frequency
    if (this.postsCount < 10) {
      insights.push(
        'With only ' +
          this.postsCount +
          ' posts, you need more content. The algorithm favors accounts that post 4-7 times per week. Start with 3x/week and scale up.'
      );
    } else if (this.postsCount < 50) {
      insights.push(
        'You have ' +
          this.postsCount +
          ' posts. Keep building your content library — accounts with 100+ posts see significantly better discoverability.'
      );
    }

    // Growth phase insight
    if (this.followers < 1000) {
      insights.push(
        'At ' +
          this.followers +
          ' followers, you\'re in the Foundation phase. Focus on content pillars, consistent posting schedule, and engaging with 50+ accounts in your niche daily.'
      );
    } else if (this.followers < 10000) {
      insights.push(
        'With ' +
          this.followers +
          ' followers, you\'re ready to scale. Focus on Reels (they get 3x the reach), collaborations, and hashtag strategy.'
      );
    }

    // Competitor-based insights
    if (this.competitors.length > 0) {
      const avgCompFollowers =
        this.competitors.reduce((s, c) => s + (Number(c.followersCount || c.followers) || 0), 0) /
        this.competitors.length;
      if (avgCompFollowers > this.followers * 1.5) {
        insights.push(
          'Your competitors average ' +
            Math.round(avgCompFollowers).toLocaleString() +
            ' followers — ' +
            Math.round(avgCompFollowers / this.followers) +
            'x more than you. Study their top-performing content for format ideas.'
        );
      }
    }

    return insights;
  }

  // ======= ANALYTICS INSIGHTS =======
  getAnalyticsInsights() {
    return {
      estimatedReach: Math.round(this.followers * (this.engagementRate / 100) * 10),
      estimatedImpressions: Math.round(this.followers * (this.engagementRate / 100) * 25),
      estimatedProfileVisits: Math.round((this.followers * 0.02 * this.postsCount) / 10),
      estimatedWebsiteClicks: Math.round(this.followers * 0.005),
      reachGrowthRate:
        this.engagementRate > 3 ? '+' + (this.engagementRate * 2).toFixed(1) + '%' : '-' + (3 - this.engagementRate).toFixed(1) + '%',
      impressionGrowthRate: '+' + (this.engagementRate * 1.5).toFixed(1) + '%',
      topContentType: this.postsCount > 20 ? 'Carousel' : 'Reel',
      bestPostingTime: this.followers < 1000 ? '6-8 PM weekdays' : '12-2 PM and 6-8 PM',
      audienceInsight: this.isBusinessAccount
        ? 'Business accounts see 15% more reach from Reels vs static posts'
        : 'Switch to a Business account to unlock Instagram Insights for real analytics',
    };
  }

  // ======= CONTENT STRATEGY INSIGHTS =======
  getContentInsights() {
    const suggestions = [];

    if (this.followers < 1000) {
      suggestions.push({
        type: 'Reels',
        frequency: '5/week',
        reason: 'Reels get 3x organic reach — critical for discovery in the 0-1K phase',
      });
      suggestions.push({
        type: 'Carousels',
        frequency: '2/week',
        reason: 'Educational carousels drive saves (the #1 ranking signal) and establish expertise',
      });
      suggestions.push({
        type: 'Stories',
        frequency: 'Daily',
        reason: 'Stories maintain engagement with existing followers and build community',
      });
    } else {
      suggestions.push({
        type: 'Reels',
        frequency: '3-4/week',
        reason: 'Continue Reels for reach but focus more on quality over quantity',
      });
      suggestions.push({
        type: 'Carousels',
        frequency: '3/week',
        reason: 'Carousels drive the highest save rate — key for algorithm ranking',
      });
      suggestions.push({
        type: 'Collabs',
        frequency: '1/week',
        reason: 'Cross-pollinate audiences through collaborations with similar-sized accounts',
      });
    }

    return {
      suggestions,
      captionTip:
        this.engagementRate > 5
          ? 'Your captions are working well. Test longer storytelling captions (150+ words) to increase save rate.'
          : 'Start every caption with a hook. Use line breaks. End with a clear CTA (save, share, comment).',
      hashtagTip:
        this.followers < 5000
          ? 'Use 20-30 niche hashtags with 10K-500K posts. Avoid mega hashtags (1M+ posts) — you\'ll get buried.'
          : 'Mix 10 niche hashtags + 10 medium hashtags + 5 branded hashtags. Rotate sets to avoid shadowbanning.',
      postingSchedule:
        this.followers < 1000
          ? 'Post at 6 PM, 12 PM, and 9 AM IST — these are peak engagement times for Indian audiences.'
          : 'Your audience is established — test different times and track which gets best engagement.',
    };
  }

  // ======= SEO INSIGHTS =======
  getSeoInsights() {
    const bioScore = this.calculateBioScore();
    return {
      bioScore,
      bioSuggestions: this.getBioSuggestions(),
      keywordSuggestions: this.getKeywordSuggestions(),
      profileCompleteness: this.getProfileCompleteness(),
    };
  }

  calculateBioScore() {
    let score = 0;
    if (this.bio.length > 30) score += 15;
    if (this.bio.length > 80) score += 10;
    if (this.bio.includes('|') || this.bio.includes('•') || this.bio.includes('→')) score += 10; // Has formatting
    if (/https?:\/\//.test(this.bio) || this.bio.includes('link')) score += 10; // Has CTA/link mention
    if (/[\u{1F300}-\u{1F9FF}]/u.test(this.bio)) score += 10; // Has emoji
    if (this.bio.includes('\n')) score += 10; // Has line breaks
    if (this.profile.profilePicUrl) score += 15;
    if (this.isBusinessAccount) score += 10;
    if (this.profile.category) score += 10;
    return Math.min(score, 100);
  }

  getBioSuggestions() {
    const suggestions = [];
    if (this.bio.length < 80)
      suggestions.push('Your bio is only ' + this.bio.length + ' characters. Use all 150 characters to describe what you offer.');
    if (!/[\u{1F300}-\u{1F9FF}]/u.test(this.bio))
      suggestions.push('Add relevant emojis to make your bio scannable and visually appealing.');
    if (!this.bio.includes('\n'))
      suggestions.push('Use line breaks to organize your bio into clear sections (who you are, what you offer, CTA).');
    if (!/https?:\/\/|link|tap|click|DM/i.test(this.bio))
      suggestions.push('Add a clear call-to-action (CTA) like "DM for collabs" or "Link in bio" to drive engagement.');
    if (!this.isBusinessAccount)
      suggestions.push('Switch to a Business or Creator account to unlock Instagram Insights and contact buttons.');
    return suggestions;
  }

  getKeywordSuggestions() {
    // Based on the user's bio and niche, suggest keywords
    const words = this.bio.toLowerCase().split(/\s+/);
    const nicheKeywords = words.filter(
      (w) => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'your', 'will', 'been'].includes(w)
    );
    return nicheKeywords.slice(0, 10);
  }

  getProfileCompleteness() {
    let complete = 0;
    let total = 8;
    if (this.bio.length > 0) complete++;
    if (this.profile.profilePicUrl) complete++;
    if (this.profile.fullName) complete++;
    if (this.isBusinessAccount) complete++;
    if (this.profile.category) complete++;
    if (this.postsCount > 0) complete++;
    if (this.bio.includes('\n') || this.bio.includes('|')) complete++;
    if (/https?:\/\/|link|DM/i.test(this.bio)) complete++;
    return { complete, total, percentage: Math.round((complete / total) * 100) };
  }

  // ======= ACCOUNT HEALTH INSIGHTS =======
  getHealthScore() {
    let score = 0;
    const checks = [];

    if (this.bio.length > 30) {
      score += 12;
      checks.push({ label: 'Bio written', pass: true });
    } else checks.push({ label: 'Bio too short', pass: false });

    if (this.profile.profilePicUrl) {
      score += 12;
      checks.push({ label: 'Profile picture', pass: true });
    } else checks.push({ label: 'No profile picture', pass: false });

    if (this.postsCount > 10) {
      score += 12;
      checks.push({ label: 'Active posting', pass: true });
    } else checks.push({ label: 'Needs more posts (' + this.postsCount + '/10)', pass: false });

    if (this.isBusinessAccount) {
      score += 10;
      checks.push({ label: 'Business account', pass: true });
    } else checks.push({ label: 'Not a business account', pass: false });

    if (this.engagementRate > 3) {
      score += 15;
      checks.push({ label: 'Healthy engagement (' + this.engagementRate + '%)', pass: true });
    } else checks.push({ label: 'Low engagement (' + this.engagementRate + '%)', pass: false });

    if (this.profile.isVerified) {
      score += 10;
      checks.push({ label: 'Verified', pass: true });
    } else checks.push({ label: 'Not verified', pass: false });

    const ratio = this.followers > 0 ? this.following / this.followers : 999;
    if (ratio < 1.5) {
      score += 14;
      checks.push({ label: 'Healthy follow ratio', pass: true });
    } else checks.push({ label: 'Follow ratio too high (' + ratio.toFixed(1) + ')', pass: false });

    if (this.profile.category) {
      score += 8;
      checks.push({ label: 'Category set', pass: true });
    } else checks.push({ label: 'No category set', pass: false });

    if (this.profile.lastSynced) {
      score += 7;
      checks.push({ label: 'Recently synced', pass: true });
    } else checks.push({ label: 'Not synced', pass: false });

    return { score: Math.min(score, 100), checks };
  }

  // ======= HASHTAG INSIGHTS =======
  getHashtagInsights() {
    const nicheSize = this.followers < 1000 ? 'micro' : this.followers < 10000 ? 'small' : 'medium';
    return {
      recommendedCount: nicheSize === 'micro' ? '25-30' : nicheSize === 'small' ? '20-25' : '15-20',
      sizeDistribution:
        nicheSize === 'micro'
          ? { small: '60%', medium: '30%', large: '10%' }
          : { small: '40%', medium: '40%', large: '20%' },
      rotationTip: 'Create 5-6 hashtag sets and rotate them. Never use the same set twice in a row.',
      bannedWarning: 'Check each hashtag before using — Instagram regularly bans hashtags without notice.',
      nicheKeywords: this.getKeywordSuggestions(),
    };
  }

  // ======= GROWTH VELOCITY =======
  getGrowthProjection() {
    // Based on current engagement rate, estimate growth potential
    const dailyGrowthRate = this.engagementRate > 6 ? 0.005 : this.engagementRate > 3 ? 0.003 : 0.001;
    const monthlyGrowth = Math.round(this.followers * dailyGrowthRate * 30);

    return {
      estimatedMonthlyGrowth: monthlyGrowth,
      estimatedTimeToNextMilestone: this.getTimeToMilestone(),
      growthRate: (dailyGrowthRate * 100).toFixed(2) + '% daily',
      accelerators: this.getGrowthAccelerators(),
    };
  }

  getTimeToMilestone() {
    const milestones = [1000, 5000, 10000, 50000, 100000, 500000, 1000000];
    const nextMilestone = milestones.find((m) => m > this.followers) || 1000000;
    const gap = nextMilestone - this.followers;
    const dailyGrowthRate = this.engagementRate > 6 ? 0.005 : this.engagementRate > 3 ? 0.003 : 0.001;
    const dailyGrowth = Math.max(this.followers * dailyGrowthRate, 1);
    const daysToMilestone = Math.round(gap / dailyGrowth);

    return {
      milestone: nextMilestone,
      gap,
      estimatedDays: daysToMilestone,
      estimatedMonths: Math.round(daysToMilestone / 30),
    };
  }

  getGrowthAccelerators() {
    const accelerators = [];
    if (this.postsCount < 50)
      accelerators.push('Post more frequently — accounts posting 5+ times/week grow 3x faster');
    if (this.engagementRate < 3)
      accelerators.push('Improve engagement by replying to every comment within 1 hour');
    if (!this.isBusinessAccount)
      accelerators.push('Switch to Business account for insights and contact button');
    if (this.following > this.followers * 2)
      accelerators.push('Unfollow inactive accounts to improve your authority signal');
    accelerators.push('Create 3 Reels per week — Reels get 2-3x more reach than static posts');
    accelerators.push('Engage with 50 accounts in your niche daily (like + meaningful comment)');
    return accelerators;
  }
}
