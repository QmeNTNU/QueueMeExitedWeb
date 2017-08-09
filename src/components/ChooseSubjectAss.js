import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import SubjectAssList from './SubjectAssList';
import CreateQueue from './CreateQueue';
import { Link } from 'react-router';

import '../App.css';
import { connect } from 'react-redux';
import { favoriteAssSubjectListFetch, studassSubject } from '../actions';

class ChooseSubjectAss extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('DIDMOUNT FIREBASE USER', firebase.auth().currentUser);

      this.props.favoriteAssSubjectListFetch();
    } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });
  }

  onPress(subject) {
    console.log('CLICKED', subject);
    this.props.studassSubject(subject);

  }

  render() {
    console.log('SUBJECTCLICKED', this.props.studassSubject);
    console.log('FIREBASE USER', firebase.auth().currentUser);
    console.log('SUBJECT LIST', this.props.favoriteStudentSubjectList);
    return (
      <div>
      <div className="App">

        <div style={{ height: 180, flexDirection: 'column' }}>
        <div className="App-header">
            <Link to={'/Home'}><img src={require('./images/Header.png')} className="header-image" alt="logo" /></Link>
          <button onClick={console.log('df')}
            className="btn btn-primary"
            style={{ borderRadius: 5, backgroundColor: '#2c3e50', borderWidth: 0 }}
          >
            About us
          </button>
        </div>
        <div className="list-header">
          <h1>your available studass subjects</h1>
          <img src={require('./images/divider.png')} className="auth-divider " alt="logo" />
        </div>
      </div>

        <div className="list-container">

          <SubjectAssList
            onSubjectSelect={selectedSubject =>   this.onPress(selectedSubject.emnekode)}
            subjects={this.props.favoriteStudentSubjectList} />

    </div>
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
  const favoriteStudentSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });

  const { studassSubject } = state.createQueue;
  return { favoriteStudentSubjectList, studassSubject };
};

export default connect(mapStateToProps,
  { favoriteAssSubjectListFetch, studassSubject })(ChooseSubjectAss);