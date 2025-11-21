'use client';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store';
import { RootState } from '@/src/lib/store';
import { fetchMedia } from '@/src/lib/store/slices/mediaSlice';
import { TrendingSection } from '@/src/components/section/TrendingSection';
import { MediaGrid } from '@/src/components/card/MediaGrid/MediaGrid';
import { useSearchParams } from 'next/navigation';
import styles from './styles.module.scss';
import { MediaCard } from '@/src/components/card/MediaCard/MediaCard';

export default function Trending() {
  const dispatch = useAppDispatch();
  const { recommended, loading, error } = useAppSelector((state: RootState) => state.media);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || ''; // Just reading from URL
  const { items } = useAppSelector((state) => state.media);
  
  const isSearching = searchQuery.length > 0;
  
  // Filter based on search
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchMedia());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className={styles.pageContent}>
      {isSearching ? (
        // Show search results
        <div className={styles.resultsSection}>
          <h1>Found {filteredItems.length} results for '{searchQuery}'</h1>
          <div className={styles.resultsGrid}>
            {filteredItems.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        // Show normal home page content
        <div className={styles.normalContent}>
          <section>
            <TrendingSection />
          </section>
          <section>
            <MediaGrid items={recommended} title="Recommended for you" />
          </section>
        </div>
      )}
    </div>
  );
};