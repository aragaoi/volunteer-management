import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';

import {
  Account as AccountView, EntityList,
  NotFound as NotFoundView,
  Settings as SettingsView,
  UserList as UserListView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/entities"
      />
      <RouteWithLayout
        component={EntityList}
        exact
        layout={MainLayout}
        path="/entities"
      />
      {/*<RouteWithLayout*/}
      {/*  component={DashboardView}*/}
      {/*  exact*/}
      {/*  layout={MainLayout}*/}
      {/*  path="/dashboard"*/}
      {/*/>*/}
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      {/*<RouteWithLayout*/}
      {/*  component={TypographyView}*/}
      {/*  exact*/}
      {/*  layout={MainLayout}*/}
      {/*  path="/typography"*/}
      {/*/>*/}
      {/*<RouteWithLayout*/}
      {/*  component={IconsView}*/}
      {/*  exact*/}
      {/*  layout={MainLayout}*/}
      {/*  path="/icons"*/}
      {/*/>*/}
      <RouteWithLayout
        component={AccountView}
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
      {/*<RouteWithLayout*/}
      {/*  component={SignUpView}*/}
      {/*  exact*/}
      {/*  layout={MinimalLayout}*/}
      {/*  path="/sign-up"*/}
      {/*/>*/}
      {/*<RouteWithLayout*/}
      {/*  component={SignInView}*/}
      {/*  exact*/}
      {/*  layout={MinimalLayout}*/}
      {/*  path="/sign-in"*/}
      {/*/>*/}
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
