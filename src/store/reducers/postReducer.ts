import { AnyAction } from 'redux';

import * as types from '../actionTypes';

const initialState = {
	loading: false,
	error: false,
	data: null
};

const reducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case types.GET_POSTS_LOADING: {
			return {
				...state,
				loading: true
			};
		}
		case types.GET_POSTS_SUCCESS: {
			return {
				...state,
				loading: false,
				error: false,
				data: action.payload
			};
		}
		case types.GET_POSTS_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
				data: null
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
