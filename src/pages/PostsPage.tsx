import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { find, isEmpty, isNil } from 'lodash';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import { Box, Typography, ButtonBase, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { RootState } from 'src/store/storeConfig';
import {
  getPosts,
  viewPost,
  dismissPost,
  dismissPostList,
  saveToGallery,
  removeFromGallery
} from 'src/store/actions';
import { DefaultLayout } from 'src/layouts';
import { PostList } from 'src/components';
import { PostsState } from 'src/lib/types';

const useStyles = makeStyles((theme: Theme) => ({
  imageContainer: {
    maxWidth: '100%',
    '& > img': {
      width: '100%'
    }
  },
  actions: {
    marginTop: theme.spacing(3),
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2)
    }
  }
}));

const PostsPage: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const posts: PostsState = useSelector((state: RootState) => state.posts);
  const activePost = useMemo(
    () => find(posts?.data, ({ id }) => id === posts?.activeId) ?? null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts?.activeId, posts?.data]
  );

  const fetchPosts = () => {
    dispatch(getPosts());
  };

  useEffect(() => {
    if (isEmpty(posts?.data)) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePostClick = (id: string) => {
    dispatch(viewPost(id));
  };

  const handlePostDismiss = (id: string) => {
    dispatch(dismissPost(id));
  };

  const handlePostDismissAll = () => {
    dispatch(dismissPostList());
  };

  const handleSaveToGallery = (id: string) => {
    dispatch(saveToGallery(id));
  };

  const handleRemoveFromGallery = (id: string) => {
    dispatch(removeFromGallery(id));
  };

  return (
    <DefaultLayout
      title="Top 50 Reddit posts"
      pages={[
        { route: '/', name: 'Posts' },
        { route: '/gallery', name: 'Gallery' }
      ]}
      loading={posts?.loading}
      sideContentNode={
        isEmpty(posts?.data) ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              disabled={posts?.loading}
              onClick={fetchPosts}
            >
              Fetch posts
            </Button>
          </Box>
        ) : (
          <PostList
            posts={posts?.data ?? []}
            onClick={handlePostClick}
            onDismiss={handlePostDismiss}
            onDismissAll={handlePostDismissAll}
          />
        )
      }
    >
      {!posts?.loading && isEmpty(activePost) && (
        <Typography>Nothing to see...</Typography>
      )}
      {!isEmpty(activePost) && (
        <>
          <Typography variant="h4" component="h2" paragraph>
            {activePost?.title}
          </Typography>
          <Typography variant="body2" component="p">
            {activePost?.author}
          </Typography>
          <Typography variant="body2" component="p" paragraph>
            {formatDistanceToNow(fromUnixTime(activePost?.time ?? 0))} -{' '}
            {`${activePost?.comments} comments`}
          </Typography>
          {!isNil(activePost?.image) && (
            <ButtonBase
              focusRipple
              className={classes.imageContainer}
              onClick={() => {
                window.open(activePost?.image ?? undefined, '_blank');
              }}
            >
              <img src={activePost?.image ?? undefined} alt="Post" />
            </ButtonBase>
          )}
          <div className={classes.actions}>
            {!activePost?.inGallery ? (
              <Button
                variant="contained"
                onClick={() => handleSaveToGallery(activePost?.id as string)}
              >
                Save to gallery
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() =>
                  handleRemoveFromGallery(activePost?.id as string)
                }
              >
                Remove from gallery
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() => handlePostDismiss(activePost?.id as string)}
            >
              Dismiss post
            </Button>
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default PostsPage;
