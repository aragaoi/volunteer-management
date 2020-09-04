import React, {useContext} from "react";
import {EntityContext} from "../../../contexts/entity.context";
import {handleImageUrl} from "../../../helpers/file";
import Account from "../../Account";
import {EntityCard} from "./index";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "../../../components/UploadButtons";
import {StatesStore} from "../../../contexts/states.context";
import {EntityTypesStore} from "../../../contexts/entitytypes.context";
import EntityDetailsForm from "./EntityDetailsForm";
import EntityHours from "./EntityHours";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {buildEntitySchema} from "../../../common/validators";
import {edit, insert, list} from "../../../services/entity.service";
import {useSnackbar} from "notistack";
import {EntitiesContext} from "../../../contexts/entities.context";

export function EntityForm(props) {
  const {onSubmit, isEdit} = props;

  const {enqueueSnackbar} = useSnackbar();
  const [entity, setEntity] = useContext(EntityContext);
  const [, setEntities] = useContext(EntitiesContext);

  const methods = useForm({
    resolver: yupResolver(buildEntitySchema(isEdit))
  });
  const watchConfirm = methods.watch("confirm");

  async function handleInsert(entity) {
    await insert(entity);
    enqueueSnackbar("Entidade salva com sucesso!", {variant: "success"});
  }

  async function handleEdit(entity) {
    await edit(entity);
    enqueueSnackbar("Entidade editada com sucesso!", {variant: "success"});
  }

  function hasConfirmedPassword(entity) {
    const confirmed = entity.password === watchConfirm;
    if(!confirmed) {
      methods.setError("confirm", {
        type: "manual",
        message: "As senhas devem ser iguais"
      })
    }
    return confirmed;
  }

  async function handleSave() {
    if (hasConfirmedPassword(entity)) {
      try {
        if (isEdit) {
          await handleEdit(entity);
        } else {
          await handleInsert(entity);
        }
      } catch (e) {
        enqueueSnackbar("Não foi possível salvar", {variant: "error"});
      }

      setEntities(await list());
      onSubmit();
    }
  }

  const handleUpload = async file => {
    const newState = {...entity};
    newState.avatarUrl = await handleImageUrl(file);
    setEntity(newState);
  };

  function handlePasswordChange(password) {
    setEntity({...entity, password});
  }

  return <FormProvider {...methods}>
    <form
      id="entity-form"
      autoComplete="off"
      noValidate
      onSubmit={methods.handleSubmit(handleSave)}
    >
      <Account
        onChangePassword={handlePasswordChange}
        profile={<EntityCard actions={
          <Grid container justify={"center"}>
            <UploadButtons name="avatar" onChange={handleUpload}/>
          </Grid>
        }/>}>
        <StatesStore>
          <EntityTypesStore>
            <EntityDetailsForm/>
          </EntityTypesStore>
        </StatesStore>
        <EntityHours/>
      </Account>
    </form>
  </FormProvider>
}
