import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./MovieDetail.module.css";
import { getDetailesMovies } from "../shared/API";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SavedMovies from "../Components/savedmovies/SavedMovies";
import Recomandations from "../Components/search/Recomandations";
import VideoItem from "../Components/search/VideoMovies";
import { useContext } from "react";
import { FavoriteContext } from "../context/favorite-context";
import SimilarMovies from "../Components/search/SimilarMovies";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieDetail = () => {
  const params = useParams();
  const { movieId } = params;

  const [movie, setMovie] = useState([]);
  const [gender, setGender] = useState([]);
  const [open, setOpen] = useState(false);
  const [trailer, setTrailer] = useState(false);

  const favoriteCtx = useContext(FavoriteContext);
  const addMovie = (item) => {
    favoriteCtx.addToFavorites(item);
    setOpen(true);
  };

  useEffect(() => {
    getDetailesMovies(movieId).then((res) => {
      setMovie(res.data);
    });
  }, [movieId]);

  useEffect(() => {
    getDetailesMovies(movieId).then((res) => {
      setGender(res.data.genres);
    });
  }, [movieId]);

  const movieGenres = [];

  for (let i = 0, l = gender.length; i < l; i++) {
    movieGenres.push(gender[i].name);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const togglePlayer = () => {
    const video = trailer;
    setTrailer(!video);
  };

  const btnText = trailer === false ? "Play trailer" : "CloseTrailer";

  const backgroud = movie.backdrop_path
    ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
    : null;

  return (
    <div className={classes.movieDiv}>
      <div
        className={classes.movie}
        style={{
          backgroundImage: `${backgroud}`,
        }}
      >
        <div>
          <img
            className={classes.poster}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                : "https://www.almamater.ro/wp-content/uploads/2018/10/No-image-available.jpg"
            }
            alt={movie.title}
          />
          <div className={classes.addMoviediv}>
            <button
              id={movie.id}
              key={movie.id}
              className={classes.addMovie}
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                addMovie(movie);
              }}
            >
              + WATCHLIST
            </button>
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
            <button
              className={classes.addMovie}
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                togglePlayer();
              }}
            >
              {btnText}
            </button>
          </div>
        </div>
        {trailer ? (
          <VideoItem />
        ) : (
          <div className={classes.details}>
            <h2 className={classes.title}>{movie.title}</h2>
            <span className={classes.genre}>{movieGenres.join(", ")}</span>
            <span>{movie.release_date}</span>
            <div className={classes.ratingdiv}>
              <div className={classes.rating}>
                {Math.round((movie.vote_average * 10) / 10).toString()}
              </div>
              <span className={classes.span}> Vote average</span>
            </div>
            <span className={classes.overview}>{movie.tagline}</span>
            <span className={classes.overview}>{movie.overview}</span>
          </div>
        )}
      </div>
      <div
        onClick={() => {
          setTrailer(false);
        }}
      >
        <Recomandations />
        <SimilarMovies />
        <SavedMovies />
      </div>
    </div>
  );
};

export default MovieDetail;
