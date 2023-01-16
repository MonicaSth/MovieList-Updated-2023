import SearchBox from "../Components/search/SearchBox";
import Footer from "../Components/Footer";
import SavedMovies from "../Components/savedmovies/SavedMovies";
import MostWatched from "../Components/search/MostWatched";

const Home = () => {
  return (
    <div>
      <SearchBox />
      <MostWatched />
      <SavedMovies />
      <Footer />
    </div>
  );
};

export default Home;
