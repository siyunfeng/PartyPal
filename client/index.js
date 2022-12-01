import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AllRoutes from './components/WelcomePage';
import '../public/style.css';

render(
  <Provider store={store}>
    <AllRoutes />
  </Provider>,
  document.getElementById('app')
);
