import ApifyService from './apifyService';

/**
 * Syncs Instagram profile data from Apify to Firestore
 * @param {string} username - Instagram username (with or without @)
 * @param {string} apifyToken - Apify API token
 * @returns {Promise<Object>} Synced profile data
 */
export async function syncInstagramProfile(username, apifyToken) {
  if (!username || !apifyToken) {
    throw new Error('Username and Apify API token required');
  }

  const apify = new ApifyService(apifyToken);

  // Remove @ if present
  const cleanUsername = username.replace('@', '');

  // Scrape the Instagram profile
  const results = await apify.scrapeInstagramProfile(cleanUsername);

  if (!results || results.length === 0) {
    throw new Error('No profile data found for @' + cleanUsername);
  }

  const profileData = results[0];

  // Map Apify response to our Firestore schema
  const syncedProfile = {
    handle: cleanUsername,
    followers: profileData.followersCount || profileData.followers || 0,
    following: profileData.followingCount || profileData.following || 0,
    postsCount: profileData.postsCount || profileData.posts || 0,
    bio: profileData.biography || profileData.bio || '',
    fullName: profileData.fullName || profileData.name || '',
    profilePicUrl: profileData.profilePicUrl || profileData.profilePicUrlHD || '',
    isVerified: profileData.verified || false,
    isBusinessAccount: profileData.isBusinessAccount || false,
    category: profileData.businessCategoryName || '',
    engagementRate: calculateEngagementRate(profileData),
    lastSynced: new Date().toISOString(),
    syncSource: 'apify',
  };

  return syncedProfile;
}

/**
 * Calculate engagement rate from profile data
 * @param {Object} profile - Apify profile data
 * @returns {number} Engagement rate as percentage
 */
function calculateEngagementRate(profile) {
  // If Apify provides recent posts, calculate from those
  if (profile.latestPosts && profile.latestPosts.length > 0 && profile.followersCount > 0) {
    const totalEngagement = profile.latestPosts.reduce((sum, post) => {
      return sum + (post.likesCount || 0) + (post.commentsCount || 0);
    }, 0);
    const avgEngagement = totalEngagement / profile.latestPosts.length;
    return parseFloat(((avgEngagement / profile.followersCount) * 100).toFixed(2));
  }
  return 0;
}
