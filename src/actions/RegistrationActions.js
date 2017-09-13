import firebase from 'firebase';
import AlertContainer from 'react-alert';
import {
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  FULLNAME_CHANGED,
  GENDER_CHANGED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  PASSWORD_WRONG,
  SHORT_PASSWORD,
  SELECT_GENDER,
  FULLNAME_WRONG,
  EMAIL_WRONG,
  EMPTY_PASSWORD,
  CREATE_USER,
  LOGIN,
  ALERT_MESSAGE
} from './types';

export const fullnameChanged = (text) => {
  return {
    type: FULLNAME_CHANGED,
    payload: text
  };
};

export const SignupEmailChanged = (text) => {
  return {
    type: SIGNUP_EMAIL_CHANGED,
    payload: text
  };
};

export const SignupPasswordChanged = (text) => {
  return {
      type: SIGNUP_PASSWORD_CHANGED,
      payload: text
  };
};

export const confirmPasswordChanged = (text) => {
  return {
      type: CONFIRM_PASSWORD_CHANGED,
      payload: text
  };
};

export const genderUpdate = (gender) => {
  return {
      type: GENDER_CHANGED,
      payload: gender
  };
};

// alle metodene ovenfor er for å lagre textinput som skrives ved å bruke
// RegReducer.

export const login = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN });
//    Actions.login();
};
};

export const createUser = ({ signupEmail, signupPassword, confirmPassword, fullname, gender }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });

    fullnameValidation({
      dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender });
  };
};

const fullnameValidation =
  ({ dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender }) => {
    if (fullname.split(' ').length === 1) {
      fullnameError(dispatch);
    } else {
        matchingPasswordValidation({
           dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender });
    }
  };
const matchingPasswordValidation =
  ({ dispatch, signupEmail, signupPassword, confirmPassword, fullname, gender }) => {
    if (signupPassword === '') {
      emptyPasswordError(dispatch);
    } else if (signupPassword.length < 6) {
      shortPassword(dispatch);
    } else if (signupPassword === confirmPassword) {
      selectedGenderValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
    } else {
      passwordError(dispatch);
    }
};

const selectedGenderValidation =
  ({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
      if (gender === 'male' || gender === 'female') {
        emailValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
      } else {
        genderError(dispatch);
      }
  };

const emailValidation =
({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
  //console.log('EMAIL VERIFY');
    if (signupEmail.includes('stud.ntnu.no')) {
      userValidation({ dispatch, signupEmail, signupPassword, fullname, gender });
    } else {
      emailError(dispatch);
    }
};

const userValidation = ({ dispatch, signupEmail, signupPassword, fullname, gender }) => {
  //dispatch er en metode (funksjon)
  //console.log('ABOUT TO CREATE USER');
    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(user =>
      //sets name to firebase user
        user.updateProfile({ displayName: fullname }))
      .then(user =>
        createUserSuccess(dispatch, user, signupEmail, signupPassword, fullname, gender))
        .catch(() => createUserFail(dispatch));
};

const createUserSuccess = (dispatch, user, signupEmail, signupPassword, fullname, gender) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
    payload: user
  });
  createUserInFireBase(signupEmail, signupPassword, fullname, gender);
  //console.log('LOGIN SUCCESS');

};


const createUserInFireBase = (signupEmail, signupPassword, fullname, gender) => {
  const emnekode = 'TDT4105';
  const emnenavn = 'ITGK Matlab';
  const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}`)
      .set({ signupEmail, signupPassword, fullname, gender })
      .then(() => {
        firebase.database().ref(`/users/${currentUser.uid}/favstudsubject/${emnekode}`)
          .set({ emnekode, emnenavn });
      })
      .then(() => {
        firebase.database().ref(`/users/${currentUser.uid}/favasssubject/${emnekode}`)
          .set({ emnekode, emnenavn });
      });
};


const fullnameError = (dispatch) => {
  dispatch({
    type: FULLNAME_WRONG
  });
  //console.log('REGISRTATION FAILED-Please enter both your firstname and lastname');
  alertNotify(dispatch, 'Please enter both your firstname and lastname');
};
const emptyPasswordError = (dispatch) => {
  dispatch({
      type: EMPTY_PASSWORD
  });
  //console.log('REGISRTATION FAILED-Please enter a password');
  alertNotify(dispatch, 'Please enter a password');

};
const shortPassword = (dispatch) => {
  dispatch({
      type: SHORT_PASSWORD
  });
    //console.log('REGISRTATION FAILED-Your password must be longer than, or equal to, 6 charcters');
    alertNotify(dispatch, 'Your password must be longer than, or equal to, 6 charcters');

};
const passwordError = (dispatch) => {
  dispatch({
    type: PASSWORD_WRONG
  });
  //console.log('REGISRTATION FAILED-Make sure your passwords are equal');
  alertNotify(dispatch, 'Make sure your passwords are equal');

};

const genderError = (dispatch) => {
  dispatch({
      type: SELECT_GENDER
  });
  //console.log('REGISRTATION FAILED-Make sure your passwords are equal-Please select a gender');
  alertNotify(dispatch, 'Make sure your passwords are equal-Please select a gender');

};

const createUserFail = (dispatch) => {
  dispatch({
    type: CREATE_USER_FAIL
  });
  //console.log('REGISRTATION FAILED-Your entered email are already in use');
  alertNotify(dispatch, 'Something went wrong. Make sure your did not enter a email that is already in use');

};

const emailError = (dispatch) => {
  dispatch({
    type: EMAIL_WRONG
  });
  //console.log('REGISRTATION FAILED-Your email must contain "stud.ntnu.no"');
  alertNotify(dispatch, 'Your email must contain "stud.ntnu.no"');

};

const alertNotify = (dispatch, text) => {
    dispatch({
      type: ALERT_MESSAGE,
      payload: text
    });
};
