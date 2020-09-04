import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {EntityForm} from "./EntityForm";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {EntityContext, EntityStore} from "../../../contexts/entity.context";

export function EntityFormDialog(props) {
  const theme = useTheme();
  const {onClose, isEdit} = props;
  const [entity] = useContext(EntityContext);

  return <EntityStore entity={isEdit ? entity : undefined}>
    <Dialog
      open={true}
      maxWidth={"lg"}
      fullWidth={true}
      fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
    >
      <DialogTitle>
        {isEdit ? "Editar Entidade" : "Nova Entidade"}
      </DialogTitle>
      <DialogContent dividers>
        <EntityForm
          isEdit={isEdit}
          onSubmit={onClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button type={"submit"} form="entity-form" color="primary" variant={"contained"}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  </EntityStore>
}

EntityFormDialog.propTypes = {
  onClose: PropTypes.func,
  entity: PropTypes.object
}
