import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		minHeight: '100vh',
		padding: 0,
		margin: 0,
		maxWidth: 'none',
		display: 'flex',
		flexDirection: 'column'
	},
	loader: {
		height: theme.spacing(1)
	},
	paper: {
		marginTop: theme.spacing(8),
		height: '85vh',
		display: 'flex',
		flexDirection: 'column'
	},
	header: {
		borderBottom: `1px solid ${theme.palette.grey[600]}`,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(1.5, 4)
	},
	title: {
		flexGrow: 1
	},
	links: {
		'& > *:not(:last-child)': {
			marginRight: theme.spacing(2)
		}
	},
	link: {
		color: theme.palette.primary.light
	},
	externalLinks: {
		marginLeft: theme.spacing(2)
	},
	content: {
		display: 'flex',
		flexGrow: 1
	},
	sideContent: {
		flexShrink: 0,
		width: '35%',
		maxWidth: 420,
		borderRight: `1px solid ${theme.palette.grey[600]}`
	},
	mainContent: {
		flexGrow: 1,
		width: 1, // important to not overflow flex container
		overflowY: 'auto',
		padding: theme.spacing(4)
	},
	children: {
		height: 1,
		'&:after': {
			content: "''",
			display: 'block',
			height: theme.spacing(4)
		}
	}
}));
