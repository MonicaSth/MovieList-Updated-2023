import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from "./context/theme-context";
import FavoriteContextProvider from "./context/favorite-context";
import AuthContextProvider from "./context/Auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <FavoriteContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </FavoriteContextProvider>
  </ThemeContextProvider>
);
