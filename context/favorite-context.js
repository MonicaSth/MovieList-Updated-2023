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
    const exists = movies.filter((item) => item.id === movie.id);

    if (movies.length > 0 && exists.length === 0) {
      setFavorites([...movies, movie]);
    } else if (movies.length > 0 && exists.length > 0) {
      return;
    } else {
      setFavorites([movie]);
    }
    window.localStorage.setItem("saved-movies", JSON.stringify(favorites));
  };

  const handleDeleteMovie = (movieId) => {
    const movies = favorites;
    setoOpenSnack(true);
    setTimeout(function () {
      setoOpenSnack(false);
    }, 2000);
    if (movies.length > 1) {
      setFavorites(movies.filter((item) => item.id !== movieId));
      window.localStorage.setItem("saved-movies", JSON.stringify(favorites));
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
