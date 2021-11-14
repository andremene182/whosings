import React, {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//modules
import {addNewGame, createQuizDataPack, extractRndMusicGenre} from 'modules/core';
import useCountDown from 'react-countdown-hook';
import { useIndexedDB } from 'react-indexed-db';
import { usersStore, userSchema} from 'modules/core';
import { customTheme } from 'modules/theme';
import JSConfetti from 'js-confetti';


//mui
import { Grid, Box, Typography, CircularProgress } from '@mui/material';

//components
import QuizCard from 'containers/QuizGame/QuizCard';
import Timer from 'containers/QuizGame/Timer';
import TimerNum from 'containers/QuizGame/TimerNum';
import QuestionsState from 'containers/QuizGame/QuestionsState';
import Scores from 'containers/QuizGame/Scores';
import GameResults from 'containers/QuizGame/GameResults';



const QuizGame = (props)  => {

  const totalQuestions = 2;
  const pointsMultiplier = 5;
  const questionsPause = 2000;

  const offset = 1000;

  const initialTime = 5000 + offset; 
  const interval = 1000; 

  const [isLoading, setIsLoading] = useState(true);

  const quizTime = 15000 + offset;
  const [timeLeft, { start, pause}] = useCountDown(initialTime, interval);

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameFinished, setIsGameFinished] = useState(false);

  const [quiz, setQuiz] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizPoints, setQuizPoints] = useState(0);

  //indexed db
  const { getByID, update } = useIndexedDB(usersStore);

  //confetti!
  const jsConfetti = new JSConfetti();

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

  //counts points. basically multiply the time to a number
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
    //temporary
    if (isPlaying){
      pause();
      setTimeout(() => 
      {
        startQuestionTime();
        console.log("pippo");
        setQuestionIndex(questionIndex + 1);
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
    
  }, [timeLeft]);



  //start
  useEffect(() => {
    //start the timer before play, on container rendering
    //start();
    startGame();
   
  }, []);

  useEffect(() => {
    if (gameFinished)
      saveScoresAndGame();
  }, [gameFinished])

  const startGame = () => {
    const quizData = [
      {
          "lyrics": "When the days are cold<br/>And the cards all fold<br/>And the saints we see<br/>Are all made of gold",
          "artists": [
              {
                  "artistName": "Bastille",
                  "correct": false
              },
              {
                  "artistName": "OneRepublic",
                  "correct": false
              },
              {
                  "artistName": "Imagine Dragons",
                  "correct": true,
                  "track": "Demons"
              }
          ]
      },
      {
          "lyrics": "Is this the real life?<br/>Is this just fantasy?<br/>Caught in a landside<br/>No escape from reality",
          "artists": [
              {
                  "artistName": "Dean Martin",
                  "correct": false
              },
              {
                  "artistName": "Elton John",
                  "correct": false
              },
              {
                  "artistName": "Queen",
                  "correct": true,
                  "track": "Bohemian Rhapsody"
              }
          ]
      }
  ]

    setIsLoading(true);

    //createQuizDataPack(extractRndMusicGenre().id, totalQuestions).then((quizData) => {
      setIsLoading(false);
      setQuiz(quizData);
      startQuestionTime();
      //is playing
      setIsPlaying(true); 
      setIsGameFinished(false);
      setQuizPoints(0);
      setQuestionIndex(0);
      //setQuizCardNum(quizCardNum + 1);
    //});
  }

  //stop the game
  const stopGame = () => {
    pause();
    setTimeout(() => 
    {
      setIsPlaying(false);
      setIsGameFinished(true);
    },questionsPause);
   
    //setQuestionIndex(0);
    //update the scores and the games
    
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
          <Grid item alignItems="center" xs={4} justifyContent="center" textAlign="center"><TimerNum timeLeft={(timeLeft-offset)/1000} /></Grid>
          <Grid item xs={4} textAlign="right"><Scores scores={quizPoints} /></Grid>
        </Grid>

        <Box sx={{mb: 1}} />
          
        <Grid container direction="column" alignItems="center" >
          <Timer totalTime={(quizTime-offset)/1000} timeLeft={(timeLeft-offset)/1000} />
        </Grid>
        <Box sx={{mb: 5}} />
        <Grid direction="column" alignItems="center" justifyContent="center" container>
          <QuizCard quiz={quiz[questionIndex]} selectArtistFunction={selectArtist}/>
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

