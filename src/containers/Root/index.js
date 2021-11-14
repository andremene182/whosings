import React from 'react'

//components
import Header from 'components/Header';

//containers
import Dashboard from 'containers/Dashboard';
import InitScreen from 'containers/InitScreen';
import HighScores from 'containers/HighScores';
import QuizGame from 'containers/QuizGame';

//mui
import { Container, Typography, Link as MuiLink } from '@mui/material';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from 'redux/actions/types';

//modules
import PrivateRoute from 'modules/routing/PrivateRoute';
import {routes} from 'modules/core';

//router
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const Root = (props) => {

  const {isLoggedIn, user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const headerMenu = (
    <>
      <Typography sx={{marginRight: '15px'}} variant="subtitle1"><Link className="no-decoration" to={routes.high_scores}>high scores</Link></Typography>
      {isLoggedIn && (
      <>
        <Typography sx={{marginRight: '15px'}} variant="subtitle1" ><Link className="no-decoration" to={routes.game}>play</Link></Typography>
        <Typography sx={{marginRight: '15px'}} variant="subtitle1" ><Link className="no-decoration" to={routes.dashboard}>dashboard</Link></Typography>
        <Typography  variant="subtitle1" ><MuiLink href={routes.init} className="no-decoration" underline="none" variant="subtitle1" onClick={() => {dispatch({type: LOGOUT})}}>logout</MuiLink></Typography>
      </>)}  
    </>
  );

  return (
    <>
    <Router>
      <Header title={isLoggedIn ? 'whosings' : ''} light={!isLoggedIn} rightMenu={headerMenu}/>

      <div>
        <Container maxWidth="lg" sx={{marginTop: '20px'}}>
          
            <Routes>
              <Route exact path ={routes.init} element={<InitScreen />} />
              <Route  path ={routes.high_scores} element={<HighScores />} />
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

Root.propTypes = {

}

export default Root;

