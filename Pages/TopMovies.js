import { getTopRatedMovies } from "../shared/API";
import { useEffect, useState } from "react";
import classes from "./Pages.module.css";
import MovieList from "../Components/search/MovieList";

const TopMovies = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    getTopRatedMovies(page)
      .then((res) => {
        setMovies(res.data.results);
        setLastPage(res.data.total_pages);
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response: " + error.response.data);
        } else if (error.request) {
          console.log("error request: " + error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log("error configuration" + error.config);
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
      <h2 className={classes.title}>Top Rated Movies</h2>
      {!movies && <p className={classes.title}>Loading..</p>}
      {movies && (
        <MovieList
          movies={movies}
          container="wraped"
          currentPage={page}
          lastPageNr={lastPage}
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
        />
      )}
    </div>
  );
};

export default TopMovies;
