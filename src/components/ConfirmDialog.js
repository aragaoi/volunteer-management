import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";

export function ConfirmDialog(props) {
  const {
    onClose,
    title,
    message,
    cancelButtonMessage = 'Cancelar',
    okButtonMessage = 'Confirmar'
  } = props;

  function ok() {
    onClose(true);
  }

  function cancel() {
    onClose(false);
  }

  return <Dialog
    open={true}
    maxWidth={"xs"}
    fullWidth={true}
  >
    <DialogTitle>
      {title}
    </DialogTitle>
    <DialogContent dividers>
      <DialogContentText>
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={cancel} color="secondary">
        {cancelButtonMessage}
      </Button>
      <Button onClick={ok} color="primary" variant={"contained"}>
        {okButtonMessage}
      </Button>
    </DialogActions>
  </Dialog>
}

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  okButtonMessage: PropTypes.string,
  cancelButtonMessage: PropTypes.string,
}
