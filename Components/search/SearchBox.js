import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { searchMovies } from "../../shared/API";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./SearchBox.module.css";
import MovieList from "./MovieList";

const SearchBox = () => {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [movieNotFound, setMovieNotFound] = useState(false);
  const page = 1;

  const useStyles = makeStyles({
    input: {
      color: "gray",
    },
  });
  const classes = useStyles();

  const onSearchMovies = (term) => {
    setMovieNotFound(false);
    setLoading(true);
    searchMovies(term)
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
        setMovieNotFound(false);
        if (res.data.results.length === 0) {
          setMovieNotFound(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response: " + error.response.data);
        } else if (error.request) {
          console.log("error request: " + error.request);
        } else {
          console.log(error.message);
        }
        setErr(true);
        setLoading(false);
        setMovies(null);
        setMovieNotFound(null);
        console.log("error configuration" + error.config);
      });
    setTerm("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.searchd}>
        <div className={styles.box}>
          <TextField
            inputProps={{ className: classes.input }}
            className="text"
            label="Search for a movie"
            InputLabelProps={{
              style: { color: "gray" },
            }}
            variant="outlined"
            color="primary"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                onSearchMovies(term);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onSearchMovies(term);
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        {loading && <p>Loading..</p>}
        {!loading && err && (
          <p>Oh no! Something went wrong, please try again later.</p>
        )}
        {movieNotFound && !loading && (
          <p>No movies found with this name.. Please try another one!</p>
        )}
        {movies && (
          <MovieList
            movies={movies}
            container="overflow"
            currentPage={page}
            lastPageNr={page}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBox;
