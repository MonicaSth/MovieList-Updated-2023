import React from "react";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth-context";

const BasicMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const AuthCtx = useContext(AuthContext);
  const isLoggedIn = AuthCtx.isLogedIn;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="basic">
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onBlur={handleClose}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          style: {
            backgroundColor: "#222",
            color: "white",
            height: "fit-content",
            maxHeight: "max-content",
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to="/latest" className="link">
            Now Playing
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/upcomming" className="link">
            Upcomming
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/top" className="link">
            Top rated
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/fav" className="link">
            Favorite
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {!isLoggedIn && (
            <NavLink to="/auth" className="link">
              Log in
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/profile" className="link">
              Profile
            </NavLink>
          )}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink to="/terms" className="link">
            Terms and conditions
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
