import React from 'react';
import PropTypes from 'prop-types';

//mui
import { Typography, Grid } from '@mui/material';

//css
import 'App.css';

const AppSlogan = (props) => {
  return (
    <>
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Typography className="app-title" color="secondary">
        {props.title}
      </Typography>
      <Typography className="app-slogan" color="primary">
        {props.slogan}
      </Typography>      
    </Grid>
    </>
  )
}

AppSlogan.propTypes = {
  title: PropTypes.string,
  slogan: PropTypes.string
}

export default AppSlogan;

