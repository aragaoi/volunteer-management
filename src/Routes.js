import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';

import {Entities, NotFound as NotFoundView, Settings as SettingsView, Users} from './views';
import {EntityForm} from "./views/Entities/components/EntityForm";
import Visits from "./views/Visits";

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
        component={EntityForm}
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
