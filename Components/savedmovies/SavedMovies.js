import React from "react";
import classes from "./SavedMovies.module.css";
import MovieItem from "./MovieItem";
import { useContext } from "react";
import { FavoriteContext } from "../../context/favorite-context";
import { Fragment } from "react";
import { Button } from "@material-ui/core";

const SavedMovies = (props) => {
  const favoriteCtx = useContext(FavoriteContext);
  const FavoriteItems = favoriteCtx.FavoriteItems;
  const handleDeleteAllMovies = favoriteCtx.deleteAllFavorites;

  function confirmation() {
    var result = window.confirm(
      "  🚨🚨 All saved movies will ve removed from watchlist 🚨🚨!!        Is this ok?"
    );
    if (result) {
      handleDeleteAllMovies();
    }
  }

  const containerclass =
    props.container === "overflow"
      ? classes.FavoritList
      : classes.FavoritListWr;

  return (
    <div className={classes.favorite}>
      <h2> Watchlist 🎥</h2>
      {FavoriteItems && FavoriteItems.length > 0 ? (
        <Fragment>
          <div className={containerclass}>
            {FavoriteItems.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </div>
          <div className={classes.deleteAll}>
            <Button onClick={confirmation}>Remove All</Button>
          </div>
        </Fragment>
      ) : (
        <p className={classes.FavoritList}>
          No saved movies, please search for movies and add some
        </p>
      )}
    </div>
  );
};

export default SavedMovies;
