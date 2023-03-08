import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/Search.module.scss";
import { useAppDispatch } from "../store/hooks";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { fetchUserById, setLoading } from "../store/slices/movieSlice";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const searchMovie = useDebounce((e: string) => {
    dispatch(fetchUserById(e));
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
    </Box>
  );
}
