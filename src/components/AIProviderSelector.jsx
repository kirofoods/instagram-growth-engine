import { useState, useEffect } from 'react';
import { getActiveProvider, setActiveProvider, getProviderToken, PROVIDERS } from '../services/aiProvider';

export default function AIProviderSelector({ onChange }) {
  const [active, setActive] = useState(getActiveProvider());

  const handleSelect = (provider) => {
    setActiveProvider(provider);
    setActive(provider);
    if (onChange) onChange(provider);
  };

  return (
    <div className="ai-provider-selector">
      <span className="ai-provider-label">AI Provider:</span>
      <div className="ai-provider-buttons">
        {Object.entries(PROVIDERS).map(([key, info]) => {
          const hasKey = !!getProviderToken(key);
          return (
            <button
              key={key}
              className={`ai-provider-btn ${active === key ? 'active' : ''} ${!hasKey ? 'no-key' : ''}`}
              onClick={() => handleSelect(key)}
              title={hasKey ? info.name : `${info.name} — API key not set`}
            >
              {info.name}
              {!hasKey && <span className="ai-provider-badge">!</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
