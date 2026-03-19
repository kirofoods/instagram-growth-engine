import { useState, useEffect } from 'react';
import { getActiveProvider, setActiveProvider, getProviderToken, PROVIDERS, getFeatureProvider, setFeatureProvider, getRecommendedProvider } from '../services/aiProvider';

export default function AIProviderSelector({ featureId, onChange }) {
  const [active, setActive] = useState(featureId ? getFeatureProvider(featureId) : getActiveProvider());
  const recommended = featureId ? getRecommendedProvider(featureId) : null;

  const handleSelect = (provider) => {
    if (featureId) {
      setFeatureProvider(featureId, provider);
    } else {
      setActiveProvider(provider);
    }
    setActive(provider);
    if (onChange) onChange(provider);
  };

  return (
    <div className="ai-provider-selector">
      <span className="ai-provider-label">AI Provider:</span>
      <div className="ai-provider-buttons">
        {Object.entries(PROVIDERS).map(([key, info]) => {
          const hasKey = !!getProviderToken(key);
          const isRecommended = key === recommended;
          return (
            <button
              key={key}
              className={`ai-provider-btn ${active === key ? 'active' : ''} ${!hasKey ? 'no-key' : ''}`}
              onClick={() => handleSelect(key)}
              title={hasKey ? `${info.name}${isRecommended ? ' (Recommended for this feature)' : ''}` : `${info.name} — API key not set`}
            >
              {info.name}
              {isRecommended && <span className="ai-recommended-dot"></span>}
              {!hasKey && <span className="ai-provider-badge">!</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
