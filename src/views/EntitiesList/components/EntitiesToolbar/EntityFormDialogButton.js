import {Button} from "@material-ui/core";
import {EntityFormDialog} from "./EntityFormDialog";
import React, {useState} from "react";
import {EntityStore} from "../../../../contexts/entity.context";
import {emptyEntity} from "../../../../services/entity.service";

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
    {open && <EntityStore entity={emptyEntity()}>
      <EntityFormDialog
        setOpen={setOpen}
        open={open}
      />
    </EntityStore>}
  </>
}
