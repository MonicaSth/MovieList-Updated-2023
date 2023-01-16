import { Fragment } from "react";
import SavedMovies from "../Components/savedmovies/SavedMovies";

const Favorite = () => {
  return (
    <Fragment>
      <SavedMovies container={"overflow"} />
    </Fragment>
  );
};

export default Favorite;
