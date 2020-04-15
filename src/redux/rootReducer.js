import { combineReducers } from 'redux';
import actionTypes from 'src/lib/constants/actionTypes';
import globalReducer from './global/globalReducer';


const appReducer = combineReducers({
  global: globalReducer,
});


const rootReducer = (state, action) => {
  if (action.type === actionTypes.RESET_STORE) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
