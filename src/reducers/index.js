import { combineReducers } from 'redux';
import items from './items';
import nutrients from './nutrients';
import userList from './userList';
import userChoices from './userChoices';

export default combineReducers({
  items,
  nutrients,
  userList,
  userChoices
})
