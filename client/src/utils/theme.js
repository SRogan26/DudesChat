import { createTheme } from '@mui/material/styles';

//options for sepia-styled theme
const mainThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#8d6e63',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#e91e63',
      },
      background: {
        default: '#efebe9',
        paper: '#d7ccc8',
      },
      divider: 'rgba(0,0,0,0.2)',
      text: {
        secondary: 'rgba(32,32,107,0.6)',
        hint: '#80d8ff',
      },
    },
    typography: {
        fontFamily: '\'Inconsolata\', monospace',
        fontSize: 16,
      },
  };

  //style for 8-Bit
  const funThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#616161',
            contrastText: 'rgba(255,255,255,0.89)',
          },
        secondary: {
          main: '#ea80fc',
          contrastText: 'rgba(0,0,0,0.76)',
        },
        divider: 'rgba(0,0,0,0.63)',
        background: {
          default: '#dcedc8',
          paper: '#aed581',
        },
        info: {
          main: '#29b6f6',
        },
        text: {
          primary: 'rgba(0,0,0,0.71)',
        },
      },
    typography: {
        fontFamily: '\'Press Start 2P\', monospace',
        fontSize: 12,
      },
  };

const mainTheme = createTheme(mainThemeOptions);

const funTheme = createTheme(funThemeOptions)

export {mainTheme, funTheme}
