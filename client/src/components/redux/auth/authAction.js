import * as Constants from '../../../constants';
import config from "../../../config.json";
import axios from 'axios';

const request = () => {
    return {
        type: Constants.REQUEST,
        info: 'Request',
    }
}
const success = (data) => {
    return {
        type: Constants.SUCCESS,
        info: 'API Success',
        payload: data
    }
}
const failure = (error) => {
    return {
        type: Constants.FAILURE,
        info: 'API Failure',
        payload: error
    }
}
const clear = () => {
    return {
        type: Constants.CLEAR,
        info: 'Clear',
    }
}

export const fetchUser = (params, headers) => dispatch => {
    dispatch(request())
    axios.post(config.lambda_api.dev.fetchUser, params, { crossdomain: true, "headers": headers })
        .then(response => {
            const users = response.data
            dispatch(success(users))
        })
        .catch(error => {
            //error.message is the error description
            dispatch(failure(error.response.data))
        })
}

export const logout = () => async dispatch => {
    console.log("Logout")
    dispatch(clear())
}

export const updateRecord = (params, headers) => dispatch => {
    axios.patch(config.lambda_api.dev.updateRecord, params, { crossdomain: true, "headers": headers })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            //error.message is the error description
            dispatch(failure(error.response.data))
        })
}

export const createStore = (params, headers) => dispatch => {
    axios.post(config.lambda_api.dev.createStoreProfile, params, { crossdomain: true, "headers": headers })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            //error.message is the error description
            dispatch(failure(error.response.data))
        })
}
export const createSlots = (params, headers) => dispatch => {
     axios.patch(config.lambda_api.dev.createSlots, params, { crossdomain: true, "headers": headers })
        .then(response => {
            alert(response.data);
        })
        .catch(error => {
            //error.message is the error description
            dispatch(failure(error.response.data))
        })
}