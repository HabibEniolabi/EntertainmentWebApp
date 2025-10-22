import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem, SearchState } from '../../../types';

const initialState: SearchState = {
  query: '',
  results: [],
  isSearching: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.isSearching = action.payload.length > 0;
    },
    setSearchResults: (state, action: PayloadAction<MediaItem[]>) => {
      state.results = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.isSearching = false;
    },
  },
});

export const { setSearchQuery, setSearchResults, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;