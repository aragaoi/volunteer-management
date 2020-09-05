import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';

import {Entities, NotFound as NotFoundView, Settings as SettingsView, SignIn, SignUp, Users} from './views';
import Visits from "./views/Visits";
import {Account} from "./views/Account/Account";

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/entities"
      />
      <RouteWithLayout
        component={Entities}
        exact
        layout={MainLayout}
        path="/entities"
      />
      <RouteWithLayout
        component={Users}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={Visits}
        exact
        layout={MainLayout}
        path="/visits"
      />
      <RouteWithLayout
        component={Account}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUp}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found"/>
    </Switch>
  );
};

export default Routes;
