import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filter, map } from 'lodash';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { viewPost, dismissPost, removeFromGallery } from 'src/store/actions';
import { RootState } from 'src/store/storeConfig';
import { DefaultLayout } from 'src/layouts';
import { PostsState } from 'src/lib/types';

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(2)
		}
	},
	card: {
		maxWidth: 345,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	actionArea: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
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
			<div className={classes.container}>
				{map(postList, obj => (
					<Card key={obj.id} className={classes.card}>
						<CardActionArea
							className={classes.actionArea}
							onClick={() => handleViewPost(obj.id)}
						>
							<CardMedia
								component="img"
								alt="Thumbnail"
								height="140"
								image={obj?.image ?? undefined}
								title="Thumbnail"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
									{obj.author}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{obj.title}
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<Button size="small" onClick={() => handlePostDismiss(obj.id)}>
								Dismiss
							</Button>
							<Button
								size="small"
								onClick={() => handleRemoveFromGallery(obj.id)}
							>
								Remove from gallery
							</Button>
						</CardActions>
					</Card>
				))}
			</div>
		</DefaultLayout>
	);
};

export default GalleryPage;
