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
    overflowX: 'hidden',
    height: 'calc(100vh - 70px - 72px)',
    [theme.breakpoints.up('md')]: {
      height: 1 // important to not overflow
    }
  },
  actions: {
    borderTop: `1px solid ${theme.palette.grey[600]}`,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));
