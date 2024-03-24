import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    RESET_REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    TOGGLE_MFA,
    SET_MFA_TOGGLE_LOADING,
    REMOVE_MFA_TOGGLE_LOADING
} from '@/actions/types';

// The actions announce to redux there has been a change.
// It's up to the reducer to DO SOMETHING when informed of that change. How will that action change the store data?
// Reducers listen for actions then make changes in the store.



// The starting state of the user login process.
// We want to do various things depending on if the user is authenticated, has a user object, page is loading etc.
// Use these default values rather than having a starting state of undefined, which causes problems.
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    register_success: false,
    errorMsg_login: null,
    errorMsg_register: null,
    refreshToken: null,
    refreshTokenExpiry: null,
    accessToken: null,
    accessTokenExpiry: null,
    mfa_toggle_loading: false,
    mfa_change_success: false 
};



// The reducer listens for action announcements. Hence passing in "action"
// But each reducer only cares about certain actions, not all of them!
// So have a switch statement that will handle the action type we want to DO STUFF.
const authReducer = (state = initialState, action) => {

    
    // Deconstruct the action into type and the payload.
    const { type, payload } = action;

    // If the action type is REGISTER_SUCCESS what do we want to do? Return the initial state but set register_success to true.
    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state,                       // Spread operator. Fill in the new object with the previous object's values. Keep all other values the same!
                register_success: true,         // Only thing we are changing is register_success to true.
                errorMsg_register: null
            }
        case REGISTER_FAIL:
            return {
                ...state,                       // register_success is already false.
                errorMsg_register: payload.message         // Pass back the error message to be displayed to the user
            }
        case RESET_REGISTER_SUCCESS:
            return {
                ...state,
                register_success: false,
                errorMsg_register: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user.data,                // Pass back the user data
                errorMsg_login: null,
                refreshToken: payload.user.data.refreshToken,
                refreshTokenExpiry: payload.user.data.refreshTokenExpiry,
                accessToken: payload.user.data.accessToken,
                accessTokenExpiry: payload.user.data.accessTokenExpiry
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                errorMsg_login: payload.message             // Pass back the error message to be displayed to the user
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,             // User is now logged out so is not authenticated
                user: null,
                refreshToken: null,
                refreshTokenExpiry: null,
                accessToken: null,
                accessTokenExpiry: null
            }
        case LOGOUT_FAIL:
            return {
                ...state
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload.user.data                  // Pass back the user data
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                //user: null                          // Set user as null if we don't get the user object
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case REFRESH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,             // Log the user in
                loading: false,
                refreshToken: payload.user.data.refreshToken,
                refreshTokenExpiry: payload.user.data.refreshTokenExpiry,
                accessToken: payload.user.data.accessToken,
                accessTokenExpiry: payload.user.data.accessTokenExpiry
            }
        case REFRESH_FAIL:
            return {
                ...state,
                isAuthenticated: false,             // If we cant's refresh the tokens, log user out and wipe the user object
                user: null,
                loading: false,
                refreshToken: null,
                refreshTokenExpiry: null,
                accessToken: null,
                accessTokenExpiry: null
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case  TOGGLE_MFA:
            return {
                ...state,
                user: {
                    ...state.user,
                    enableMFA: payload.user?.data.enableMFA
                },
                mfa_change_success: true            
            }
        case SET_MFA_TOGGLE_LOADING:
            return {
                ...state,
                mfa_toggle_loading: true,
                mfa_change_success: false  
            }
        case REMOVE_MFA_TOGGLE_LOADING:
            return {
                ...state,
                mfa_toggle_loading: false
            }
        default:
            return state;
    };
};

export default authReducer;