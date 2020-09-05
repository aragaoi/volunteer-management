import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {TextSearchInput} from 'components';
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {UserFormDialog} from "./UserFormDialog";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <div className={classes.actions}>
            <span className={classes.spacer}/>
            <DialogButtonHandler
              color="primary"
              variant="contained"
              actionText={"Adicionar usuário"}
              dialog={
                <UserFormDialog/>
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextSearchInput
            className={classes.searchInput}
            placeholder="Buscar usuários"
          />
        </Grid>
      </Grid>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
