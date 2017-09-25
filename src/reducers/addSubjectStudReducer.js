import {
ADDSUBJECTSTUDENT_FETCH
} from '../actions/types';

const INITIAL_STATE = { };


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case  ADDSUBJECTSTUDENT_FETCH:
      //console.log(action);
      return action.payload;
      default:
        return state;
    }
};
