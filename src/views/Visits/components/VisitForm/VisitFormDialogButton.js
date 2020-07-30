import {Button} from "@material-ui/core";
import {VisitFormDialog} from "./VisitFormDialog";
import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {VisitStore} from "../../../../contexts/visit.context";
import {emptyVisit} from "../../../../services/visit.service";

export function VisitFormDialogButton(props) {
  const {actionText, actionIcon, ...rest} = props;
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
    {open && <VisitStore visit={emptyVisit()}>
      <VisitFormDialog
        onClose={() => setOpen(false)}
      />
    </VisitStore>}
  </>
}
