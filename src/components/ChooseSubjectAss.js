import React, {Component} from 'react'
import _ from 'lodash';
import firebase from 'firebase';
import SubjectAssList from './SubjectAssList';
import CreateQueue from './CreateQueue';
import { Link } from 'react-router';
import Settings from './Settings';
import Modal from 'react-modal';
import ReactScrollbar from 'react-scrollbar-js';
import '../App.css';
import { connect } from 'react-redux';
import { favoriteAssSubjectListFetch, studassSubject } from '../actions';
import AddSubject from './addSubjectAss';

class ChooseSubjectAss extends Component {
  constructor() {
    super();

    this.state = {
      modalOpen: false
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //console.log('DIDMOUNT FIREBASE USER', firebase.auth().currentUser);

      this.props.favoriteAssSubjectListFetch();
    } else {
//console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });
  }

  onPress(subject) {
    //console.log('CLICKED', subject);
    this.props.studassSubject(subject);

  }

  render() {
  //  console.log('SUBJECTCLICKED', this.props.studassSubject);
  //  console.log('FIREBASE USER', firebase.auth().currentUser);
  //  console.log('SUBJECT LIST', this.props.favoriteStudentSubjectList);
    return (
      <div>
      <div className="App">

        <div className="App-header">
          <div className="header-image">
          <img src={require('./images/Header.png')} style={{height: '60%'}} alt="logo" />
          </div>


          <div className="header-buttons">
            <Settings />
          </div>
        </div>
        <div className="list-header">
          <h1 className="header-textphoto" >your available studass subjects</h1>
          <img src={require('./images/divider.png')} className="auth-divider " alt="logo" />
        </div>

        <div className="list-container">

          <SubjectAssList
            onSubjectSelect={selectedSubject =>   this.onPress(selectedSubject.emnekode)}
            subjects={this.props.favoriteStudentSubjectList} />

    </div>
    <div  className="low-text">
      <button onClick={() => this.setState({ modalOpen: true })}
        className="btn btn-primary"
        type="button"
        style={{ width: '100%', backgroundColor: '#F58C6C', borderWidth: 0, borderRadius: 0, height: '10vh'}}
      >
      Manage your subjects
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
      <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={() => this.setState({ modalOpen: false })}

        className={{
          base: 'addsubject',
          afterOpen: 'addsubject',
          beforeClose: 'addsubject'
        }}


      >
            <div className="addsubjectList">


              <AddSubject/>

                    <button onClick={() => this.setState({ modalOpen: false })}
                      className="btn btn-primary"
                      type="button"
                      style={{ width: '100%', backgroundColor: '#F58C6C', borderWidth: 0, borderRadius: 0}}
                    >
                      Back
                    </button>
            </div>
      </Modal>
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
