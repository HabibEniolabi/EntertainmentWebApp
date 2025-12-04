// src/lib/store/slices/authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../../types'; // Assuming AuthState is here
import { auth } from '@/src/firebaseconfig'; // Import Firebase Auth
import { User, onAuthStateChanged } from 'firebase/auth'; 

const initialState: AuthState = {
  user: null, // Holds { uid: string, email: string }
  isAuthenticated: false,
  loading: true, // Start as loading until Firebase checks status
};

// -----------------------------------------
// ASYNC THUNK: Observing Firebase Auth State
// -----------------------------------------

// This thunk is designed to be dispatched once on app startup (e.g., in providers.tsx).
// It sets up a persistent listener for Firebase Auth changes.
export const initializeAuthListener = createAsyncThunk(
  'auth/initializeAuthListener',
  (_, { dispatch }) => {
    return new Promise<void>((resolve) => {
      // Set up the listener using Firebase SDK
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          // User is signed in. Dispatch the login success action.
          dispatch(setUser({
            uid: user.uid,
            email: user.email || 'N/A',
          }));
        } else {
          // User is signed out. Dispatch the logout action.
          dispatch(clearUser());
        }
        // Resolve the promise after the initial check is complete
        resolve();
      });
    });
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set user data upon successful login/observer update
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Action to clear user data upon logout/observer update
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    // Set loading state (e.g., during login API call)
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the initial state check from the observer
    builder.addCase(initializeAuthListener.fulfilled, (state) => {
      // The loading state is managed by the setUser/clearUser actions dispatched 
      // within the observer, but we ensure it's not 'true' after the initial check.
      if (state.loading === true) {
         state.loading = false; 
      }
    });
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;