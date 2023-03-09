import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC, MouseEvent } from "react";
import { IMovie } from "../types/movie";
import styles from "../styles/movie.module.scss";
import { useRouter } from "next/router";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { initialMovies } from "../store/slices/bookmarkSlice";
interface TrackItemProps {
  movieItem: IMovie;
}

export const TrackItem: FC<TrackItemProps> = ({ movieItem }) => {
  const router = useRouter();
  const { bookmarkedMovies } = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();
  const changeBookmark = (e: MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedMovies.findIndex((item) => item.imdbID === movieItem.imdbID) !== -1) {
      dispatch(initialMovies(bookmarkedMovies.filter((item) => item.imdbID !== movieItem.imdbID)));
      localStorage.setItem(
        "bookmark",
        JSON.stringify(bookmarkedMovies.filter((item) => item.imdbID !== movieItem.imdbID))
      );
    } else {
      dispatch(initialMovies([...bookmarkedMovies, movieItem]));
      localStorage.setItem("bookmark", JSON.stringify([...bookmarkedMovies, movieItem]));
    }
  };

  return (
    <Card
      sx={{ width: "95%", cursor: "pointer", position: "relative" }}
      onClick={() => router.push(`/movie/${movieItem.imdbID}`)}
    >
      <CardMedia sx={{ height: 250 }} image={movieItem.Poster} title={movieItem.Title} className={styles.poster} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movieItem.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movieItem.Year}
        </Typography>
        <Button variant="outlined" onClick={changeBookmark} className={styles.bookmark}>
          {bookmarkedMovies.findIndex((item) => item.imdbID === movieItem.imdbID) !== -1 ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderIcon />
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrackItem;
