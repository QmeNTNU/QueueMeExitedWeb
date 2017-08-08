import React, {Component} from 'react'
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMyGender } from '../actions';


import '../App.css';
import ChooseSubjectAss from './ChooseSubjectAss';

class Home extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //checks if it should display welcomeslides
      this.props.getMyGender();
      const user = firebase.auth().currentUser.displayName;
      console.log('FIREBASE USER NAME', user);
    } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });

  }

  render() {
    console.log('FIREBASE USER', firebase.auth().currentUser);

    return (
      <div className="App">

        <div className="App-header">
          <img src={require('./images/Header.png')} className="header-image" alt="logo" />
        </div>

        <div className="home-main">
          <div>
            <img src={require('./images/home.png')} className="home-image" alt="logo" />

            <h2> CHOOSE BETWEEN STUDENT OR STUDENT ASSISTENT </h2>
            <div className="home-buttons">
              <button onClick={() => console.log('student pressed')}
                className="btn btn-primary"
                style={{ borderRadius: 10, backgroundColor: '#F58C6C' }}
              >
               Student
              </button>
              <button onClick={() => console.log('studass pressed')}
                className="auth-btn"
                style={{ borderRadius: 10, backgroundColor: '#F58C6C' }}
              >
                Studass
              </button>

              <div><Link to ={'/ChooseSubjectAss'}>StudAss</Link></div>
                <div><Link to ={'/ChooseSubjectStud'}>Student</Link></div>
            </div>
          </div>
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

export default connect(null, { getMyGender })(Home);
