// Apify API service for Instagram and Facebook scraping
const APIFY_BASE_URL = 'https://api.apify.com/v2';

class ApifyService {
  constructor(apiToken) {
    this.token = apiToken;
  }

  async runActor(actorId, input, options = {}) {
    const { waitForFinish = 120, memory = 256 } = options;
    const response = await fetch(
      `${APIFY_BASE_URL}/acts/${actorId}/runs?token=${this.token}&waitForFinish=${waitForFinish}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, proxyConfiguration: { useApifyProxy: true } }),
      }
    );
    if (!response.ok) throw new Error(`Apify error: ${response.status}`);
    return response.json();
  }

  async getDatasetItems(datasetId, options = {}) {
    const { limit = 100, offset = 0, format = 'json' } = options;
    const response = await fetch(
      `${APIFY_BASE_URL}/datasets/${datasetId}/items?token=${this.token}&limit=${limit}&offset=${offset}&format=${format}`
    );
    if (!response.ok) throw new Error(`Dataset fetch error: ${response.status}`);
    return response.json();
  }

  // Instagram Profile Scraper
  async scrapeInstagramProfile(username) {
    const run = await this.runActor('apify/instagram-profile-scraper', {
      usernames: [username],
      resultsLimit: 1,
    });
    if (run?.data?.defaultDatasetId) {
      return this.getDatasetItems(run.data.defaultDatasetId);
    }
    return [];
  }

  // Instagram Posts Scraper
  async scrapeInstagramPosts(username, limit = 20) {
    const run = await this.runActor('apify/instagram-post-scraper', {
      username: [username],
      resultsLimit: limit,
    });
    if (run?.data?.defaultDatasetId) {
      return this.getDatasetItems(run.data.defaultDatasetId, { limit });
    }
    return [];
  }

  // Instagram Reels Scraper
  async scrapeInstagramReels(username, limit = 20) {
    const run = await this.runActor('apify/instagram-reel-scraper', {
      username: [username],
      resultsLimit: limit,
    });
    if (run?.data?.defaultDatasetId) {
      return this.getDatasetItems(run.data.defaultDatasetId, { limit });
    }
    return [];
  }

  // Instagram Hashtag Scraper
  async scrapeInstagramHashtag(hashtag, limit = 50) {
    const run = await this.runActor('apify/instagram-hashtag-scraper', {
      hashtags: [hashtag],
      resultsLimit: limit,
    });
    if (run?.data?.defaultDatasetId) {
      return this.getDatasetItems(run.data.defaultDatasetId, { limit });
    }
    return [];
  }

  // Instagram Search
  async searchInstagram(query, limit = 20) {
    const run = await this.runActor('apify/instagram-search-scraper', {
      search: query,
      resultsLimit: limit,
      searchType: 'hashtag',
    });
    if (run?.data?.defaultDatasetId) {
      return this.getDatasetItems(run.data.defaultDatasetId, { limit });
    }
    return [];
  }

  // Facebook Ads Library Scraper
  async scrapeFacebookAds(query, options = {}) {
    const { country = 'IN', limit = 50, adType = 'ALL' } = options;
    const run = await this.runActor('curious_coder/facebook-ads-library-scraper', {
      searchTerms: [query],
      country,
      adType,
      maxAds: limit,
    });
    if (run?.data?.defaultDatasetId) {
      return this.getDatasetItems(run.data.defaultDatasetId, { limit });
    }
    return [];
  }

  // Competitor Analysis — scrape multiple profiles
  async analyzeCompetitors(usernames) {
    const profiles = [];
    for (const username of usernames) {
      try {
        const data = await this.scrapeInstagramProfile(username);
        if (data.length > 0) profiles.push(data[0]);
      } catch (e) {
        console.error(`Failed to scrape ${username}:`, e);
      }
    }
    return profiles;
  }
}

export default ApifyService;
