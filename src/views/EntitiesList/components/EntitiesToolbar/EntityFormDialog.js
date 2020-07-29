import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import {EntityForm} from "./EntityForm";

export function EntityFormDialog(props) {
  const {open, setOpen} = props;

  function close() {
    setOpen(false);
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
      <EntityForm onSubmit={close}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="secondary">
        Cancelar
      </Button>
      <Button type={"submit"} form="entity-form" color="primary" variant={"contained"}>
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
