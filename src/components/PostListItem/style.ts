import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	post: {
		borderRadius: 0,
		boxShadow: 'none',
		'& > .MuiButtonBase-root': {
			padding: theme.spacing(1.5)
		}
	},
	postRow: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	status: {
		height: 8,
		width: 8,
		borderRadius: '50%',
		backgroundColor: theme.palette.primary.main,
		transition: theme.transitions.easing.easeInOut,
		opacity: 1,
		marginRight: theme.spacing(1),
		flexShrink: 0
	},
	statusViewed: {
		opacity: 0.35
	},
	author: {
		flexGrow: 1
	},
	time: {
		textAlign: 'right',
		marginLeft: theme.spacing(1)
	},
	defaultThumbnail: {
		width: '30%',
		marginRight: theme.spacing(2),
		flexShrink: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& > svg': {}
	},
	imageContainer: {
		width: '30%',
		paddingTop: '30%',
		position: 'relative',
		marginRight: theme.spacing(2),
		flexShrink: 0,
		'& > img': {
			objectFit: 'contain',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			position: 'absolute'
		}
	}
}));
