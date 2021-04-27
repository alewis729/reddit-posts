import React from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography
} from '@material-ui/core';
import { motion, usePresence } from 'framer-motion';

import { useStyles } from './style';
import { Post } from 'src/lib/types';

interface Props {
	post: Post;
	onViewPost: (id: string) => void;
	onPostDismiss: (id: string) => void;
	onRemoveFromGallery: (id: string) => void;
}

const PostCard: React.FC<Props> = props => {
	const { post, onViewPost, onPostDismiss, onRemoveFromGallery } = props;
	const classes = useStyles();
	const [isPresent, safeToRemove] = usePresence();

	return (
		<motion.div
			layout={true}
			initial="out"
			animate={isPresent ? 'in' : 'out'}
			variants={{
				in: { opacity: 1 },
				out: { opacity: 0 }
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
			<Card className={classes.card}>
				<CardActionArea
					className={classes.actionArea}
					onClick={() => onViewPost(post.id)}
				>
					<CardMedia
						component="img"
						alt="Thumbnail"
						height="140"
						image={post?.image ?? undefined}
						title="Thumbnail"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{post.author}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{post.title}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" onClick={() => onPostDismiss(post.id)}>
						Dismiss
					</Button>
					<Button size="small" onClick={() => onRemoveFromGallery(post.id)}>
						Remove from gallery
					</Button>
				</CardActions>
			</Card>
		</motion.div>
	);
};

export default PostCard;
