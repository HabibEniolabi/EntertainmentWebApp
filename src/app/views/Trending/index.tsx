import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { RootState } from '@/src/lib/store';
import { fetchMedia } from '@/src/lib/store/slices/mediaSlice';
import { TrendingSection } from '@/src/components/section/TrendingSection';
import { MediaGrid } from '@/src/components/card/MediaGrid/MediaGrid';

export default function Trending() {
  const dispatch = useAppDispatch();
  const { recommended, loading, error } = useAppSelector((state: RootState) => state.media);

  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-page">
      <TrendingSection />
      <MediaGrid items={recommended} title="Recommended for you" />
    </div>
  );
};