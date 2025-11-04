import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem, MediaState } from '../../../types';

const initialState: MediaState = {
  items: [],
  trending: [],
  recommended: [],
  loading: false,
  error: null,
};

// Async thunk to fetch media from JSON Server
export const fetchMedia = createAsyncThunk(
  'media/fetchMedia',
  async (_, { rejectWithValue }) => {
    try {
      // FIX 1: Change URL to public folder
      const response = await fetch('/data.json');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // FIX 2: Add IDs to items that don't have them
      const dataWithIds = data.map((item: any, index: number) => ({
        ...item,
        id: item.id || `media-${index + 1}` // Generate ID if missing
      }));
      
      return dataWithIds;
      
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);


const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMedia: (state, action: PayloadAction<MediaItem[]>) => {
      const itemsWithIds = action.payload.map((item, index) => ({
        ...item,
        id: item.id || `media-${index + 1}`
      }));
      state.items = action.payload;
      state.trending = action.payload.filter(item => item.isTrending);
      state.recommended = action.payload.filter(item => !item.isTrending);
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const updateBookmark = (item: MediaItem) => 
        item.id === itemId ? { ...item, isBookmarked: !item.isBookmarked } : item;
      
      state.items = state.items.map(updateBookmark);
      state.trending = state.trending.map(updateBookmark);
      state.recommended = state.recommended.map(updateBookmark);

      // ✅ persist to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(state.items));
    },
    syncBookmarks: (state) => {
      const stored = localStorage.getItem('bookmarks');
      if (stored) {
        const saved = JSON.parse(stored);
        state.items = saved;
        state.trending = saved.filter((i: MediaItem) => i.isTrending);
        state.recommended = saved.filter((i: MediaItem) => !i.isTrending);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.trending = action.payload.filter((item: MediaItem) => item.isTrending);
        state.recommended = action.payload.filter((item: MediaItem) => !item.isTrending);
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setMedia, toggleBookmark, syncBookmarks } = mediaSlice.actions;
export default mediaSlice.reducer;