import React from "react";
import classes from "./MovieList.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../../context/favorite-context";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Fragment } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieList = (props) => {
  const [open, setOpen] = useState(false);
  const page = props.currentPage;
  const lastPage = props.lastPageNr;

  const favoriteCtx = useContext(FavoriteContext);
  const addMovie = (item) => {
    favoriteCtx.addToFavorites(item);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleNextPage = props.nextPage;

  const handlePreviousPage = props.previousPage;

  const containerclass =
    props.container === "overflow" ? classes.list : classes.listWraped;

  const listclass =
    props.container === "overflow" ? classes.listItem : classes.listItemWr;

  return (
    <Fragment>
      <div className={containerclass}>
        {props.movies.map((movie) => (
          <div className={listclass} key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                    : "https://www.almamater.ro/wp-content/uploads/2018/10/No-image-available.jpg"
                }
                alt={movie.title}
              />
            </Link>
            <span className={classes.tooltiptext}>See Details...</span>
            <div>
              <h5 className={classes.texth}>{movie.title}</h5>
              <div className={classes.ratindDate}>
                <h4 className={classes.textt}>{movie.release_date}</h4>
                <div className={classes.rating}>
                  {(Math.round(movie.vote_average * 10) / 10).toString()}
                </div>
              </div>
            </div>
            <Button
              id={movie.id}
              key={movie.id}
              className={classes.addMovie}
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                addMovie(movie);
              }}
            >
              + Watchlist
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert severity="success" sx={{ width: "100%", height: "auto" }}>
                Movie successfully added!
              </Alert>
            </Snackbar>
          </div>
        ))}
      </div>
      <div className={classes.page}>
        {page !== 1 && (
          <button onClick={handlePreviousPage}>◄ Previos page</button>
        )}
        <span>{page}</span>
        {page !== lastPage && (
          <button onClick={handleNextPage}>Next page ► </button>
        )}
      </div>
    </Fragment>
  );
};

export default MovieList;
