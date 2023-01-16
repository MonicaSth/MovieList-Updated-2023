import { useState, useRef, useContext, useEffect } from "react";
import React from "react";
import classes from "./Pages.module.css";
import { AuthContext } from "../context/Auth-context";
import { useHistory } from "react-router-dom";
import { FavoriteContext } from "../context/favorite-context";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const [change, setCahnge] = useState(false);
  const passwordRef = useRef();
  const AuthCtx = useContext(AuthContext);
  const FavoriteCtx = useContext(FavoriteContext);
  const [passwordChanged, setpasswordChanged] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [posted, setPosted] = useState(false);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openReceived, setOpenReceived] = useState(false);
  const [OpenError, setOpenError] = useState(false);
  const [OpenErrorDb, setOpenErrorDb] = useState(false);
  const [receivedData, setReceivedData] = useState([]);

  const user = AuthCtx.user;
  let userName;
  if (user) {
    userName = user.substring(0, user.lastIndexOf("@"));
  }

  const changePassword = () => {
    const actual = change;
    setCahnge(!actual);
    setpasswordChanged(false);
    setPosted(false);
    setErrorPassword(false);
  };

  let message = "";
  if (!change && !passwordChanged && !posted && !errorPassword) {
    message = `Hello ${userName} please select the prefered task!`;
  } else if (change && !passwordChanged) {
    message = "Please type your new password";
  } else if (passwordChanged) {
    message = "Password changed!";
  } else if (posted) {
    message =
      "Movies Saved on the database 👍!  If you accidentaly loose all your watchlist, you can take it bake from the database😊";
  } else if (errorPassword) {
    message = "An error occured! Please retry!";
  }

  const logOutHandler = () => {
    AuthCtx.logout();
    history.replace("/");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredNewPassword = passwordRef.current.value;
    let response;
    try {
      response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDMxLSQzPRLTp-xiuzzzaNy1kYLc--S5cg",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: AuthCtx.token,
            password: enteredNewPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "aplication/json",
          },
        }
      );
    } catch (error) {
      console.log("there was an error");
    }
    if (response?.ok) {
      setpasswordChanged(true);
      setCahnge(false);
    } else {
      setErrorPassword(true);
      setCahnge(false);
    }
  };

  const movies = JSON.parse(window.localStorage.getItem("saved-movies"));

  async function postMovies(movies) {
    if (movies) {
      const response = await fetch(
        `https://movie-list-8ee11-default-rtdb.europe-west1.firebasedatabase.app/movies/${userName}.json`,
        {
          method: "POST",
          body: JSON.stringify(movies),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (Boolean(data)) {
        setPosted(true);
        setOpen(true);
      }
    } else {
      setOpenError(true);
    }
  }

  async function getMoviesFromDB() {
    setErrorPassword(false);
    const response = await fetch(
      `https://movie-list-8ee11-default-rtdb.europe-west1.firebasedatabase.app/movies/${userName}.json`
    );
    if (!response.ok) {
      throw new Error("Something went Wrong!");
    }
    const data = await response.json();
    if (data) {
      setOpenReceived(true);
      setReceivedData(Object.values(data));
    } else {
      setOpenErrorDb(true);
    }
  }

  useEffect(() => {
    if (receivedData && receivedData.length > 0) {
      const newMovies = receivedData[receivedData.length - 1];
      newMovies.forEach((element) => {
        FavoriteCtx.addToFavorites(element);
      });
    }
  }, [receivedData, FavoriteCtx]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenReceived(false);
    setOpenError(false);
    setOpenErrorDb(false);
  };

  return (
    <div className={classes.componentform}>
      <h2 className={classes.title}>Wellcome {userName}!</h2>
      <span className={classes.span}>{message}</span>
      {!change && (
        <div className={classes.emailPass}>
          <button
            className={classes.button}
            onClick={() => {
              postMovies(movies);
            }}
          >
            Copy movies on database
          </button>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={!movies ? OpenError : open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              severity={!movies ? "error" : "success"}
              sx={{ width: "100%", height: "auto" }}
            >
              {!movies
                ? "There are no movies in watchlist! please add some first!"
                : "Movie successfully copied in database!"}
            </Alert>
          </Snackbar>
          <button
            className={classes.button}
            onClick={() => {
              getMoviesFromDB();
            }}
          >
            Get movies from DataBase
          </button>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={
              !receivedData || receivedData.length === 0
                ? OpenErrorDb
                : openReceived
            }
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              severity={
                !receivedData || receivedData.length === 0 ? "error" : "success"
              }
              sx={{ width: "100%", height: "auto" }}
            >
              {!receivedData || receivedData.length === 0
                ? "There are no movies saved in database! please add some first, and save them!!"
                : " Movie added to your watchlist from database!"}
            </Alert>
          </Snackbar>
        </div>
      )}
      {change && (
        <div className={classes.emailPass}>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.form}>
              <label htmlFor="password">New password</label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                ref={passwordRef}
              />
            </div>
            <div className={classes.emailPassSub}>
              <button className={classes.button} type="submit">
                Change Password!
              </button>
              <button className={classes.button} onClick={changePassword}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={classes.logout}>
        {!change && (
          <div>
            <button className={classes.button} onClick={changePassword}>
              Change Password
            </button>
          </div>
        )}
        <button className={classes.button} onClick={logOutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Profile;
