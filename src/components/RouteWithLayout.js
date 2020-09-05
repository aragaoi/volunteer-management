import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {LoginContext} from "../contexts/login.context";
import {ROLES} from "../services/auth.service";
import {LoadingContext} from "../contexts/loading.context";
import CircularProgress from "@material-ui/core/CircularProgress";
import Main from "../layouts/Main";
import {Minimal} from "../layouts";

const RouteWithLayout = props => {
  const {
    component: Component,
    needsAuth,
    roles,
    ...rest
  } = props;

  const {isLoading} = useContext(LoadingContext);
  const {login} = useContext(LoginContext);

  function resolveLayout(children) {
    if (needsAuth && !login && !isLoading) {
      return null;
    }

    if (login && roles && !roles.includes(login.role)) {
      return <Redirect to="/"/>
    }

    return ((needsAuth && login) || login ?
        <Main>
          {children}
        </Main>
        :
        <Minimal>
          {children}
        </Minimal>
    );
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
        resolveLayout(
          isLoading ? <CircularProgress color="secondary"/> : <Component {...matchProps} />
        )
        || <Redirect to="/sign-in"/>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string,
  needsAuth: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(ROLES)))
};

export default RouteWithLayout;
