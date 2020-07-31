import React, {Fragment, useState} from "react";
import InfoIcon from "@material-ui/icons/Info";
import {EntityDialog} from "../views/Entities/components/EntityCard/EntityDialog";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export function ProfileDialogButton() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <Fragment>
    <Tooltip title="Mais detalhes">
      <IconButton
        onClick={handleClickOpen}
      >
        <InfoIcon color={"action"}/>
      </IconButton>
    </Tooltip>
    <EntityDialog
      onClose={handleClose}
      open={open}
    />
  </Fragment>
}
