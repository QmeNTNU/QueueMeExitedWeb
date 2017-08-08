import React, {Component} from 'react'
import { connect } from 'react-redux';
import {
  DeletePress,
  LogOutPress
} from '../actions';

class Settings extends Component {

  onLogOutPress() {
    this.props.LogOutPress();
  }

  render () {
    return (
      <div className="auth-form">
        <div className="auth-input">
          <button onClick={this.onLogOutPress.bind(this)}
            className="auth-btn"
            style={{ borderRadius: 10, backgroundColor: '#F58C6C' }}
          >
            log out
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  LogOutPress,
  DeletePress
})(Settings);
