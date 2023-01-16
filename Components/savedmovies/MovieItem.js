import React, { useState } from "react";
import { Button } from "@material-ui/core";
import TrashIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/StarOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styles from "./SavedMovies.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../../context/favorite-context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MovieItem = (props) => {
  const movie = props.movie;
  const favoriteCtx = useContext(FavoriteContext);
  const open = favoriteCtx.open;

  const deleteMovie = () => {
    favoriteCtx.deleteFormFavorites(movie.id);
  };

  const [ratings, setRatings] = useState([
    { id: 0, active: false, key: 0 },
    { id: 1, active: false, key: 1 },
    { id: 2, active: false, key: 2 },
    { id: 3, active: false, key: 3 },
    { id: 4, active: false, key: 4 },
  ]);

  const handleMouseOver = (item) => {
    const items = ratings.map((el, index) => {
      if (index <= item.id) {
        return Object.assign({}, { ...el }, { active: true });
      }
      return Object.assign({}, { ...el }, { active: false });
    });
    setRatings(items);
  };

  const stars = ratings.map((item, index) => {
    return (
      <StarIcon
        className={[styles.star, item.active && styles.active].join(" ")}
        onMouseOver={() => handleMouseOver(item)}
        key={index}
      />
    );
  });

  return (
    <div className={styles.movie_item} key={movie.id}>
      <div className={styles.movie_poster}>
        <Link
          to={`/movie/${movie.id}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://www.almamater.ro/wp-content/uploads/2018/10/No-image-available.jpg"
            }
            alt={movie.title}
          />
        </Link>
        <span className={styles.tooltiptext}>See Details...</span>
        <div className={styles.descriptiom}>
          <div className={styles.movie_title}>{movie.title}</div>
          <div className={styles.starRating}>
            <div className={styles.rating}>
              {Math.round(movie.vote_average * 10) / 10}
            </div>
            <div className={styles.star}>{stars}</div>
          </div>
          <div className={styles.button}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                deleteMovie();
              }}
            >
              <TrashIcon className={styles.trashButton} />
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={open}
              autoHideDuration={2000}
            >
              <Alert severity="info" sx={{ width: "100%", height: "auto" }}>
                Movie successfully removed from Favorites!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
