import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'firebase/auth';
import WebFont from 'webfontloader';
import configureStore from './store/configureStore';

import './index.css';

import App from './App';

const store = configureStore();

WebFont.load({
  google: {
    families: ['Roboto:300,300i,400,400i,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
