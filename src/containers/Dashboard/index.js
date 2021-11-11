import React from 'react'
import PropTypes from 'prop-types'

//containers
import QuizGame from 'containers/Dashboard/QuizGame';
import UserGames from 'containers/Dashboard/UserGames';

//mui
import {Typography, Box } from '@mui/material';

const Dashboard = (props) => {
  return (
    <>
      <Typography variant="h6"> Hi, {props.username} </Typography>
      <Typography variant="body2">Select your favorite genre, and start to play!</Typography>
      <Box sx={{mb:2}}></Box>
      <QuizGame />
      <Box sx={{mb:5}}></Box>
      <UserGames />
    </>
  )
}

Dashboard.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.number
}

export default Dashboard;

