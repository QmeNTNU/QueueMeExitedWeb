import firebase from 'firebase';
import { browserHistory } from 'react-router';
import { INFO_RETIREVED, ADDED_TO_QUEUE, LOADING } from './types';

export const setInfo = ({ prop, value }) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.
  return {
    type: INFO_RETIREVED,
    payload: { prop, value }
  };
};
export const setMyLocation = (key) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.
  return {
    type: ADDED_TO_QUEUE,
    payload: key
  };
};
export const addToQueue = ({ ref, myGender }) => {
  //OPS! COULD USE REGULAR SET TO EASILY KNOW THE NODE-ID, BUT PUSH GIVES BETTER PERFORMANCE
  //AND PUTS/FETCHES CHILDREN IN CHRONOLOGICAL ORDER

  //gets values on should push to the location
  const fullname = firebase.auth().currentUser.displayName;
  const userGender = myGender;
  const userUID = firebase.auth().currentUser.uid;
  const userEmail = firebase.auth().currentUser.email;
  //retrieves a ref to a push location
  const newRef = ref.push();
  //gets  the key to this location
  const key = newRef.key;
  //sets a value to the retrieved location
  //saved the key to be used in next scene. sets other to initial_state
  return (dispatch) => {
    dispatch({ type: LOADING }); //Starts loading

    newRef.set({ fullname, userEmail, userUID, userGender }) //sets the value
    .then(() => {
      dispatch({ type: ADDED_TO_QUEUE, payload: key }); //resets the state field
      console.log('QUEUEINFOREDUCER--------------');
      browserHistory.push('/InQueue');

     }); //Reset means no backbutton
  };
};
