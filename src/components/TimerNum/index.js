import React from 'react';
import PropTypes from 'prop-types';

//mui
import { Chip } from '@mui/material';

const TimerNum = (props) => {
  return (
    <>
      <Chip label={props.timeLeft} />
    </>
  )
}

TimerNum.propTypes = {
  timeLeft: PropTypes.number
}

export default TimerNum;