/**
 * Multi-AI Provider Service
 * Supports Claude (Anthropic), ChatGPT (OpenAI), and Gemini (Google)
 */

const PROVIDERS = {
  claude: {
    name: 'Claude',
    baseUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-sonnet-4-20250514',
  },
  chatgpt: {
    name: 'ChatGPT',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
  },
  gemini: {
    name: 'Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    model: 'gemini-2.0-flash',
  },
};

// Optimal AI provider per feature based on model strengths
export const FEATURE_DEFAULTS = {
  'content-studio': 'claude',      // Claude: better natural copy, tone matching
  'viral-reels': 'claude',         // Claude: creative punchy hooks
  'dm-funnels': 'claude',          // Claude: conversational flow design
  'strategy': 'claude',            // Claude: analytical reasoning
  'competitor-analysis': 'claude', // Claude: comparative analysis
  'seo-suite': 'chatgpt',         // ChatGPT: stronger SEO/keyword data
  'hashtags': 'chatgpt',          // ChatGPT: fast hashtag generation
  'ads': 'chatgpt',               // ChatGPT: direct-response ad copy
  'auto-ads': 'chatgpt',          // ChatGPT: ad creative optimization
  'chatbot': 'chatgpt',           // ChatGPT: faster Q&A responses
  'knowledge-base': 'chatgpt',    // ChatGPT: fast reference lookups
  'viral-lab': 'claude',          // Claude: creative hook analysis
  'calendar': 'claude',           // Claude: content planning
  'grid-planner': 'claude',       // Claude: visual strategy
  'account-health': 'claude',     // Claude: diagnostic analysis
  'analytics': 'chatgpt',         // ChatGPT: data interpretation
  'engagement': 'claude',         // Claude: community strategy
  'monetization': 'chatgpt',      // ChatGPT: pricing/deal analysis
  'trend-scanner': 'chatgpt',     // ChatGPT: trend pattern matching
};

export function getActiveProvider() {
  return localStorage.getItem('kirogram-ai-provider') || 'claude';
}

export function setActiveProvider(provider) {
  localStorage.setItem('kirogram-ai-provider', provider);
}

// Get the recommended provider for a specific feature
export function getRecommendedProvider(featureId) {
  return FEATURE_DEFAULTS[featureId] || 'claude';
}

// Get the active provider for a feature (user override takes priority)
export function getFeatureProvider(featureId) {
  if (!featureId) return getActiveProvider();
  const userOverride = localStorage.getItem('kirogram-ai-provider-' + featureId);
  if (userOverride) return userOverride;
  return getRecommendedProvider(featureId);
}

// Set a per-feature provider override
export function setFeatureProvider(featureId, provider) {
  if (featureId) {
    localStorage.setItem('kirogram-ai-provider-' + featureId, provider);
  }
}

export function getProviderToken(provider) {
  const key = provider || getActiveProvider();
  switch (key) {
    case 'claude': return localStorage.getItem('kirogram-claude-key');
    case 'chatgpt': return localStorage.getItem('kirogram-chatgpt-key');
    case 'gemini': return localStorage.getItem('kirogram-gemini-key');
    default: return null;
  }
}

export async function generateContent(prompt, options = {}) {
  const provider = options.provider || getActiveProvider();
  const token = getProviderToken(provider);

  if (!token) {
    throw new Error(`${PROVIDERS[provider]?.name || provider} API key not configured. Go to Settings → API Keys.`);
  }

  switch (provider) {
    case 'claude':
      return callClaude(prompt, token, options);
    case 'chatgpt':
      return callChatGPT(prompt, token, options);
    case 'gemini':
      return callGemini(prompt, token, options);
    default:
      throw new Error('Unknown AI provider: ' + provider);
  }
}

async function callClaude(prompt, token, options = {}) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': token,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: options.model || 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error('Claude API error: ' + response.status + ' ' + err);
  }

  const data = await response.json();
  return data.content?.[0]?.text || '';
}

async function callChatGPT(prompt, token, options = {}) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      model: options.model || 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.maxTokens || 1024,
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error('ChatGPT API error: ' + response.status + ' ' + err);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

async function callGemini(prompt, token, options = {}) {
  const model = options.model || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${token}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: options.maxTokens || 1024 },
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => '');
    throw new Error('Gemini API error: ' + response.status + ' ' + err);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export { PROVIDERS };
