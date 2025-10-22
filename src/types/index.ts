export interface MediaItem {
  id: string;
  title: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: 'Movie' | 'TV Series';
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface MediaState {
  items: MediaItem[];
  trending: MediaItem[];
  recommended: MediaItem[];
  loading: boolean;
  error: string | null;
}

export interface BookmarksState {
  bookmarkedItems: MediaItem[];
}

export interface SearchState {
  query: string;
  results: MediaItem[];
  isSearching: boolean;
}

export interface UIState {
  sidebarOpen: boolean;
  currentView: 'home' | 'movies' | 'tv-series' | 'bookmarks';
}