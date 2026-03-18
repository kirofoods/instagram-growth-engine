import { useMemo } from 'react';
import { useDocument } from '../firebase/useFirestore';
import { InsightsEngine } from './insightsEngine';

export function useInsights() {
  const { data: profileData, loading } = useDocument('settings', 'profile');

  const engine = useMemo(() => {
    if (!profileData) return null;
    return new InsightsEngine(profileData);
  }, [profileData]);

  return {
    engine,
    profileData,
    loading,
    hasData: !!profileData && !!profileData.followers,
  };
}
