import React from 'react';
import PropTypes from 'prop-types';

//mui
import { TextField, Typography, Grid, Button } from '@mui/material';

const Login = (props) => {
  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <TextField inputProps={{ maxLength: 20 }} color="secondary" helperText="Insert your username to join the game!" label="username" variant="outlined" sx={{mb:2}}/>
        <Button variant="contained" >Join</Button>
      </Grid>
    </>
  )
}

Login.propTypes = {

}

export default Login

