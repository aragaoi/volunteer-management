import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {EntitiesToolbar, EntityCard} from './components';
import {entitiesMock} from '../../data';
import {EntityStore} from "../../contexts/entity.context";
import {RatingStars} from "../../components/Rating/RatingStars";
import {ProfileDialogButton} from "../../components/Profile/ProfileDialogButton";
import {EntitiesContext, EntitiesStore} from "../../contexts/entities.context";
import {EntitiesList} from "./components/EntitiesList";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));



const Entities = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EntitiesStore>
        <EntitiesToolbar/>
        <div className={classes.content}>
          <EntitiesList/>
        </div>
      </EntitiesStore>
    </div>
  );
};

export default Entities;
