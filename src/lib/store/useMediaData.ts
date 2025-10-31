import { useAppSelector } from '../store';
import { RootState } from '../store';

export const useMediaData = () => {
  const { items } = useAppSelector((state: RootState) => state.media);
  
  const movies = items.filter(item => item.category === 'Movie');
  const tvSeries = items.filter(item => item.category === 'TV Series');
  const bookmarkedMovies = items.filter(item => 
    item.isBookmarked && item.category === 'Movie'
  );
  const bookmarkedTV = items.filter(item => 
    item.isBookmarked && item.category === 'TV Series'
  );

  return { 
    allItems: items, 
    movies, 
    tvSeries, 
    bookmarkedMovies, 
    bookmarkedTV 
  };
};