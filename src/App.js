import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderAuth } from './actions';

import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


class App extends Component {

renderSignInOrSignOut() {
  if (this.props.renderAuthConst === "SignUp") {
  return <SignUp />;
  }
  return <SignIn />;
}

  render() {
    console.log(this.props.renderAuthConst);
    return (
      <div className="App">

        <div className="App-header">
          <img src={require('./components/images/Header.png')} className="header-image" alt="logo" />
        </div>

        <div className="App-main">
          <div>
            {this.renderSignInOrSignOut()}
          </div>
          <div>
            <img src={require('./components/images/welcomeslide5.png')} className="App-logo" alt="logo" />
          </div>
        </div>

        <div className="under-Div">
            <div className="info">
              <div className="under-info">
                <img src={require('./components/images/welcomeslide5.png')} className="info-image" alt="logo" />
              </div>
              <div className="under-info">
                <small>Available on mobile</small>
              </div>
            </div>


        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ render }) => {
  const { renderAuthConst } = render;
  return { renderAuthConst };
};

export default connect(mapStateToProps, { renderAuth })(App);
