import React, {
  useState
} from 'react';
import PropTypes from 'prop-types';

//mui
import {
  Typography,
  MenuItem,
  SwipeableDrawer,
  IconButton,
  Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

//modules
import {
  NavLink
} from 'react-router-dom';
import {
  routes
} from 'modules/Core';
import {
  customTheme
} from 'modules/Theme';

//basic menu
const Menu = (props) => {
  return(
  <>
  <Typography variant="subtitle1"><MenuItem component={NavLink} style={({isActive}) => isActive ?  props.activeMenu : null}   to={routes.high_scores}>high scores</MenuItem></Typography>

    {props.isLoggedIn && (
    <>
      <Typography variant="subtitle1" ><MenuItem  component={NavLink} style={({isActive}) => isActive ?  props.activeMenu : null}  to={routes.game}>play</MenuItem></Typography>
      <Typography variant="subtitle1" ><MenuItem component={NavLink} style={({isActive}) => isActive ?  props.activeMenu : null}   to={routes.dashboard}>dashboard</MenuItem></Typography>
      <Typography  variant="subtitle1" ><MenuItem component={NavLink} to={routes.init}  variant="subtitle1" onClick={() => props.logoutFunction()}>logout</MenuItem></Typography>
    </>)} 
  </>
  )
}

//drawer menu for mobile
const DrawerMenu = (props) => {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  }

    return (
      <>
        <IconButton onClick={toggleDrawer(true)}><MenuIcon color="secondary"/></IconButton>
        <SwipeableDrawer
          anchor='right'
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}>
          <Menu {...props} />
        </SwipeableDrawer>
      </>
    )

  };

//header menu
const HeaderMenu = (props) => {

  const activeMenu = {color: customTheme.palette.secondary.light};

  return (
    <>
    <Grid className='section-desktop'>
      <Menu className='section-desktop' {...props} activeMenu={activeMenu} />
    </Grid>
    <Grid className='section-mobile'>
      <DrawerMenu className='section-mobile' {...props} activeMenu={activeMenu} />
    </Grid>
    </>
  )
}

HeaderMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  logoutFunction: PropTypes.func
}

export default HeaderMenu;

