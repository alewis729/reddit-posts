import { AnyAction } from 'redux';
import { filter, find, map, slice } from 'lodash';

import * as types from '../actionTypes';
import { PostsState } from 'src/lib/types';

const initialState: PostsState = {
  loading: false,
  error: false,
  data: [],
  activeId: null
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
        data: [
          { ...action.payload.posts?.[0], viewed: true },
          ...slice(action.payload.posts, 1)
        ],
        activeId: action.payload.posts?.[0]?.id ?? null
      };
    }
    case types.GET_POSTS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: []
      };
    }
    case types.VIEW_POST: {
      return {
        ...state,
        data: map(state.data, obj =>
          obj.id === action.payload.id ? { ...obj, viewed: true } : obj
        ),
        activeId:
          find(state.data, ({ id }) => id === action.payload.id)?.id ?? null
      };
    }
    case types.DISMISS_POST: {
      return {
        ...state,
        data: filter(state.data, ({ id }) => id !== action.payload.id),
        activeId: state.activeId === action.payload.id ? null : state.activeId
      };
    }
    case types.DISMISS_POST_LIST: {
      return {
        ...state,
        data: [],
        activeId: null
      };
    }
    case types.SAVE_TO_GALLERY: {
      return {
        ...state,
        data: map(state.data, post =>
          post.id === action.payload.id ? { ...post, inGallery: true } : post
        )
      };
    }
    case types.REMOVE_FROM_GALLERY: {
      return {
        ...state,
        data: map(state.data, post =>
          post.id === action.payload.id ? { ...post, inGallery: false } : post
        )
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
