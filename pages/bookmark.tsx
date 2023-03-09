import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import MovieList from "../components/MovieList";
import styles from "../styles/Home.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Favorite Page</title>
        <meta name="description" content="Favorite page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Box padding={3} className={styles.box} margin={2}>
          <Button variant="outlined" onClick={() => router.push("/")}>
            <ArrowBackIcon />
          </Button>
          <MovieList bookmark />
        </Box>
      </Container>
    </>
  );
}
