import React, {useState, useEffect} from 'react';
//import PropTypes from 'prop-types'

//modules
import {useIndexedDB} from 'react-indexed-db';
import { usersStore } from 'modules/core';

//mui
import { Typography, Grid } from '@mui/material';

const HighScores = (props)  => {
  const { getAll } = useIndexedDB(usersStore);

  const [userData, setUserData] = useState();


  //order da userData by scores, desc
  useEffect(() => {
    getAll().then((data)=> {
      data.sort((a,b) => {
        return b.scores - a.scores;
      });
      setUserData(data);
    });
    
  }, [])

  


  return (
    <>
      <Grid direction="column" container textAlign="center">
        <Typography variant="h6">HIGH SCORES</Typography>
      </Grid>



    </>
  )
}

HighScores.propTypes = {

}

export default HighScores

