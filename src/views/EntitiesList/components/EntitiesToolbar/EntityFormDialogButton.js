import {Button} from "@material-ui/core";
import {EntityFormDialog} from "./EntityFormDialog";
import React, {useState} from "react";

export function EntityFormDialogButton() {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
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
      setOpen={setOpen}
      open={open}
    />
  </>
}
