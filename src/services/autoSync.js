import ApifyService from './apifyService';

const SYNC_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes minimum between syncs

/**
 * Auto-sync Instagram profile data from Apify
 * Respects a 30-minute cooldown period to avoid excessive API calls
 * @returns {Promise<Object|null>} Synced profile data or null if not needed
 */
export async function autoSyncProfile() {
  const token = localStorage.getItem('kirogram-apify-token');
  const handle = localStorage.getItem('kirogram-handle');

  if (!token || !handle) {
    console.log('[AutoSync] Skipping - Apify token or handle not configured');
    return null; // Not configured
  }

  // Check cooldown
  const lastSync = localStorage.getItem('kirogram-last-sync');
  if (lastSync && Date.now() - parseInt(lastSync) < SYNC_COOLDOWN_MS) {
    console.log('[AutoSync] Skipping - synced recently');
    return null;
  }

  console.log('[AutoSync] Starting auto-sync for @' + handle);

  try {
    const apify = new ApifyService(token);
    const results = await apify.scrapeInstagramProfile(handle.replace('@', ''));

    if (!results || results.length === 0) {
      console.warn('[AutoSync] No data returned');
      return null;
    }

    const p = results[0];
    const profile = {
      handle: handle.replace('@', ''),
      followers: p.followersCount || p.followers || 0,
      following: p.followingCount || p.following || 0,
      postsCount: p.postsCount || p.posts || 0,
      bio: p.biography || p.bio || '',
      fullName: p.fullName || p.name || '',
      profilePicUrl: p.profilePicUrlHD || p.profilePicUrl || '',
      isVerified: p.verified || false,
      isBusinessAccount: p.isBusinessAccount || false,
      category: p.businessCategoryName || '',
      lastSynced: new Date().toISOString(),
      syncSource: 'apify-auto',
    };

    // Calculate engagement rate
    if (p.latestPosts && p.latestPosts.length > 0 && p.followersCount > 0) {
      const totalEng = p.latestPosts.reduce((sum, post) =>
        sum + (post.likesCount || 0) + (post.commentsCount || 0), 0);
      profile.engagementRate = parseFloat(
        ((totalEng / p.latestPosts.length / p.followersCount) * 100).toFixed(2)
      );
    } else {
      profile.engagementRate = 0;
    }

    // Save cooldown
    localStorage.setItem('kirogram-last-sync', String(Date.now()));

    console.log('[AutoSync] Success:', profile.followers, 'followers');
    return profile;
  } catch (err) {
    console.error('[AutoSync] Failed:', err.message);
    return null;
  }
}
