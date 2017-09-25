import firebase from 'firebase';
import { SUBJECT_ADDED, ADDSUBJECTSTUDENT_FETCH, ADDSUBJECTSTUDASS_FETCH } from './types';
//have to add it to types as well
//have to add it to index.js
//have to make reducer to handele AVAILABLE_CHANGED
// have add it to reducers/index.js

export const addSubject1 = ({ ref, emnekode, emnenavn }) => {

//console.log(ref, emnekode, emnenavn);
  return (dispatch) => {
    ref.set({ emnekode, emnenavn }) //sets the value
    .then(() => {
      dispatch({ type: SUBJECT_ADDED }); //resets the input field
     }); //Reset means no backbutton
  };
};
export const deleteSubject = ({ ref }) => {
  return () => {
    ref.remove() //removes the value
    .then(() => {
    //console.log('RMEMOVED SUBJECT');
     }); //Reset means no backbutton
  };
};


export const getAddedSubject = ({ ref, list, type }) => {
  //takes in the queue as an array

let newlist=[];
return (dispatch) => {
  const userUID = firebase.auth().currentUser.uid;

  let count = 0;
  let bool = true;
  const student = type;
    ref.on('value', snapshot => {
      dispatch({ type: ADDSUBJECTSTUDENT_FETCH, payload: snapshot.val() });

  //makes sure it is deletes if it studass swipes him and there is someone behind
  //is run if it cant find him in th equeue

});


};
};
