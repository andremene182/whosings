import React from 'react'
import PropTypes from 'prop-types'


//mui
import { Button, MobileStepper, Box, Grid } from '@mui/material';


//modules
import { createQuizData, musicGenres } from 'modules/core';

//css
//import 'App.css';

const QuizGame = (props) => {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item><Button className="play-button" variant="contained" color="secondary" onClick={() => createQuizData(musicGenres.rock.id)}>Rock</Button></Grid>
        <Grid item><Button className="play-button" variant="contained" color="secondary" onClick={() => createQuizData(musicGenres.pop.id)}>Pop</Button></Grid>
      </Grid>
      
    </div>
  )
}

QuizGame.propTypes = {

}

export default QuizGame

