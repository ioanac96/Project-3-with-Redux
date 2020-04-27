import { combineReducers } from 'redux';
import items from './items';
import nutrients from './nutrients';

export default combineReducers({
  items,
  nutrients
})
