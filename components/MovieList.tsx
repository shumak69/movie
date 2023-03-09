import { initialMovies } from "../store/slices/bookmarkSlice";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import styles from "../styles/movie.module.scss";
import MoveItem from "./MovieItem";
import { parseFromLS } from "@/utils";

interface MovieListProps {
  bookmark?: boolean;
}

export const MovieList: FC<MovieListProps> = ({ bookmark }) => {
  const { movieItems, error, loading } = useAppSelector((state) => state.movie);
  const { bookmarkedMovies } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const moviesFromLS = parseFromLS("bookmark");
    dispatch(initialMovies(moviesFromLS));
  }, []);
  console.log(bookmarkedMovies);
  if (bookmark && !bookmarkedMovies.length) {
    return <h1 className={styles.notFound}>You haven&apos;t added any bookmarks yet.</h1>;
  }
  if (bookmark) {
    return (
      <div>
        <Box paddingTop={5}>
          <Grid container flexWrap={"wrap"} rowGap={2}>
            {bookmarkedMovies.map((item, i) => (
              <Grid xs={12} sm={6} md={4} lg={3} item container key={i}>
                <MoveItem movieItem={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }
  if (loading) {
    return <h1 className={styles.notFound}>Loading...</h1>;
  }
  if (error) {
    return <h1 className={[styles.notFound, styles.error].join(" ")}>{error}</h1>;
  }
  if (!movieItems.length) {
    return <h1 className={styles.notFound}>Start typing in the search field to find the movies you need.</h1>;
  }

  return (
    <div>
      <Box paddingTop={5}>
        <Grid container flexWrap={"wrap"} rowGap={2}>
          {movieItems.map((item, i) => (
            <Grid xs={12} sm={6} md={4} lg={3} item container key={i}>
              <MoveItem movieItem={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default MovieList;
