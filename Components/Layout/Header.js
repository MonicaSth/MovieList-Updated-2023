import { React } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "./Header.css";
import CustomizedSwitches from "./CustomizedSwitches";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { NavLink } from "react-router-dom";
import BasicMenu from "./BasicMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth-context";

const HiddenOnScroll = (props) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {props.children}
    </Slide>
  );
};

const Header = () => {
  const AuthCtx = useContext(AuthContext);
  const isLoggedIn = AuthCtx.isLogedIn;

  return (
    <HiddenOnScroll>
      <AppBar position="sticky">
        <Toolbar className="headercl">
          <nav className="nav">
            <BasicMenu />
            <Typography variant="h4">
              <NavLink to="/">Movies🎥</NavLink>
            </Typography>

            <ul>
              <li>
                <NavLink to="/latest" activeClassName="active">
                  Now Playing
                </NavLink>
              </li>
              <li>
                <NavLink to="/upcomming" activeClassName="active">
                  Upcomming
                </NavLink>
              </li>
              <li>
                <NavLink to="/top" activeClassName="active">
                  Top rated
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={"switch"}>
            <nav className="nav">
              <ul>
                <li>
                  <NavLink to="/fav" activeClassName="active">
                    Watchlist
                  </NavLink>
                </li>
                {!isLoggedIn && (
                  <li>
                    <NavLink to="/auth" activeClassName="active">
                      Log in
                    </NavLink>
                  </li>
                )}
                {isLoggedIn && (
                  <li>
                    <NavLink to="/profile" activeClassName="active">
                      Profile
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
            <CustomizedSwitches />
          </div>
        </Toolbar>
      </AppBar>
    </HiddenOnScroll>
  );
};

export default Header;
