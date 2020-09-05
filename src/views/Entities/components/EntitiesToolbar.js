import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

import {TextSearchInput} from 'components';
import {DialogButtonHandler} from "../../../components/DialogButtonHandler";
import {EntityFormDialog} from "./EntityFormDialog";
import ProximitySearchInput from "../../../components/ProximitySearchInput";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
  },
  moreFilters: {
    textTransform: "none"
  }
}));

const EntitiesToolbar = props => {
  const {className, ...rest} = props;

  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false);

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
              actionText={"Adicionar entidade"}
              dialog={
                <EntityFormDialog/>
              }
            />
          </div>
        </Grid>
        <Grid item xs={10} md={6}>
          <TextSearchInput
            className={classes.searchInput}
            placeholder="Buscar entidades"
          />
        </Grid>
        <Grid item xs={2} md={6}>
          <Button
            className={classes.moreFilters}
            size="small"
            startIcon={
              showFilters ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>
            }
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filtros
          </Button>
        </Grid>
        {showFilters && <Grid item xs={12} md={6}>
          <ProximitySearchInput
            className={classes.searchInput}
          />
        </Grid>}
      </Grid>
    </div>
  );
};

EntitiesToolbar.propTypes = {
  className: PropTypes.string
};

export default EntitiesToolbar;
