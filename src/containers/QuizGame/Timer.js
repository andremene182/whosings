import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'


import {LinearProgress, Box, Typography} from '@mui/material';


const Timer = (props) => {

  const max = 100;
  const [progress, setProgress] = useState(max);


  useEffect(() => {
    setProgress((props.timeLeft*max)/props.totalTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [props.timeLeft]);

  /*useEffect(() => {
    const timer = setInterval(() => { 
      setProgress((oldProgress) => {
        return ((props.timeLeft*max)/props.totalTime - Math.random());
    });
  }, 400);
  
    return () => {
      clearInterval(timer);
    };

  }, []);*/



  return (
    <>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress color="secondary" variant="determinate" value={progress}></LinearProgress>
    </Box>
    </>
  )
}

Timer.propTypes = {
  timeLeft: PropTypes.number,
  totalTime: PropTypes.number
}

export default Timer;

