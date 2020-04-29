import { combineReducers } from 'redux';
import items from './items';
import nutrients from './nutrients';
import userList from './userList';

export default combineReducers({
  items,
  nutrients,
  userList
})
