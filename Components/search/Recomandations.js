import { getRecomandationsMovies } from "../../shared/API";
import { useEffect, useState } from "react";
import classes from "./MovieList.module.css";
import { useParams } from "react-router-dom";
import MovieList from "./MovieList";

const Recomandations = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);

  const params = useParams();
  const { movieId } = params;

  useEffect(() => {
    getRecomandationsMovies(movieId, page)
      .then((res) => {
        if (res.data.results) {
          setMovies(res.data.results);
          setLastPage(res.data.total_pages);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error response: " + error.response.data);
        } else if (error.request) {
          console.log("error request: " + error.request);
        } else {
          console.log("Error: " + error.message);
        }
      });
  }, [movieId, page]);

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
      <h2 className={classes.title}>Recomandations</h2>
      {!movies && <p className={classes.title}>Loading..</p>}
      {movies && movies.length !== 0 && (
        <MovieList
          movies={movies}
          container="overflow"
          currentPage={page}
          lastPageNr={lastPage}
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
        />
      )}
      {movies && movies.length === 0 && (
        <span>No other recomandeations for this movie 😥</span>
      )}
      {movies === null && (
        <span>No other recomandeations for this movie 😥</span>
      )}
    </div>
  );
};

export default Recomandations;
