import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import StudAssList from './StudAssList';
import CreateQueue from './CreateQueue';
import '../App.css';
import { connect } from 'react-redux';
import { studAssListFetch, setInfo } from '../actions';

class ChooseStudass extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('DIDMOUNT FIREBASE USER', firebase.auth().currentUser);

      const { ref } = firebase.database().ref(`Subject/${this.props.subject}/studasslist/`);
      this.props.studAssListFetch({ ref });
    } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });
  }

  onPress(studass) {
    console.log('CLICKED', studass);
    this.props.setInfo({ prop: 'studass', value: studass.fullname });
    this.props.setInfo({ prop: 'available', value: studass.available });
    this.props.setInfo({ prop: 'studassLocation', value: studass.userUID });
    this.props.setInfo({ prop: 'room', value: studass.room });


  }

  render() {

    return (
      <div className="App">

        <div className="App-header">
          <h2>QueueMe</h2>
        </div>

        <div className="list-main">

          <StudAssList
            onStudassSelect={selectedStudass =>   this.onPress(selectedStudass)}
            studass={this.props.studAssList} />


        </div>

        <div className="under-Div">
          <div className="info">
            <div className="under-info">
              <img src={require('./images/welcomeslide5.png')} className="info-image" alt="logo" />
            </div>
            <div className="under-info">
              <small>Available on mobile</small>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const studAssList = _.map(state.studAssList, (val, uid) => {
    return { ...val, uid };
  });
  const { subject } = state.queueInfo; //to know where to fetch data from
  return { studAssList, subject };
};

export default connect(mapStateToProps, {
  studAssListFetch, setInfo })(ChooseStudass);
