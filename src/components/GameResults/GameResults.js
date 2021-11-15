import React from 'react';
import PropTypes from 'prop-types';

//mui
import {
  Paper,
  Button,
  Grid,
  Typography,
  Box
} from '@mui/material'

//components
import MotivationalPhrase from 'components/MotivationalPhrase/MotivationalPhrase';

const GameResults = (props) => {

  const scores  = props.scores;

  return (
    <>
      <Grid container justifyContent="center" alignItems="center"  sx={{height:'50vh'}}>
        <Paper sx={{padding: '40px'}}>
          <Grid container direction="column" alignContent="center" textAlign="center" rowGap={3}>
            <Typography color="primary" fontSize="30px">You have scored {scores} points.</Typography>
            <Box sx={{mb: 2}}/>
            <MotivationalPhrase  scores={props.scores} username={props.username} />
            <Box sx={{mb: 3}}/>
            <Button variant="contained" sx={{fontSize: '20px'}}  onClick={() => props.playAgainFunction()}>Play again</Button>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}

GameResults.propTypes = {
  scores: PropTypes.number,
  username: PropTypes.string,
  playAgainFunction: PropTypes.func
}

export default GameResults;