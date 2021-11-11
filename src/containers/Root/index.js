import React from 'react'

//components
import Header from 'components/Header';

//containers
import Dashboard from 'containers/Dashboard';
import InitScreen from 'containers/InitScreen';
import HighScores from 'containers/HighScores';

//mui
import { Container, Typography, Link as MuiLink } from '@mui/material';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from 'redux/actions/types';

//modules
import PrivateRoute from 'modules/routing/PrivateRoute';

//router
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const Root = (props) => {

  const {isLoggedIn, user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const headerMenu = (
    <>
    <Router>
      <Typography sx={{marginRight: '15px'}} variant="subtitle1"><Link className="no-decoration" to="/high-scores">high scores</Link></Typography>
      {isLoggedIn && <Typography variant="subtitle1" ><MuiLink href="/" className="no-decoration" underline="none" variant="subtitle1" onClick={() => {dispatch({type: LOGOUT})}}>logout</MuiLink></Typography>}  
    </Router>
    </>
  );

  return (
    <>
      <Header title={isLoggedIn ? 'whosings' : ''} light={!isLoggedIn} rightMenu={headerMenu}/>

      <div>
        <Container maxWidth="lg" sx={{marginTop: '20px'}}>
          
          <Router>
            <Routes>
              <Route exact path ='/' element={<InitScreen />} />
              <Route exact path ='/high-scores' element={<HighScores />} />
              <Route exact path='/game' element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Dashboard username={user && user.username} userId={user && user.id}/>
                </PrivateRoute>
              }/>

              <Route path='*' element={'404'}></Route>
                
            </Routes>
            
          </Router>
          
        </Container>
      </div>

     

    </>
  )
}

Root.propTypes = {

}

export default Root;

