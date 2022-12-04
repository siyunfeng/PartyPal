import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AllRoutes from './components/AllRoutes';
import '../public/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={store}>
    <AllRoutes />
  </Provider>,
  document.getElementById('app')
);
