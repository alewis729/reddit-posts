import React, { useState, useEffect } from 'react';
import { isEmpty, isNil, map } from 'lodash';
import {
  Container,
  Paper,
  LinearProgress,
  Tooltip,
  IconButton,
  useMediaQuery,
  Theme,
  Toolbar,
  AppBar
} from '@material-ui/core';
import { MenuRounded as IconMenu } from '@material-ui/icons';
import { useModal } from 'react-modal-hook';
import { useSelector } from 'react-redux';

import { RootState } from 'src/store/storeConfig';
import { useStyles } from './style';
import { externalLinks } from './defaults';
import { Link, Navigation } from 'src/components';
import { PostsState } from 'src/lib/types';

interface Props {
  title?: string;
  pages?: {
    route: string;
    name: string;
  }[];
  sideContentNode?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  disableNavigation?: boolean;
}

const DefaultLayout: React.FC<Props> = props => {
  const {
    title,
    pages = [],
    sideContentNode,
    loading,
    children,
    disableNavigation = false
  } = props;
  const classes = useStyles();
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [openNavigation, setOpenNavigation] = useState(false);
  const posts: PostsState = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    if (isMdUp) {
      handleCloseNavigation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdUp]);

  useEffect(() => {
    if (openNavigation && !isEmpty(posts?.activeId)) {
      handleCloseNavigation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts?.activeId]);

  const handleToggleNavigation = () => {
    if (openNavigation) hideNavigation();
    else showNavigation();
    setOpenNavigation(!openNavigation);
  };

  const handleCloseNavigation = () => {
    setOpenNavigation(false);
    hideNavigation();
  };

  const headerContentNode = (
    <>
      {!isEmpty(pages) && (
        <div className={classes.links}>
          {map(pages, ({ route, name }) => (
            <Link key={route} to={route} className={classes.link}>
              {name}
            </Link>
          ))}
        </div>
      )}
      <div className={classes.externalLinks}>
        {map(externalLinks, obj => (
          <Tooltip key={obj.id} title={obj.tooltip} placement="bottom">
            <div>
              <a href={obj.url} target="_blank" rel="noreferrer">
                <IconButton>{obj.icon}</IconButton>
              </a>
            </div>
          </Tooltip>
        ))}
      </div>
    </>
  );

  const [showNavigation, hideNavigation] = useModal(
    ({ in: open }) => (
      <Navigation open={open} onClose={handleCloseNavigation}>
        <div>{sideContentNode}</div>
      </Navigation>
    ),
    [sideContentNode]
  );

  return (
    <Container className={classes.root}>
      {!isMdUp ? (
        <div>
          <div className={classes.mobileHeader}>
            <Toolbar />
            <AppBar position="fixed" color="inherit">
              <Container className={classes.appBarContent}>
                <IconButton
                  onClick={handleToggleNavigation}
                  disabled={disableNavigation}
                >
                  <IconMenu />
                </IconButton>
                {headerContentNode}
              </Container>
              {loading && <LinearProgress />}
            </AppBar>
          </div>
          <div className={classes.mobileContent}>{children}</div>
        </div>
      ) : (
        <>
          <div className={classes.loader}>{loading && <LinearProgress />}</div>
          <Container maxWidth="lg">
            <Paper className={classes.paper}>
              <div className={classes.header}>
                <div className={classes.title}>{title}</div>
                {headerContentNode}
              </div>
              <div className={classes.content}>
                {!isNil(sideContentNode) && (
                  <div className={classes.sideContent}>{sideContentNode}</div>
                )}
                <div className={classes.mainContent}>
                  <div className={classes.children}>{children}</div>
                </div>
              </div>
            </Paper>
          </Container>
        </>
      )}
    </Container>
  );
};

export default DefaultLayout;
