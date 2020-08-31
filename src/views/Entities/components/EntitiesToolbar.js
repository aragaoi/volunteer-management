import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {TextSearchInput} from 'components';
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {EntityFormDialog} from "./EntityFormDialog";
import ProximitySearchInput from "../../../components/ProximitySearchInput";
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

const EntitiesToolbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.actions}>
        <span className={classes.spacer}/>
        <DialogButtonHandler
          color="primary"
          variant="contained"
          actionText={"Adicionar entidade"}
          dialog={
            <EntityFormDialog/>
          }
        />
      </div>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={6}>
          <TextSearchInput
            className={classes.searchInput}
            placeholder="Buscar entidades"
          />
        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          <ProximitySearchInput
            className={classes.searchInput}
          />
        </Grid>
      </Grid>
    </div>
  );
};

EntitiesToolbar.propTypes = {
  className: PropTypes.string
};

export default EntitiesToolbar;
