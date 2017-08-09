import React, {Component} from 'react'
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMyGender } from '../actions';


import '../App.css';
import ChooseSubjectAss from './ChooseSubjectAss';
import Settings from './Settings';


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
            <Settings />
          </div>
        </div>

        <div className="App-main">
          <div>

            <h1 style={{ fontSize: 60}}> CHOOSE BETWEEN STUDENT OR STUDENT ASSISTENT </h1>
            <img src={require('./images/divider.png')} className="auth-divider " alt="logo" />
            <div className="home-buttons">
              <div><Link to ={'/ChooseSubjectStud'} className="btn btn-primary" style={{ marginBottom: 5, backgroundColor: '#95CAFE', borderWidth: 1, borderColor: '#ffffff', width: 300 }}>Student</Link></div>
              <div><Link to ={'/ChooseSubjectAss'} className="btn btn-primary" style={{backgroundColor: '#95CAFE', borderWidth: 1, borderColor: '#ffffff', width: 300 }}>StudAss</Link></div>
            </div>
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
}

export default connect(null, { getMyGender })(Home);
