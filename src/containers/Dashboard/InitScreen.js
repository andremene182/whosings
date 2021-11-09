import React from 'react';
//import PropTypes from 'prop-types'

//mui
import { Typography, Grid } from '@mui/material';

//correlated
import Login from './Login';

//components
import AppSlogan from 'components/AppSlogan';

//mui
import { Box } from '@mui/material';

const InitScreen = (props) => {
  return (
    <>
      <AppSlogan title="WHO SINGS" slogan="Read the lyrics, guess the artist."/>    
      
      <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center" sx={{height:'50vh'}}>
        <Grid item xs={3}>
          <Login />
        </Grid>
      </Grid>
    </>
  )
}

InitScreen.propTypes = {

}

export default InitScreen

