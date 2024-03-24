import { combineReducers } from 'redux';
import authReducer from '@/reducers/auth';
import loginReducer from '@/reducers/login';

// The Redux store is ONE BIG JAVASCRIPT OBJECT
// So how do we get multiple objects contained inside it?
// Use this index.js page to combine them into one big object!
/*
store: {
    object1: {...},
    object2: {...},
    object3: {...}
}
*/

export default combineReducers({

    // When we access redux states, we can refer to 'auth' not 'authReducer'. Easier.
    auth: authReducer,
    login: loginReducer

    // List any new reducers here :)
});