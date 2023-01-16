import { Fragment } from "react";
import classes from "./Pages.module.css";

const Terms = () => {
  return (
    <Fragment>
      <div className={classes.component}>
        <h2>Terms and conditions</h2>
        <span>
          Wellcome to movie app!
          <br />
          <br />
          You can use the application to search for different movies and to
          create your own watchlist saved for you on your local storage
          <br />
          If you want to save the watchlist on a database, to prevent loosing
          your watchlist by mistake, you can create an account with an email
          adress, and save the watchlist from there😊💾. After you save it, you
          can bring them back anytime
          <br />
          <br />
          By clicking on the image of the movies it will take you to the detail
          page, where you find more details about the movie you selected, and
          there you can see the movie trailer▶️
          <br />
          From there you can see similar movies and recomandations according to
          the movie selected 😊🎥
          <br />
          <br />
          On the home page you have the search compartiment, the Popular movies
          and your watchlist
          <br />
          You can swith to dark mode or light mode, as you wish.
          <br />
          <br />
          Feel free to explore the Movie App 😊
        </span>
      </div>
      <div className={classes.component}>
        <h2>Privacy</h2>
        <span>
          We don't save any personal informations, and don't use them in any
          way! 👍
          <br />
          <br />
          Your watchlist is saved on your local storage, and you can delete it
          very easy (there are dedicated buttons), and if you oppen the app from
          another device it will not be there!
          <br />
          If you want to save the watchlist on a database, you can create an
          account, and save the watchlist from there. Your email adress and
          password will be saved encrypted on a database, so you can
          authenticate safe.
          <br />
          <br />
          If you don't want to make an account with your email adress, you can
          use the dummy account to see how it works.
          <br />
          dummy email: test@yahoo.com
          <br />
          dummy password: testpassword
          <br />
          <br />
          <br />
          Even if you create an account, we will NOT use your informations in
          any way!👍
        </span>
      </div>
    </Fragment>
  );
};

export default Terms;
