import persistedReducer from '../../components/redux/auth/authReducer';
import { persistStore } from 'redux-persist';
const thunkMiddleware = require('redux-thunk').default
const reduxLogger = require('redux-logger')
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


export const store = createStore(persistedReducer,applyMiddleware(thunkMiddleware))
export const persistor = persistStore(store)

export default {store,persistor};

store.subscribe(()=>{console.log('state',store.getState())})