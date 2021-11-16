import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Test from './components/AddForm.jsx';
import App from './components/App.jsx';
import 'bootstrap/dist/css/bootstrap.css';

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
