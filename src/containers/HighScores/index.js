import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'

//modules
import {useIndexedDB} from 'react-indexed-db';
import { usersStore } from 'modules/core';

//mui
import { Typography, Grid, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';


const HighScores = (props)  => {
  const { getAll } = useIndexedDB(usersStore);
  const [rows, setRows] = useState();

  var pos = 1;

  const createUserData = (position, username, scores, id) => {
    return {position, username, scores, id};
  }

  const createRows = (data) => {
    const rows = data.map((user)=> {
      const userData = createUserData(pos + '°', user.username, user.scores, user.id);
      pos++;
      return userData;
    });
    return rows;
  };


  //order the userData by scores, desc
  useEffect(() => {
    getAll().then((data)=> {
      data.sort((a,b) => {
        return b.scores - a.scores;
      });
      setRows(createRows(data));
    });
  // eslint-disable-next-line
  }, []);

  


  return (
    <>
      <Grid container direction="column" alignContent="center" textAlign="center" >
        <Typography color="primary"  sx={{fontSize: '25px', fontWeight: '500'}}>HIGH SCORES</Typography>
        <Box sx={{mb: 4}}/>
        <Grid container direction="row" alignContent="center" justifyContent="center" textAlign="center" >
          <Grid item sm={5} xs={12}>
          <TableContainer  component={Paper}>
            <Table  aria-label="simple table">
              <TableBody>
                {rows && rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" >
                      <Typography>{index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : row.position}</Typography>
                    </TableCell>
                    <TableCell component="th" >
                      <Typography fontWeight={row.id === props.userId ? 700 : 100}>{row.username}</Typography>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <Typography>{row.scores}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    <Box sx={{mb: 4}}/>


    </>
  )
}

HighScores.propTypes = {
  userId: PropTypes.number
}

export default HighScores

