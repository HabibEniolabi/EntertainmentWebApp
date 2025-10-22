import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem, BookmarksState } from '../../../types';

const initialState: BookmarksState = {
  bookmarkedItems: [],
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<MediaItem>) => {
      const existingIndex = state.bookmarkedItems.findIndex(
        item => item.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.bookmarkedItems.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarkedItems = state.bookmarkedItems.filter(
        item => item.id !== action.payload
      );
    },
    toggleBookmark: (state, action: PayloadAction<MediaItem>) => {
      const existingIndex = state.bookmarkedItems.findIndex(
        item => item.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.bookmarkedItems.push(action.payload);
      } else {
        state.bookmarkedItems.splice(existingIndex, 1);
      }
    },
    setBookmarks: (state, action: PayloadAction<MediaItem[]>) => {
      state.bookmarkedItems = action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, toggleBookmark, setBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;