import {
SET_RENDER_AUTH
} from '../actions/types';

const INITIAL_STATE = {
    renderAuthConst: 'SignIn'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case  SET_RENDER_AUTH:
      //console.log(action);
        return { ...state, renderAuthConst: action.payload };
      default:
        return state;
    }
};
