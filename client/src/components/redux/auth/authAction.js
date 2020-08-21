import * as Constants from '../../../constants';
import config from "../../../config.json";
import { Auth } from "aws-amplify";
import axios from 'axios';

//action creators returning action objects with type property

// export const forgotPasword = (email) => {
//     return {
//         type: Constants.FORGOT_PASSWORD,
//         info: 'forgot password',
//         email
//     }
// }

// export const registerUser = (username, type) => {
//     return {
//         type: Constants.REGISTER_USER,
//         info: 'User registeration',
//         username,
//         type
//     }
// }
// export const cognitoSignIn = (username, password) => {
//     return {
//         type: Constants.COGNITO_SIGNIN,
//         info: 'Cognito signin',
//         username,
//         password,
//     }
// }

// export const changePassword = (user, oldpassword, newpassword) => {
//     return {
//         type: Constants.CHANGE_PASSWORD,
//         info: 'change password',
//         user,
//         oldpassword,
//         newpassword
//     }
// }
// export const forgotPaswordVerification = (email, verificationcode, newpassword) => {
//     return {
//         type: Constants.FORGOT_PASSWORD,
//         info: 'forgot password',
//         email,
//         verificationcode,
//         newpassword
//     }
// }

function request() {
    return {
        type: Constants.REQUEST,
        info: 'Request',
    }
}
function success(data) {
    return {
        type: Constants.SUCCESS,
        info: 'API Success',
        payload: data
    }
}
function failure(error) {
    return {
        type: Constants.FAILURE,
        info: 'API Failure',
        payload: error
    }
}
// function headers() {
//     return {
//         type: HEADERS,
//         info: 'API HEADER'
//     }
// }

// const fgtpwd = (email) => {
//     return function (dispatch) {
//         dispatch(request())
//         Auth.forgotPassword(email)
//             .then(response => {
//                 const users = response.data.map(user => user.username)
//                 dispatch(success(users))
//             })
//             .catch(error => {
//                 //error.message is the error description
//                 dispatch(failure(error.message))
//             })
//     }
// }

export const fetchUser = (params,headers) => {
    return function (dispatch) {
        dispatch(request())
        axios.post(config.lambda_api.dev.fetchUser, params, { crossdomain: true, "headers": headers })
            .then(response => {
                const users = response.data
                dispatch(success(users))
            })
            .catch(error => {
                //error.message is the error description
                dispatch(failure(error.message))
            })
    }
}

// export const authenticate = (username,password) => {
//     console.log(username,password)
//     return function (dispatch) {
//         dispatch(request());
//         Auth.signIn(username, password)
//             .then(response => {
//                 dispatch(success(response))
//             })
//             .catch(error => {
//                 //error.message is the error description
//                 dispatch(failure(error.message))
//             })
//     }
// }
