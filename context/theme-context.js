import React, { useState } from "react";

export const ThemeContext = React.createContext({
  themeIsLight: false,
  toggleTheme: () => {},
});

const ThemeContextProvider = (props) => {
  const [isLight, setIsLight] = useState(false);

  const toggleThemeHandler = () => {
    const nowIsLight = isLight;
    setIsLight(!nowIsLight);
  };
  return (
    <ThemeContext.Provider
      value={{ toggleTheme: toggleThemeHandler, themeIsLight: isLight }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
