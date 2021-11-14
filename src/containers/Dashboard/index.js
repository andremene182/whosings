import React, {useState} from 'react'
import PropTypes from 'prop-types'

//containers
import UserGames from 'containers/Dashboard/UserGames';

//mui
import {Typography, Box, Button } from '@mui/material';

//router
import { useNavigate } from 'react-router';

//modules
import {useIndexedDB} from 'react-indexed-db';
import { usersStore } from 'modules/core';
import { routes } from 'modules/core';



const Dashboard = (props) => {

  const navigate = useNavigate();
  const {getByID} = useIndexedDB(usersStore);
  const [scores, setScores] = useState(0)

  getByID(props.userId).then((user) => {
    setScores(user.scores);
  });

  return (
    <>
      <Typography fontSize='25px' fontWeight='500'> Hi, {props.username}!</Typography>
      <Typography>You have {scores} points.</Typography>
      
      
      <Box sx={{mb:2}}></Box>
      
      <Button variant="contained" onClick={() => navigate(routes.game)}>Play</Button>
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

