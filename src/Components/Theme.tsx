import React, { useState, useLayoutEffect, useEffect } from "react";

export const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
});

export default function ThemeProvider(props: { children: any }) {
  // keeps state of the current theme
  var htmlElm: any = undefined;
  if (typeof document !== "undefined") {
    htmlElm = document.querySelector("html");
  }

  var prefersDark: any = undefined;
  if (typeof window !== "undefined") {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const [dark, setDark] = useState(prefersDark);

  useEffect(() => {
    console.log(prefersDark);
    if (
      (htmlElm && !htmlElm.classList.contains("light-mode")) ||
      !htmlElm?.classList.contains("dark-mode")
    ) {
      if (prefersDark) {
        htmlElm?.classList.toggle("dark-mode");
        setDark(false);
      } else {
        htmlElm?.classList.toggle("light-mode");
        setDark(true);
      }
    }
  }, []);

  // paints the app before it renders elements
  useLayoutEffect(() => {
    // Media Hook to check what theme user prefers
    applyTheme();

    // if state changes, repaints the app
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  // rewrites set of css variablels/colors
  const applyTheme = () => {
    let theme;
    htmlElm && htmlElm.classList.toggle("light-mode");
    htmlElm && htmlElm.classList.toggle("dark-mode");
    // if (dark) {
    //   theme = darkTheme;
    // }
    // if (!dark) {
    //   theme = lightTheme;
    // }

    // const root = document.getElementsByTagName("html")[0];
    // root.style.cssText = theme.join(";");
  };

  const toggle = () => {
    console.log("Toggle Method Called");

    // A smooth transition on theme switch
    // const body = document.getElementsByTagName("body")[0];
    // body.style.cssText = "transition: background .5s ease";

    setDark(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

// styles
// const lightTheme = [
//   "--bg-color: var(--color-white)",
//   "--text-color-primary: var(--color-black)",
//   "--text-color-secondary: var(--color-prussianBlue)",
//   "--text-color-tertiary:var(--color-azureRadiance)",
//   "--fill-switch: var(--color-prussianBlue)",
//   "--fill-primary:var(--color-prussianBlue)",
// ];

// const darkTheme = [
//   "--bg-color: var(--color-blue)",
//   "--text-color-primary: var(--color-white)",
//   "--text-color-secondary: var(--color-iron)",
//   "--text-color-tertiary: var(--color-white)",
//   "--fill-switch: var(--color-gold)",
//   "--fill-primary:var(--color-white)",
// ];
