import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';

import { postReducer } from './reducers';

const initialState = {};
const middleware = [thunkMiddleware];
const reducers = combineReducers({ posts: postReducer });

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export default store;
