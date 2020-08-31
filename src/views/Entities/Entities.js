import React from 'react';
import {makeStyles} from '@material-ui/styles';

import {EntitiesToolbar} from './components';
import {EntitiesStore} from "../../contexts/entities.context";
import {EntitiesList} from "./components/EntitiesList";
import {FilterStore} from "../../contexts/filter.context";

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
        <FilterStore>
          <EntitiesToolbar/>
          <div className={classes.content}>
            <EntitiesList/>
          </div>
        </FilterStore>
      </EntitiesStore>
    </div>
  );
};

export default Entities;
