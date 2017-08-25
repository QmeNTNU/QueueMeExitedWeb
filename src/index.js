import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import firebase from 'firebase';
import { firebaseApp } from './firebase';
import reducer from './reducers';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));



ReactDOM.render(
  <Provider store={store}>
  <Router path="/" history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
</Provider>, document.getElementById('root'));
