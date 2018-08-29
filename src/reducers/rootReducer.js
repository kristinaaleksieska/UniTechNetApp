import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import generalInfoReducer from './profile-page/generalInfoReducer';

export default combineReducers({
  firebase: firebaseReducer,
  generalInfo: generalInfoReducer
});
