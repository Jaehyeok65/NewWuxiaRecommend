import { combineReducers } from 'redux'
import modal from './modal';
import alertbox from './alertbox';

const rootreducer = combineReducers({ modal, alertbox });

export default rootreducer;