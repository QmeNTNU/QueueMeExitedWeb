import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import '../App.css';

import { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine } from '../actions';

class StudassQueue extends Component {

  //want to watch for a queue the instant the scene is loaded
  componentWillMount() {
  //connect(props) do not get fetched properly before componenDIDmount. moved it there instead
  }

componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userUID = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}/queue`);
    //starts the listener for
    this.props.firstInLine({ ref });
    this.props.getCount({ ref });
      window.addEventListener("beforeunload", this.onUnload);
  } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
        }
  });

  //on timeout the queue will be deleted
  //KAN VURDERE OG SETTE EN STATE "TOUCHED" TIL Å SE HVOR LENGE SIDEN DET ER STUDASS VAR AKTIV
/*  const deleteRef = firebase.database().ref('/Person');
  setTimeout(() => {
    //popup dialog to tell user timeout deleted the queue
      Alert.alert(
      'Timeout',
      'Your queue had reached its maximum of 6 hours. To protect against inactive queues you are taken to the home screen',
        [
          { text: 'OK', onPress: () => this.props.deleteQueue(deleteRef) },
        ]
      );
   }, 10000);*/
}

onUnload(event) { // the method that will be used for both add and remove event
        console.log("hellooww")
        event.returnValue = "If you refresh, you will be deleted from this queue!";
    }
    componentWillUnmount() {
           window.removeEventListener("beforeunload", this.onUnload);
       }




//when quiting queue
onQuitPress() {
  const userUID = firebase.auth().currentUser.uid;
//gets ref to delete (whole node)
const deleteRef = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}`);
//popup dialog to make sure if user wants to quit
this.props.deleteQueue(deleteRef);
}

//when goint to next in line
onNextPress() {
  const userUID = firebase.auth().currentUser.uid;
  const firstUID = this.props.firstKey;
  console.log('firstKey', firstUID);
  const nextRef = firebase.database().ref(`Subject/${this.props.studassSubject}/studasslist/${userUID}/queue/${firstUID}`);
if (this.props.first !== 'There are no students in line') {
  this.props.nextDelete(nextRef);
}

}





renderImage() {
  //gets gender to display either girl or boy
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = this.props.firstGender === 'female' ? require('./images/studassqueuewoman3.png') : require('./images/studassqueue3.png');
  return (
    <img
      style={{ height: 200, width: 200 }}
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
    style={{ height: 200, width: 200 }}
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
    /* eslint-disable global-require */
  if (this.props.studasscount === 0) {
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

        <div>
          <h2>Next in line:</h2>
        </div>

        <div>
          {this.renderEmptyImage()}
        </div>

      <h2>{this.props.first}</h2>


        <div>
          <button onClick={this.onQuitPress.bind(this)}
            className="btn btn-primary"
            type="button"
            style={{ borderRadius: 5, backgroundColor: '#95CAFE', borderWidth: 0, marginTop: 5 }}
          >
            QUIT
          </button>
          <button onClick={this.onNextPress.bind(this)}
            className="btn btn-primary"
            type="button"
            style={{ borderRadius: 5, backgroundColor: '#2ecc71', borderWidth: 0, marginTop: 5, width: 150 }}
          >
            NEXT
          </button>
        </div>


      </div>


    </div>
    <div className="under-Div">
      <h1>ABOUT US</h1>
      <img src={require('./images/dividerdark.png')} className="info-image" alt="logo" />
      <small style={{width: 400}}>QueueMe is made possible by the Exited project, and is  created to streamline the time-consuming queue system at NTNU. QueueMe is first and foremost created as a mobile app, and we therefore recomend using the mobile platform as the user experience is better. You can download the app on The App Store og Google Play</small>
      <div style={{ flexDirection: 'row', height: 100}}>
        <img src={require('./images/appstore.png')} className="info-image" alt="logo" />
        <img src={require('./images/googleplay.png')} className="info-image" alt="logo" />
      </div>
      </div>
  </div>
      );
  }
    /* eslint-enable global-require */
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

        <div>
          <h2>Next in line:</h2>
        </div>

        <div>
          {this.renderImage()}
        </div>

      <h2>{this.props.first}</h2>
      <h2>Students in line: {this.props.studasscount} </h2>


        <div>
          <button onClick={this.onQuitPress.bind(this)}
            className="btn btn-primary"
            type="button"
            style={{ borderRadius: 5, backgroundColor: '#95CAFE', borderWidth: 0, marginTop: 5 }}
          >
            QUIT
          </button>
          <button onClick={this.onNextPress.bind(this)}
            className="btn btn-primary"
            type="button"
            style={{ borderRadius: 5, backgroundColor: '#2ecc71', borderWidth: 0, marginTop: 5, width: 150 }}
          >
            NEXT
          </button>
        </div>


      </div>


    </div>
    <div className="under-Div">
      <h1>ABOUT US</h1>
      <img src={require('./images/dividerdark.png')} className="info-image" alt="logo" />
      <small style={{width: 400}}>QueueMe is made possible by the Exited project, and is  created to streamline the time-consuming queue system at NTNU. QueueMe is first and foremost created as a mobile app, and we therefore recomend using the mobile platform as the user experience is better. You can download the app on The App Store og Google Play</small>
      <div style={{ flexDirection: 'row', height: 100}}>
        <img src={require('./images/appstore.png')} className="info-image" alt="logo" />
        <img src={require('./images/googleplay.png')} className="info-image" alt="logo" />
      </div>
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


const mapStateToProps = state => {
  //henter ut listen fra reduceren studassqueue
  const queue = _.map(state.studassQueue, (val, uid) => {
    return { ...val, uid };
  });
//henter ut studascount fra reduceren count
  const { studasscount } = state.count;
  const { first, myLocation, studassSubject, firstKey, firstGender } = state.createQueue;
  return { queue, studasscount, first, myLocation, studassSubject, firstKey, firstGender };
};
 //kan skrive queue[0].name

export default connect(mapStateToProps, { fetchQueue, getCount, deleteQueue, nextDelete, firstInLine })(StudassQueue);
