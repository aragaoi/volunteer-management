import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {EntitiesConfigs} from './components';
import {EntityTypesStore} from "../../contexts/entitytypes.context";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={7}
          xs={12}
        >
          <EntityTypesStore>
            <EntitiesConfigs/>
          </EntityTypesStore>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
