import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import CreateQueue from './CreateQueue';
import { Link } from 'react-router';
import Settings from './Settings';
import AlertContainer from 'react-alert';
import './auth.css';
import '../App.css';
import { connect } from 'react-redux';
import { addCode, codeChanged, alertNotify } from '../actions';

class StudassLockUp extends Component {

  onCodeChange(text) {
    this.props.codeChanged(text);
  }

  onButtonPress() {
    const { code } = this.props;
    this.props.addCode({ code });

  }
  alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'light',
      time: 5000,
      transition: 'scale'
    }

  showAlert = () => {
      this.msg.show(this.props.alertMessage, {
        time: 2000,
        type: 'success',
        icon: <img src={require('./images/alertError.png')} />
      })
    }

  render() {
    //console.log(this.props.code);
    if(this.props.alertMessage !== '') {
      this.showAlert();
      this.props.alertNotify('');
    }
    return (
      <div>
      <div className="App">

        <div className="App-header">
          <div className="header-image">
          <img src={require('./images/Header.png')} style={{height: '60%'}} alt="logo" />
          </div>


          <div className="header-buttons">
            <Settings />
          </div>
        </div>


        <div className="App-main">
          <div className="App-main"></div>

          <div className="auth-form" >
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <div className="auth-input">

              <img src={require('./images/code.png')} style={{width: 200}} alt="logo" />
              <h1>Enter code</h1>
              <img src={require('./images/divider.png')} style={{width: 200}} alt="logo" />

              <input
                className="form-control"
                type="password"
                placeholder="Enter studass code"
                style={{ marginBottom: 5 }}
                onChange={event => this.onCodeChange(event.target.value)}

              />

            </div>
            <button onClick={this.onButtonPress.bind(this)}
              className="btn btn-primary"
              style={{ borderRadius: 5, backgroundColor: '#F58C6C', borderWidth: 0 }}
            >
              Continue
            </button>
            <button onClick={()=>console.log('')}
              className="btn btn-primary"
              style={{ borderRadius: 5, backgroundColor: '#95CAFE', borderWidth: 0 }}
            >
              You only have to do this once
            </button>

          </div>
          <div className="App-main"></div>

        </div>



    </div>
    <div className="under-Div">
      <h1>ABOUT US</h1>
      <img src={require('./images/divider.png')} className="info-image" alt="logo" />
      <small className="info-scale">QueueMe is made possible by the Exited project, and is  created to streamline the time-consuming queue system at NTNU. QueueMe is first and foremost created as a mobile app, and we therefore recomend using the mobile platform as the user experience is better. You can download the app on The App Store og Google Play</small>
      <div style={{ flexDirection: 'row', height: 100}}>
        <img src={require('./images/appstore.png')} className="info-image" alt="logo" />
        <img src={require('./images/googleplay.png')} className="info-image" alt="logo" />
      </div>
      </div>
  </div>
    );
  }
}

const mapStateToProps = state => {

  const { code } = state.lock;
  const { alertMessage } = state.alert;

  return { code, alertMessage };
};

export default connect(mapStateToProps,
  { addCode, codeChanged, alertNotify })(StudassLockUp);
