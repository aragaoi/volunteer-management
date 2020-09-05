import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';
import {LoginContext} from "../../../contexts/login.context";
import {ROLES} from "../../../services/auth.service";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const {className, ...rest} = props;

  const classes = useStyles();
  const {login} = useContext(LoginContext);

  function getRole(login) {
    if (login.role === ROLES.ADMIN) {
      return "Administrador";
    }
    if (login.role === ROLES.USER) {
      return "Voluntário";
    }
    if (login.role === ROLES.ENTITY) {
      return "Entidade";
    }
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={login.avatarUrl}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {login.name}
      </Typography>
      <Typography variant="body2">{login.email}</Typography>
      <Typography variant="body2">{getRole(login)}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
