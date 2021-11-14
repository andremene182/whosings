import React from 'react';

//mui
import { Grid, Box } from '@mui/material';

//correlated
import Login from './Login';

//components
import AppSlogan from 'components/AppSlogan';

const InitScreen = (props) => {
  return (
    <>
      <AppSlogan title="WHO SINGS" slogan="Read the lyrics, guess the artist."/>    
      <Box sx={{mb: 2}} />
      <Grid container  direction="column" alignItems="center" justifyContent="center" >
      <Box sx={{mb: 4}} />
        <Grid item xs={3}>
          <Login/>
        </Grid>
      </Grid>
    </>
  )
}


export default InitScreen;

