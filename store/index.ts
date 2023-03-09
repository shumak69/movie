import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import bookmarkSlice from "./slices/bookmarkSlice";
import movieSlice from "./slices/movieSlice";

// create a slice
export const iconslice = createSlice({
  name: "icon",
  initialState: {
    icon: "moon",
  },
  reducers: {
    iconMoon: (state) => {
      state.icon = "moon";
    },
    iconSun: (state) => {
      state.icon = "sun";
    },
  },
});
// config the store
const store = configureStore({
  reducer: {
    icon: iconslice.reducer,
    movie: movieSlice,
    bookmark: bookmarkSlice,
  },
});

// export default the store
export default store;

// export the action
export const iconAction = iconslice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
