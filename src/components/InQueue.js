import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import '../App.css';

import { getCount, deleteMeFromQueue, findMyPlaceInLine } from '../actions';

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
    console.log('-----------');
    this.props.findMyPlaceInLine({ ref });
  } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
        }
  });
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
      style={{height: 100, width: 100 }}
      resizeMode="contain"
      source={icon}
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
          Next in line:
          </h2>
        </div>
        {this.renderImage()}

        <h2> {this.props.place}/{this.props.studasscount}</h2>

      <div style={{ height: 60, marginTop: 5, marginLeft: 40, marginRight: 40 }}>
        <button onClick={this.onQuitPress.bind(this)}>
          quit queue
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
    //henter ut studascount fra reduceren count
    const { studasscount } = state.count;
    const { myGender } = state.nameRed;
    const { myLocation, studassLocation, subject } = state.queueInfo;
    const { place, firstboolean, quit } = state.inQueue;
    return { studasscount, myLocation, place, firstboolean, studassLocation, subject, quit, myGender };
  };
   //kan skrive queue[0].name

  export default connect(mapStateToProps, { getCount, deleteMeFromQueue, findMyPlaceInLine })(InQueue);
