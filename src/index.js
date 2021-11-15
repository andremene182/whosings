import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  customTheme
} from 'modules/Theme';
import {
  ThemeProvider
} from '@mui/material/styles'

//redux
import store from 'redux/store';
import {
  Provider
} from 'react-redux';



ReactDOM.render( 
  <React.StrictMode>
  <Provider store = {store}>
  <ThemeProvider theme = {customTheme}>
  <App/>
  </ThemeProvider> </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();