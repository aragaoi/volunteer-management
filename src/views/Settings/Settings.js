import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid, Typography} from '@material-ui/core';

import {EntityTypesStore} from "../../contexts/entitytypes.context";
import {EntitiesConfig} from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            Configurações
          </Typography>
        </Grid>
        <Grid
          item
          md={7}
          xs={12}
        >
          <EntityTypesStore>
            <EntitiesConfig/>
          </EntityTypesStore>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
