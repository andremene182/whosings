import React, {
  useEffect,
  useState
} from 'react'
import PropTypes from 'prop-types'

//modules
import {
  addNewGame,
  createQuizDataPack,
  extractRndMusicGenre,
  usersStore,
  userSchema,
  totalQuestions,
} from 'modules/Core';
import useCountDown from 'react-countdown-hook';
import {
  useIndexedDB
} from 'react-indexed-db';
import {
  customTheme
} from 'modules/Theme';
import JSConfetti from 'js-confetti';

//mui
import {
  Grid,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

//components
import QuizCard from 'components/QuizCard/QuizCard';
import GameResults from 'components/GameResults/GameResults';
import QuestionsState from 'components/QuestionsState/QuestionsState';
import Scores from 'components/Scores/Scores';
import Timer from 'components/Timer/Timer';
import TimerNum from 'components/TimerNum/TimerNum';

//hooks
import { useAsyncError } from 'modules/Hooks';

const jsConfetti = new JSConfetti();

const QuizGame = (props)  => {

  const throwError = useAsyncError();


  const [offset, setOffset] = useState(1000);

  const pointsMultiplier = 5;
  const questionsPause = 1000;

  const quizTime = 15000 + offset;
  const interval = 1000; 

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [gameFinished, setIsGameFinished] = useState(false)
  const [disableHud, setDisableHud] = useState(false);

  const [quiz, setQuiz] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizPoints, setQuizPoints] = useState(0);

  const { getByID, update } = useIndexedDB(usersStore);

  const [timeLeft, { start, pause}] = useCountDown(quizTime, interval);
  
  //game logic
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

  const createConfetti = () => {
    jsConfetti.addConfetti({confettiNumber: 15, confettiColors:[customTheme.palette.secondary.main,customTheme.palette.secondary.dark, customTheme.palette.secondary.light], confettiRadius:4});
  }

  const countPoints = (multiplier = pointsMultiplier) => {

    let points = ((timeLeft-offset)/1000) * multiplier;
    return points;
  }

  const isFinished = () => {
    if (questionNum()  === totalQuestions){
      return true;
    }
    else 
      return false;
  }

  const questionNum = () => {
    return questionIndex + 1;
  }

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

  const startQuestionTime = () => {
    start(quizTime);
  }

  useEffect(() => {
    if(timeLeft === 0 && questionNum() < totalQuestions) {
      startQuestionTime();
      nextQuestion();
    } else
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
      getByID(props.userId).then((user) => {
        const games = addNewGame(user.games, quizPoints, 10);
        const updateUser = userSchema(user.username, user.scores+quizPoints, games);
        update({id: props.userId, ...updateUser});
      });
  // eslint-disable-next-line
  }, [gameFinished])



  const startGame = () => {
    
    //throw new Error("ciccio");

    setIsLoading(true);

    createQuizDataPack(extractRndMusicGenre().id, totalQuestions)
    .then((quizData) => {
      setIsLoading(false);
      setQuiz(quizData);
      startQuestionTime();
      setIsPlaying(true); 
      setIsGameFinished(false);
      setQuizPoints(0);
      setQuestionIndex(0);
    }).catch((error) => {
      throwError(new Error(error.message));
    });
  }

  const stopGame = () => {
    pause();
    setOffset(0);
    setTimeout(() => 
    {
      setIsPlaying(false);
      setIsGameFinished(true);
    },questionsPause);  
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

