import { Button, Card, CardMedia, Container, Grid } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, Fragment } from "react";
import { IMovie, IMoviePage } from "../../types/movie";
import styles from "../../styles/moviePage.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, height } from "@mui/system";
interface MoviePageProps {
  movie: IMoviePage;
}

export const MoviePage: FC<MoviePageProps> = ({ movie }) => {
  const router = useRouter();

  return (
    <Container className={styles.container}>
      <Box gap={3} className={styles.wrapper}>
        <div className={styles.imgWrapper}>
          <img src={movie.Poster} alt={movie.Title} />
          <Button variant="contained" onClick={() => router.back()} className={styles.back}>
            Back
          </Button>
        </div>
        <div>
          <h1>{movie.Title}</h1>
          <h2>Released - {movie.Released}</h2>
          <div className={styles.textInfo}>
            Plot: <br /> <span>{movie.Plot}</span>
          </div>
          <div className={styles.textInfo}>
            Genre: <br /> <span>{movie.Genre}</span>
          </div>
          <div className={styles.textInfo}>
            Actors: <br /> <span>{movie.Actors}</span>
          </div>
          <div className={styles.textInfo}>
            Ratings: <br />{" "}
            <span>
              {movie.Ratings.map((rating, i) => (
                <Fragment key={i}>
                  <span>
                    <strong> Source:</strong> {rating.Source} <strong>Value:</strong> {rating.Value}
                  </span>
                  <br />
                </Fragment>
              ))}
            </span>
          </div>

          <div className={styles.textInfo}>
            Runtime: <br /> <span>{movie.Runtime}</span>
          </div>
          <div className={styles.textInfo}>
            Writer: <br /> <span>{movie.Writer}</span>
          </div>
          <div className={styles.textInfo}>
            Country: <br /> <span>{movie.Country}</span>
          </div>
          <div className={styles.textInfo}>
            Language: <br /> <span>{movie.Language}</span>
          </div>
          <div className={styles.textInfo}>
            Awards: <br /> <span>{movie.Awards}</span>
          </div>
          <div className={styles.textInfo}>
            BoxOffice: <br /> <span>{movie.BoxOffice || "No information"}</span>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default MoviePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let response = null;

  try {
    response = await axios.get<IMoviePage>("https://www.omdbapi.com/", {
      params: {
        i: params?.id,
        apikey: "59567eef",
      },
    });
  } catch (error) {
    console.error(error);
  }
  return {
    props: {
      movie: response ? response.data : null,
    },
  };
};
