import firebase from 'firebase';
import { browserHistory } from 'react-router';

import { CODE_APPROVED, CODE_CHANGED, ALERT_MESSAGE, FETCH_CODE } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js
export const codeChanged = (text) => {
  return {
    type: CODE_CHANGED,
    payload: text
  };
};

export const fetchCode = () => {
  const userUID = firebase.auth().currentUser.uid;
  console.log('USERUID', userUID);
  const { ref } = firebase.database().ref(`users/${userUID}/code/code`);
  return (dispatch) => {
    //should change to once?
        ref.on('value', snapshot => {
          dispatch({ type: FETCH_CODE, payload: snapshot.val() });
      });
  };
};

export const addCode = ({ code }) => {
  //MUST HAVE VALIDATION////////////////////////////////////
  if (!validateInput(code)) {
    return (dispatch) => {
    //dispatch({ type: QUEUE_CREATED_FAILED });
    errorAlert(dispatch, 'Something went wrong');
    };
  }

  //gets rest of values on should push to the location
  return (dispatch) => {
    //dispatch({ type: LOADING_BUTTON });//sets spinner
    const userUID = firebase.auth().currentUser.uid;
    const { ref } = firebase.database().ref(`users/${userUID}/code`);

    ref.set({ code }) //sets the value
    .then(() => {
      dispatch({ type: CODE_APPROVED }); //resets the input field
       //Actions.studassQueue({ type: 'reset' });//moved to necht scene
         browserHistory.replace('/ChooseSubjectAss');

     });
  };
};

const validateInput = (code) => {
  console.log(code);
//gets input from the avaiable prop, and checks if it is on correct format
if (code === '8825') {
  return true;
}

return false;
};

const errorAlert = (dispatch) => {
//Getscalled when it tries to retrieve data but doesent fint it

  alertNotify(dispatch, 'Code not correct. Check email from professor');

};

const alertNotify = (dispatch, text) => {
    dispatch({
      type: ALERT_MESSAGE,
      payload: text
    });
};
