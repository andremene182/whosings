import { createTheme } from '@mui/material/styles';


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

    MuiTypography: {
    },
  }

});
