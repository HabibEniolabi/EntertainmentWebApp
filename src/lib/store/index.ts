import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './slices/mediaSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import searchReducer from './slices/searchSlice';
import uiReducer from './slices/uiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const makeStore = () => {
  return configureStore({
    reducer: {
      media: mediaReducer,
      bookmarks: bookmarksReducer,
      search: searchReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Create typed versions of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;