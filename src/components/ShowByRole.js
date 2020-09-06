import React, {useContext} from 'react';
import {LoginContext} from "../contexts/login.context";
import PropTypes from 'prop-types';
import {ROLES} from "../services/auth.service";

export const ShowByRole = (props) => {

  const {roles, children} = props;
  const {login} = useContext(LoginContext);

  return (
    <>
      {login && roles.includes(login.role) && children}
    </>
  );
};

ShowByRole.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.oneOf(Object.values(ROLES)))
}
