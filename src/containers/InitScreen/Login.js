import React, {
  useState
} from 'react';

//mui
import {
  TextField,
  Grid,
  Button
} from '@mui/material';

//modules
import {
  useIndexedDB
} from 'react-indexed-db';
import {
  usersStore,
  userSchema,
  routes
} from 'modules/Core';

//redux
import {
  useDispatch
} from 'react-redux';
import {
  LOGIN_SUCCESS
} from "redux/actions/types";

//router
import {
  useNavigate
} from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState('');
  const { add, getByIndex } = useIndexedDB(usersStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //join the game
  const handleJoin = () => {
    getByIndex('username', username).then(queryResult => {
      if(queryResult){
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {id: queryResult.id, username: queryResult.username}
        });
        navigate(routes.dashboard);
      } else {
        add(userSchema(username)).then(
          queryResult => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: {id: queryResult, username: username}
            });
            navigate(routes.dashboard);
          },
          error => {
            throw new Error ("can't add user");
          }
        );
      }
    });
  }


  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={3}>
          <TextField onChange={(e) => setUsername(e.target.value)} inputProps={{ maxLength: 20 }} color="secondary" helperText="Insert your username to join the game!" label="username" variant="outlined" sx={{mb:2}}/>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={() => {handleJoin()}} variant="contained" disabled={!username}>Join</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Login

