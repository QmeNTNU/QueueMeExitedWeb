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
      <div style={{ flex: 1, flexDirection: 'column'  }}>
        <div style={{   height: 40, justifyContent: 'center', alignItems: 'center',   backgroundColor: '#F58C6C'}}>
          <h2>
          You're about to enter a queue:
          </h2>
        </div>


        <div style={{ flex: 2, backgroundColor: '#213140', borderRadius: 5, marginTop: 40, marginLeft: 40, marginRight: 40 }}>

          <div className="home-main">

            <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#ffffff', marginTop: 10 }}>

              <h2>{this.props.studass}</h2>
            </div>

            <div className="App-main" >
              <h2>People in line: </h2>
              <h2>{this.props.studasscount}</h2>
            </div>


            <div className="App-main" >
              <h2>Subject: </h2>
              <h2>{this.props.subject}</h2>
            </div>


            <div className="App-main" >
              <h2>Available until: </h2>
              <h2>{this.props.available}</h2>
            </div>

            <div className="App-main" >
              <h2>Room: </h2>
              <h2>{this.props.room}</h2>
            </div>
          </div>
      </div>

      <div style={{ height: 60, marginTop: 5, marginLeft: 40, marginRight: 40 }}>
        <button onClick={this.onButtonBluePress.bind(this)}>
          Add me to queue
        </button>
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
