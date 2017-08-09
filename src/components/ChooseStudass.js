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

renderscreen(){
  if (!this.props.studAssList.length) {
    return (
      <div className="home-main">
      <img
        style={{ height: 200, width: 200 }}
        src={require('./images/nostudass.png')}
      />
      <h2>No available student assistant...</h2>
    </div>
    );
  }
  return (
      <div className="list-container" style={{ borderRadius: 5}}>
        <StudAssList
          onStudassSelect={selectedStudass =>   this.onPress(selectedStudass)}
          studass={this.props.studAssList} />
        </div>
  );
}

  render() {

    return (
      <div>
        <div className="App">

          <div style={{ height: 180, flexDirection: 'column' }}>
          <div className="App-header">
            <img src={require('./images/Header.png')} className="header-image" alt="logo" />
            <button onClick={console.log('df')}
              className="btn btn-primary"
              style={{ borderRadius: 5, backgroundColor: '#2c3e50', borderWidth: 0 }}
            >
              About us
            </button>
          </div>
          <div className="list-header">
            <h1>All available student assistants in this subject</h1>
            <img src={require('./images/divider.png')} className="auth-divider " alt="logo" />
          </div>
        </div>



            {this.renderscreen()}



        <div  className="low-text">
          <h3>To manage subjects, download the QueueMe app</h3>
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
