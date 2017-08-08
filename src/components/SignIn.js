import React, { Component } from 'react';
import { Link } from 'react-router';
import './auth.css';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import { renderAuth, emailChanged, passwordChanged, loginUser, signup, forgotPasswordClick, alertNotify } from '../actions';

class SignIn extends Component {
  renderSignup() {
    this.props.renderAuth('SignUp');
  }
  onEmailChange(text) {
      this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  alertOptions = {
      offset: 14,
      position: 'top left',
      theme: 'dark',
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
    console.log(this.state);
    console.log(this.props);
    console.log(this.props.alertMessage);
    //if alertmessage has been updated, show it and set it to null
    //if i dont set to null, it will showe aT EVERY RENDER
    if(this.props.alertMessage !== '') {
      this.showAlert();
      this.props.alertNotify('');
    }
    return (
      <div className="auth-form" >
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="auth-input">
          <h2>Sign In</h2>

          <input
            className="form-control"
            type="text"
            placeholder="email"
            onChange={event => this.onEmailChange(event.target.value)}
          />
          <input
            className="form-control"
            type="password"
            placeholder="password"
            onChange={event => this.onPasswordChange(event.target.value)}

          />

        </div>
        <button onClick={this.onButtonPress.bind(this)}
          className="btn btn-primary"
          style={{ borderRadius: 10, backgroundColor: '#F58C6C' }}
        >
          Sign in
        </button>
        <button onClick={this.renderSignup.bind(this)}
          className="btn btn-primary"
          style={{ borderRadius: 10, backgroundColor: '#95CAFE' }}
        >
          Sign in
        </button>

      </div>
    )
  }
}

const mapStateToProps = ({ auth, alert }) => {
  const { email, password, loading } = auth;
  const { alertMessage } = alert;
  return {
    email,
    password,
    loading,
    alertMessage
  };
};

export default connect(mapStateToProps, {
   renderAuth, emailChanged, passwordChanged, loginUser, signup, forgotPasswordClick, alertNotify
 })(SignIn);
