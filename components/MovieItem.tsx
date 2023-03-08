import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import { IMovie } from "../types/movie";
import styles from "../styles/movie.module.scss";
import { useRouter } from "next/router";
interface TrackItemProps {
  movieItem: IMovie;
}

export const TrackItem: FC<TrackItemProps> = ({ movieItem }) => {
  const router = useRouter();
  return (
    <Card sx={{ width: "95%", cursor: "pointer" }} onClick={() => router.push(`/movie/${movieItem.imdbID}`)}>
      <CardMedia sx={{ height: 250 }} image={movieItem.Poster} title={movieItem.Title} className={styles.poster} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movieItem.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movieItem.Year}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrackItem;
