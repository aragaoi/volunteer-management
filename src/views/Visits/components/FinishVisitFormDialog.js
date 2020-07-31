import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React, {useContext} from "react";
import {FinishVisitForm} from "./FinishVisitForm";
import {Divider, useMediaQuery, useTheme} from "@material-ui/core";
import ApartmentIcon from "@material-ui/icons/Apartment";
import {BasicInfo} from "../../../components/BasicInfo";
import {makeStyles} from "@material-ui/styles";
import {VisitContext} from "../../../contexts/visit.context";
import {EvaluationStore} from "../../../contexts/evaluation.context";

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0)
  },
}));

export function FinishVisitFormDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const {onClose} = props;

  const [visit] = useContext(VisitContext);

  return <Dialog
    open={true}
    maxWidth={"sm"}
    fullWidth={true}
    fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
  >
    <DialogTitle>
      Finalizar Visita
    </DialogTitle>
    <DialogContent dividers>
      <BasicInfo
        {...visit.entity}
        defaultAvatar={
          <ApartmentIcon fontSize={"large"}/>
        }
      />
      <BasicInfo
        {...visit.user}
      />
      <Divider variant={"middle"} className={classes.divider}/>
      <EvaluationStore>
        <FinishVisitForm
          onSubmit={onClose}
        />
      </EvaluationStore>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Cancelar
      </Button>
      <Button type={"submit"} form="evaluation-form" color="primary" variant={"contained"}>
        Agendar
      </Button>
    </DialogActions>
  </Dialog>
}

FinishVisitFormDialog.propTypes = {
  onClose: PropTypes.func,
}
