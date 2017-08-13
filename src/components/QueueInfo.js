import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import '../App.css';
import { Link } from 'react-router';
import Settings from './Settings';

import { setInfo, getCount, addToQueue } from '../actions';

class QueueInfo extends Component {

  //want to watch for a queue the instant the scene is loaded
  componentWillMount() {
  //connect(props) do not get fetched properly before componenDIDmount. moved it there instead
  }

componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
    //starts the listener for
    this.props.getCount(ref);
    this.checkRecover();
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
        console.log('CHECK INLINE', this.props.subject, this.props.studassLocation );

      ////////////////CHECKS IF ADDED TO A LINE/////////////////////////////////////////////
      const studRef = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
      console.log('HELLOOOO');
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

              console.log('WTF????????????');
              //continues queue
              browserHistory.push('/InQueue');

            }
            //if it doesent find anything, it is all good
          });
        });
      }
      ///////////////////////////////////////////////////////////////////////////////
}

onButtonBluePress() {
  //gets user name from props (value is retireved and sat to reducer in home-scene)
  const { myGender } = this.props;
  //makes ref from where we want to retrieve data
  const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
  //add user to queue and saves the push location to state
  //this location is used in next scene (in quit queue)
  this.props.addToQueue({ ref, myGender });
}
//when quiting queue






renderImage() {
  //gets gender to display either girl or boy
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = this.props.firstGender === 'female' ? require('./images/studassqueuewoman3.png') : require('./images/studassqueue3.png');
  return (
    <img
      style={{ height: 300, width: 300 }}
      src={icon}
    />
  );
/* eslint-enable global-require */
}

renderEmptyImage() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <img
    style={{ height: 300, width: 300 }}
    src={require('./images/emptyLine2.png')}
    />
  );
/* eslint-enable global-require */
}

renderArrowDownImage() {
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  return (
    <img
    style={{ height: 300, width: 300 }}
    src={require('./images/arrowdownblue.png')}
    />
  );
/* eslint-enable global-require */
}

//depeding if the queue is empty, and depending on the first persons gender,
//we want to render the screen differently
renderScreen() {

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
          <h1 className="header-textphoto" >You are about to enter the following line: </h1>
          <img src={require('./images/divider.png')} className="auth-divider " alt="logo" />
        </div>

        <div className="queue-info-main">

          <div style={{backgroundColor: '#95CAFE', borderRadius: 5, flex: 1}}>
                <div className="queueinfo" style={{borderRadius: 5}}>
                        <div className="info-header" style={{borderRadius: 5}} >
                          <h2 className="inqueue-header" >{this.props.studass}</h2>
                        </div>

                        <div className="info-container">
                          <h2 className="inqueue-text"  style={{ color: '#F58C6C' }}>People in line: </h2>
                          <h2 className="inqueue-text" > {this.props.studasscount}</h2>
                        </div>


                        <div className="info-container" >
                          <h2 className="inqueue-text"  style={{ color: '#F58C6C' }}>Subject: </h2>
                          <h2 className="inqueue-text" > {this.props.subject}</h2>
                        </div>


                        <div className="info-container" >
                          <h2 className="inqueue-text"  style={{ color: '#F58C6C' }}>Available until: </h2>
                          <h2 className="inqueue-text" > {this.props.available}</h2>
                        </div>

                        <div className="info-container" style={{borderRadius: 5}}>
                          <h2 className="inqueue-text"  style={{ color: '#F58C6C' }}>Room: </h2>
                          <h2 className="inqueue-text" > {this.props.room}</h2>
                        </div>
                    </div>


                  <div style={{ height: 60, marginTop: 5, width: '100%' }}>
                    <button onClick={this.onButtonBluePress.bind(this)}
                      className="btn btn-primary"
                      style={{ borderRadius: 5, backgroundColor: '#F58C6C', borderWidth: 0, width: '100%', height: 60 }}
                    >
                      Add me to queue
                    </button>
                  </div>
              </div>
                <div className="queue-info-main"></div>
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

  render() {
    return (
      this.renderScreen()
      );
    }
  }


  const mapStateToProps = (state) => {
    //retireves info to display
    const { subject, studass, available, studassLocation, room } = state.queueInfo;
    const { studasscount } = state.count;
    const { myGender } = state.nameRed;
    const { studassSubject } = state.createQueue;
    return { subject, studass, available, studasscount, studassLocation, myGender, room, studassSubject };
  };

  export default connect(mapStateToProps, { setInfo, getCount, addToQueue })(QueueInfo);
