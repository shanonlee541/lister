import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Test from './components/Test.jsx';
import App from './components/App.jsx';

// uncomment so that webpack can bundle styles
import style from './stylesheets/style.css';

render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
