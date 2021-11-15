import {
  createTheme
} from '@mui/material/styles';


const primary = '#29353D';
const primaryLight = '#525f67';
const primaryDark = '#000f17';
const secondary = '#D1603D';
const secondaryLight = '#ff9069';
const secondaryDark = '#9a3113';

const gradient = 'linear-gradient(30deg, rgb(209, 96, 78) 31%, rgb(255, 144, 122) 74%)';

export const customTheme = createTheme({

  palette: {
    primary: {
      main: primary,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondary,
      light: secondaryLight,
      dark: secondaryDark
    }
  },

  typography: {
    fontFamily: [
      'Work Sans',
      'sans-serif',
    ].join(','),
  },


  components: {

    MuiAppBar: {
      styleOverrides: {
        root: {
          minHeight: '50px'
        }
      }
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '50px'
        }
      }
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '15px',
          borderRadius: '6px',
        },
        bar1Determinate: {
          background: 'rgb(255 255 255 / 88%)'
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        elevation: {
          borderRadius: '10px'
        },
        elevation16: {
          borderRadius: '10px 0px',
          padding: '20px'
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        containedSizeLarge: {
          background: gradient,
          borderRadius: '15px',
          letterSpacing: '10px'
        }
      }
    }
  }

});