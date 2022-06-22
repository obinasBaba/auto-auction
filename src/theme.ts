import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

//#ededed

// Create a theme instance.
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: '5000px',
        },
        sizeLarge: {
          padding: '.9rem 22px',
        },
        outlined: {},
      },
    },
  },

  typography: {
    fontFamily: 'auger',
  },
  palette: {
    primary: {
      main: '#7963F0',
    },
    secondary: {
      main: '#8d8d8d',
    },
    error: {
      main: red.A400,
    },
  },
});

// responsiveFontSizes(theme, {})

export default theme;
