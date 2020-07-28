import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import Account from "../../../Account";
import EntityDetails from "../EntityDetails";
import {StatesContextProvider} from "../../../../contexts/states.context";
import {TypesContextProvider} from "../../../../contexts/types.context";
import {EntityCard} from "../index";
import EntityHours from "../EntityHours";
import Grid from "@material-ui/core/Grid";
import {UploadButtons} from "./UploadButtons";
import {EntityContext} from "../../../../contexts/entity.context";
import {save} from "../../../../services/entity.service";
import {useSnackbar} from "notistack";
import {handleImageUrl} from "../../../../helpers/file";

export function EntityFormDialog(props) {
  const {open, setOpen} = props;
  const {enqueueSnackbar} = useSnackbar();
  const [entity, setEntity] = useContext(EntityContext);

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
      <Account
        profile={<EntityCard actions={
          <Grid container justify={"center"}>
            <UploadButtons name="avatar" onChange={handleUpload}/>
          </Grid>
        }/>}>
          <StatesContextProvider>
            <TypesContextProvider>
              <EntityDetails/>
            </TypesContextProvider>
          </StatesContextProvider>
          <EntityHours/>
      </Account>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="secondary">
        Cancelar
      </Button>
      <Button onClick={handleSave} color="primary" variant={"contained"}>
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
}

EntityFormDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}
