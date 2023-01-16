import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Authentication from "./Pages/Authentication";
import { useContext } from "react";
import { ThemeContext } from "./context/theme-context";
import { AuthContext } from "./context/Auth-context";
import Home from "./Pages/Home";

const Profile = React.lazy(() => import("./Pages/Profile"));
const NowPlaying = React.lazy(() => import("./Pages/NowPlaying"));
const Favorite = React.lazy(() => import("./Pages/Favorite"));
const Terms = React.lazy(() => import("./Pages/Terms"));
const TopMovies = React.lazy(() => import("./Pages/TopMovies"));
const Upcomming = React.lazy(() => import("./Pages/Upcomming"));
const MovieDetail = React.lazy(() => import("./Pages/MovieDetail"));

const App = () => {
  const themeCtx = useContext(ThemeContext);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    document.body.style.backgroundColor = themeCtx.themeIsLight
      ? "rgb(231, 231, 231)"
      : "#222";
    document.body.style.color = themeCtx.themeIsLight ? "black" : "white";
  }, [themeCtx]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="App">
            <p>Loading...</p>
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          {!AuthCtx.isLogedIn && (
            <Route path="/auth" exact>
              <Authentication />
            </Route>
          )}
          <Route path="/latest" exact>
            <NowPlaying />
          </Route>
          <Route path="/upcomming" exact>
            <Upcomming />
          </Route>
          <Route path="/top" exact>
            <TopMovies />
          </Route>
          <Route path="/fav" exact>
            <Favorite />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
          <Route path="/profile" exact>
            {AuthCtx.isLogedIn && <Profile />}
            {!AuthCtx.isLogedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/movie/:movieId" exact>
            <MovieDetail />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
