import React from 'react';
import { useAppDispatch } from '@/src/lib/store';
import { toggleBookmark } from '@/src/lib/store/slices/mediaSlice';
import { MediaItem } from '../../../types/index';
import styles from './styles.module.scss';
import PathBookmark from '@/src/assets/icons/PathBookmark';
import Movie from '@/src/assets/icons/Movie';
import TvSeries from '@/src/assets/icons/TvSeries';

interface MediaCardProps {
  item: MediaItem;
  variant?: 'regular' | 'trending';
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, variant = 'regular' }) => {
  const dispatch = useAppDispatch();

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleBookmark(item.id));
  };

  const getThumbnailSrc = () => {
    if (variant === 'trending' && item.thumbnail.trending) {
      return item.thumbnail.trending.large;
    }
    return item.thumbnail.regular.medium;
  };

  const getCategoryIcon = () => {
    return item.category === 'Movie' ? <Movie color={'#979797'} width={12} height={12}/> : <TvSeries color={'#979797'} width={12} height={12}/>;
  };

  return (
    <div className={`${styles.mediaCard} ${variant === 'trending' ? styles.trending : ''}`}>
      <div className={styles.imageContainer}>
        <img
          src={getThumbnailSrc()}
          alt={item.title}
          className={styles.image}
        />
        <button
          className={`${styles.bookmark} ${item.isBookmarked ? styles.bookmarked : ''}`}
          onClick={handleBookmark}
        >
          <PathBookmark className='stroke-white' fill={item.isBookmarked ? "currentColor" : "none"}/>
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.meta}>
          <span>{item.year}</span>
          <span>•</span>
          <span className="media-card__category">
            {getCategoryIcon()} {item.category}
          </span>
          <span>•</span>
          <span>{item.rating}</span>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
      </div>
    </div>
  );
};