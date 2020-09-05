/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, {forwardRef, useContext} from 'react';
import {NavLink as RouterLink, withRouter} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {List, ListItem, Button, colors, Divider} from '@material-ui/core';
import InputIcon from "@material-ui/icons/Input";
import {LoginContext} from "../../../contexts/login.context";

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, history } = props;

  const classes = useStyles();
  const {signOut} = useContext(LoginContext);

  function handleLogout() {
    signOut();
    history.push("/sign-in");
  }

  return (
    <List
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
      <Divider className={classes.divider} />
      <ListItem
        className={classes.item}
        disableGutters
        key="Sair"
      >
        <Button
          className={classes.button}
          onClick={handleLogout}
        >
          <div className={classes.icon}><InputIcon/></div>
          Sair
        </Button>
      </ListItem>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default withRouter(SidebarNav);
