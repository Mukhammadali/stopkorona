import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer, purgeStoredState } from 'redux-persist';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'korona_root',
  storage,
  timeout: null,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const resetReduxPersist = () => purgeStoredState(persistConfig);

// eslint-disable-next-line import/no-mutable-exports
export let reduxPersistor = null;

// eslint-disable-next-line no-undef
const composeEnhancers = compose;
const enhancers = [];
const middlewares = [thunk, promise];
const middlewareEnhancer = applyMiddleware(...middlewares);
enhancers.push(middlewareEnhancer);
export const store = createStore(persistedReducer, composeEnhancers(...enhancers));
const persistor = persistStore(store);
reduxPersistor = persistor;
