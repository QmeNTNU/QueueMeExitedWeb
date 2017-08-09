import firebase from 'firebase';
import { browserHistory } from 'react-router';

import { DELETED_ME_FROM_QUEUE, FOUND_MY_PLACE, QUIT } from './types';


export const deleteMeFromQueue = ({ deleteRef, ref }) => {

  return (dispatch) => {
    //to prevent WillRecieveProps to cal firstInline, and show alert!
    dispatch({ type: QUIT });

    //removed value
    ref.off();
    deleteRef.remove()
    .then(() => {
      //SHOULD SHOW SPINNER??

      //move to another scene
      //needs to change
      dispatch({ type: DELETED_ME_FROM_QUEUE });
      //go to homescreen
      browserHistory.push('/Home');
    });
  };
};


export const findMyPlaceInLine = ({ ref }) => {
  //takes in the queue as an array

return (dispatch) => {
  const userUID = firebase.auth().currentUser.uid;

  let count = 0;
  let bool = false;
    ref.on('value', snapshot => {
  // The callback function should be called for every update in database
  console.log('findMyPlaceInLine', snapshot.val() === null);
  //if the queue is empty ( in case studass deletes it)
  if (snapshot.val() === null) {
    ref.off();
    isDeleted();
    return true;
  }
  snapshot.forEach(childSnapshot => {
    count += 1;
    console.log('minUID', userUID);
    console.log(childSnapshot.val());
    console.log(count);
  if (userUID === childSnapshot.val().userUID) {
    dispatch({ type: FOUND_MY_PLACE, payload: count });
    count = 0;
    bool = true;
    return true;
  }
  });
  //makes sure it is deletes if it studass swipes him and there is someone behind
  //is run if it cant find him in th equeue
  if (!bool) {
    isDeleted();
  }
  //setting back to initial
  bool = false;
});
};
};

const isDeleted = () => {
  browserHistory.replace('/Home');

};
