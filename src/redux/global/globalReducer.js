import actionTypes from 'src/lib/constants/actionTypes';

const defaultState = {
  activeTab: 'uzbekistan',
  selectedCountry: null
};

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TAB_KEY:
      return { ...state, activeTab: action.payload };
    case actionTypes.UPDATE_SELECTED_COUNTRY:
      return { ...state, selectedCountry: action.payload };
    default:
      return state;
  }
};


export default globalReducer;
