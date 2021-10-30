import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsDrawerOpen } = drawerSlice.actions;

export const selectDrawerState = (state) => state.drawer.isOpen;

export default drawerSlice.reducer;
