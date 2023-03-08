import { IfetchMovies, IMovie } from "../../types/movie";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserById = createAsyncThunk("movie/fetchBySearch", async (searchTitle: string, thunkAPI) => {
  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        s: searchTitle,
        apikey: "59567eef",
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to load movies");
  }
});

interface MovieState {
  movieItems: IMovie[];
  loading: boolean;
  error: string;
}

const initialState: MovieState = {
  movieItems: [],
  loading: false,
  error: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setLoading(state, payload: PayloadAction<boolean>) {
      state.loading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.Search) {
        state.movieItems = [];
        state.movieItems.push(...action.payload.Search);
        state.error = "";
      } else {
        state.movieItems = [];
        state.error = "Movies are not found";
      }
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setLoading } = movieSlice.actions;

export default movieSlice.reducer;
