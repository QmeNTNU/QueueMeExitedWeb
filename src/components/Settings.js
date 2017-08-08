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
          <button onClick={this.onLogOutPress.bind(this)}
            className="btn btn-primary"
            style={{ borderRadius: 5, backgroundColor: '#F58C6C', borderWidth: 0  }}
          >
            log out
          </button>
    )
  }
}

export default connect(null, {
  LogOutPress,
  DeletePress
})(Settings);
