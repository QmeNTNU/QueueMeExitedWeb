import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import SubjectStudList from './SubjectStudList';
import CreateQueue from './CreateQueue';
import '../App.css';
import { connect } from 'react-redux';
import { favoriteStudentSubjectListFetch, setInfo } from '../actions';

class ChooseSubjectStud extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('DIDMOUNT FIREBASE USER', firebase.auth().currentUser);

      this.props.favoriteStudentSubjectListFetch();
    } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });
  }

  onPress(subject) {
    console.log('CLICKED', subject);
      this.props.setInfo({ prop: 'subject', value: subject });

  }

  render() {
    console.log('FIREBASE USER', firebase.auth().currentUser);
    console.log('SUBJECT LIST', this.props.favoriteStudentSubjectList);
    return (
      <div className="App">

        <div className="App-header">
          <h2>QueueMe</h2>
        </div>

        <div className="list-main">

          <SubjectStudList
            onSubjectSelect={selectedSubject =>   this.onPress(selectedSubject.emnekode)}
            subjects={this.props.favoriteStudentSubjectList} />


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
  const favoriteStudentSubjectList = _.map(state.favoriteStudentSubjectList, (val, uid) => {
    return { ...val, uid };
  });

  return { favoriteStudentSubjectList };
};

export default connect(mapStateToProps,
  { favoriteStudentSubjectListFetch, setInfo })(ChooseSubjectStud);
