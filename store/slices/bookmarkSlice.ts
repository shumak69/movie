import { IMovie } from "../../types/movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IBookmarkedMovies {
  bookmarkedMovies: IMovie[];
}

const initialState: IBookmarkedMovies = {
  bookmarkedMovies: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    initialMovies(state, action: PayloadAction<IMovie[]>) {
      state.bookmarkedMovies = action.payload;
    },
  },
});

export const { initialMovies } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
