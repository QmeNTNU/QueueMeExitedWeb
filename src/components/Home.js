import React, {Component} from 'react'
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMyGender, fetchCode } from '../actions';
import { browserHistory } from 'react-router';


import '../App.css';
import ChooseSubjectAss from './ChooseSubjectAss';
import Settings from './Settings';


class Home extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //checks if it should display welcomeslides
      this.props.getMyGender();
      this.props.fetchCode();
      const user = firebase.auth().currentUser.displayName;
      console.log('FIREBASE USER NAME', user);


    } else {
console.log('CHOOSESUBJECT RENDERED BUT WITHOUT LOGIN');
          }
    });

  }

  onStudentPress() {
    browserHistory.push('/ChooseSubjectStud');

  }

  onStudassPress(){
    if (this.props.retrievedCode !== ''){
      var OneSignal = window.OneSignal || [];
      console.log('ONESIGNAL HOME', OneSignal);
      OneSignal.push(function() {
  OneSignal.registerForPushNotifications();

});
      browserHistory.push('/ChooseSubjectAss');

    }else {
      var OneSignal = window.OneSignal || [];
      console.log('ONESIGNAL HOME', OneSignal);
      OneSignal.push(function() {
  OneSignal.registerForPushNotifications();

});
      browserHistory.push('/StudassLockUp');

    }


  }

  render() {
    console.log('RETRIEVEDCODE', this.props.retrievedCode);

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

        <div className="App-main">
          <div style={{ textAlign: 'center'}}>



            <div className="home-info">
              <div className="home-buttons"></div>




              <div className="home-buttons">
                <img src={require('./images/Header.png')} style={{ width: '100%', alignSelf: 'center' }} alt="logo" />
                <div>
                  <h1 className="header-textphoto" style={{ width: '100%'}}>Choose between student or student assistant</h1>
                  <div style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <button onClick={this.onStudentPress.bind(this)}
                      className="btn btn-primary"
                      style={{ borderRadius: 5, backgroundColor: '#F58C6C', borderWidth: 0, width: 120, marginRight: 2 }}
                    >
                      Student
                    </button>
                    <button onClick={this.onStudassPress.bind(this)}
                      className="btn btn-primary"
                      style={{ borderRadius: 5, backgroundColor: '#F58C6C', borderWidth: 0, width: 120, marginLeft: 2 }}
                    >
                      Student Assistant
                    </button>
                  </div>
                </div>
              </div>

              <div className="home-buttons"></div>

          </div>

          </div>
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
}
const mapStateToProps = state => {

  const { retrievedCode } = state.lock;


  return { retrievedCode };
};


export default connect(mapStateToProps, { getMyGender, fetchCode })(Home);
