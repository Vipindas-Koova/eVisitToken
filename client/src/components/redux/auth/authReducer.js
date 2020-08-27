import {REQUEST,SUCCESS,FAILURE,CLEAR} from "../../../constants";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from 'redux';



var initialState = {
    loading:false,
    data:{},
    error:''
}

const rootReducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case REQUEST: return {...state,loading:true}
        case SUCCESS: return {...state,loading: false, data:action.payload,error:'test error'}
        case FAILURE: return {...state,loading: false, data:{},error:action.payload}
        case CLEAR: { storage.removeItem('persist:root');
                    return {state:initialState}}
        // case REGISTER_USER: return {
        //     ...state,
        //     username:action.username,
        //     type:action.type
        // }
        // case LOGIN_USER: return {
        //     ...state,
        //     username:action.username,
        //     password:action.password
        // }
        // case COGNITO_SIGNUP:return {
        //     ...state,
        //     username:action.username,
        //     password:action.password,
        //     email:action.email
        // }
        // case FORGOT_PASSWORD:return{
        //     ...state,
        //     email:action.email
        // }
        

        default: return state
    }
}

const persistConfig = {
    key: 'root',
    storage,
  }
export default persistReducer(persistConfig, rootReducer)