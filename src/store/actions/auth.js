import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_CLEAR,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    TOGGLE_MFA_FAIL,
    SET_MFA_FLAG
} from './types';

import { saveLogin, clearLogin, set_mfa_value } from './login.js';

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

// REGISTER ACTION CREATOR
export const register = (data) => async dispatch => {

    const body = JSON.stringify({data});

    // Start Loading Spinner Wheel
    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        // Make the API request.
        const res = await fetch('/api/register-requests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });
        
        const data = await res.json();

        if (res.status === 200) {
            // ACTION
            dispatch({
                type: REGISTER_SUCCESS
            });
        } else {
            dispatch({
                type: REGISTER_FAIL,
                payload: data
            });
        }
    } catch(err) {

        const data = {
            data: null,
            success: false,
            message: "Registration Error. Something went wrong... try again later."
        }

        dispatch({
            type: REGISTER_FAIL,
            payload: data
        });
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    });
};

export const reset_register_success = () => dispatch => {
    dispatch({
        type: RESET_REGISTER_SUCCESS
    });
};


// LOGIN ACTION CREATOR
export const login = (username, password) => async dispatch => {
    const mfaCode = "empty";

    const body = JSON.stringify({
        username,
        password,
        mfaCode
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/login-requests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();

        if (res.status === 200) {
            // ACTION
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data                     // The data is the response from the api/user folder. "success: User has logged in successfully"
            });
            dispatch(load_user());                      // Login only supplies username, email and roles. Get the full user object after we have logged in. Address, Language etc.
        
        } else if (res.status === 202){

            // MFA enabled on account
            console.log('actions/auth.js - MFA Enabled on account');

            let apiUsername = data.Username;                        // Use the username supplied by the API responce. The other username object is what the user typed into the form. Might be email address.
            let mfaToken = data.MfaToken;
            let mfaTokenExpiry = data.MfaTokenExpiry;

            // Save the user's username/password so it can be used on MFA page.
            dispatch(saveLogin(apiUsername, password, mfaToken, mfaTokenExpiry));

            // Set the login's mfaFlag so we know MFA is enabled on the account
            // user.enableMFA has not loaded yet! So we need this.
            const mfaFlagData = {
                mfaFlag: true
            }

            dispatch({
                type: SET_MFA_FLAG,
                payload: mfaFlagData
            });

        } else {

            // TESTING
            console.log(`actions/auth.js - login - login Fail 1 `);

            dispatch({
                type: LOGIN_FAIL,
                payload: data
            });
        }
    } catch(err) {

        // TESTING
        console.log(`actions/auth.js - login - login Fail 2 - error: `, err);

        const data = {
            data: null,
            success: false,
            message: "Error. Something went wrong... try again later."
        }

        dispatch({
            type: LOGIN_FAIL,
            payload: data
        });
    }

    // Stop Loading Spinner Wheel
    dispatch({
        type: REMOVE_AUTH_LOADING
    });
};


// MFA LOGIN ACTION CREATOR
export const mfaLogin = (username, password, mfaCode, mfaToken) => async dispatch => {
    const body = JSON.stringify({
        username,
        password,
        mfaCode,
        mfaToken
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch('/api/login-requests', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const data = await res.json();


        if (res.status === 200) {

            // ACTION

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            dispatch(load_user());                      // Login only supplies username, email and roles. Get the full user object after we have logged in. Address, Language etc.
            dispatch(clearLogin());

        } else {

            // TESTING
            console.log(`actions/auth.js - mfaLogin - MFA login Fail 1`, data);

            dispatch({
                type: LOGIN_FAIL,
                payload: data
            });
        }
    } catch(err) {

        // TESTING
        console.log(`actions/auth.js - mfaLogin - MFA login Fail 2 - error: `, err);

        const data = {
            data: null,
            success: false,
            message: "Error. Something went wrong... try again later."
        }
        
        dispatch({
            type: LOGIN_FAIL,
            payload: data
        });
    }

    // Stop Loading Spinner Wheel
    dispatch({
        type: REMOVE_AUTH_LOADING
    });
};





// LOGOUT
export const logout = () => async dispatch => {
    try {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (res.status === 200) {
            dispatch({
                type: LOGOUT_SUCCESS
            });

            dispatch({
                type: LOGIN_CLEAR
            });

        } else {

            // TESTING
            console.log(`actions/auth.js - logout fail 1`);

            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(err) {

        // TESTING
        console.log(`actions/auth.js - logout fail 2 - error: `, err);

        dispatch({
            type: LOGOUT_FAIL
        });
    }
};



// REFRESH TOKENS
export const request_refresh = () => async dispatch => {

    try {

        const res = await fetch('/api/refresh', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if (res.status === 200) {

            dispatch({
                type: REFRESH_SUCCESS,
                payload: data                   // Save new tokens to global state
            });
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
            dispatch(load_user());
        } else {

            // TESTING
            console.log(`actions/auth.js - request_refresh - refresh fail`);

            dispatch({
                type: REFRESH_FAIL
            });

            dispatch({
                type: AUTHENTICATED_FAIL
            });

            dispatch(logout());
        }
    } catch(err) {

        // TESTING
        console.log(`actions/auth.js - request_refresh - error: `, err);

        dispatch({
            type: REFRESH_FAIL
        });

        dispatch({
            type: AUTHENTICATED_FAIL
        });

        dispatch(logout());
    }
};


// Get User Object
export const load_user = () => async dispatch => {
    try {

        const res = await fetch(`/api/getuser/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data                            // The data is the response from the api/user folder. "success: User has logged in successfully"
            });
        } else {

            // TESTING
            console.log(`actions/auth.js - load_user fail 1`);

            dispatch({
                type: LOAD_USER_FAIL                    // No data payload if it fails.
            });
        }
    } catch(err) {

        // TESTING
        console.log(`actions/auth.js - load_user fail 2 - error: `, err);

        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};


// TOGGLE MFA
export const toggle_mfa = (mfaSwitch) => async dispatch => {

    try {

        const postData = {
            MfaSwitch: mfaSwitch
          }

        const JSONdata = JSON.stringify(postData);

        // Form the request for sending data to the server.
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSONdata,
        }

        const res = await fetch(`/api/toggle-mfa-requests`, options);

        const data = await res.json();

        if (res.status === 200) {

            dispatch(set_mfa_value(mfaSwitch));

        } else {

            // TESTING
            console.log(`actions/auth.js - toggle_mfa fail 1`);

            dispatch({
                type: TOGGLE_MFA_FAIL,
                payload: data
            });

            // Nothing to do, toggle mfa request failed, so remains as previous value.
            // Maybe dispatch(load_user()) ?

        }
    } catch(err) {

        // TESTING
        console.log(`actions/auth.js - toggle_mfa fail 2 - error: `, err);

        const data = {
            data: null,
            success: false,
            message: "Error. Something went wrong... try again later."
        }

        dispatch({
            type: TOGGLE_MFA_FAIL,
            payload: data
        });

        // Nothing to do, toggle mfa request failed, so remains as previous value.
        // Maybe dispatch(load_user()) ?

    }
};

