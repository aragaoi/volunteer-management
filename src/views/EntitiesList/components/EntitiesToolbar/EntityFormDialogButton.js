import {Button} from "@material-ui/core";
import {EntityFormDialog} from "./EntityFormDialog";
import React, {useState} from "react";

export function EntityFormDialogButton() {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>
    <Button
      color="primary"
      variant="contained"
      onClick={handleClickOpen}
    >
      Adicionar entidade
    </Button>
    <EntityFormDialog
      onClose={handleClose}
      open={open}
    />
  </>
}
