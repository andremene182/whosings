import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//modules
import {addNewGame, createQuizData, musicGenres} from 'modules/core';
import useCountDown from 'react-countdown-hook';
import { useIndexedDB } from 'react-indexed-db';
import { usersStore, userSchema} from 'modules/core';

//mui
import { Card, Typography, Grid, Button } from '@mui/material';

//components
import QuizCard from 'containers/QuizGame/QuizCard';

const QuizGame = (props)  => {

  const quizCards = 5;

  const offSet = 1000;
  const initialTime = 5000 + offSet; 
  const quizTime = 20000 + offSet;
  const interval = 1000; 

  const [timeLeft, { start, pause}] = useCountDown(initialTime, interval);
  const [isPlaying, setIsPlaying] = useState(false);

  const [gameFinished, setIsGameFinished] = useState(false);

  const [quizCardNum, setQuizCardNum] = useState(0);
  const [quiz, setQuiz] = useState();

  const [quizPoints, setQuizPoints] = useState(0);


  const { getByID, update } = useIndexedDB(usersStore);


  //selects artist and verifies if he(or her) is correct
  const selectArtist = (isCorrect) => {
    if(isCorrect){
      setQuizPoints(quizPoints + 1);
    } else {
      //TODO something
    }

    //
    if(quizCardNum === quizCards) {
      stopGame();
    } else {
      createNewQuiz();
    }
  }

  //stop the game
  const stopGame = () => {

    setIsPlaying(false);
    setIsGameFinished(true);
    
    //update the scores and the games
    saveScoresAndGame();

    pause();
  }

  //time manager
  useEffect(() => {
    //If time is out: pause the timer and create a quiz
    if(timeLeft === 1000 && quizCardNum < quizCards) {
      pause();
      createNewQuiz();
    } else
    //if time is out and quiz cards are finished, stop the game
    if (timeLeft === 1000 && quizCardNum === quizCards) {
      stopGame();
    }
  }, [timeLeft]);

  //creates a new quiz
  const createNewQuiz = () => {
    //create the quiz with data
    createQuizData(musicGenres.rock.id)
      .then((data)=> {
        //set quiz hook
        setQuiz(data);
        //start time
        start(quizTime);
        //is playing
        setIsPlaying(true);
        //is not finished
        setIsGameFinished(false);
        // +1 on the card list
        setQuizCardNum(quizCardNum + 1);
      }); 
  }


  //start
  useEffect(() => {
    //start the timer before play, on container rendering
    start();
  }, []);

  //update the global user scores and save the game scores and date to the indexedDB
  const saveScoresAndGame = () => {
    getByID(props.userId).then((user) => {
      const games = addNewGame(user.games, quizPoints);
      const updateUser = userSchema(user.username, user.scores+quizPoints, games);
      update({id: props.userId, ...updateUser});
    });
  }


  return (
    <>

      <Button onClick={() => (saveScoresAndGame())}> TEST</Button>

      <Typography>{((timeLeft - 1000) / 1000)}</Typography>

      <br/>
      {quizCardNum + '/'+ quizCards}
      Punti: {quizPoints}
      {isPlaying && 
        <Grid direction="column" alignItems="center" justifyContent="center" container>
          <QuizCard quiz={quiz} selectArtistFunction={selectArtist}/>
        </Grid>
      }

      {gameFinished && 
      <>
        <p>The game is finished!. Your points: {quizPoints}</p> 
        {//TODO REPLAY
        }
        {/*<Button onClick={() => {setQuizCardNum(0); createNewQuiz()}}> Re play</Button>*/}
      </>
      }

    </>
  )
}

QuizGame.propTypes = {

}

export default QuizGame;

