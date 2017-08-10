import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import Settings from './Settings';

import { connect } from 'react-redux'; //to get acces to the actioncreater
import { availableChanged, roomChanged, makeQueue, alertNotify } from '../actions'; //all the actions in the actioncreator
import AlertContainer from 'react-alert';
import '../App.css';


class CreateQueue extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.checkRecover();
      console.log('FIREBASE USER NAME', user);
    } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });

  }

  checkRecover() {
    console.log('Checkrecover');
    const userUID = firebase.auth().currentUser.uid;
    if (this.props.studassSubject !== '') {
    ///////////////////////CHECKS IF EXIST AS STUDENT assistant//////////////////////////////////
          const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist`);
                ref.once('value', snapshot => { // only called once
              console.log(snapshot.val() === null);
              //if the queue is empty ( in case studass deletes it)
              //we jump over iterating becouse we know we are not there
              if (snapshot.val() === null) {
                return true;
              }
              snapshot.forEach(childSnapshot => {
                //should recover studasqueue if userid existst at location
                console.log('CHILD_UID', childSnapshot.val().userUID);
                console.log('MY_UID', userUID);

                if (userUID === childSnapshot.val().userUID) {
                  //sets needed values to state
                  //continues queue
                  browserHistory.push('/StudassQueue');

                }
                //if it doesent find anything, it is all good
              });
            });
          }
        ///////////////////////////////////////////////////////////////////////////////////////
        if (this.props.subject !== '' && this.props.studassLocation !== '') {
        ////////////////CHECKS IF ADDED TO A LINE/////////////////////////////////////////////
        const { studRef } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
              studRef.once('value', snapshot => { // only called once
            console.log(snapshot.val() === null);
            //if the queue is empty ( in case studass deletes it)
            //we jump over iterating becouse we know we are not there
            if (snapshot.val() === null) {
              return true;
            }
            snapshot.forEach(childSnapshot => {
              //should recover studasqueue if userid existst at location
              console.log('CHILD_UID', childSnapshot.val().userUID);
              console.log('MY_UID', userUID);

              if (userUID === childSnapshot.val().userUID) {
                //sets needed values to state


                //continues queue
                browserHistory.push('/InQueue');

              }
              //if it doesent find anything, it is all good
            });
          });
        }
        ///////////////////////////////////////////////////////////////////////////////
  }
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
        style={{ height: 200, width: 200 }}
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
  render() {
    console.log('SUBJECT', this.props.studassSubject);
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
        <div className="list-header">
          <h1 className="header-textphoto" >you're about to start a queue in {this.props.studassSubject}</h1>
          <img src={require('./images/divider.png')} className="auth-divider " alt="logo" />
        </div>



        <div className="list-container">
          <div className="auth-form" >
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <div className="auth-input">

              {this.renderImage()}
                <div className="createQueue-info" style={{ borderRadius: 5}}>
              <input
                className="form-control"
                type="text"
                placeholder="Available up to"
                style={{ marginBottom: 5 }}
                onChange={event => this.onAvailableChange(event.target.value)}
              />
              <input
                className="form-control"
                type="text"
                placeholder="rooom number"
                onChange={event => this.onRoomChange(event.target.value)}

              />

            </div>
            </div>
            <button onClick={this.onButtonPress.bind(this)}
              className="btn btn-primary"
              style={{ borderRadius: 3, backgroundColor: '#F58C6C', width: 300, borderWidth: 0, marginTop: 5 }}
            >
              Create Queue
            </button>


          </div>
        </div>

      </div>
      <div className="under-Div">
        <h1>ABOUT US</h1>
        <img src={require('./images/dividerdark.png')} className="info-image" alt="logo" />
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

const mapStateToProps = (state) => {
  const { available, room, loadingButton, error, studassSubject } = state.createQueue;
  const { myGender } = state.nameRed;
  const { alertMessage } = state.alert;
  const { studassLocation, subject } = state.queueInfo;

  //createQueue is from the reducer/index and is the reucer!
  return { available, room, loadingButton, error, studassSubject, myGender, alertMessage, studassLocation, subject };
};

//have to add on the connector for redux to work
//allows me to get the state from the reducer
export default connect(mapStateToProps, { availableChanged, roomChanged, makeQueue, alertNotify })(CreateQueue);
