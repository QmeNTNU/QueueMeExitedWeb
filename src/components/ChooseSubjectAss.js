import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import SubjectAssList from './SubjectAssList';
import CreateQueue from './CreateQueue';
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
      <div className="App">

        <div className="App-header">
          <h2>QueueMe</h2>
        </div>

        <div className="list-main">

          <SubjectAssList
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
  const favoriteStudentSubjectList = _.map(state.favoriteAssSubjectList, (val, uid) => {
    return { ...val, uid };
  });

  const { studassSubject } = state.createQueue;
  return { favoriteStudentSubjectList, studassSubject };
};

export default connect(mapStateToProps,
  { favoriteAssSubjectListFetch, studassSubject })(ChooseSubjectAss);
