import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

import {RouteWithLayout} from './components';

import {Entities, NotFound as NotFoundView, Settings as SettingsView, SignIn, SignUp, Users} from './views';
import Visits from "./views/Visits";
import {Account} from "./views/Account/Account";
import {ROLES} from "./services/auth.service";

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
        path="/entities"
        needsAuth
      />
      <RouteWithLayout
        component={Users}
        exact
        path="/users"
        needsAuth
        roles={[ROLES.ADMIN]}
      />
      <RouteWithLayout
        component={Visits}
        exact
        path="/visits"
        needsAuth
      />
      <RouteWithLayout
        component={Account}
        exact
        path="/account"
        needsAuth
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        path="/settings"
        needsAuth
        roles={[ROLES.ADMIN]}
      />
      <RouteWithLayout
        component={SignUp}
        exact
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        path="/not-found"
      />
      <Redirect to="/not-found"/>
    </Switch>
  );
};

export default Routes;
