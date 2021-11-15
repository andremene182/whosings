import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography
} from '@mui/material';

const MotivationalPhrase = (props) => {
  
  var phrase;

  const username = props.username;
  const scores = props.scores;

  if (scores < 5) {
    phrase = ("This is not your day, " + username + " :(");
  }

  if (scores > 5 && scores < 100) {
    phrase = ("C'mon " + username + ", you can do better!");
  }

  if (scores >= 100 && scores < 300) {
    phrase = ("Not bad " + username + "! ;)");
  }

  if (scores >= 300 && scores < 500) {
    phrase = ("Good work " + username + " :)");
  }

  if (scores >= 500 && scores < 650) {
    phrase = ("What a game " + username + " !");
  }

  if (scores >= 650) {
    phrase = ("That's incredible! You are the lyrics ninja, " + username + ".");
  }
  
  return (
    <>
      <Typography color="secondary" fontSize='30px'> {phrase}</Typography>
    </>
  )
}

MotivationalPhrase.propTypes = {
  scores: PropTypes.number,
  username: PropTypes.string
}

export default MotivationalPhrase;

