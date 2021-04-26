import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	posts: {
		flexGrow: 1,
		overflowY: 'auto',
		height: 1 // important to not overflow
	},
	post: {
		borderRadius: 0,
		boxShadow: 'none'
	},
	media: {},
	postViewed: {},
	actions: {
		borderTop: `1px solid ${theme.palette.grey[600]}`,
		padding: theme.spacing(2),
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}));
