import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

//#ededed

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'auger',
  },
  palette: {
    primary: {
      main: '#7963F0',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

// responsiveFontSizes(theme, {})

export default theme;
