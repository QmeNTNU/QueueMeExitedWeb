import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import '../App.css';

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
  } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
        }
  });
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
          <img src={require('./images/Header.png')} className="header-image" alt="logo" />
          <div>
            <button onClick={console.log('df')}
              className="btn btn-primary"
              style={{ borderRadius: 5, backgroundColor: '#2c3e50', borderWidth: 0 }}
            >
              About us
            </button>
          </div>
        </div>

        <div className="queue-info-main">


                        <div className="info-container" >
                          <h2>{this.props.studass}</h2>
                        </div>

                        <div className="info-container" >
                          <h2>People in line: </h2>
                          <h2>{this.props.studasscount}</h2>
                        </div>


                        <div className="info-container" >
                          <h2>Subject: </h2>
                          <h2>{this.props.subject}</h2>
                        </div>


                        <div className="info-container" >
                          <h2>Available until: </h2>
                          <h2>{this.props.available}</h2>
                        </div>

                        <div className="info-container" >
                          <h2>Room: </h2>
                          <h2>{this.props.room}</h2>
                        </div>



                  <div style={{ height: 60, marginTop: 5, marginLeft: 40, marginRight: 40 }}>
                    <button onClick={this.onButtonBluePress.bind(this)}>
                      Add me to queue
                    </button>
                  </div>

            </div>


          </div>
          <div className="under-Div">
              <h1>ABOUT US</h1>
              <img src={require('./images/dividerdark.png')} className="info-image" alt="logo" />
              <small style={{width: 400}}>QueueMe is made possible by the Exited project, and is  created to streamline the time-consuming queue system at NTNU. QueueMe is first and foremost created as a mobile app, and we therefore recomend using the mobile platform as the user experience is better. You can download the app on The App Store og Google Play</small>
          </div>
        </div>
      );
}

  render() {
      console.log(this.props);
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

    return { subject, studass, available, studasscount, studassLocation, myGender, room };
  };

  export default connect(mapStateToProps, { setInfo, getCount, addToQueue })(QueueInfo);
