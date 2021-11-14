import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

//components
import UserGames from 'components/UserGames';

//mui
import {Typography, Box, Button, Grid } from '@mui/material';
import {PlayArrowRounded, AudiotrackRounded} from '@mui/icons-material';

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
    getByID(props.userId).then((user) => {
      setScores(user.scores);
      setGames(user.games);
    });
  }, [])
  

  return (
    <>
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Typography  fontSize="25px" color="primary" fontWeight='500' component={'span'}>  Hi, <Typography fontSize='25px' color="secondary" component={'span'}>{props.username}</Typography> </Typography>

          <Box sx={{mb:2}}></Box>
          <Typography fontSize="20px" component={'span'}>You have <Typography  component={'span'} fontSize="25px" fontWeight='500' >{scores}</Typography> points.</Typography> <AudiotrackRounded color="secondary" sx={{fontSize: '30px'}} /> 
          <Box sx={{mb:3}}></Box>
          <Grid >
            <Button startIcon={<PlayArrowRounded />} variant="contained" size="large" className="play-button" onClick={() => navigate(routes.game)}><Typography variant="h6" >Play</Typography></Button>
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

