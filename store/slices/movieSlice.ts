import { IfetchMovies, IFetchQuery, IMovie } from "../../types/movie";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserBySearch = createAsyncThunk("movie/fetchBySearch", async (searchTitle: string, thunkAPI) => {
  try {
    const response = await axios.get("https://www.omdbapi.com/", {
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
export const fetchUserByPagination = createAsyncThunk(
  "movie/fetchByPagination",
  async (query: IFetchQuery, thunkAPI) => {
    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          s: query.searchTitle,
          apikey: "59567eef",
          page: query.page ? query.page : 1,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to load movies");
    }
  }
);

interface MovieState {
  movieItems: IMovie[];
  loading: boolean;
  error: string;
  totalCount: number;
}

const initialState: MovieState = {
  movieItems: [],
  loading: false,
  error: "",
  totalCount: 0,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserBySearch.fulfilled, (state, action: PayloadAction<IfetchMovies>) => {
      state.totalCount = Number(action.payload.totalResults);
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
    builder.addCase(fetchUserBySearch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchUserByPagination.fulfilled, (state, action: PayloadAction<IfetchMovies>) => {
      // state.totalCount = Number(action.payload.totalResult);
      // state.loading = false;
      if (action.payload.Search) {
        // state.movieItems = [];
        state.movieItems.push(...action.payload.Search);
        state.error = "";
      }
    });
  },
});

export const { setLoading } = movieSlice.actions;

export default movieSlice.reducer;
