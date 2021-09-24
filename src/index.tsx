import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/ui/App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './main/bll/store/store';

ReactDOM.render(
    <HashRouter>
  <React.StrictMode>
    <Provider store={store}>
    <App />
   </Provider>
  </React.StrictMode>
    </HashRouter>,
  document.getElementById('root')
);


reportWebVitals();
