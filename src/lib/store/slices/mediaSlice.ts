import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MediaItem, MediaState } from '../../../types';
import { RootState } from '../../store';
import { loadBookmarks, addBookmarkToFirestore, removeBookmarkFromFirestore } from '@/src/firestoreHelpers';

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

export const syncBookmarks = createAsyncThunk(
  "media/syncBookmarks",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const uid = state.auth.user?.uid; // Now correctly accesses UID

    if (!uid) {
        console.warn("User not logged in. Cannot sync bookmarks from Firestore.");
        // This is not an error, just means we can't sync persistent data
        return []; 
    }

    try {
        return await loadBookmarks(uid); // Returns array of MediaItem IDs
    } catch (error) {
        return rejectWithValue("Failed to fetch persistent bookmarks.");
    }
  }
);


// -----------------------------------------
// 3. TOGGLE + SYNC THUNK (Write/Delete Operation)
// -----------------------------------------
export const toggleBookmarkAndSync = createAsyncThunk(
  "media/toggleBookmarkAndSync",
  async (item: MediaItem, { dispatch, getState }) => {
    // 1. Optimistic Update (Update Redux state immediately)
    dispatch(toggleBookmark(item.id));

    const state = getState() as RootState;
    const uid = state.auth.user?.uid;

    if (!uid) {
        console.warn("Bookmark persistence skipped: User not logged in.");
        return;
    }

    // 2. Check the new state after the optimistic update
    const isNowBookmarked = state.media.items.find(i => i.id === item.id)?.isBookmarked;

    try {
      if (isNowBookmarked) {
        await addBookmarkToFirestore(uid, item); // ADD
        console.log(`Successfully added bookmark ID: ${item.id}`)
      } else {
        await removeBookmarkFromFirestore(uid, item.id); // DELETE
        console.log(`Successfully removed bookmark ID: ${item.id}`);
      }
    } catch (error) {
      console.error("Failed to sync bookmark with Firestore:", error);
      // OPTIONAL: Dispatch a revert action here if persistence fails
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

      // 1. UPDATE THE STATE FIRST
      state.items = state.items.map(updateBookmark);
      state.trending = state.trending.map(updateBookmark);
      state.recommended = state.recommended.map(updateBookmark);

      
    },
    // syncBookmarks: (state) => {
    //   const stored = localStorage.getItem('bookmarks');
    //   if (stored) {
    //     const bookmarkedIds = JSON.parse(stored); // This is an array of IDs (strings)
    //     const bookmarkedIdSet = new Set(bookmarkedIds);

    //     // Function to apply the isBookmarked status based on the saved IDs
    //     const applyBookmarkStatus = (item: MediaItem) => ({
    //       ...item,
    //       isBookmarked: bookmarkedIdSet.has(item.id),
    //     });

    //     // Apply the bookmark status to all list items
    //     state.items = state.items.map(applyBookmarkStatus);
    //     state.trending = state.trending.map(applyBookmarkStatus);
    //     state.recommended = state.recommended.map(applyBookmarkStatus);
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncBookmarks.fulfilled, (state, action: PayloadAction<string[]>) => {
        const savedIds = new Set(action.payload || []); // Array of IDs from Firestore
        console.log("Redux Sync: IDs received from Firestore:", Array.from(savedIds));

        const applyBookmarkStatus = (item: MediaItem) => ({
          ...item,
          isBookmarked: savedIds.has(item.id),
        });

        // Apply the bookmark status to all lists
        state.items = state.items.map(applyBookmarkStatus);
        state.trending = state.trending.map(applyBookmarkStatus);
        state.recommended = state.recommended.map(applyBookmarkStatus);

        // 🟢 CRITICAL LOG: Check if any items were marked as bookmarked
        const count = state.items.filter(i => i.isBookmarked).length;
        console.log("Redux Sync: Total items marked as bookmarked:", count);
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
          state.loading = false;
          
          // 1. Set the fresh data
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