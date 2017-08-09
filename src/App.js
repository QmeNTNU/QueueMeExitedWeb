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
      <div>
      <div className="App">

        <div className="App-header">
          <img src={require('./components/images/Header.png')} className="header-image" alt="logo" />
          <button onClick={console.log('df')}
            className="btn btn-primary"
            style={{ borderRadius: 5, backgroundColor: '#2c3e50', borderWidth: 0 }}
          >
            About us
          </button>
        </div>

        <div className="App-main">
          <div>
            {this.renderSignInOrSignOut()}
          </div>
        </div>


      </div>
      <div className="under-Div">
        <h1>ABOUT US</h1>
        <img src={require('./components/images/dividerdark.png')} className="info-image" alt="logo" />
        <small style={{width: 400}}>QueueMe is made possible by the Exited project, and is  created to streamline the time-consuming queue system at NTNU. QueueMe is first and foremost created as a mobile app, and we therefore recomend using the mobile platform as the user experience is better. You can download the app on The App Store og Google Play</small>
        <div style={{ flexDirection: 'row', height: 100}}>
          <img src={require('./components/images/appstore.png')} className="info-image" alt="logo" />
          <img src={require('./components/images/googleplay.png')} className="info-image" alt="logo" />
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
