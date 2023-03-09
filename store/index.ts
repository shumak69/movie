import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import bookmarkSlice from "./slices/bookmarkSlice";
import movieSlice from "./slices/movieSlice";

const store = configureStore({
  reducer: {
    movie: movieSlice,
    bookmark: bookmarkSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
