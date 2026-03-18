# Competitor Analysis & Action Plan Feature

## Overview

The Competitor Analysis & Action Plan feature empowers KiroGram users to compare their Instagram profile metrics with competitors and receive AI-generated, actionable insights to stay ahead of the curve.

**Key Value Proposition**: Users can directly compare their profile analytics from Firestore with competitor profiles (scraped via Apify) and get a prioritized action plan tailored to close gaps and maximize growth.

## Feature Architecture

### 1. **CompetitorAnalysis Page** (`src/pages/CompetitorAnalysis.jsx`)

A comprehensive single-page component with 5 main sections:

#### Section 1: Hero & Your Profile Summary
- Displays user's current profile data from Firestore (`appData/settings` collection)
- Shows: @handle, followers, following, posts count, engagement rate
- Uses `useDocument('appData', 'settings')` hook to sync real-time data
- Beautiful gradient hero section with Instagram branding

#### Section 2: Add Competitors
- Simple input + button interface for adding competitor usernames
- Supports @handle or plain username format
- Loading state with spinner while scraping
- Displays which competitor is currently being analyzed

#### Section 3: Side-by-Side Comparison
- Responsive grid (3 columns on desktop → 1 on mobile)
- Compares 6 key metrics per competitor:
  - Followers count (with % difference: green if you're ahead, red if behind)
  - Following count
  - Posts count
  - Engagement rate
  - Posts per week estimate
  - Verified/Business account status
- Color coding:
  - **Green** = You're 10%+ ahead
  - **Red** = Competitor is 10%+ ahead
  - **Yellow** = Within 10% (similar)

#### Section 4: AI Action Plan
- Generates 7-8 actionable insights based on metric analysis
- Each insight includes:
  - **Category**: Growth, Engagement, Content, Profile, Strategy, Projection, Quick Wins
  - **Priority**: HIGH, MEDIUM, or LOW (color-coded)
  - **Title**: Concise problem statement
  - **Description**: Context and why it matters
  - **Actions**: 3 specific, implementable recommendations

Insight Types Generated:
1. **Follower Gap Analysis** - Identifies if you're behind competitors
2. **Engagement Rate Comparison** - Shows engagement performance gap
3. **Posting Frequency** - Recommends optimal posting cadence
4. **Bio & Profile Optimization** - Character count and CTA analysis
5. **Content Strategy** - Reel/Carousel/Story mix recommendations
6. **Growth Projection** - Estimates monthly growth rates
7. **Quick Wins** - Immediate actions with high ROI

#### Section 5: Data Management
- Displays empty state when no competitors added
- Ability to remove individual competitors with trash icon
- Auto-regenerates action plan when competitors change

### 2. **CSS Styling** (`src/styles/CompetitorAnalysis.css`)

Premium, theme-aware design with:
- **Hero Section**: Gradient background with glass morphism decorative elements
- **Comparison Cards**:
  - Your card: Highlighted with primary color border
  - Competitor cards: Hover effects, responsive grid layout
  - Glass morphism effects with backdrop filters
- **Insight Cards**:
  - Color-coded left borders by priority
  - Gradient backgrounds reflecting priority level
  - Smooth hover animations
- **Color Scheme**: All CSS variables used (supports light/dark themes)
- **Responsive**: Mobile-first design, tested down to 480px

### 3. **Integration Points**

#### Updated Files:
- **`src/App.jsx`**: Added route for `/competitor-analysis`
- **`src/components/Sidebar.jsx`**: Added "Competitor Intel" link in Grow section with Swords icon

#### Dependencies Used:
- `useDocument()` from `src/firebase/useFirestore.js` - Real-time Firestore sync
- `ApifyService` from `src/services/apifyService.js` - Instagram profile scraping
- Lucide React icons (Users, Plus, Trash2, ArrowUp, ArrowDown, etc.)
- Recharts for future chart integrations (imported but expandable)

## Data Flow

```
User Input (Instagram Username)
    ↓
handleAnalyzeCompetitor()
    ↓
ApifyService.scrapeInstagramProfile(username)
    ↓
Extract & normalize profile data
    ↓
Store in localStorage (kirogram-competitors)
    ↓
generateActionPlan(yourProfile, competitors)
    ↓
Render comparison cards & action plan
```

## LocalStorage Schema

**Key**: `kirogram-competitors`
**Value**: JSON array of competitor objects

```javascript
[
  {
    id: "username",
    username: "username",
    profileImage: "url",
    followers: 50000,
    following: 1234,
    postsCount: 256,
    bio: "Bio text",
    engagementRate: 4.5,
    isVerified: true,
    isBusinessAccount: true,
    monthlyGrowth: 2.8,
    scrapedAt: "2026-03-18T10:30:00.000Z"
  }
]
```

## Firestore Integration

**Collection**: `appData`
**Document**: `settings`
**Expected Profile Schema**:
```javascript
{
  profile: {
    handle: "@username",
    followers: 25000,
    following: 500,
    postsCount: 120,
    engagementRate: 5.2,
    bio: "Bio text",
    profileImage: "url",
    // ... other fields
  }
}
```

## Action Plan Algorithm

The `generateActionPlan()` function analyzes competitors and generates insights:

1. **Calculates averages**: followerCount, engagementRate, postsPerWeek
2. **Compares against your metrics**: Identifies gaps and strengths
3. **Generates targeted insights**:
   - If followers < 90% of average: HIGH priority growth insight
   - If engagement < 90% of average: HIGH priority engagement insight
   - If posting frequency too low: HIGH priority content insight
   - Otherwise: MEDIUM priority strategic insights
4. **Creates action items**: 3 specific, implementable recommendations per insight

## Apify Integration

**Token Storage**: `localStorage.getItem('kirogram-apify-token')`
**Scraper Used**: `apify/instagram-profile-scraper`
**Data Extracted**:
- followerCount
- followingCount
- postsCount
- biography
- profilePicUrl
- engagementRate (calculated or provided)
- isVerified
- isBusinessAccount

### Error Handling:
- Validates Apify token is configured before scraping
- Catches scraping errors with user-friendly alerts
- Handles missing/malformed profile data gracefully
- Prevents duplicate competitors (updates existing instead)

## Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| Desktop (>768px) | 3-column grid for comparisons, full width forms |
| Tablet (481-768px) | 2-column grid, stacked forms |
| Mobile (<480px) | 1-column grid, optimized touch targets |

## Key Features

1. **Real-time Profile Sync**: Your profile updates automatically from Firestore
2. **Persistent Competitors**: Saved in localStorage, persists across sessions
3. **Theme Awareness**: All colors use CSS variables (light/dark mode support)
4. **Loading States**: Visual feedback during API calls
5. **Error Recovery**: Graceful handling of failed scrapes
6. **Metric Comparison**: Visual indicators (arrows + percentages) for easy comparison
7. **Actionable Insights**: Prioritized recommendations, not just data
8. **Responsive Layout**: Works seamlessly on mobile, tablet, desktop

## Performance Considerations

- **LocalStorage**: Competitors cached locally, no repeated API calls
- **Lazy Loading**: Apify scraping happens on-demand (user-initiated)
- **Single Source**: Firestore profile synced once, not fetched repeatedly
- **Efficient Updates**: Only regenerates action plan when data changes

## Future Enhancements

1. **Growth Projection Chart**: Visualize 6-month forecast using Recharts
2. **Historical Tracking**: Store competitor snapshots over time
3. **Batch Analysis**: Analyze multiple competitors in parallel
4. **Export Reports**: Download action plan as PDF/CSV
5. **Competitor Groups**: Organize competitors by niche/category
6. **Alerts**: Notify when competitors exceed certain thresholds
7. **AI Recommendations**: Integration with Claude API for deeper insights
8. **Content Audit**: Analyze competitor content types and performance

## Testing Checklist

- [ ] Add competitor via username input
- [ ] View side-by-side comparison with your profile
- [ ] Verify color-coding (green/red/yellow) displays correctly
- [ ] Check action plan generates with 7-8 insights
- [ ] Verify insights have category, priority, title, description, actions
- [ ] Remove competitor and see action plan update
- [ ] Refresh page and verify competitors persist from localStorage
- [ ] Test on mobile/tablet responsive layout
- [ ] Verify Firestore profile data displays in "Your Profile" section
- [ ] Check error handling when Apify token missing
- [ ] Verify loading state during competitor analysis
- [ ] Test with dark/light theme toggling

## File Locations

| File | Purpose |
|------|---------|
| `src/pages/CompetitorAnalysis.jsx` | Main React component (370 lines) |
| `src/styles/CompetitorAnalysis.css` | Theme-aware styling (850+ lines) |
| `src/App.jsx` | Route registration (modified) |
| `src/components/Sidebar.jsx` | Navigation menu (modified) |

## Dependencies

- **React**: Core UI framework
- **Lucide React**: Icon library (26 icons used)
- **Firestore**: Real-time database for user profile
- **Apify**: Instagram profile scraping API
- **CSS Variables**: Theme support

## Error Scenarios Handled

1. **No Apify token configured**: Alert user to add token in Settings
2. **Competitor username not found**: User-friendly error message
3. **Apify API failure**: Catch and display error, allow retry
4. **Malformed localStorage data**: Graceful fallback to empty state
5. **Missing Firestore profile**: Shows empty state for your profile summary
