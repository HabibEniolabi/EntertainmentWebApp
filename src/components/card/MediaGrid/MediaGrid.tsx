import React from 'react';
import { MediaCard } from '../MediaCard/MediaCard';
import { MediaItem } from '@/src/types';
import './styles.module.scss';

interface MediaGridProps {
  items: MediaItem[];
  title: string;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ items, title }) => {
  return (
    <section className="media-grid-section">
      <h2 className="section-title">{title}</h2>
      <div className="media-grid">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} variant="regular" />
        ))}
      </div>
    </section>
  );
};