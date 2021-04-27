import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { map } from 'lodash';

import { RootState } from '../storeConfig';
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
      payload: { posts }
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: types.GET_POSTS_FAIL,
      payload: { error }
    });
  }
};

export const viewPost = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
  dispatch({ type: types.VIEW_POST, payload: { id } });
};

export const dismissPost = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
  dispatch({ type: types.DISMISS_POST, payload: { id } });
};

export const dismissPostList = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => dispatch => {
  dispatch({ type: types.DISMISS_POST_LIST });
};

export const saveToGallery = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
  dispatch({ type: types.SAVE_TO_GALLERY, payload: { id } });
};

export const removeFromGallery = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => dispatch => {
  dispatch({ type: types.REMOVE_FROM_GALLERY, payload: { id } });
};
