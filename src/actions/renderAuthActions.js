import AlertContainer from 'react-alert';
import {
  SET_RENDER_AUTH
} from './types';

export const renderAuth = (text) => {
  return {
    type: SET_RENDER_AUTH,
    payload: text
  };
};
