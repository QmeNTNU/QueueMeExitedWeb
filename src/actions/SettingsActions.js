import firebase from 'firebase';
import {
  LOGOUT,
  DELETE_USER,
  CANCEL
} from './types';


export const LogOutPress = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    firebase.auth().signOut();
    console.log('LOGUT SUCCESS');
    //Actions.auth({ type: 'reset' });
  };
};

export const DeletePress = () => {
  return (dispatch) => {
    DeleteUser(dispatch);
  };
};

export const cancel = () => {
  return (dispatch) => {
    dispatch({ type: CANCEL });
    //Actions.settings();
};
};

const DeleteUser = (dispatch) => {
  const { currentUser } = firebase.auth();
  dispatch({
    type: DELETE_USER
  });
  currentUser.delete();
  firebase.database().ref(`/users/${currentUser.uid}/userInfo`).remove();
  //Actions.auth({ type: 'reset' });
};
