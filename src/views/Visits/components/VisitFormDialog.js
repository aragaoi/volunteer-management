import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {VisitForm} from "./VisitForm";
import {Divider, useMediaQuery, useTheme} from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";
import {BasicInfo} from "../../../components/BasicInfo";
import {makeStyles} from "@material-ui/styles";
import {EntityContext} from "../../../contexts/entity.context";
import {VisitStore} from "../../../contexts/visit.context";

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

export function VisitFormDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const {onClose} = props;

  const [entity] = useContext(EntityContext);

  return <VisitStore>
    <Dialog
      open={true}
      maxWidth={"sm"}
      fullWidth={true}
      fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
    >
      <DialogTitle>
        Agendar Visita
      </DialogTitle>
      <DialogContent dividers>
        <BasicInfo
          {...entity}
          defaultAvatar={
            <ApartmentIcon fontSize={"large"}/>
          }
        />
        <Divider variant={"middle"} className={classes.divider}/>
        <VisitForm
          onSubmit={onClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button type={"submit"} form="visit-form" color="primary" variant={"contained"}>
          Agendar
        </Button>
      </DialogActions>
    </Dialog>
  </VisitStore>
}

VisitFormDialog.propTypes = {
  onClose: PropTypes.func,
}
