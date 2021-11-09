import React from 'react'

//components
import Header from 'components/Header';

//containers
import Dashboard from 'containers/Dashboard';
import { Container } from '@mui/material';

//import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';


const Root = (props) => {


  var isUserLogged = false;

  return (
    <>
      <Header title={isUserLogged ? 'whosings' : ''} light={!isUserLogged}/>

      <div>
        <Container maxWidth="lg" sx={{marginTop: '20px'}}>
          <Dashboard isUserLogged={isUserLogged}/>
        </Container>
      </div>

    </>
  )
}

Root.propTypes = {

}

export default Root;

