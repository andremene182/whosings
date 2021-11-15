import {
  createTheme
} from '@mui/material/styles';


const primary = '#29353D';
const primaryLight = '#525f67';
const primaryDark = '#000f17';
const secondary = '#D1603D';
const secondaryLight = '#ff907a';
const secondaryDark = '#9b3125';

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
          background: 'linear-gradient(27deg, #D1603D 31%, rgba(255,195,190,1) #ff907a)',
          borderRadius: '15px',
          letterSpacing: '10px'
        }
      }
    }
  }

});