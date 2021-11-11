import React from 'react';
//import PropTypes from 'prop-types'

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
      <Grid container  direction="column" alignItems="center" justifyContent="center" sx={{height:'50vh'}}>
        <Grid item xs={3}>
          <Login/>
        </Grid>
      </Grid>
    </>
  )
}

InitScreen.propTypes = {

}

export default InitScreen;

