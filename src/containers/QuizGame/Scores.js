import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const Scores = (props) => {
  return (
    <>
      <Typography  fontSize="25px" component="span" >{props.scores} POINTS</Typography>
    </>
  )
}

Scores.propTypes = {
  scores: PropTypes.number
}

export default Scores;

