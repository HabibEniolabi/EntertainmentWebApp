import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../../../types';

const initialState: UIState = {
  sidebarOpen: false,
  currentView: 'home',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<UIState['currentView']>) => {
      state.currentView = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar, setCurrentView } = uiSlice.actions;
export default uiSlice.reducer;