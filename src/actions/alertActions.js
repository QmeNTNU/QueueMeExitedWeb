import AlertContainer from 'react-alert';
import {
  ALERT_MESSAGE
} from './types';

export const alertNotify = (text) => {
  return {
    type: ALERT_MESSAGE,
    payload: text
  };
};
