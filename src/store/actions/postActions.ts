import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { map } from 'lodash';

import { RootState } from '../store';
import * as types from '../actionTypes';
import * as endpoints from '../endpoints';
import { transformPost } from '../helpers';

export const getPosts = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => async dispatch => {
	try {
		dispatch({ type: types.GET_POSTS_LOADING });
		const res = await axios(endpoints.getPosts);
		const posts = map(res?.data?.data?.children, transformPost);

		dispatch({
			type: types.GET_POSTS_SUCCESS,
			payload: posts
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: types.GET_POSTS_FAIL,
			payload: error
		});
	}
};
