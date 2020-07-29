import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useState} from "react";
import Account from "../../../Account";
import EntityDetailsForm from "../EntityDetailsForm";
import {StatesContextProvider} from "../../../../contexts/states.context";
import {TypesContextProvider} from "../../../../contexts/types.context";
import {EntityCard} from "../index";
import EntityHours from "../EntityHours";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "./UploadButtons";
import {EntityStore} from "../../../../contexts/entity.context";
import {emptyEntity, save} from "../../../../services/entity.service";
import {useSnackbar} from "notistack";
import {handleImageUrl} from "../../../../helpers/file";
import * as yup from "yup";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';

export function EntityFormDialog(props) {
  const {open, setOpen} = props;
  const {enqueueSnackbar} = useSnackbar();
  const [entity, setEntity] = useState(props.entity || emptyEntity());

  let formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
    phone: yup.string().matches(/^[0-9\-+()]*$/),
    document: yup.string().required(),
    type: yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(formSchema)
  });

  const handleUpload = async file => {
    const newState = {...entity};
    newState.avatarUrl = await handleImageUrl(file);
    setEntity(newState);
  };

  function close() {
    setOpen(false);
  }

  async function handleSave() {
    await save(entity);
    close();
    enqueueSnackbar("Entidade salva com sucesso!", {variant: "success"});
  }

  return <Dialog
    open={open}
    maxWidth={"lg"}
    fullWidth={true}
  >
    <DialogTitle>
      Nova Entidade
    </DialogTitle>
    <DialogContent dividers>
      <EntityStore entity={entity}>
        <FormProvider {...methods}>
          <form
            autoComplete="off"
            noValidate
          >
            <Account
              profile={<EntityCard actions={
                <Grid container justify={"center"}>
                  <UploadButtons name="avatar" onChange={handleUpload}/>
                </Grid>
              }/>}>
              <StatesContextProvider>
                <TypesContextProvider>
                  <EntityDetailsForm/>
                </TypesContextProvider>
              </StatesContextProvider>
              <EntityHours/>
            </Account>
          </form>
        </FormProvider>
      </EntityStore>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="secondary">
        Cancelar
      </Button>
      <Button onClick={methods.handleSubmit(handleSave)} color="primary" variant={"contained"}>
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
}

EntityFormDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  entity: PropTypes.object
}
