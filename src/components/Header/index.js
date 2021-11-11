import React from 'react'
import PropTypes from 'prop-types'

import { AppBar, Toolbar, Box, Typography } from '@mui/material';


const Header = (props) => {


  return (
    <Box sx={{flexGrow: 1}} >
      <AppBar position="static" variant="outlined" elevation={0} color={props.light ? "transparent" : "primary"}>
        <Toolbar variant="dense" >
          <Typography variant="h6" component="div" sx={{flexGrow:1}}>
            {props.title || ''}
          </Typography>
          {props.rightMenu}
        </Toolbar>
      </AppBar>
    </Box>
  )
}


Header.propTypes = {
  title: PropTypes.string,
  rightMenu: PropTypes.node,
  light: PropTypes.bool
}

export default Header;


