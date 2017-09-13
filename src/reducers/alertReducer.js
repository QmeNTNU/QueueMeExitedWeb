import {
ALERT_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
    alertMessage: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case  ALERT_MESSAGE:
      //console.log(action);
        return { ...state, alertMessage: action.payload };
      default:
        return state;
    }
};
