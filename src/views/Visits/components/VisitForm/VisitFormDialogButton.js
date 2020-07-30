import {Button} from "@material-ui/core";
import {EntityFormDialog} from "./EntityFormDialog";
import React, {useState} from "react";
import {EntityStore} from "../../../../contexts/entity.context";
import {emptyEntity} from "../../../../services/entity.service";
import IconButton from "@material-ui/core/IconButton";

export function EntityFormDialogButton(props) {
  const {entity, actionText, actionIcon, ...rest} = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return <>
    {actionText ?
      <Button
        {...rest}
        onClick={handleClickOpen}
      >
        {actionIcon}
        {actionText}
      </Button>
      :
      <IconButton
        {...rest}
        onClick={handleClickOpen}
      >
        {actionIcon}
      </IconButton>
    }
    {open && <EntityStore entity={entity || emptyEntity()}>
      <EntityFormDialog
        isEdit={!!entity}
        onClose={() => setOpen(false)}
      />
    </EntityStore>}
  </>
}
