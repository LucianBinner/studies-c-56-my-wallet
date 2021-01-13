import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import List from '../pages/List';
import Dashboard from '../pages/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/list/:type" exact component={List} />
      </Switch>
    </Layout>
  );
};

export default AppRoutes;
