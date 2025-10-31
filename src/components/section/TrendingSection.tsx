import React from 'react';
import { useAppSelector } from '@/src/lib/store';
import { RootState } from '@/src/lib/store';
import { MediaCard } from '@/src/components/card/MediaCard/MediaCard';
import styles from './styles.module.scss';

export const TrendingSection: React.FC = () => {
  const { trending } = useAppSelector((state: RootState) => state.media);

  return (
    <section className={styles.trendingSection}>
      <h2 className={styles.trendingTitle}>Trending</h2>
      <div className={styles.trendingCarousel}>
        {trending.map((item) => (
          <MediaCard key={item.id} item={item} variant="trending" />
        ))}
      </div>
    </section>
  );
};