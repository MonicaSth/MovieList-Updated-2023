import React, { useState, useEffect } from "react";

export const FavoriteContext = React.createContext({
  FavoriteItems: [],
  addToFavorites: () => {},
  deleteFormFavorites: () => {},
  deleteAllFavorites: () => {},
  open: false,
});

const FavoriteContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [openSnack, setoOpenSnack] = useState(false);

  useEffect(() => {
    const movies = JSON.parse(window.localStorage.getItem("saved-movies"));

    if (movies && Array.isArray(movies)) {
      setFavorites(movies);
    } else {
      setFavorites([]);
    }
  }, []);

  const handleAddMovie = (movie) => {
    const movies = favorites;
    let actual;
    const exists = movies.filter((item) => item.id === movie.id);
    if (movies.length > 0 && exists.length === 0) {
      setFavorites([...movies, movie]);
      actual = [...movies, movie];
    } else if (movies.length > 0 && exists.length > 0) {
      return;
    } else if (movies.length === 0) {
      setFavorites([movie]);
      actual = [movie];
    }
    window.localStorage.setItem("saved-movies", JSON.stringify(actual));
  };

  const handleDeleteMovie = (movieId) => {
    const movies = favorites;
    let actual;
    setoOpenSnack(true);
    setTimeout(function () {
      setoOpenSnack(false);
    }, 2000);
    if (movies.length > 1) {
      setFavorites(movies.filter((item) => item.id !== movieId));
      actual = movies.filter((item) => item.id !== movieId);
      window.localStorage.setItem("saved-movies", JSON.stringify(actual));
    } else if (movies.length === 1) {
      setFavorites([]);
      window.localStorage.removeItem("saved-movies");
    }
  };

  const handleDeleteAllMovies = () => {
    setFavorites([]);
    window.localStorage.removeItem("saved-movies");
  };

  return (
    <FavoriteContext.Provider
      value={{
        addToFavorites: handleAddMovie,
        deleteFormFavorites: handleDeleteMovie,
        deleteAllFavorites: handleDeleteAllMovies,
        FavoriteItems: favorites,
        open: openSnack,
      }}
    >
      {props.children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
