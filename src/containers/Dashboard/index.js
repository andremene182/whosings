import React from 'react'
import PropTypes from 'prop-types'

//containers
import UserGames from 'containers/Dashboard/UserGames';

//mui
import {Typography, Box, Button } from '@mui/material';

//
import { useNavigate } from 'react-router';

const Dashboard = (props) => {

  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6"> Hi, {props.username} </Typography>
      <Typography variant="body2">It seems that you haven't challenge yourself yet :( </Typography>
      
      
      <Box sx={{mb:2}}></Box>
      
      <Button variant="contained" onClick={() => navigate('/game')}>Click here to start a new game</Button>


      <Box sx={{mb:8}}></Box>
      <UserGames />
    </>
  )
}

Dashboard.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.number
}

export default Dashboard;

