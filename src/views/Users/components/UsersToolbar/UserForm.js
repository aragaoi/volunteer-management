import React, {useContext} from "react";
import {UserContext} from "../../../../contexts/user.context";
import {handleImageUrl} from "../../../../helpers/file";
import Account from "../../../Account";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "../../../../components/UploadButtons";
import {StatesStore} from "../../../../contexts/states.context";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {buildUserSchema} from "../../../../common/validators";
import {edit, insert, list} from "../../../../services/user.service";
import {useSnackbar} from "notistack";
import {UsersContext} from "../../../../contexts/users.context";
import UserDetailsForm from "../UserDetailsForm";
import UserCard from "../UserCard";

export function UserForm(props) {
  const {onSubmit, isEdit} = props;

  const [user, setUser] = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  const [, setUsers] = useContext(UsersContext);

  const methods = useForm({
    resolver: yupResolver(buildUserSchema(isEdit))
  });

  async function handleInsert(user) {
    await insert(user);
    enqueueSnackbar("Usuário salvo com sucesso!", {variant: "success"});
  }

  async function handleEdit(user) {
    await edit(user);
    enqueueSnackbar("Usuário editado com sucesso!", {variant: "success"});
  }

  async function handleSave() {
    try {
      if (isEdit) {
        await handleEdit(user);
      } else {
        await handleInsert(user);
      }
    } catch (e) {
      enqueueSnackbar("Não foi possível salvar", {variant: "error"});
    }

    setUsers(await list());
    onSubmit();
  }

  const handleUpload = async file => {
    const newState = {...user};
    newState.avatarUrl = await handleImageUrl(file);
    setUser(newState);
  };

  function handlePasswordChange(password) {
    setUser({...user, password});
  }

  return <FormProvider {...methods}>
    <form
      id="user-form"
      autoComplete="off"
      noValidate
      onSubmit={methods.handleSubmit(handleSave)}
    >
      <Account
        onChangePassword={handlePasswordChange}
        profile={<UserCard actions={
          <Grid container justify={"center"}>
            <UploadButtons name="avatar" onChange={handleUpload}/>
          </Grid>
        }/>}>
        <StatesStore>
          <UserDetailsForm/>
        </StatesStore>
      </Account>
    </form>
  </FormProvider>
}
