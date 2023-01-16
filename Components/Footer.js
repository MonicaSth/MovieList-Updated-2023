import { Typography } from "@material-ui/core";
import Link from "@mui/material/Link";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <section className={classes.footerDetail}>
        <div className={classes.fotmessage}>
          <Typography variant="h4">Movies🎥</Typography>
          <h2>Join the community!</h2>
        </div>
        <div className={classes.footCom}>
          <h2>COMMUNITY</h2>
          <Link
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </Link>
          <Link
            href="https://twitter.com/home?lang=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twiter
          </Link>
        </div>
        <div className={classes.footLegal}>
          <h2>LEGAL</h2>
          <ul>
            <li>
              <NavLink to="/terms">Terms and conditions</NavLink>
            </li>
            <li>
              <NavLink to="/terms">Privacy policy</NavLink>
            </li>
          </ul>
        </div>
      </section>
      <section className={classes.copyright}>
        @Copyright Monica Sth 2022
      </section>
    </div>
  );
};

export default Footer;
