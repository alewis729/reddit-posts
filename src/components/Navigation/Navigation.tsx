import React from 'react';
import { Drawer, Toolbar, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from './style';

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Navigation: React.FC<Props> = ({ open, children, onClose }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={onClose}
      PaperProps={{ className: classes.paper }}
      style={{ zIndex: theme.zIndex.appBar - 1 }} // inline for specificity
    >
      <Toolbar />
      <Box pt={1}>{children}</Box>
    </Drawer>
  );
};

export default Navigation;
