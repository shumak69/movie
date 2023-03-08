import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box padding={3} className={styles.box} margin={2}>
          <SearchBar />
          <MovieList />
        </Box>
      </Container>
    </>
  );
}
