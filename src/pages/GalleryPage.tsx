import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filter, map } from 'lodash';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AnimatePresence } from 'framer-motion';

import { viewPost, dismissPost, removeFromGallery } from 'src/store/actions';
import { RootState } from 'src/store/storeConfig';
import { DefaultLayout } from 'src/layouts';
import { PostCard } from 'src/components';
import { PostsState } from 'src/lib/types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(2)
    }
  }
}));

const GalleryPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const posts: PostsState = useSelector((state: RootState) => state.posts);
  const postList = useMemo(() => filter(posts?.data, post => post?.inGallery), [
    posts?.data
  ]);

  const handleViewPost = (id: string) => {
    dispatch(viewPost(id));
    history.push('/');
  };

  const handlePostDismiss = (id: string) => {
    dispatch(dismissPost(id));
  };

  const handleRemoveFromGallery = (id: string) => {
    dispatch(removeFromGallery(id));
  };

  return (
    <DefaultLayout
      title="Gallery"
      pages={[
        { route: '/', name: 'Posts' },
        { route: '/gallery', name: 'Gallery' }
      ]}
      disableNavigation
    >
      <div className={classes.root}>
        <AnimatePresence>
          {map(postList, obj => (
            <PostCard
              key={obj.id}
              post={obj}
              onViewPost={handleViewPost}
              onPostDismiss={handlePostDismiss}
              onRemoveFromGallery={handleRemoveFromGallery}
            />
          ))}
        </AnimatePresence>
      </div>
    </DefaultLayout>
  );
};

export default GalleryPage;
