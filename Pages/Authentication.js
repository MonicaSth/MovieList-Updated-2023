import { useState, useRef, useContext } from "react";
import classes from "./Pages.module.css";
import { AuthContext } from "../context/Auth-context";
import { useHistory } from "react-router-dom";

const Authentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setisLoginMode] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const AuthCtx = useContext(AuthContext);

  const toggleSing = () => {
    const isLogin = isLoginMode;
    setisLoginMode(!isLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsLoading(true);
    let url;
    if (isLoginMode) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKey}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        AuthCtx.login(data.idToken, expirationTime.toString(), enteredEmail);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.componentform}>
      <h2 className={classes.title}>{isLoginMode ? "Login" : "Sign Up"}</h2>
      <div className={classes.title}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.emailPass}>
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              ref={emailRef}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              ref={passwordRef}
            />
          </div>
          <div className={classes.emailPassSub}>
            {!isLoading && (
              <button className={classes.button} type="submit">
                {isLoginMode ? "Login" : "Sign Up"}
              </button>
            )}
            {isLoading && <p>Loading...</p>}

            <button
              className={classes.button}
              onClick={toggleSing}
              type="button"
            >
              Switch to {isLoginMode ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
