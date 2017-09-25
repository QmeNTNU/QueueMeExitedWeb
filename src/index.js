import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import firebase from 'firebase';
import reducer from './reducers';
import { firebaseApp } from './firebase';

import './index.css';
import App from './App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import alert from './components/alert';
import Home from './components/Home';
import Settings from './components/Settings';
import addSubject from './components/addSubject';

import ChooseSubjectAss from './components/ChooseSubjectAss';
import ChooseSubjectStud from './components/ChooseSubjectStud';
import ChooseStudass from './components/ChooseStudass';
import CreateQueue from './components/CreateQueue';
import StudassQueue from './components/StudassQueue';
import QueueInfo from './components/QueueInfo';
import InQueue from './components/InQueue';
import StudassLockUp from './components/StudassLockUp';


const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

firebase.auth().onAuthStateChanged((user) => {
if (user) {
  //console.log('user has signed in or up');
  browserHistory.replace('/Home');

        //waits 2 seconds "kunstpause"
        //NEED TO STOP????????
      //  setTimeout(() => { this.setState({ loggedIn: true }); }, 2000);
} else {
  //console.log('user has signed out or still needs to sign in.');
  browserHistory.replace('/Login');
        //waits 2 seconds "kunstpause"
        //setTimeout(() => { this.setState({ loggedIn: false }); }, 2000);
      }
});




ReactDOM.render(
  <Provider store={store}>
  <Router path="/" history={browserHistory}>
    <Route path="/Login" component={App} />
    <Route path="/SignIn" component={SignIn} />
    <Route path="/SignUp" component={SignUp} />
    <Route path="/alert" component={alert} />
    <Route path="/Home" component={Home} />
    <Route path="/Settings" component={Settings} />
    <Route path="/addSubject" component={addSubject} />

    <Route path="/ChooseSubjectAss" component={ChooseSubjectAss} />
    <Route path="/CreateQueue" component={CreateQueue} />
    <Route path="/StudassQueue" component={StudassQueue} />
    <Route path="/ChooseSubjectStud" component={ChooseSubjectStud} />
    <Route path="/ChooseStudass" component={ChooseStudass} />
    <Route path="/QueueInfo" component={QueueInfo} />
    <Route path="/InQueue" component={InQueue} />
    <Route path="/StudassLockUp" component={StudassLockUp} />


  </Router>
</Provider>, document.getElementById('root'));
