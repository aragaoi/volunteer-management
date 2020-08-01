import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {UserForm} from "./UserForm";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {UserContext, UserStore} from "../../../contexts/user.context";

export function UserFormDialog(props) {
  const theme = useTheme();
  const {onClose, isEdit} = props;
  const [user] = useContext(UserContext);

  return <UserStore user={user}>
    <Dialog
      open={true}
      maxWidth={"lg"}
      fullWidth={true}
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
    >
      <DialogTitle>
        {isEdit ? "Editar Usuário" : "Novo Usuário"}
      </DialogTitle>
      <DialogContent dividers>
        <UserForm
          isEdit={isEdit}
          onSubmit={onClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button type={"submit"} form="user-form" color="primary" variant={"contained"}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  </UserStore>
}

UserFormDialog.propTypes = {
  onClose: PropTypes.func,
  user: PropTypes.object
}
