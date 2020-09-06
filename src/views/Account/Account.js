import React, {useContext} from 'react';
import {LoginContext} from "../../contexts/login.context";
import {ROLES} from "../../services/auth.service";
import {EntityForm} from "../Entities/components/EntityForm";
import {UserForm} from "../Users/components/UserForm";
import {EntityStore} from "../../contexts/entity.context";
import {UserStore} from "../../contexts/user.context";
import AccountToolbar from "./components/AccountToolbar";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

export const Account = () => {
  const classes = useStyles();
  const {login, refresh} = useContext(LoginContext);

  return (
    <div className={classes.root}>
      <AccountToolbar/>
      <div className={classes.content}>
        {login.role === ROLES.ENTITY ?
          <EntityStore entity={login}>
            <EntityForm isEdit onSubmit={refresh}/>
          </EntityStore>
          :
          <UserStore user={login}>
            <UserForm isEdit onSubmit={refresh}/>
          </UserStore>
        }
      </div>
    </div>
  );
};
