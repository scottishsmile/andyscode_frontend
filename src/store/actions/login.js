import {
    LOGIN_SAVE,
    LOGIN_CLEAR,
    SET_LOGIN_LOADING,
    REMOVE_LOGIN_LOADING,
    TOGGLE_MFA,
    SET_MFA_TOGGLE_LOADING,
    REMOVE_MFA_TOGGLE_LOADING
} from './types';

// ACTION CREATER - a function that returns an action object.

// Actions are made up of a TYPE and a PAYLOAD
// The type describes the action. BUTTON_CLICKED, USER_SELECTED
// The payload is the data we want

/*
This is an ACTION:

dispatch({
    type: LOGIN_SUCCESS,
    payload: data
});

*/

// The whole function    export const register {....}  or   export const login {....}  is the ACTION CREATOR


// SAVE LOGIN INFO ACTION CREATOR
export const saveLogin = (username, password, mfaToken, mfaTokenExpiry) => async dispatch => {

    const data = {
        username,
        password,
        mfaToken, 
        mfaTokenExpiry
    };

    // Start Loading Spinner Wheel
    dispatch({
        type: SET_LOGIN_LOADING
    });

    dispatch({
        type: LOGIN_SAVE,
        payload: data                     // The data is the username and password they entered into the login form. So we can pass it to MFA page.
    });
        

    // Stop Loading Spinner Wheel
    dispatch({
        type: REMOVE_LOGIN_LOADING
    });
};


// CLEAR LOGIN INFO ACTION CREATOR
export const clearLogin = () => async dispatch => {

    // Start Loading Spinner Wheel
    dispatch({
        type: SET_LOGIN_LOADING
    });

        
    // ACTION
    dispatch({
        type: LOGIN_CLEAR
    });
        

    // Stop Loading Spinner Wheel
    dispatch({
        type: REMOVE_LOGIN_LOADING
    });
};


// TOGGLE MFA
export const set_mfa_value = (value) => async dispatch => {


    // Start Loading Spinner Wheel
    dispatch({
        type: SET_MFA_TOGGLE_LOADING
    });

    // Update the Auth.User.EnableMFA value rather than doing another load_user()

    const data = {
        enableMFA: value
    }

    dispatch({
        type: TOGGLE_MFA,
        payload: data
    });
        
    // Stop Loading Spinner Wheel
    dispatch({
        type: REMOVE_MFA_TOGGLE_LOADING
    });
};


