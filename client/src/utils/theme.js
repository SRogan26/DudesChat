import { createTheme } from "@mui/material/styles";

//options for sepia-styled theme
const mainThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#8d6e63",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e91e63",
    },
    background: {
      default: "#efebe9",
      paper: "#d7ccc8",
    },
    divider: "rgba(0,0,0,0.2)",
    text: {
      secondary: "rgba(32,32,107,0.6)",
      hint: "#80d8ff",
    },
  },
  typography: {
    fontFamily: "'Inconsolata', monospace",
    fontSize: 16,
  },
};

//style for 8-Bit
const funThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#616161",
      contrastText: "rgba(255,255,255,0.89)",
    },
    secondary: {
      main: "#ea80fc",
      contrastText: "rgba(0,0,0,0.76)",
    },
    divider: "rgba(0,0,0,0.63)",
    background: {
      default: "#dcedc8",
      paper: "#aed581",
    },
    info: {
      main: "#29b6f6",
    },
    text: {
      primary: "rgba(0,0,0,0.71)",
    },
  },
  typography: {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 12,
  },
};

const pinkThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#b71c1c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e54fff",
      contrastText: "rgba(0,0,0,0.76)",
    },
    divider: "rgba(0,0,0,0.63)",
    background: {
      default: "#fce4ec",
      paper: "rgba(248,187,208,0.49)",
    },
    info: {
      main: "#29b6f6",
    },
    text: {
      primary: "rgba(0,0,0,0.71)",
    },
    error: {
      main: "#ff0000",
    },
  },
  typography: {
    fontFamily: "'Mooli', sans-serif",
    htmlFontSize: 16,
  },
};

const hackThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#012301",
      contrastText: "#00f700",
    },
    secondary: {
      main: "#e54fff",
      contrastText: "rgba(0,0,0,0.76)",
    },
    divider: "rgba(0,0,0,0.63)",
    background: {
      default: "#000000",
      paper: "rgba(7,53,7,0.49)",
    },
    info: {
      main: "#29b6f6",
    },
    text: {
      primary: "#00F700",
      secondary: "#03f933",
      hint: "#04ea0a",
      disabled: "#14ff00",
    },
    error: {
      main: "#ff0000",
    },
  },
  typography: {
    fontFamily: "'Silkscreen', cursive",
    fontSize: 16
  },
};

const mainTheme = createTheme(mainThemeOptions);

const funTheme = createTheme(funThemeOptions);

const pinkTheme = createTheme(pinkThemeOptions);

const hackTheme = createTheme(hackThemeOptions);

export { mainTheme, funTheme, pinkTheme, hackTheme };
