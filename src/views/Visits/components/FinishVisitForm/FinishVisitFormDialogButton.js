import {Button} from "@material-ui/core";
import {FinishVisitFormDialog} from "./FinishVisitFormDialog";
import React, {useContext, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {VisitContext, VisitStore} from "../../../../contexts/visit.context";

export function FinishVisitFormDialogButton(props) {
  const {actionText, actionIcon, ...rest} = props;
  const [open, setOpen] = useState(true);

  const [visit] = useContext(VisitContext);

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
    {open && <VisitStore visit={visit}>
      <FinishVisitFormDialog
        onClose={() => setOpen(false)}
      />
    </VisitStore>}
  </>
}
