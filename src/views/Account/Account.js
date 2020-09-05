import React, {useContext} from 'react';
import {LoginContext} from "../../contexts/login.context";
import {ROLES} from "../../services/auth.service";
import {EntityForm} from "../Entities/components/EntityForm";
import {UserForm} from "../Users/components/UserForm";
import {EntityStore} from "../../contexts/entity.context";
import {UserStore} from "../../contexts/user.context";

export const Account = () => {
  const {login} = useContext(LoginContext);

  return (
    login.role === ROLES.ENTITY ?
      <EntityStore entity={login}>
        <EntityForm/>
      </EntityStore>
      :
      <UserStore user={login}>
        <UserForm/>
      </UserStore>
  );
};
