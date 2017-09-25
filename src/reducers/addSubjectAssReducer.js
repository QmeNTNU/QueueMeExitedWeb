import {
ADDSUBJECTSTUDASS_FETCH
} from '../actions/types';

const INITIAL_STATE = { };


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case  ADDSUBJECTSTUDASS_FETCH:
      //console.log(action);
      return action.payload;
      default:
        return state;
    }
};
