import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
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
});
