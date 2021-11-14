import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

//containers
import UserGames from 'containers/Dashboard/UserGames';

//mui
import {Typography, Box, Button, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

//router
import { useNavigate } from 'react-router';

//modules
import {useIndexedDB} from 'react-indexed-db';
import { usersStore } from 'modules/core';
import { routes } from 'modules/core';




const Dashboard = (props) => {

  const navigate = useNavigate();
  const {getByID} = useIndexedDB(usersStore);
  const [scores, setScores] = useState(0);
  const [games, setGames] = useState(0)

  useEffect(() => {
    console.log("query");
    getByID(props.userId).then((user) => {
      setScores(user.scores);
      setGames(user.games);
    });
  }, [])
  

  return (
    <>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Typography  fontSize="25px" color="primary" fontWeight='500' component={'span'}>  Hi, <Typography fontSize='25px' color="secondary" component={'span'}>{props.username}</Typography></Typography>

          <Box sx={{mb:2}}></Box>
          <Typography fontSize="20px" component={'span'}>You have <Typography  component={'span'} fontSize="25px" fontWeight='500' >{scores}</Typography> points.</Typography>
          <Box sx={{mb:5}}></Box>
          <Grid textAlign="center">
            <Button startIcon={<PlayArrowIcon />} variant="contained" size="large" className="play-button" onClick={() => navigate(routes.game)}><Typography variant="h6" >Play</Typography></Button>
          </Grid>
          <Box sx={{mb:8}}></Box>

        </Grid>

        <Grid item sm={6} xs={12}>
          <UserGames games={games || []}/>
        </Grid>
      </Grid>
    </>
  )
}

Dashboard.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.number
}

export default Dashboard;

