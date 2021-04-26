import { AnyAction } from 'redux';
import { filter, find, isNil, map } from 'lodash';

import * as types from '../actionTypes';
import { PostsState } from 'src/lib/types';

const initialState: PostsState = {
	loading: false,
	error: false,
	data: null,
	active: null,
	gallery: []
};

const reducer = (state: PostsState = initialState, action: AnyAction) => {
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
				data: action.payload.posts,
				active: action.payload.posts?.[0] ?? null
			};
		}
		case types.GET_POSTS_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload.error,
				data: null
			};
		}
		case types.VIEW_POST: {
			return {
				...state,
				data: map(state.data, obj => obj.id === action.payload.id ? { ...obj, viewed: true } : obj),
				active: find(state.data, ({ id }) => id === action.payload.id)
			};
		}
		case types.DISMISS_POST: {
			return {
				...state,
				data: filter(state.data, ({ id }) => id !== action.payload.id),
				active: state.active?.id === action.payload.id ? null : state.active
			};
		}
		case types.DISMISS_POST_LIST: {
			return {
				...state,
				data: null,
				active: null,
				gallery: []
			};
		}
		case types.SAVE_TO_GALLERY: {
			return {
				...state,
				gallery: isNil(
					find(state.gallery, ({ id }) => id === action.payload.id)
				)
					? [
						...state.gallery,
						find(state.data, ({ id }) => id === action.payload.id)
					]
					: state.gallery
			};
		}
		case types.REMOVE_FROM_GALLERY: {
			return {
				...state,
				gallery: filter(state.gallery, ({ id }) => id !== action.payload.id)
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
