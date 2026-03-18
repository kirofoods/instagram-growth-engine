// Apify API service for Instagram and Facebook scraping
const APIFY_BASE_URL = 'https://api.apify.com/v2';

class ApifyService {
  constructor(apiToken) {
    this.token = apiToken;
  }

  async runActor(actorId, input, options = {}) {
    const { waitForFinish = 120, memory = 256 } = options;
    const url = `${APIFY_BASE_URL}/acts/${actorId}/runs?token=${this.token}&waitForFinish=${waitForFinish}`;

    console.log('[Apify] Running actor:', actorId, 'with input:', JSON.stringify(input));

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('[Apify] Actor run failed:', response.status, errorText);
      throw new Error(`Apify error ${response.status}: ${errorText || response.statusText}`);
    }

    const result = await response.json();
    console.log('[Apify] Actor run result:', result?.data?.status, 'dataset:', result?.data?.defaultDatasetId);
    return result;
  }

  async getDatasetItems(datasetId, options = {}) {
    const { limit = 100, offset = 0, format = 'json' } = options;
    const url = `${APIFY_BASE_URL}/datasets/${datasetId}/items?token=${this.token}&limit=${limit}&offset=${offset}&format=${format}`;

    console.log('[Apify] Fetching dataset:', datasetId);

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('[Apify] Dataset fetch failed:', response.status, errorText);
      throw new Error(`Dataset fetch error ${response.status}: ${errorText || response.statusText}`);
    }

    const data = await response.json();
    console.log('[Apify] Dataset items:', data.length);
    return data;
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
    console.warn('[Apify] No dataset ID in run result');
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
