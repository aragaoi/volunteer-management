import React from 'react';
import {makeStyles} from '@material-ui/styles';

import {UsersTable, UsersToolbar} from './components';
import {UsersStore} from "../../contexts/users.context";
import {FilterStore} from "../../contexts/filter.context";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Users = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UsersStore>
        <FilterStore>
          <UsersToolbar/>
          <div className={classes.content}>
            <UsersTable/>
          </div>
        </FilterStore>
      </UsersStore>
    </div>
  );
};

export default Users;
