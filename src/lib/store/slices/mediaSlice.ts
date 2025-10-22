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
      const response = await fetch('http://localhost:3001/media');
      if (!response.ok) throw new Error('Failed to fetch media');
      return await response.json();
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
      state.items = action.payload;
      state.trending = action.payload.filter(item => item.isTrending);
      state.recommended = action.payload.filter(item => !item.isTrending);
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.map(item =>
        item.id === itemId ? { ...item, isBookmarked: !item.isBookmarked } : item
      );
      state.trending = state.trending.map(item =>
        item.id === itemId ? { ...item, isBookmarked: !item.isBookmarked } : item
      );
      state.recommended = state.recommended.map(item =>
        item.id === itemId ? { ...item, isBookmarked: !item.isBookmarked } : item
      );
    },
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

export const { setMedia, toggleBookmark } = mediaSlice.actions;
export default mediaSlice.reducer;