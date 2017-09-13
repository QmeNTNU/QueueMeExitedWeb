import React, { Component } from 'react';
import './auth.css';
import firebase from 'firebase';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import {
  SignupEmailChanged,
  SignupPasswordChanged,
  fullnameChanged,
  confirmPasswordChanged,
  createUser,
  genderUpdate,
  login,
  alertNotify,
  renderAuth
} from '../actions';


class SignUp extends Component {
  state = { gender: '' };

  renderSignup() {
    this.props.renderAuth('SignIn');
  }

  onFullnameChange(text) {
    this.props.fullnameChanged(text);
  }
  onSignupEmailChange(text) {
      this.props.SignupEmailChanged(text);
  }
  onSignupPasswordChange(text) {
    this.props.SignupPasswordChanged(text);
  }
  onConfirmPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }

  onButtonPress() {
    //console.log('SIGNING UP');
    const { signupEmail, signupPassword, confirmPassword, fullname } = this.props;
    const { gender } = this.state;
    this.props.createUser({ signupEmail, signupPassword, confirmPassword, fullname, gender });
 }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'ligth',
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


  renderGenderButtons() {
    //works as a checkbox for gender. highlits the button witch match the state
    if (this.state.gender === '') {
      return(
        <div>
        <button onClick={() => this.setState({ gender: 'male' })}
          className="btn btn-primary"
          type="button"
          style={{ flex: 1, width: 150, backgroundColor: '#F58C6C', borderWidth: 0}}
        >
          MALE
        </button>
        <button onClick={() => this.setState({ gender: 'female' })}
          className="btn btn-primary"
          type="button"
          style={{ flex: 1, width: 150, backgroundColor: '#F58C6C', borderWidth: 0}}
        >
          FEMALE
        </button>
      </div>
      );
    }
    if (this.state.gender === 'female') {
      return(
        <div>
        <button onClick={() => this.setState({ gender: 'male' })}
          className="btn btn-primary"
          type="button"
          style={{ flex: 1, width: 150, backgroundColor: '#F58C6C', borderWidth: 0}}
        >
          MALE
        </button>
        <button onClick={() => this.setState({ gender: 'female' })}
          className="btn btn-primary"
          type="button"
          style={{ flex: 1, width: 150, backgroundColor: '#f9b6a2', borderWidth: 0  }}
        >
          FEMALE
        </button>
      </div>
      );
    }
    if (this.state.gender === 'male') {
      return(
        <div>
        <button onClick={() => this.setState({ gender: 'male' })}
          className="btn btn-primary"
          type="button"
          style={{ flex: 1, width: 150, backgroundColor: '#f9b6a2', borderWidth: 0 }}
        >
          MALE
        </button>
        <button onClick={() => this.setState({ gender: 'female' })}
          className="btn btn-primary"
          type="button"
          style={{ flex: 1, width: 150, backgroundColor: '#F58C6C', borderWidth: 0}}
        >
        FEMALE
        </button>
      </div>
      );
    }
  }
  render() {
    //console.log(this.state);
    //console.log(this.props);
    //console.log(this.props.alertMessage);
    //console.log('FIREBASE USER', firebase.auth().currentUser);
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
        <h1>Sign Up</h1>
        <img src={require('./images/divider.png')} style={{width: 300}} alt="logo" />

        <input
          className="form-control"
          type="text"
          placeholder="Name"
          style={{ marginBottom: 5 }}
          value={this.props.fullname} //input verdi for fullname
          onChange={event => this.onFullnameChange(event.target.value)}
        />
        <input
          className="form-control"
          type="text"
          placeholder="email"
          style={{ marginBottom: 5 }}
          value={this.props.signupEmail} //input verdi for email
          onChange={event => this.onSignupEmailChange(event.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="password"
          style={{ marginBottom: 5 }}
          value={this.props.signupPassword}
          onChange={event => this.onSignupPasswordChange(event.target.value)}

        />
        <input
          className="form-control"
          type="password"
          placeholder="confirm password"
          style={{ marginBottom: 5 }}
          value={this.props.confirmPassword}
          onChange={event => this.onConfirmPasswordChange(event.target.value)}
        />

      </div>
      <div className="gender">
        {this.renderGenderButtons()}
      </div>
      <button onClick={this.onButtonPress.bind(this)}
        className="btn btn-primary"
        type="button"
        style={{ borderRadius: 5, backgroundColor: '#F58C6C', borderWidth: 0, marginTop: 5 }}
      >
        Sign Up
      </button>
      <button onClick={this.renderSignup.bind(this)}
        className="btn btn-primary"
        style={{ borderRadius: 5, backgroundColor: '#95CAFE', borderWidth: 0 }}
      >
        Already have an account? Sign in
      </button>
    </div>
    )
  }
}
const mapStateToProps = ({ reg, alert }) => {
  const { signupEmail, signupPassword, confirmPassword, fullname, gender, loading } = reg;
  const { alertMessage } = alert;
  return {
    signupEmail,
    signupPassword,
    confirmPassword,
    fullname,
    gender,
    loading,
    alertMessage
  };
};


export default connect(mapStateToProps, {
  SignupEmailChanged,
  SignupPasswordChanged,
  fullnameChanged,
  confirmPasswordChanged,
  createUser,
  genderUpdate,
  login,
  alertNotify,
  renderAuth
})(SignUp);
