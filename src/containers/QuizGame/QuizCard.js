import React from 'react'
import PropTypes from 'prop-types'

//mui
import { Paper, Grid, Typography, Button, Box} from '@mui/material';

//modules
import HTMLReactParser from 'html-react-parser';

const QuizCard = (props) => {
  return (
    <>
    {props.quiz &&
      <Grid direction="column" alignItems="center" justifyContent="center" container>
        <Paper className='quiz-card'>
          <Grid direction="column" alignItems="center" justifyContent="center" container>
            <Grid item xs={5}>
              <Typography variant="h6"> {props.quiz && HTMLReactParser(props.quiz.lyrics)}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{mb:5}} />

        <Grid container direction="column" spacing={3} alignItems="center">
          {props.quiz && props.quiz.tracks.map((track) => {
            return (<Grid key={track.id} textAlign="center" item sm={2} ><Button sx={{maxWidth: '320px'}}  onClick={()=>{props.selectArtistFunction(track.correct)}} variant="contained">{track.artist}</Button></Grid>)
          })}
        </Grid>
      </Grid>
    }
    </>
  )
}

QuizCard.propTypes = {
  quiz: PropTypes.object
}

export default QuizCard

