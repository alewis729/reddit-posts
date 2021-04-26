import React, { useState } from 'react';
import { map, slice } from 'lodash';
import {
	Button,
	Typography,
	Card,
	CardActionArea,
	CardMedia,
	CardContent
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { useStyles } from './style';
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
		// onDismiss,
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
				{map(posts, obj => (
					<Card
						key={obj.id}
						className={classes.post}
						onClick={() => onClick(obj.id)}
					>
						<CardActionArea>
							<CardMedia
								className={classes.media}
								image="/static/images/cards/contemplative-reptile.jpg"
								title="Contemplative Reptile"
							/>
							<CardContent>
								{obj.viewed && <div className={classes.postViewed} />}
								<Typography variant="subtitle2">{obj.author}</Typography>
								<Typography variant="body2">{`${obj.comments} comments`}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
			</div>
			<div className={classes.actions}>
				<Pagination
					count={4}
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
