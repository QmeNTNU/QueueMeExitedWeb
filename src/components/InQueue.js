import _ from 'lodash';
import React, { PropTypes, Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import '../App.css';

import { getCount, deleteMeFromQueue, findMyPlaceInLine } from '../actions';
import Settings from './Settings';

class InQueue extends Component {

  //want to watch for a queue the instant the scene is loaded
  componentWillMount() {
  //connect(props) do not get fetched properly before componenDIDmount. moved it there instead
  }

componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);
      //starts the listener for
    this.props.getCount({ ref });
    //console.log('-----------');
    this.props.findMyPlaceInLine({ ref });
    window.addEventListener("beforeunload", this.onUnload);
  } else {
    //console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
        }
  });
}

onUnload(event) { // the method that will be used for both add and remove event
        //console.log("hellooww")
        event.returnValue = "If you refresh, you will be deleted from this queue!";
    }
    componentWillUnmount() {
           window.removeEventListener("beforeunload", this.onUnload);
       }

onQuitPress() {
//gets ref to delete
 const deleteRef = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue/${this.props.myLocation}`);
 //gets ref to unlisten to before deleting so popup wont show
 const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/${this.props.studassLocation}/queue`);

this.props.deleteMeFromQueue({ deleteRef, ref });
}
//when quiting queue






renderImage() {
  //gets gender to display either girl or boy
  //const gender = this.getGender();
  //eslint comments lets us retrieve image!!!
  /* eslint-disable global-require */
  const icon = this.props.myGender === 'female' ? require('./images/inqueuewoman3.png') : require('./images/inqueue3.png');
  return (
    <img
      style={{ height: 250, width: 250 }}
      src={icon}
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

          </div>
        </div>

        <div className="queue-info-main">

            {this.renderImage()}

            <div className="inQueue-info" style={{ borderRadius: 5}} >
              <h3>you are nr</h3>
              <img src={require('./images/divider.png')} style={{width: 100}} alt="logo" />
              <h3> {this.props.place}/{this.props.studasscount}</h3>
            </div>


            <button onClick={this.onQuitPress.bind(this)}
              className="btn btn-primary"
              style={{ borderRadius: 5, backgroundColor: '#95CAFE', borderWidth: 0 }}
            >
              quit queue
            </button>


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
      //console.log(this.props);
    return (
      this.renderScreen()
      );
    }
  }


  const mapStateToProps = (state) => {
    //henter ut studascount fra reduceren count
    const { studasscount } = state.count;
    const { myGender } = state.nameRed;
    const { myLocation, studassLocation, subject } = state.queueInfo;
    const { place, firstboolean, quit } = state.inQueue;
    return { studasscount, myLocation, place, firstboolean, studassLocation, subject, quit, myGender };
  };
   //kan skrive queue[0].name

  export default connect(mapStateToProps, { getCount, deleteMeFromQueue, findMyPlaceInLine })(InQueue);
