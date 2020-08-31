import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {VisitsStore} from "../../contexts/visits.context";
import VisitsToolbar from "./components/VisitsToolbar";
import VisitsTable from "./components/VisitsTable";
import {EntitiesStore} from "../../contexts/entities.context";
import {FilterStore} from "../../contexts/filter.context";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Visits = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VisitsStore>
        <EntitiesStore>
          <FilterStore>
            <VisitsToolbar/>
            <div className={classes.content}>
              <VisitsTable/>
            </div>
          </FilterStore>
        </EntitiesStore>
      </VisitsStore>
    </div>
  );
};

export default Visits;
