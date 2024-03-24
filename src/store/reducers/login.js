import {
    LOGIN_SAVE,
    LOGIN_CLEAR,
    SET_LOGIN_LOADING,
    REMOVE_LOGIN_LOADING,
    SET_MFA_FLAG
} from '@/actions/types';

// The actions announce to redux there has been a change.
// It's up to the reducer to DO SOMETHING when informed of that change. How will that action change the store data?
// Reducers listen for actions then make changes in the store.


const initialState = {
    username: null,
    password: null,
    login_loading: false,
    mfaFlag: false,
    mfaToken: null,
    mfaTokenExpiry: null   
};


// The reducer listens for action announcements. Hence passing in "action"
// But each reducer only cares about certain actions, not all of them!
// So have a switch statement that will handle the action type we want to DO STUFF.
const loginReducer = (state = initialState, action) => {

    
    // Deconstruct the action into type and the payload.
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SAVE:

            return {
                ...state,
                username: payload.username,
                password: payload.password,
                mfaFlag: payload.mfaFlag,
                mfaToken: payload.mfaToken, 
                mfaTokenExpiry: payload.mfaTokenExpiry
            }
        case LOGIN_CLEAR:
            return {
                ...state,
                username: null,                     // Clear username entered by user for failed login attempt
                password: null,                      // Clear stored password from store
                mfaFlag: false,
                mfaToken: null,
                mfaTokenExpiry: null
            }
        case SET_LOGIN_LOADING:
            return {
                ...state,
                login_loading: true
            }
        case REMOVE_LOGIN_LOADING:
            return {
                ...state,
                login_loading: false
            }
        case  SET_MFA_FLAG:
            return {
                ...state,
                mfaFlag: payload.mfaFlag        
            }
        default:
            return state;
    };
};

export default loginReducer;