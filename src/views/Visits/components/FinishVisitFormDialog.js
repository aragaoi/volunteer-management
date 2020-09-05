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
import {VisitContext, VisitStore} from "../../../contexts/visit.context";
import {EvaluationStore} from "../../../contexts/evaluation.context";
import {LoginContext} from "../../../contexts/login.context";
import Typography from "@material-ui/core/Typography";
import {formatDateAndPeriod} from "../../../helpers/date";

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: theme.spacing(2, 0)
  },
  date: {
    textAlign: "center"
  }
}));

export function FinishVisitFormDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const {onClose} = props;

  const {login} = useContext(LoginContext);
  const [visit] = useContext(VisitContext);

  return <VisitStore visit={visit}>
    <Dialog
      open={true}
      maxWidth={"sm"}
      fullWidth={true}
      fullScreen={useMediaQuery(theme.breakpoints.down('xs'))}
    >
      <DialogTitle>
        Finalizar Visita
      </DialogTitle>
      <DialogContent dividers>
        {login.userId ?
          <BasicInfo
            {...visit.entity}
            defaultAvatar={
              <ApartmentIcon fontSize={"large"}/>
            }
          />
          :
          <BasicInfo
            {...visit.user}
          />
        }
        <Typography className={classes.date} variant={"h5"}>
          {formatDateAndPeriod(visit.date, visit.period)}
        </Typography>
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
          Finalizar
        </Button>
      </DialogActions>
    </Dialog>
  </VisitStore>
}

FinishVisitFormDialog.propTypes = {
  onClose: PropTypes.func,
}
