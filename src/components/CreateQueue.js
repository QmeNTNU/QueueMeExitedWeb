import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import { connect } from 'react-redux'; //to get acces to the actioncreater
import { availableChanged, roomChanged, makeQueue, alertNotify } from '../actions'; //all the actions in the actioncreator
import AlertContainer from 'react-alert';
import '../App.css';

class CreateQueue extends Component {

  //calls the reducer to update the state every time the text is changed
    onAvailableChange(text) {
      this.props.availableChanged(text);
    }

    onRoomChange(text) {
      this.props.roomChanged(text);
    }

  //adds the student assistant to the queue
  onButtonPress() {
    //retireves the availible input from state
    const { available, room, myGender } = this.props;
    console.log('QUEUEUEUEUEUEUEUEEUEUE', available, room, myGender);
    const userUID = firebase.auth().currentUser.uid;
    //NOT RETTRIEVE EVERY TIME
    //WHEN I WANT TO TAKE IN VARIABLES, I NEED TO WRITE IT AS .CHILD
    const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
  //calls actioncreater makeQueue with the attribute availible
  //MUST VALIDATE
    this.props.makeQueue({ myGender, available, room, ref });
  }


  renderImage() {
    //gets gender to display either girl or boy
    //eslint comments lets us retrieve image!!!
    /* eslint-disable global-require */
    return (
      <img
        style={{ height: 300, width: 300 }}
        resizeMode="contain"
        src={require('./images/alarm3.png')}
      />
    );
  /* eslint-enable global-require */
  }

  renderArrowDownImage() {
    //eslint comments lets us retrieve image!!!
    /* eslint-disable global-require */
    return (
      <img
        style={{ flex: 1, height: undefined, width: undefined }}
        resizeMode="contain"
      src={require('./images/arrowdown.png')}
      />
    );
  /* eslint-enable global-require */
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
    console.log('SUBJECT', this.props.studassSubject);
    if(this.props.alertMessage !== '') {
      this.showAlert();
      this.props.alertNotify('');
    }

    return (
      <div className="auth-form" >
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="auth-input">
          <h2>{this.props.studassSubject}</h2>
          {this.renderImage()}
          <input
            className="form-control"
            type="text"
            placeholder="Available up to"
            onChange={event => this.onAvailableChange(event.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="rooom number"
            onChange={event => this.onRoomChange(event.target.value)}

          />

        </div>

        <button onClick={this.onButtonPress.bind(this)}
          className="btn btn-primary"
          style={{ borderRadius: 10, backgroundColor: '#F58C6C' }}
        >
          Create Queue
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { available, room, loadingButton, error, studassSubject } = state.createQueue;
  const { myGender } = state.nameRed;
  const { alertMessage } = state.alert;

  //createQueue is from the reducer/index and is the reucer!
  return { available, room, loadingButton, error, studassSubject, myGender, alertMessage };
};

//have to add on the connector for redux to work
//allows me to get the state from the reducer
export default connect(mapStateToProps, { availableChanged, roomChanged, makeQueue, alertNotify })(CreateQueue);
