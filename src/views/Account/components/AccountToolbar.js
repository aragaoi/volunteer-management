import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  spacer: {
    flexGrow: 1
  }
}));

const AccountToolbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            Perfil
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.actions}>
            <span className={classes.spacer}/>
            <Button type={"submit"} form="user-form" color="primary" variant={"contained"}>
              Salvar
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

AccountToolbar.propTypes = {
  className: PropTypes.string
};

export default AccountToolbar;
