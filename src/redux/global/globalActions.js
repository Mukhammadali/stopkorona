import actionTypes from 'src/lib/constants/actionTypes';

export const updateTabAction = (payload) => ({
  type: actionTypes.UPDATE_TAB_KEY,
  payload
}) 

export const updateSelectedCountry = (payload) => ({
  type: actionTypes.UPDATE_SELECTED_COUNTRY,
  payload
}) 