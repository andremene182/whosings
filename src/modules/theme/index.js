import {
  createTheme
} from '@mui/material/styles';

export const customTheme = createTheme({

  palette: {
    primary: {
      main: '#29353D',
      light: '#525f67',
      dark: '#000f17',
    },
    secondary: {
      main: '#df928e',
      light: '#ffc3be',
      dark: '#ab6361'
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
          background: 'linear-gradient(27deg, rgba(223,146,142,1) 31%, rgba(255,195,190,1) 68%)',
          borderRadius: '15px',
          letterSpacing: '10px'
        }
      }
    }
  }

});