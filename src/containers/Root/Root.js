import React from 'react'

//components
import Header from 'components/Header/Header';
import HeaderMenu from 'components/HeaderMenu/HeaderMenu';

//containers
import Dashboard from 'containers/Dashboard/Dashboard';
import InitScreen from 'containers/InitScreen/InitScreen';
import HighScores from 'containers/HighScores/HighScores';
import QuizGame from 'containers/QuizGame/QuizGame';

//mui
import { Container} from '@mui/material';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from 'redux/actions/types';

//modules
import PrivateRoute from 'modules/routing/PrivateRoute';
import RedirectRoute from 'modules/routing/RedirectRoute';

import {routes} from 'modules/Core';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';


const Root = () => {

  const {isLoggedIn, user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  //logout funct
  const logout = () => {
    dispatch({type: LOGOUT});
  }

  return (
    <>
    <Router>
      <Header title={isLoggedIn ? 'whosings' : ''} light={!isLoggedIn} rightMenu={<HeaderMenu isLoggedIn={isLoggedIn} logoutFunction={logout} />}/>

      <div>
        <Container maxWidth="lg" sx={{marginTop: '20px'}}>
            <Routes>
              <Route exact path={routes.init} element={
                <RedirectRoute isLoggedIn={isLoggedIn}>
                  <InitScreen />
                </RedirectRoute>
              }/>

              <Route  path ={routes.high_scores} element={<HighScores userId={user && user.id} />} />
              <Route exact path={routes.dashboard} element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Dashboard username={user && user.username} userId={user && user.id}/>
                </PrivateRoute>
              }/>

              <Route exact path={routes.game} element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <QuizGame username={user && user.username} userId={user && user.id}/>
                </PrivateRoute>
              }/>

              <Route path='*' element={'404'}></Route>
            </Routes>
        </Container>
      </div>
      </Router>
    </>
  )
}


export default Root;

