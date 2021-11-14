import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//modules
import {addNewGame, createQuizDataPack, extractRndMusicGenre, usersStore, userSchema, totalQuestions} from 'modules/core';
import useCountDown from 'react-countdown-hook';
import { useIndexedDB } from 'react-indexed-db';
import { customTheme } from 'modules/theme';
import JSConfetti from 'js-confetti';

//mui
import { Grid, Box, Typography, CircularProgress } from '@mui/material';

//components
import QuizCard from 'components/QuizCard';
import GameResults from 'components/GameResults';
import QuestionsState from 'components/QuestionsState';
import Scores from 'components/Scores';
import Timer from 'components/Timer';
import TimerNum from 'components/TimerNum';

//confetti!
const jsConfetti = new JSConfetti();

const QuizGame = (props)  => {

  //offest to manage the countdown-hook
  const [offset, setOffset] = useState(1000);

  //multiplier
  const pointsMultiplier = 5;
  //pause after answer or time-out
  const questionsPause = 1000;

  //quiz time and interval
  const quizTime = 15000 + offset;
  const interval = 1000; 

  //the quiz packaging is loading
  const [isLoading, setIsLoading] = useState(true);

  //the user is playing
  const [isPlaying, setIsPlaying] = useState(false);

  //the game is finished
  const [gameFinished, setIsGameFinished] = useState(false);

  //disable hud 
  const [disableHud, setDisableHud] = useState(false);

  //quiz managment states
  const [quiz, setQuiz] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizPoints, setQuizPoints] = useState(0);

  //indexed db
  const { getByID, update } = useIndexedDB(usersStore);

  //time hook
  const [timeLeft, { start, pause}] = useCountDown(quizTime, interval);


  /** some game logic **/

  //selects artist and verifies if the answer is right
  const selectArtist = (isCorrect) => {

    if (isCorrect) {
      createConfetti();
      let points = quizPoints + countPoints();
      setQuizPoints(points);
    } else {
      setQuizPoints(quizPoints - (pointsMultiplier*2));
    }

    if (isFinished())
      stopGame();
    else 
      nextQuestion();
  }

  //create confetti to use to celebrate the right answers
  const createConfetti = () => {
    jsConfetti.addConfetti({confettiNumber: 30, confettiColors:[customTheme.palette.secondary.main,customTheme.palette.secondary.dark, customTheme.palette.secondary.light], confettiRadius:4});
  }

  //counts points. basically multiplies the time to a number
  const countPoints = (multiplier = pointsMultiplier) => {

    let points = ((timeLeft-offset)/1000) * multiplier;
    return points;
  }

  //detects if the question number is equal to total questions number. So basically if the game is finished
  const isFinished = () => {
    if (questionNum()  === totalQuestions){
      return true;
    }
    else 
      return false;
  }

  //helper to compare the question index to the real number of the questions
  const questionNum = () => {
    return questionIndex + 1;
  }

  //switch to the next question
  const nextQuestion = () => {
      if (isPlaying){
      setDisableHud(true);
      pause();
      setTimeout(() => 
      {
        startQuestionTime();
        setQuestionIndex(questionIndex + 1);
        setDisableHud(false);
      },questionsPause);
    }
  };

 

  //start the question time
  const startQuestionTime = () => {
    start(quizTime);
  }

  //time manager
  useEffect(() => {
    //If time is out: pause the timer and proceed to the next question
    if(timeLeft === 0 && questionNum() < totalQuestions) {
      startQuestionTime();
      nextQuestion();
    } else
    //if time is out and quiz cards are finished, stop the game
    if (timeLeft === 0 && isFinished()) {
      stopGame();
    }
  // eslint-disable-next-line
  }, [timeLeft]);



  //start
  useEffect(() => {
    startGame();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gameFinished)
      saveScoresAndGame();
  // eslint-disable-next-line
  }, [gameFinished])

  const startGame = () => {

    setIsLoading(true);

    createQuizDataPack(extractRndMusicGenre().id, totalQuestions).then((quizData) => {
      setIsLoading(false);
      setQuiz(quizData);
      startQuestionTime();
      //is playing
      setIsPlaying(true); 
      setIsGameFinished(false);
      setQuizPoints(0);
      setQuestionIndex(0);
    });
  }

  //stop the game
  const stopGame = () => {
    pause();
    setOffset(0);
    console.log("timeleft", timeLeft);
    setTimeout(() => 
    {
      setIsPlaying(false);
      setIsGameFinished(true);
    },questionsPause);  
  }

  //update the global user scores and save the game scores and date to the indexedDB
  const saveScoresAndGame = () => {
    getByID(props.userId).then((user) => {
      const games = addNewGame(user.games, quizPoints, 10);
      const updateUser = userSchema(user.username, user.scores+quizPoints, games);
      update({id: props.userId, ...updateUser});
    });
  }

  return (
    <>

      {isLoading && 
      <Grid sx={{height:'100vh'}} container justifyContent="center" alignItems="center" direction="column">
        <CircularProgress color="secondary"/>
        <Box sx={{mb:3}}></Box>
        <Typography>creating the game . . . </Typography>
      </Grid>}


      {isPlaying && !isLoading &&
      <>
        <Grid container direction="row">
          <Grid item xs={4}><QuestionsState totalQuestions={totalQuestions} questionNum={questionNum()} /></Grid>
          <Grid item alignItems="center" xs={4} justifyContent="center" textAlign="center"> <TimerNum timeLeft={(timeLeft-offset)/1000} /></Grid>
          <Grid item xs={4} textAlign="right"><Scores scores={quizPoints} /></Grid>
        </Grid>

        <Box sx={{mb: 1}} />
          
        <Grid container direction="column" alignItems="center" >
          <Timer totalTime={(quizTime-offset)/1000} timeLeft={(timeLeft-offset)/1000} />
        </Grid>
        <Box sx={{mb: 5}} />
        <Grid direction="column" alignItems="center" justifyContent="center" container>
          <QuizCard quiz={quiz[questionIndex]} selectArtistFunction={selectArtist} disableHud={disableHud}/>
        </Grid>
      </>
      }

      {gameFinished && !isLoading &&
      <>
        <GameResults username={props.username} scores={quizPoints} playAgainFunction={startGame}></GameResults>
      </>
      }
    </>
  )
}

QuizGame.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string
}

export default QuizGame;

