import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//mui
import {Typography, Box, TableContainer, TableBody, TableCell, TableRow, Table, Paper, TableHead} from '@mui/material'

const UserGames = (props) => {

  const [rows, setRows] = useState();

  //order the games by date, desc
  useEffect(() => {
    let games = props.games;
    games.sort((a,b) => {
      return b.gameDate - a.gameDate;
    });
    setRows(games);
  }, [props.games]);

  return (
    <>
      <Typography variant="h6" fontSize='25px' color="primary" >Your latest games</Typography>

      <Box sx={{mb: 2}}/>

      {props.games.length === 0 ? <Typography>It seems that you haven't played yet :( </Typography> : 
      

      <TableContainer  component={Paper}>
          <Table aria-label="games table">
            
            <TableHead>
              <TableRow>
                <TableCell ><Typography color="secondary" fontSize="20px">dates</Typography></TableCell>
                <TableCell align="right"><Typography color="secondary" fontSize="20px">scores</Typography></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows && rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" >
                    <Typography>{row.gameDate.toLocaleString()}</Typography>
                  </TableCell>
                  <TableCell component="th" align="right">
                    <Typography color={row.scores > 150 ? 'secondary' : 'primary'} fontSize="18px" fontWeight="500">{row.scores}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      <Box sx={{mb: 4}}/>

    </>
  )
}

UserGames.propTypes = {
  games: PropTypes.array
}

export default UserGames;