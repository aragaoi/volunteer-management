import {Button} from "@material-ui/core";
import React, {useState} from "react";
import {UserStore} from "../../../../contexts/user.context";
import {emptyUser} from "../../../../services/user.service";
import {UserFormDialog} from "./UserFormDialog";

export function UserFormDialogButton() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return <>
    <Button
      color="primary"
      variant="contained"
      onClick={handleClickOpen}
    >
      Adicionar usuário
    </Button>
    {open && <UserStore user={emptyUser()}>
      <UserFormDialog
        setOpen={setOpen}
        open={open}
      />
    </UserStore>}
  </>
}
