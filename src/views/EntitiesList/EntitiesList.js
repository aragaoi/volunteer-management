import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {EntitiesToolbar, EntityCard} from './components';
import {entitiesMock} from '../../data';
import {EntityContextProvider} from "../../contexts/entity-context";
import {RatingStars} from "../../components/Rating/RatingStars";
import {ProfileDialogButton} from "../../components/Profile/ProfileDialogButton";

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
      <EntitiesToolbar/>
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
              <EntityContextProvider entity={entity}>
                <EntityCard actions={
                  <Grid
                    container
                    justify="space-between"
                  >
                    <Grid
                      className={classes.statsItem}
                      item
                    >
                      <RatingStars rating={entity.rating.average}/>
                    </Grid>
                    <Grid
                      className={classes.statsItem}
                      item
                    >
                      <ProfileDialogButton
                        entity={entity}
                      />
                    </Grid>
                  </Grid>
                }/>
              </EntityContextProvider>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default EntitiesList;
