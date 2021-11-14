import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const QuestionsStates = (props) => {
  return (
    <>
      <Typography fontSize="25px" component="span" >{props.questionNum}/</Typography>
      <Typography fontSize="18px" component="span">{props.totalQuestions}</Typography>
    </>
  )
}

QuestionsStates.propTypes = {
  totalQuestions: PropTypes.number,
  questionNum: PropTypes.number
}

export default QuestionsStates;