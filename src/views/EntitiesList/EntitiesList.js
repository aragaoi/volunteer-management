import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {EntitiesToolbar, EntityCard} from './components';
import {entitiesMock} from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const EntitiesList = () => {
  const classes = useStyles();

  const [entities] = useState(entitiesMock);

  return (
    <div className={classes.root}>
      <EntitiesToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {entities.map(entity => (
            <Grid
              item
              key={entity.id}
              lg={4}
              md={6}
              xs={12}
            >
              <EntityCard entity={entity} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default EntitiesList;
