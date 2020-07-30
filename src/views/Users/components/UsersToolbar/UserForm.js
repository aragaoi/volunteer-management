import React, {useContext} from "react";
import {UserContext} from "../../../../contexts/user.context";
import {handleImageUrl} from "../../../../helpers/file";
import Account from "../../../Account";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "../../../../components/UploadButtons";
import {StatesStore} from "../../../../contexts/states.context";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {userSchema} from "../../../../common/validators";
import {list, save} from "../../../../services/user.service";
import {useSnackbar} from "notistack";
import {UsersContext} from "../../../../contexts/users.context";
import UserDetailsForm from "../UserDetailsForm";
import UserCard from "../UserCard";

export function UserForm(props) {
  const {onSubmit} = props;

  const [user, setUser] = useContext(UserContext);
  const {enqueueSnackbar} = useSnackbar();
  const [, setUsers] = useContext(UsersContext);

  const methods = useForm({
    resolver: yupResolver(userSchema)
  });

  async function handleSave() {
    await save(user);
    setUsers(await list());

    onSubmit();
    enqueueSnackbar("Entidade salva com sucesso!", {variant: "success"});
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
