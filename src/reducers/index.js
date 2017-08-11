import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RegReducers from './RegReducers';
import alertReducer from './alertReducer';
import SettingsReducers from './SettingsReducers';
import renderAuthReducer from './renderAuthReducer';
import AssSubjectReducer from './AssSubjectReducer';
import CreateQueueReducer from './CreateQueueReducer';
import getNameReducer from './getNameReducer';
import StudassQueueReducer from './StudassQueueReducer';
import CountReducer from './CountReducer';
import StudentSubjectReducer from './StudentSubjectReducer';
import QueueInfoReducer from './QueueInfoReducer';
import StudAssListReducer from './StudAssListReducer';
import InQueueReducer from './InQueueReducer';
import StudassLockUpReducer from './StudassLockUpReducer';


export default combineReducers({
  auth: AuthReducer,
  reg: RegReducers,
  settings: SettingsReducers,
  alert: alertReducer,
  render: renderAuthReducer,
  favoriteAssSubjectList: AssSubjectReducer,
  createQueue: CreateQueueReducer,
  nameRed: getNameReducer,
  studassQueue: StudassQueueReducer,
  count: CountReducer,
  favoriteStudentSubjectList: StudentSubjectReducer,
  queueInfo: QueueInfoReducer,
  studAssList: StudAssListReducer,
  inQueue: InQueueReducer,
  lock: StudassLockUpReducer,


});
