import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Typography } from '@material-ui/core';

import { RootState } from 'src/store/store';
import {
	getPosts,
	viewPost,
	dismissPost,
	dismissPostList
} from 'src/store/actions';
import { DefaultLayout } from 'src/layouts';
import { PostList } from 'src/components';
import { PostsState } from 'src/lib/types';

const PostsPage: React.FC = () => {
	const dispatch = useDispatch();
	const posts: PostsState = useSelector((state: RootState) => state.posts);

	useEffect(() => {
		if (isEmpty(posts?.data)) {
			dispatch(getPosts());
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

	return (
		<DefaultLayout
			title="Top 50 Reddit posts"
			pages={[
				{ route: '/', name: 'Posts' },
				{ route: '/gallery', name: 'Gallery' }
			]}
			loading={posts?.loading}
			sideContentNode={
				<PostList
					posts={posts?.data ?? []}
					onClick={handlePostClick}
					onDismiss={handlePostDismiss}
					onDismissAll={handlePostDismissAll}
				/>
			}
		>
			{!posts?.loading && isEmpty(posts?.active) && (
				<Typography>Nothing to see...</Typography>
			)}
			{!isEmpty(posts?.active) && (
				<>
					<Typography variant="subtitle1" component="h4">
						{posts?.active?.title}
					</Typography>
				</>
			)}
		</DefaultLayout>
	);
};

export default PostsPage;
