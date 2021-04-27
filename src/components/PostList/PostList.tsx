import React, { useState } from 'react';
import { ceil, map, slice } from 'lodash';
import { Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AnimatePresence } from 'framer-motion';

import { useStyles } from './style';
import { PostListItem } from 'src/components';
import { Post } from 'src/lib/types';

interface Props {
	posts: Post[];
	postsPerPage?: number;
	onClick: (id: string) => void;
	onDismiss: (id: string) => void;
	onDismissAll: () => void;
}

const PostList: React.FC<Props> = props => {
	const {
		posts: propPosts,
		postsPerPage = 15,
		onClick,
		onDismiss,
		onDismissAll
	} = props;
	const classes = useStyles();
	const [page, setPage] = useState(1);
	const posts = React.useMemo(
		() => slice(propPosts, (page - 1) * postsPerPage, page * postsPerPage),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[page, propPosts]
	);

	return (
		<div className={classes.root}>
			<div className={classes.posts}>
				<AnimatePresence>
					{map(posts, obj => (
						<PostListItem
							key={obj.id}
							post={obj}
							onClick={onClick}
							renderDismissBtn={id => (
								<Button
									onClick={e => {
										e.stopPropagation();
										onDismiss(obj.id);
									}}
									variant="outlined"
								>
									Dismiss
								</Button>
							)}
						/>
					))}
				</AnimatePresence>
			</div>
			<div className={classes.actions}>
				<Pagination
					count={ceil(propPosts.length / postsPerPage)}
					size="small"
					page={page}
					onChange={(_, newPage) => setPage(newPage)}
				/>
				<Button onClick={onDismissAll}>Dismiss All</Button>
			</div>
		</div>
	);
};

export default PostList;
