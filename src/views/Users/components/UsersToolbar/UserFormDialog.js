import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import {UserForm} from "./UserForm";

export function UserFormDialog(props) {
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
      Novo Usuário
    </DialogTitle>
    <DialogContent dividers>
      <UserForm onSubmit={close}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={close} color="secondary">
        Cancelar
      </Button>
      <Button type={"submit"} form="user-form" color="primary" variant={"contained"}>
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
}

UserFormDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  user: PropTypes.object
}
