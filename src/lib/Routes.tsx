import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PostsPage, GalleryPage } from 'src/pages';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={PostsPage} />
    <Route exact path="/gallery" component={GalleryPage} />
  </Switch>
);

export default Routes;
