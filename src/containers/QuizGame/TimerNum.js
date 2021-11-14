import React from 'react'
import PropTypes from 'prop-types'

//mui
import { Typography, Chip } from '@mui/material'

//modules
import { customTheme } from 'modules/theme'

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

export default TimerNum

