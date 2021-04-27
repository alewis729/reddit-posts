import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { isNil } from 'lodash';

import { postReducer } from './reducers';

let initialState = {};
try {
	initialState = !isNil(localStorage.getItem('state'))
		? JSON.parse(localStorage.getItem('state') as string)
		: {};
} catch (error) {
	console.error(error);
}

const persist = (store: any) => (next: any) => (action: any) => {
	const result = next(action);
	const stateToSave = store.getState();
	localStorage.setItem('state', JSON.stringify({ ...stateToSave }));
	return result;
};

const middleware = [thunkMiddleware, persist];
const reducers = combineReducers({ posts: postReducer });

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export default store;
