import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Search.module.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { fetchUserByPagination, fetchUserBySearch, setLoading } from "../store/slices/movieSlice";
import { useDebounce } from "../hooks/useDebounce";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(2);
  const { totalCount, movieItems } = useAppSelector((state) => state.movie);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) {
      console.log("fetching");
      try {
        dispatch(fetchUserByPagination({ searchTitle: searchValue, page }));
        setPage((prev) => prev + 1);
      } catch (error) {
        alert(error);
      } finally {
        setIsFetching(false);
      }
    }
  }, [isFetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [totalCount, movieItems]);

  const scrollHandler = () => {
    const documentElement = document.documentElement;
    console.log(movieItems.length, totalCount);
    if (
      documentElement.scrollHeight - (documentElement.scrollTop + window.innerHeight) < 100 &&
      movieItems.length < totalCount - 5
    ) {
      setIsFetching(true);
    }
  };

  const searchMovie = useDebounce((e: string) => {
    dispatch(fetchUserBySearch(e));
  }, 500);
  const onChangeSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
    dispatch(setLoading(true));
    searchMovie(e.target.value);
  };
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <div className={styles.wrapper}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          className={styles.search}
          value={searchValue}
          onChange={onChangeSearch}
        />
        <SearchIcon className={styles.seachIcon} />
      </div>
      <Button className={styles.bookmarked} variant="outlined" onClick={() => router.push("/bookmark")}>
        <BookmarkBorderIcon />
      </Button>
    </Box>
  );
}
