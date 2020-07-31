import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {VisitsStore} from "../../contexts/visits.context";
import VisitsToolbar from "./components/VisitsToolbar";
import VisitsTable from "./components/VisitsTable";

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
        <VisitsToolbar/>
        <div className={classes.content}>
          <VisitsTable/>
        </div>
      </VisitsStore>
    </div>
  );
};

export default Visits;
