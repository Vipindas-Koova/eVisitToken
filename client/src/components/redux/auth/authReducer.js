import {REQUEST,SUCCESS,FAILURE} from "../../../constants";

const initialState = {
    loading:false,
    data:{},
    error:''
}

const authred = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case REQUEST: return {...state,loading:true}
        case SUCCESS: return {...state,loading: false, data:action.payload,error:''}
        case FAILURE: return {...state,loading: false, data:{},error:action.payload}

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

export default authred