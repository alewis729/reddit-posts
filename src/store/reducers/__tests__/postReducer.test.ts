import { find } from 'lodash';

import * as types from 'src/store/actionTypes';
import { postReducer } from 'src/store/reducers';
import { posts } from 'src/store/mockData';
import { Post } from 'src/lib/types';

const initialState = {
  loading: false,
  error: false,
  data: posts,
  activeId: null
};

describe('Post reducer', () => {
  type F = (arr: Post[], id: string) => Post | null;
  const getPostById: F = (arr, id) => find(arr, post => post.id === id) ?? null;

  it('should initialize with a default state', () => {
    const action = { type: undefined };
    const state = postReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(false);
    expect(state.data).toHaveLength(0);
    expect(state.activeId).toBe(null);
  });

  it('should make a post active', () => {
    const id = posts[1].id;
    const action = { type: types.VIEW_POST, payload: { id } };
    const stateBeforeAction = postReducer(initialState, { type: undefined });
    const stateAfterAction = postReducer(initialState, action);

    expect(stateBeforeAction.activeId).not.toBe(id);
    expect(stateAfterAction.activeId).toBe(id);
  });

  it('should dismiss a post', () => {
    const id = posts[0].id;
    const action = { type: types.DISMISS_POST, payload: { id } };
    const stateBeforeAction = postReducer(initialState, { type: undefined });
    const stateAfterAction = postReducer(initialState, action);

    expect(getPostById(stateBeforeAction.data, id)).not.toBe(null);
    expect(getPostById(stateAfterAction.data, id)).toBe(null);
  });

  it('should dismiss all posts', () => {
    const action = { type: types.DISMISS_POST_LIST };
    const stateBeforeAction = postReducer(initialState, { type: undefined });
    const stateAfterAction = postReducer(initialState, action);

    expect(stateBeforeAction.data).not.toHaveLength(0);
    expect(stateAfterAction.data).toHaveLength(0);
  });

  it('should save a post to gallery', () => {
    const id = posts[0].id;
    const action = { type: types.SAVE_TO_GALLERY, payload: { id } };
    const state = postReducer(initialState, action);

    expect(getPostById(state.data, id)?.inGallery).toBe(true);
  });

  it('should remove a post from gallery', () => {
    const id = posts[0].id;
    const action = { type: types.REMOVE_FROM_GALLERY, payload: { id } };
    const state = postReducer(initialState, action);

    expect(getPostById(state.data, id)?.inGallery).toBe(false);
  });
});
