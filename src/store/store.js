import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';                                      // imports the combineReducer from reducers/index. So ALL of our reducers!

// The redux store is all the data for our app.
let store;

function initStore(initialState) {
    // update with configureStore() ?
    // https://redux-toolkit.js.org/api/configureStore
    // import { configureStore } from '@reduxjs/toolkit'
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
};

export const initializeStore = (preloadedState) => {

    // CREATE STORE
    // If store is null then create/initialise a new store
    // If store exsts then set let _store to the existing redux store.
    let _store = store ?? initStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
        ...store.getState(),
        ...preloadedState,
        })
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
}

export function useStore(initialState) {
    // useMemo basically caches results and returns them if it's a known request rather than query redux store. Saves time.
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
};