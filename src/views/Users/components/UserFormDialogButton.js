import {Button} from "@material-ui/core";
import React, {useState} from "react";
import {UserStore} from "../../../contexts/user.context";
import {emptyUser} from "../../../services/user.service";
import {UserFormDialog} from "./UserFormDialog";
import IconButton from "@material-ui/core/IconButton";

export function UserFormDialogButton(props) {
  const {user, actionText, actionIcon, ...rest} = props;
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
    {open && <UserStore user={user || emptyUser()}>
      <UserFormDialog
        isEdit={!!user}
        onClose={() => setOpen(false)}
      />
    </UserStore>}
  </>
}
