import { useAppSelector } from "../store/hooks";
import { Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import MoveItem from "./MovieItem";
import { useEffect, useState } from "react";
import styles from "../styles/movie.module.scss";
export const MovieList = () => {
  // const list = [
  //   {
  //     Title: "Captain Marvel",
  //     Year: "2019",
  //     imdbID: "tt4154664",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Ms. Marvel",
  //     Year: "2022",
  //     imdbID: "tt10857164",
  //     Type: "series",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BZmQ3OTZkNDUtNTU0Mi00ZjE4LTgyNTUtY2E4NWRmNDUxMzkyXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel One-Shot: Agent Carter",
  //     Year: "2013",
  //     imdbID: "tt3067038",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BZDIwZTM4M2QtMWFhYy00N2VmLWFlMjItMzI3NjBjYTc0OTMxXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel One-Shot: All Hail the King",
  //     Year: "2014",
  //     imdbID: "tt3438640",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BZGFkMTZkMDQtNzM4Yy00YWEwLTkzOWEtZTMyNDRlNmJhYWJhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel One-Shot: Item 47",
  //     Year: "2012",
  //     imdbID: "tt2247732",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjNlMzAxNmQtOGEwZi00NTEyLWI0NWYtMTlhNmE2YTA3ZDVhXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel One-Shot: A Funny Thing Happened on the Way to Thor's Hammer",
  //     Year: "2011",
  //     imdbID: "tt2011109",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYmVlYTg3N2QtMWM2OS00YWQyLWI2M2MtMDc0ZjBkZjk1MTY3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel One-Shot: The Consultant",
  //     Year: "2011",
  //     imdbID: "tt2011118",
  //     Type: "movie",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNGE4YjU5MDAtYzYzMC00M2RlLTk0NDgtNDU1MjgyMGI0MjI3XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel Studios: Legends",
  //     Year: "2021–",
  //     imdbID: "tt13650480",
  //     Type: "series",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMzdiNGVlZGYtMGY1Ni00OGU1LTlmYzEtZDBjYjk3OGM3YTNkXkEyXkFqcGdeQXVyNzk3NDUzNTc@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Marvel Studios: Assembled",
  //     Year: "2021–",
  //     imdbID: "tt14094206",
  //     Type: "series",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNWMyNWYyMmYtZjNiZi00MzFmLTg2MjYtYWEzZWY1MzBhY2I2XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //   },
  //   {
  //     Title: "Lego Marvel Super Heroes",
  //     Year: "2013",
  //     imdbID: "tt2620204",
  //     Type: "game",
  //     Poster: "https://m.media-amazon.com/images/M/MV5BOTA5ODA2NTI2M15BMl5BanBnXkFtZTgwNTcxMzU1MDE@._V1_SX300.jpg",
  //   },
  // ];
  const [isMounted, setIsMounted] = useState(false);
  const { movieItems, error, loading } = useAppSelector((state) => state.movie);
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
            <Grid xs={3} item container key={i}>
              <MoveItem movieItem={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default MovieList;
