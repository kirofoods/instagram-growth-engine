import { useState, useCallback, useMemo } from 'react';
import ApifyService from './apifyService';

export const useApify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Get token from localStorage (set via Settings page)
  const token = localStorage.getItem('kirogram-apify-token');
  const service = useMemo(() => token ? new ApifyService(token) : null, [token]);
  const isConfigured = !!token;

  const execute = useCallback(async (method, ...args) => {
    if (!service) {
      setError(new Error('Apify API token not configured. Go to Settings → API Keys.'));
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await service[method](...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [service]);

  return { execute, loading, error, data, isConfigured };
};
