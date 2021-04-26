import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { find, isEmpty, isNil } from 'lodash';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import { Box, Typography, ButtonBase, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { RootState } from 'src/store/store';
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
			{!posts?.loading && isEmpty(posts?.active) && (
				<Typography>Nothing to see...</Typography>
			)}
			{!isEmpty(posts?.active) && (
				<>
					<Typography variant="h4" component="h2" paragraph>
						{posts?.active?.title}
					</Typography>
					<Typography variant="body2" component="p">
						{posts?.active?.author}
					</Typography>
					<Typography variant="body2" component="p" paragraph>
						{formatDistanceToNow(fromUnixTime(posts?.active?.time ?? 0))} -{' '}
						{`${posts?.active?.comments} comments`}
					</Typography>
					{!isNil(posts?.active?.image) && (
						<ButtonBase
							focusRipple
							className={classes.imageContainer}
							onClick={() => {
								window.open(posts?.active?.image ?? undefined, '_blank');
							}}
						>
							<img src={posts?.active?.image ?? undefined} alt="Post" />
						</ButtonBase>
					)}
					<div className={classes.actions}>
						{isNil(
							find(posts?.gallery, ({ id }) => id === posts?.active?.id)
						) ? (
							<Button
								variant="contained"
								onClick={() => handleSaveToGallery(posts?.active?.id as string)}
							>
								Save to gallery
							</Button>
						) : (
							<Button
								variant="contained"
								onClick={() =>
									handleRemoveFromGallery(posts?.active?.id as string)
								}
							>
								Remove from gallery
							</Button>
						)}
						<Button
							variant="contained"
							onClick={() => handlePostDismiss(posts?.active?.id as string)}
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
