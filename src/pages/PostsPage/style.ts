import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  imageContainer: {
    maxWidth: '100%',
    '& > img': {
      width: '100%'
    }
  },
  actions: {
    marginTop: theme.spacing(3),
    display: 'flex',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2)
    }
  }
}));
