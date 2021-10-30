import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/BasketSlice";
import drawerReducer from "../slices/DrawerSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    drawer: drawerReducer,
  },
});
