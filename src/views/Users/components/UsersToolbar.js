import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {TextSearchInput} from 'components';
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {UserFormDialog} from "./UserFormDialog";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {ROLES} from "../../../services/auth.service";
import {ShowByRole} from "../../../components/ShowByRole";

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    display: 'flex',
    alignItems: 'center'
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
        <Grid item xs={6}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            Usuários
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ShowByRole roles={[ROLES.ADMIN]}>
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
          </ShowByRole>
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
