import React, {Fragment, useContext, useEffect, useState} from "react";
import {UserContext} from "../../../contexts/user.context";
import {handleImageUrl} from "../../../helpers/file";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "../../../components/UploadButtons";
import {StatesStore} from "../../../contexts/states.context";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {buildUserSchema} from "../../../common/validators";
import {edit, insert, list} from "../../../services/user.service";
import {useSnackbar} from "notistack";
import {UsersContext} from "../../../contexts/users.context";
import UserDetailsForm from "./UserDetailsForm";
import UserCard from "./UserCard";
import FormGrid from "../../../components/FormGrid";
import clsx from "clsx";
import {Card, CardContent, TextField} from "@material-ui/core";
import * as _ from "lodash";
import {getRoleName, ROLES} from "../../../services/auth.service";
import {isEmpty} from "lodash";

export function UserForm(props) {
  const {onSubmit, isEdit} = props;

  const [user, setUser] = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  const {refresh} = useContext(UsersContext);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles([
      ROLES.USER,
      ROLES.ADMIN,
    ].map(role => ({
      key: role,
      value: getRoleName(role)
    })))
  }, [])

  const methods = useForm({
    resolver: yupResolver(buildUserSchema(isEdit))
  });
  const watchConfirm = methods.watch("confirm");

  async function handleInsert(user) {
    await insert(user);
    enqueueSnackbar("Usuário salvo com sucesso!", {variant: "success"});
  }

  async function handleEdit(user) {
    await edit(user);
    enqueueSnackbar("Usuário editado com sucesso!", {variant: "success"});
  }

  function hasConfirmedPassword(user) {
    const confirmed = user.password === watchConfirm || (isEmpty(user.password) && isEmpty(watchConfirm));
    if (!confirmed) {
      methods.setError("confirm", {
        type: "manual",
        message: "As senhas devem ser iguais"
      })
    }
    return confirmed;
  }

  async function handleSave() {
    if (hasConfirmedPassword(user)) {
      try {
        if (isEdit) {
          await handleEdit(user);
        } else {
          await handleInsert(user);
        }
      } catch (e) {
        enqueueSnackbar("Não foi possível salvar", {variant: "error"});
      }

      refresh && refresh();
      onSubmit();
    }
  }

  const handleUpload = async file => {
    const newState = {...user};
    newState.avatarUrl = await handleImageUrl(file);
    setUser(newState);
  };

  function handlePasswordChange(password) {
    setUser({...user, password});
  }

  const handleChange = event => {
    const newState = {...user};
    _.set(newState, event.target.name, event.target.value);
    setUser(newState);
  };

  return <FormProvider {...methods}>
    <form
      id="user-form"
      autoComplete="off"
      noValidate
      onSubmit={methods.handleSubmit(handleSave)}
    >
      <FormGrid
        onChangePassword={handlePasswordChange}
        profile={
          <Fragment>
            <Grid
              container
              spacing={2}
              alignItems={"center"}
            >
              <Grid
                item
                xs={12}
              >
                <UserCard actions={
                  <Grid container justify={"center"}>
                    <UploadButtons name="avatar" onChange={handleUpload}/>
                  </Grid>
                }/>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Card>
                  <CardContent>
                    <TextField
                      fullWidth
                      label="Perfil"
                      margin="dense"
                      name="role"
                      onChange={handleChange}
                      select
                      SelectProps={{native: true}}
                      value={user?.role}
                      variant="outlined"
                    >
                      {roles.map(option => (
                        <option key={option.key} value={option.key}>
                          {option.value}
                        </option>
                      ))}
                    </TextField>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Fragment>
        }>
        <StatesStore>
          <UserDetailsForm/>
        </StatesStore>
      </FormGrid>
    </form>
  </FormProvider>
}
