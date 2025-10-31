import React from 'react';
import { MediaCard } from '../MediaCard/MediaCard';
import { MediaItem } from '@/src/types';
import styles from './styles.module.scss';

interface MediaGridProps {
  items: MediaItem[];
  title: string;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ items, title }) => {
  return (
    <section className={styles.gridSection}>
      <h2 className={styles.gridTitle}>{title}</h2>
      <div className={styles.gridContainer}>
        {items.map((item) => (
          <MediaCard key={item.id} item={item} variant="regular" />
        ))}
      </div>
    </section>
  );
};