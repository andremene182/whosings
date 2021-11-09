import React from 'react'
import PropTypes from 'prop-types'

import UserBoard from 'containers/Dashboard/UserBoard';
import InitScreen from 'containers/Dashboard/InitScreen';

function Dashboard(props) {

  const Content = () =>{
    if (props.isUserLogged)
      return <UserBoard />
    else
      return <InitScreen />
  } 

  return (
    <div>
      <Content/>
    </div>
  )
}

Dashboard.propTypes = {
  isUserLogged: PropTypes.bool
}

export default Dashboard;

