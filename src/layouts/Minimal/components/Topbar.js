import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {AppBar, Toolbar} from '@material-ui/core';
import {Brand} from "../../Brand";
import Button from "@material-ui/core/Button";
import {LoadingContext} from "../../../contexts/loading.context";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  text: {
    color: theme.palette.white
  }
}));

const Topbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles();
  const {isLoading} = useContext(LoadingContext);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <Brand/>
        </RouterLink>
        <div className={classes.flexGrow}/>
        {!isLoading &&
        <RouterLink to="/sign-in">
          <Button className={classes.text}>
            Entrar
          </Button>
        </RouterLink>
        }
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
