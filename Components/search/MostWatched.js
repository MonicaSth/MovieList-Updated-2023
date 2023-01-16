import { getpopularMovies } from "../../shared/API";
import React, { useEffect, useState } from "react";
import classes from "./MostWatched.module.css";
import MovieList from "./MovieList";
import axios from "axios";

const MostWatched = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    getpopularMovies(page, { cancelToken: cancelToken.token })
      .then((res) => {
        setMovies(res.data.results);
        setLastPage(res.data.total_pages);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("canceled!");
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [page]);

  const handleNextPage = () => {
    const numberPage = page;
    setPage(numberPage + 1);
  };

  const handlePreviousPage = () => {
    const numberPage = page;
    setPage(numberPage - 1);
  };

  return (
    <div className={classes.component}>
      <h2 className={classes.title}>Popular movies</h2>
      {!movies && <p className={classes.title}>Loading..</p>}
      {movies && (
        <MovieList
          movies={movies}
          container="overflow"
          addButton="true"
          currentPage={page}
          lastPageNr={lastPage}
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
        />
      )}
    </div>
  );
};

export default MostWatched;
