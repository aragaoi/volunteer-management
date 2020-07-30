import React, {useContext} from "react";
import {EntityContext} from "../../../../contexts/entity.context";
import {handleImageUrl} from "../../../../helpers/file";
import Account from "../../../Account";
import {EntityCard} from "../index";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "../../../../components/UploadButtons";
import {StatesStore} from "../../../../contexts/states.context";
import {EntityTypesStore} from "../../../../contexts/entitytypes.context";
import EntityDetailsForm from "../EntityDetailsForm";
import EntityHours from "../EntityHours";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {entitySchema} from "../../../../common/validators";
import {list, save} from "../../../../services/entity.service";
import {useSnackbar} from "notistack";
import {EntitiesContext} from "../../../../contexts/entities.context";

export function EntityForm(props) {
  const {onSubmit} = props;

  const [entity, setEntity] = useContext(EntityContext);
  const {enqueueSnackbar} = useSnackbar();
  const [, setEntities] = useContext(EntitiesContext);

  const methods = useForm({
    resolver: yupResolver(entitySchema)
  });

  async function handleSave() {
    await save(entity);
    setEntities(await list());

    onSubmit();
    enqueueSnackbar("Entidade salva com sucesso!", {variant: "success"});
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
