import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import 'bootstrap/dist/css/bootstrap.css';

import style from './stylesheets/style.css';
import { Provider } from 'react-redux';
import store from './store.js'; 

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
