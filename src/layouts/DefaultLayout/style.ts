import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		minHeight: '100vh',
		padding: 0,
		margin: 0,
		maxWidth: 'none',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(8)
		}
	},
	header: {},
	content: {},
	sideContent: {},
	mainContent: {}
}));
