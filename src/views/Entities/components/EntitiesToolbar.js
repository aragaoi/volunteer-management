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
import {Typography} from "@material-ui/core";
import {ShowByRole} from "../../../components/ShowByRole";
import {ROLES} from "../../../services/auth.service";

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
        <Grid item xs={6}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            Entidades
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ShowByRole roles={[ROLES.ADMIN]}>
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
          </ShowByRole>
        </Grid>
        <Grid item container spacing={2} xs={12} md={6} alignItems="center">
          <Grid item xs={9} sm={10}>
            <TextSearchInput
              className={classes.searchInput}
              placeholder="Buscar entidades"
            />
          </Grid>
          <Grid item xs={3} sm={2}>
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
          {showFilters && <Grid item xs={12} sm={10}>
            <ProximitySearchInput
              className={classes.searchInput}
            />
          </Grid>}
        </Grid>
      </Grid>
    </div>
  );
};

EntitiesToolbar.propTypes = {
  className: PropTypes.string
};

export default EntitiesToolbar;
