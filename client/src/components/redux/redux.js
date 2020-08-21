const thunkMiddleware = require('redux-thunk').default
const reduxLogger = require('redux-logger')
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
//const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()
import authred from '../../components/redux/auth/authReducer';

//create store
export const store = createStore(authred,applyMiddleware(thunkMiddleware))// this can take only one reducer,
store.subscribe(()=>{console.log('state',store.getState())})
