import React, { useState } from 'react';
import { ceil, isNil, map, slice } from 'lodash';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import clsx from 'clsx';
import {
	Box,
	Button,
	Typography,
	Card,
	CardActionArea,
	CardContent
} from '@material-ui/core';
import { PanoramaRounded as IconThumbnail } from '@material-ui/icons';
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
				{map(posts, obj => (
					<Card
						key={obj.id}
						className={classes.post}
						onClick={() => onClick(obj.id)}
					>
						<CardActionArea>
							<CardContent>
								<div className={classes.postRow}>
									<div
										className={clsx(classes.status, {
											[classes.statusViewed]: obj.viewed
										})}
									/>
									<Typography
										variant="body2"
										component="p"
										className={classes.author}
									>
										{obj.author}
									</Typography>
									<Typography variant="body2" component="p">
										{formatDistanceToNow(fromUnixTime(obj?.time ?? 0))}
									</Typography>
								</div>
								<Box display="flex" my={1}>
									{isNil(obj.thumbnail) ? (
										<div className={classes.defaultThumbnail}>
											<IconThumbnail />
										</div>
									) : (
										<div className={classes.imageContainer}>
											<img src={obj.thumbnail} alt="thumbnail" />
										</div>
									)}
									<Typography variant="body1">{obj.title}</Typography>
								</Box>
								<div className={classes.postRow}>
									<Typography variant="body2">{`${obj.comments} comments`}</Typography>
									<Button
										onClick={e => {
											e.stopPropagation();
											onDismiss(obj.id);
										}}
										variant="outlined"
									>
										Dismiss
									</Button>
								</div>
							</CardContent>
						</CardActionArea>
					</Card>
				))}
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
