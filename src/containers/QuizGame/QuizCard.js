import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

//mui
import { Paper, Grid, Typography, Button, Box} from '@mui/material';

//modules
import HTMLReactParser from 'html-react-parser';

const QuizCard = (props) => {


  const [correctArtist, setCorrectArtist] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);


  const selectArtist = (isCorrect, indexButton) => {
    props.selectArtistFunction(isCorrect);
      setCorrectArtist(isCorrect);
      setClickedButton(indexButton);
      setDisabledButton(true);
  }

  useEffect(() => {
    setCorrectArtist(null);
    setClickedButton(null);
    setDisabledButton(false);
  }, [props.quiz])


  return (
    <>
    {props.quiz &&
      <Grid direction="column" alignItems="center" justifyContent="center" container>
        <Paper className='quiz-card'>
          <Grid  direction="column" alignItems="center" justifyContent="center" container>
            <Grid item width="100%">
              <Typography className='quiz-lyrics'> {props.quiz && HTMLReactParser(props.quiz.lyrics)}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{mb:5}} />

        <Grid container  maxWidth="500px" direction="column" spacing={3} alignItems="center">
          {props.quiz && props.quiz.artists.map((artist, index) => {
            return (<Grid item width="100%" key={index} textAlign="center">
                      <Button  color={clickedButton!=null && artist.correct === true ? 'success' : !artist.correct && index === clickedButton ? 'error' : 'primary'} sx={{width:"100%", fontSize: "19px", pointerEvents: disabledButton ? 'none' : 'all'}}  onClick={()=>{selectArtist(artist.correct, index)}} variant="contained">{artist.artistName}</Button>
                    </Grid>
                   )}
            )}
        </Grid>
      </Grid>
    }
    </>
  )
}

QuizCard.propTypes = {
  quiz: PropTypes.object,
  selectArtistFunction: PropTypes.func
}

export default QuizCard

