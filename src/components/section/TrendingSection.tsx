import React from 'react';
import { useAppSelector } from '@/src/lib/store';
import { RootState } from '@/src/lib/store';
import { MediaCard } from '@/src/components/card/MediaCard/MediaCard';
import './styles.module.scss';

export const TrendingSection: React.FC = () => {
  const { trending } = useAppSelector((state: RootState) => state.media);

  return (
    <section className="trending-section">
      <h2 className="section-title">Trending</h2>
      <div className="trending-carousel">
        {trending.map((item) => (
          <MediaCard key={item.id} item={item} variant="trending" />
        ))}
      </div>
    </section>
  );
};