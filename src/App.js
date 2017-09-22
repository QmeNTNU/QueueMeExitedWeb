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
    //console.log(this.props.renderAuthConst);
    return (
      <div>
      <div className="App">

        <div className="App-header">
          <div className="header-image">
          <img src={require('./components/images/Header.png')} style={{height: '60%'}} alt="logo" />
          </div>


          <div className="header-buttons">

          </div>
        </div>

        <div className="App-main">
          <div>
            {this.renderSignInOrSignOut()}
          </div>
        </div>


      </div>
      <div className="App">



        <div className="AppBlue">
          <h1>How it works</h1>
          <img src={require('./components/images/divider.png')} className="info-image" alt="logo" />
              <h2 style={{color: '#2c3e50'}}>Student assistent</h2>

              <div className="info">
                <div className="under-info"><img src={require('./components/images/webLock.png')} className="info-image2" alt="logo" /><div>1. Enter code</div></div>
                <div className="under-info"><img src={require('./components/images/webChooseassSubject.png')} className="info-image2" alt="logo" /><div>2. Choose subject</div></div>
                <div className="under-info"><img src={require('./components/images/webCreateQueue.png')} className="info-image2" alt="logo" /><div>3. Create Queue!</div></div>

              </div>
              <h2 style={{color: '#2c3e50'}}>Student</h2>

              <div className="info">
                <div className="under-info"><img src={require('./components/images/webChooseStudSubject.png')} className="info-image2" alt="logo" /><div>1. Choose Subject</div></div>
                <div className="under-info"><img src={require('./components/images/webchoose.png')} className="info-image2" alt="logo" /><div>2. Choose studass</div></div>
                <div className="under-info"><img src={require('./components/images/webInQueue.png')} className="info-image2" alt="logo" /><div>3. Join a queue!</div></div>

              </div>

        </div>


      </div>

      <div className="under-Div">
        <h1>ABOUT US</h1>
        <img src={require('./components/images/divider.png')} className="info-image" alt="logo" />
        <small className="info-scale">QueueMe is made possible by the Exited project, and is  created to streamline the time-consuming queue system at NTNU. QueueMe is first and foremost created as a mobile app, and we therefore recomend using the mobile platform as the user experience is better. You can download the app on The App Store or Google Play</small>
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
