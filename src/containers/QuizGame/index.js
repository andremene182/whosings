import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//modules
import {createQuizData, musicGenres} from 'modules/core';
import useCountDown from 'react-countdown-hook';
import { useIndexedDB } from 'react-indexed-db';
import { usersStore } from 'modules/core';

//mui
import { Card, Typography, Grid, Button } from '@mui/material';

//components
import QuizCard from 'containers/QuizGame/QuizCard';

const QuizGame = (props)  => {

  const quizCards = 5;

  const offSet = 2000;
  const initialTime = 5000 + offSet; 
  const quizTime = 20000 + offSet;
  const interval = 1000; 

  const [timeLeft, { start, pause}] = useCountDown(initialTime, interval);
  const [isPlaying, setIsPlaying] = useState(false);

  const [gameFinished, setIsGameFinished] = useState(false);

  const [quizCardNum, setQuizCardNum] = useState(0);
  const [quiz, setQuiz] = useState();

  const [quizPoints, setQuizPoints] = useState(0);


  const { add, getByID, update } = useIndexedDB(usersStore);



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

  const stopGame = () => {

    setIsPlaying(false);
    setIsGameFinished(true);
    
    console.log(quizPoints);
    //update the scores and the games
    //TODO
    update({id: props.userId, scores: quizPoints}).then(event => {
      console.log(event);
    });

    pause();
  }

  //time manager
  useEffect(() => {
    if(timeLeft === 1000 && quizCardNum < quizCards) {
      //If time is out: pause the timer and create a quiz
      pause();
      createNewQuiz();
    } else
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
  }, [start]);



  return (
    <>
      <p>{((timeLeft - 1000) / 1000)}</p>
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

