import React from 'react';
import { isNil } from 'lodash';
import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import clsx from 'clsx';
import {
	Box,
	Typography,
	Card,
	CardActionArea,
	CardContent
} from '@material-ui/core';
import { PanoramaRounded as IconThumbnail } from '@material-ui/icons';
import { motion, usePresence } from 'framer-motion';

import { useStyles } from './style';
import { Post } from 'src/lib/types';

interface Props {
	post: Post;
	onClick: (id: string) => void;
	renderDismissBtn: (id: string) => React.ReactNode;
}

const PostList: React.FC<Props> = props => {
	const { post, onClick, renderDismissBtn } = props;
	const classes = useStyles();
	const [isPresent, safeToRemove] = usePresence();

	return (
		<motion.div
			layout={true}
			initial="out"
			animate={isPresent ? 'in' : 'out'}
			variants={{
				in: { opacity: 1 },
				out: { opacity: 0, zIndex: -1 }
			}}
			onAnimationComplete={() => {
				if (!isPresent) {
					safeToRemove?.();
				}
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 50,
				mass: 1
			}}
		>
			<Card className={classes.post} onClick={() => onClick(post.id)}>
				<CardActionArea component="div">
					<CardContent>
						<div className={classes.postRow}>
							<div
								className={clsx(classes.status, {
									[classes.statusViewed]: post.viewed
								})}
							/>
							<Typography
								variant="body2"
								component="p"
								className={classes.author}
							>
								{post.author}
							</Typography>
							<Typography
								variant="body2"
								component="p"
								className={classes.time}
							>
								{formatDistanceToNow(fromUnixTime(post?.time ?? 0))}
							</Typography>
						</div>
						<Box display="flex" my={1}>
							{isNil(post.thumbnail) ? (
								<div className={classes.defaultThumbnail}>
									<IconThumbnail />
								</div>
							) : (
								<div className={classes.imageContainer}>
									<img src={post.thumbnail} alt="thumbnail" />
								</div>
							)}
							<Typography variant="body1">{post.title}</Typography>
						</Box>
						<div className={classes.postRow}>
							<Typography variant="body2">{`${post.comments} comments`}</Typography>
							{renderDismissBtn(post.id)}
						</div>
					</CardContent>
				</CardActionArea>
			</Card>
		</motion.div>
	);
};

export default PostList;
